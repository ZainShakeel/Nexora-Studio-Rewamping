//+------------------------------------------------------------------+
//|                                        XAU_StructureScalper.mq5   |
//|            Production-level price-action scalping / intraday EA   |
//|                                                                  |
//|  Strategy : Market structure (HH/HL, LH/LL) + liquidity zones +  |
//|             breakout -> retest -> strong-close confirmation with |
//|             a fake-breakout filter.                              |
//|  Entries  : M5      Trend confirm : M15                          |
//|  Symbols  : XAUUSD (primary), XAGUSD, USOIL (attach per chart)   |
//|                                                                  |
//|  NOTE: Trades the CHART symbol (_Symbol). Attach one instance    |
//|        per instrument, each on an M5 chart.                      |
//+------------------------------------------------------------------+
#property copyright "2026"
#property version   "1.00"
#property description "Disciplined price-action structure scalper with strict risk control and dashboard."
#property strict

#include <Trade/Trade.mqh>
#include <Trade/PositionInfo.mqh>

//+------------------------------------------------------------------+
//| INPUTS                                                           |
//+------------------------------------------------------------------+
input group "=== Risk Management ==="
input double InpRiskPercent          = 1.0;    // Base risk per trade (% of balance)
input double InpReducedRiskPercent   = 0.5;    // Reduced risk after loss streak (%)
input int    InpLossesToReduce       = 2;      // Consecutive losses -> reduce risk
input double InpDailyMaxLoss         = 600.0;  // Daily max loss (account currency), stop for the day
input int    InpMaxTradesPerDay      = 5;      // Max trades opened per day
input bool   InpOnlyOneOpenTrade     = true;   // Allow only one open trade at a time

input group "=== Trade Parameters ==="
input double InpMinRR                = 2.0;     // Minimum reward:risk (TP = RR x SL distance)
input long   InpMagicNumber          = 990045;  // Magic number
input int    InpMaxSlippagePoints    = 30;      // Max slippage / deviation (points)
input int    InpMaxSpreadPoints      = 50;      // Max allowed spread (points), skip if higher
input double InpSL_BufferPoints      = 50;      // Extra buffer beyond swing for SL (points)

input group "=== Trailing Stop ==="
input bool   InpUseTrailingStop      = true;    // Enable trailing stop
input double InpTrailStartR          = 1.0;     // Activate trailing after +Nx risk (R)

input group "=== Timeframes ==="
input ENUM_TIMEFRAMES InpEntryTF     = PERIOD_M5;   // Entry timeframe (setups)
input ENUM_TIMEFRAMES InpTrendTF     = PERIOD_M15;  // Trend-confirmation timeframe

input group "=== Structure / Signal ==="
input int    InpSwingLookback        = 3;       // Fractal strength (bars each side of a swing)
input int    InpStructureDepthBars   = 120;     // Bars scanned for structure
input double InpRetestTolPoints      = 120;     // Retest proximity tolerance (points)
input double InpEqualLevelTolPoints  = 60;      // Equal high/low tolerance for liquidity (points)
input double InpConfirmBodyRatio     = 0.5;     // Confirmation candle body/range ratio (0..1)

input group "=== Session / Time Filter (server time) ==="
input bool   InpUseSessionFilter     = true;    // Trade only during London & New York
input int    InpLondonStartHour      = 8;       // London session start hour (server time)
input int    InpLondonEndHour        = 16;      // London session end hour
input int    InpNewYorkStartHour     = 13;      // New York session start hour
input int    InpNewYorkEndHour       = 21;      // New York session end hour

input group "=== News Filter (placeholder) ==="
input bool   InpUseNewsFilter        = false;   // Enable news blackout (see IsNewsBlackout)
input int    InpNewsBufferMinutes    = 30;      // Minutes before/after high-impact news

input group "=== Dashboard ==="
input bool   InpShowDashboard        = true;    // Show on-chart dashboard
input int    InpPanelX               = 12;      // Panel X offset (px)
input int    InpPanelY               = 24;      // Panel Y offset (px)

//+------------------------------------------------------------------+
//| ENUMS / GLOBALS                                                  |
//+------------------------------------------------------------------+
enum ETrend { TREND_RANGE = 0, TREND_BULL = 1, TREND_BEAR = -1 };
enum ESetupState { SETUP_IDLE = 0, SETUP_BREAKOUT = 1, SETUP_RETEST = 2 };

//--- signal payload returned by the engine
struct SSignal
  {
   bool     valid;      // a signal was produced this bar
   int      direction;  // +1 buy, -1 sell
   double   refLevel;   // the broken/retested reference level
   double   swingSL;    // protective swing (raw, before buffer)
   void Reset() { valid=false; direction=0; refLevel=0.0; swingSL=0.0; }
  };

CTrade         g_trade;
CPositionInfo  g_pos;
string         g_trendName = "M15";   // short name of trend TF (used by dashboard)

//+------------------------------------------------------------------+
//| CSwingStructure - fractal swings + HH/HL/LH/LL classification    |
//+------------------------------------------------------------------+
class CSwingStructure
  {
private:
   string            m_symbol;
   int               m_lookback;
   int               m_depth;

   //--- collect swing highs (newest first) via N-bar fractals
   int               FindSwings(const ENUM_TIMEFRAMES tf, const bool wantHighs,
                                 double &out[], datetime &outTime[], const int maxCount)
     {
      int found = 0;
      int bars  = (int)Bars(m_symbol, tf);
      int depth = (int)MathMin(m_depth, bars - m_lookback - 2);
      if(depth < m_lookback + 1) return 0;

      for(int i = m_lookback + 1; i <= depth && found < maxCount; i++)
        {
         double v = wantHighs ? iHigh(m_symbol, tf, i) : iLow(m_symbol, tf, i);
         if(v == 0.0) continue;
         bool isSwing = true;
         for(int k = 1; k <= m_lookback; k++)
           {
            double newer = wantHighs ? iHigh(m_symbol, tf, i - k) : iLow(m_symbol, tf, i - k);
            double older = wantHighs ? iHigh(m_symbol, tf, i + k) : iLow(m_symbol, tf, i + k);
            if(wantHighs)
              { if(newer >= v || older >= v) { isSwing = false; break; } }
            else
              { if(newer <= v || older <= v) { isSwing = false; break; } }
           }
         if(isSwing)
           {
            out[found]     = v;
            outTime[found] = iTime(m_symbol, tf, i);
            found++;
           }
        }
      return found;
     }

public:
   void              Init(const string sym, const int lookback, const int depth)
     { m_symbol = sym; m_lookback = (int)MathMax(1, lookback); m_depth = (int)MathMax(30, depth); }

   //--- classify trend on a timeframe from the two most recent swings
   ETrend            GetTrend(const ENUM_TIMEFRAMES tf)
     {
      double sh[16], sl[16]; datetime th[16], tl[16];
      int hc = FindSwings(tf, true,  sh, th, 16);
      int lc = FindSwings(tf, false, sl, tl, 16);
      if(hc < 2 || lc < 2) return TREND_RANGE;
      if(sh[0] > sh[1] && sl[0] > sl[1]) return TREND_BULL;   // Higher High + Higher Low
      if(sh[0] < sh[1] && sl[0] < sl[1]) return TREND_BEAR;   // Lower High  + Lower Low
      return TREND_RANGE;
     }

   //--- most recent confirmed swing high / low on a timeframe
   bool              GetLastSwingHigh(const ENUM_TIMEFRAMES tf, double &level)
     {
      double sh[16]; datetime th[16];
      if(FindSwings(tf, true, sh, th, 16) < 1) return false;
      level = sh[0]; return true;
     }
   bool              GetLastSwingLow(const ENUM_TIMEFRAMES tf, double &level)
     {
      double sl[16]; datetime tl[16];
      if(FindSwings(tf, false, sl, tl, 16) < 1) return false;
      level = sl[0]; return true;
     }

   //--- expose swing arrays (used by liquidity detection)
   int               SwingHighs(const ENUM_TIMEFRAMES tf, double &out[], datetime &t[], const int maxCount)
     { return FindSwings(tf, true, out, t, maxCount); }
   int               SwingLows(const ENUM_TIMEFRAMES tf, double &out[], datetime &t[], const int maxCount)
     { return FindSwings(tf, false, out, t, maxCount); }
  };

//+------------------------------------------------------------------+
//| CLiquidity - equal highs / equal lows (liquidity pools)          |
//+------------------------------------------------------------------+
class CLiquidity
  {
private:
   string            m_symbol;
   double            m_tol;   // price tolerance
public:
   void              Init(const string sym, const double tolPrice)
     { m_symbol = sym; m_tol = tolPrice; }

   //--- returns an "equal-highs" liquidity level near the top of structure, if any
   bool              EqualHighLevel(CSwingStructure &s, const ENUM_TIMEFRAMES tf, double &level)
     {
      double sh[16]; datetime th[16];
      int n = s.SwingHighs(tf, sh, th, 16);
      for(int i = 0; i < n - 1; i++)
         for(int j = i + 1; j < n; j++)
            if(MathAbs(sh[i] - sh[j]) <= m_tol)
              { level = MathMax(sh[i], sh[j]); return true; }
      return false;
     }
   bool              EqualLowLevel(CSwingStructure &s, const ENUM_TIMEFRAMES tf, double &level)
     {
      double sl[16]; datetime tl[16];
      int n = s.SwingLows(tf, sl, tl, 16);
      for(int i = 0; i < n - 1; i++)
         for(int j = i + 1; j < n; j++)
            if(MathAbs(sl[i] - sl[j]) <= m_tol)
              { level = MathMin(sl[i], sl[j]); return true; }
      return false;
     }
  };

//+------------------------------------------------------------------+
//| CSignalEngine - breakout -> retest -> confirm state machine      |
//+------------------------------------------------------------------+
class CSignalEngine
  {
private:
   string            m_symbol;
   ENUM_TIMEFRAMES   m_entryTF;        // timeframe setups are evaluated on
   double            m_retestTol;      // price
   double            m_confirmRatio;
   ESetupState       m_state;
   int               m_dir;            // pending setup direction (+1/-1)
   double            m_brokenLevel;    // level that was broken then retested

   //--- strong close: body dominates the candle range and closes in trade direction
   bool              IsConfirmCandle(const int dir, const double o, const double h,
                                     const double l, const double c)
     {
      double range = h - l;
      if(range <= 0.0) return false;
      double body  = MathAbs(c - o);
      if(body / range < m_confirmRatio) return false;
      if(dir > 0) return (c > o && c > m_brokenLevel);
      return (c < o && c < m_brokenLevel);
     }

public:
   void              Init(const string sym, const ENUM_TIMEFRAMES entryTF,
                          const double retestTolPrice, const double confirmRatio)
     {
      m_symbol       = sym;
      m_entryTF      = entryTF;
      m_retestTol    = retestTolPrice;
      m_confirmRatio = MathMax(0.0, MathMin(1.0, confirmRatio));
      Reset();
     }
   void              Reset() { m_state = SETUP_IDLE; m_dir = 0; m_brokenLevel = 0.0; }
   ESetupState       State() const { return m_state; }

   //--- evaluate on the just-closed entry bar (shift 1). Returns a signal when confirmed.
   SSignal           Evaluate(CSwingStructure &s, CLiquidity &liq, const ETrend htfTrend)
     {
      SSignal sig; sig.Reset();

      //--- OHLC of the last closed entry-timeframe bar
      double o = iOpen (m_symbol, m_entryTF, 1);
      double h = iHigh (m_symbol, m_entryTF, 1);
      double l = iLow  (m_symbol, m_entryTF, 1);
      double c = iClose(m_symbol, m_entryTF, 1);
      if(o == 0.0 || c == 0.0) return sig;

      //--- structure reference levels on the entry timeframe
      double resistance = 0.0, support = 0.0, swingLow = 0.0, swingHigh = 0.0;
      bool haveR = s.GetLastSwingHigh(m_entryTF, resistance);
      bool haveS = s.GetLastSwingLow (m_entryTF, support);
      swingLow  = support;      // protective swing for buys
      swingHigh = resistance;   // protective swing for sells

      //--- prefer a liquidity pool (equal highs/lows) as the breakout reference:
      //    breaking equal highs/lows is a liquidity sweep, a higher-quality trigger.
      double liqLevel = 0.0;
      if(liq.EqualHighLevel(s, m_entryTF, liqLevel) && liqLevel >= resistance) resistance = liqLevel;
      if(liq.EqualLowLevel (s, m_entryTF, liqLevel) && liqLevel <= support)    support    = liqLevel;

      //--- trend flip invalidates any pending setup
      if((m_dir > 0 && htfTrend != TREND_BULL) || (m_dir < 0 && htfTrend != TREND_BEAR))
         Reset();

      //====================== BULLISH branch ======================
      if(htfTrend == TREND_BULL && haveR && haveS)
        {
         switch(m_state)
           {
            case SETUP_IDLE:
               // Breakout: strong close ABOVE resistance (not just a wick)
               if(c > resistance && c > o)
                 { m_state = SETUP_BREAKOUT; m_dir = 1; m_brokenLevel = resistance; }
               break;

            case SETUP_BREAKOUT:
               // Fake-breakout filter: a close back below the level invalidates
               if(c < m_brokenLevel) { Reset(); break; }
               // Retest: price dips back to the broken level but holds above on close
               if(l <= m_brokenLevel + m_retestTol && c >= m_brokenLevel)
                  m_state = SETUP_RETEST;
               break;

            case SETUP_RETEST:
               if(c < m_brokenLevel) { Reset(); break; }   // structure lost
               if(IsConfirmCandle(1, o, h, l, c))
                 {
                  sig.valid = true; sig.direction = 1;
                  sig.refLevel = m_brokenLevel; sig.swingSL = swingLow;
                  Reset();
                 }
               break;
           }
        }
      //====================== BEARISH branch ======================
      else if(htfTrend == TREND_BEAR && haveR && haveS)
        {
         switch(m_state)
           {
            case SETUP_IDLE:
               if(c < support && c < o)
                 { m_state = SETUP_BREAKOUT; m_dir = -1; m_brokenLevel = support; }
               break;

            case SETUP_BREAKOUT:
               if(c > m_brokenLevel) { Reset(); break; }
               if(h >= m_brokenLevel - m_retestTol && c <= m_brokenLevel)
                  m_state = SETUP_RETEST;
               break;

            case SETUP_RETEST:
               if(c > m_brokenLevel) { Reset(); break; }
               if(IsConfirmCandle(-1, o, h, l, c))
                 {
                  sig.valid = true; sig.direction = -1;
                  sig.refLevel = m_brokenLevel; sig.swingSL = swingHigh;
                  Reset();
                 }
               break;
           }
        }
      else
        {
         if(htfTrend == TREND_RANGE) Reset();
        }

      return sig;
     }
  };

//+------------------------------------------------------------------+
//| CRiskManager - sizing, daily caps, streak-based dynamic risk     |
//+------------------------------------------------------------------+
class CRiskManager
  {
private:
   string            m_symbol;
   double            m_baseRisk;
   double            m_reducedRisk;
   int               m_lossesToReduce;
   double            m_dailyMaxLoss;
   int               m_maxTrades;

   int               m_dayOfYear;      // for daily reset
   double            m_dailyRealized;  // realized P/L today (account ccy)
   int               m_tradesToday;
   int               m_consecLosses;
   double            m_currentRisk;

   int               DayNumber()
     {
      MqlDateTime dt; TimeToStruct(TimeCurrent(), dt);
      return dt.day_of_year * 10000 + dt.year;   // unique per calendar day
     }

public:
   void              Init(const string sym, const double baseRisk, const double reducedRisk,
                          const int lossesToReduce, const double dailyMaxLoss, const int maxTrades)
     {
      m_symbol         = sym;
      m_baseRisk       = baseRisk;
      m_reducedRisk    = reducedRisk;
      m_lossesToReduce = (int)MathMax(1, lossesToReduce);
      m_dailyMaxLoss   = dailyMaxLoss;
      m_maxTrades      = maxTrades;
      m_dayOfYear      = DayNumber();
      m_dailyRealized  = 0.0;
      m_tradesToday    = 0;
      m_consecLosses   = 0;
      m_currentRisk    = baseRisk;
     }

   //--- reset counters when the server date rolls over
   void              CheckNewDay()
     {
      int d = DayNumber();
      if(d != m_dayOfYear)
        {
         m_dayOfYear     = d;
         m_dailyRealized = 0.0;
         m_tradesToday   = 0;
         // streak & current risk intentionally persist across days
        }
     }

   //--- called from OnTradeTransaction when a position is opened
   void              OnPositionOpened() { m_tradesToday++; }

   //--- accumulate any deal's net cash flow (profit/swap/commission) into daily P/L,
   //    so the daily-loss cap also captures entry-side commissions.
   void              AddRealized(const double net) { m_dailyRealized += net; }

   //--- update the win/loss streak on a position-closing deal
   void              OnTradeResult(const double net)
     {
      if(net < 0.0)
        {
         m_consecLosses++;
         if(m_consecLosses >= m_lossesToReduce) m_currentRisk = m_reducedRisk;
        }
      else if(net > 0.0)
        {
         m_consecLosses = 0;
         m_currentRisk  = m_baseRisk;   // one win restores full risk
        }
     }

   double            CurrentRisk()   const { return m_currentRisk; }
   double            DailyRealized() const { return m_dailyRealized; }
   int               TradesToday()   const { return m_tradesToday; }

   //--- gate: are we allowed to open a new trade right now?
   bool              CanTrade(string &reason)
     {
      if(m_dailyRealized <= -MathAbs(m_dailyMaxLoss))
        { reason = "Daily max loss reached"; return false; }
      if(m_tradesToday >= m_maxTrades)
        { reason = "Max trades/day reached"; return false; }
      return true;
     }

   //--- position size from money-risk and SL distance (price units)
   double            CalcLots(const double slDistancePrice)
     {
      if(slDistancePrice <= 0.0) return 0.0;
      double balance   = AccountInfoDouble(ACCOUNT_BALANCE);
      double riskMoney = balance * m_currentRisk / 100.0;

      double tickValue = SymbolInfoDouble(m_symbol, SYMBOL_TRADE_TICK_VALUE);
      double tickSize  = SymbolInfoDouble(m_symbol, SYMBOL_TRADE_TICK_SIZE);
      if(tickValue <= 0.0 || tickSize <= 0.0) return 0.0;

      double lossPerLot = (slDistancePrice / tickSize) * tickValue;
      if(lossPerLot <= 0.0) return 0.0;

      double lots = riskMoney / lossPerLot;

      //--- normalize to broker constraints
      double minLot = SymbolInfoDouble(m_symbol, SYMBOL_VOLUME_MIN);
      double maxLot = SymbolInfoDouble(m_symbol, SYMBOL_VOLUME_MAX);
      double step   = SymbolInfoDouble(m_symbol, SYMBOL_VOLUME_STEP);
      if(step <= 0.0) step = 0.01;

      lots = MathFloor(lots / step) * step;
      if(lots < minLot) lots = 0.0;          // too small to risk-comply -> skip
      if(lots > maxLot) lots = maxLot;

      return NormalizeDouble(lots, 2);
     }
  };

//+------------------------------------------------------------------+
//| CFilters - spread, sessions, news placeholder                    |
//+------------------------------------------------------------------+
class CFilters
  {
private:
   string            m_symbol;
public:
   void              Init(const string sym) { m_symbol = sym; }

   bool              SpreadOK()
     {
      long spread = SymbolInfoInteger(m_symbol, SYMBOL_SPREAD);
      return (spread <= InpMaxSpreadPoints);
     }

   bool              SessionOK()
     {
      if(!InpUseSessionFilter) return true;
      MqlDateTime dt; TimeToStruct(TimeCurrent(), dt);
      int hour = dt.hour;
      bool london  = (hour >= InpLondonStartHour  && hour < InpLondonEndHour);
      bool newyork = (hour >= InpNewYorkStartHour && hour < InpNewYorkEndHour);
      return (london || newyork);
     }

   //--- News blackout placeholder. Wired into the entry gate but inert by default.
   //    To enable, set InpUseNewsFilter=true and implement using MT5's economic
   //    calendar (CalendarValueHistory / CalendarValueLast). Kept off so the EA
   //    never fails in the Strategy Tester on builds without calendar data.
   bool              IsNewsBlackout()
     {
      if(!InpUseNewsFilter) return false;
      /*
         MqlCalendarValue values[];
         datetime from = TimeCurrent() - InpNewsBufferMinutes*60;
         datetime to   = TimeCurrent() + InpNewsBufferMinutes*60;
         if(CalendarValueHistory(values, from, to, NULL, m_symbol))
           {
            for(int i=0;i<ArraySize(values);i++)
              {
               MqlCalendarEvent ev;
               if(CalendarEventById(values[i].event_id, ev) &&
                  ev.importance == CALENDAR_IMPORTANCE_HIGH)
                  return true;
              }
           }
      */
      return false;
     }

   bool              AllOK(string &reason)
     {
      if(!SpreadOK())      { reason = "Spread too high";     return false; }
      if(!SessionOK())     { reason = "Outside session";     return false; }
      if(IsNewsBlackout()) { reason = "News blackout";       return false; }
      return true;
     }
  };

//+------------------------------------------------------------------+
//| CTradeExecutor - order placement, SL/TP, trailing                |
//+------------------------------------------------------------------+
class CTradeExecutor
  {
private:
   string            m_symbol;
   int               m_digits;
   double            m_point;
   double            m_lastRiskDist;   // price distance of last entry's initial risk (R)

   double            NormPrice(const double p) { return NormalizeDouble(p, m_digits); }

   //--- ensure a stop respects the broker's minimum stop distance
   double            EnforceStops(const double price, const double stop, const bool isSL, const int dir)
     {
      double minDist = (double)SymbolInfoInteger(m_symbol, SYMBOL_TRADE_STOPS_LEVEL) * m_point;
      if(minDist <= 0.0) return stop;
      double s = stop;
      if(dir > 0) // buy: SL below, TP above
        {
         if(isSL && (price - s) < minDist) s = price - minDist;
         if(!isSL && (s - price) < minDist) s = price + minDist;
        }
      else        // sell: SL above, TP below
        {
         if(isSL && (s - price) < minDist) s = price + minDist;
         if(!isSL && (price - s) < minDist) s = price - minDist;
        }
      return NormPrice(s);
     }

public:
   void              Init(const string sym)
     {
      m_symbol       = sym;
      m_digits       = (int)SymbolInfoInteger(sym, SYMBOL_DIGITS);
      m_point        = SymbolInfoDouble(sym, SYMBOL_POINT);
      m_lastRiskDist = 0.0;
      g_trade.SetExpertMagicNumber(InpMagicNumber);
      g_trade.SetDeviationInPoints(InpMaxSlippagePoints);
      g_trade.SetTypeFillingBySymbol(sym);
     }

   double            LastRiskDist() const { return m_lastRiskDist; }

   //--- open a trade from a signal; sizing done by the risk manager
   bool              OpenFromSignal(const SSignal &sig, CRiskManager &risk)
     {
      double ask = SymbolInfoDouble(m_symbol, SYMBOL_ASK);
      double bid = SymbolInfoDouble(m_symbol, SYMBOL_BID);
      double buffer = InpSL_BufferPoints * m_point;

      double entry, sl, tp, slDist;
      if(sig.direction > 0)
        {
         entry  = ask;
         sl     = sig.swingSL - buffer;
         slDist = entry - sl;
         if(slDist <= 0.0) { PrintFormat("Reject BUY: non-positive SL distance"); return false; }
         tp     = entry + InpMinRR * slDist;
         sl     = EnforceStops(entry, sl, true,  1);
         tp     = EnforceStops(entry, tp, false, 1);
        }
      else
        {
         entry  = bid;
         sl     = sig.swingSL + buffer;
         slDist = sl - entry;
         if(slDist <= 0.0) { PrintFormat("Reject SELL: non-positive SL distance"); return false; }
         tp     = entry - InpMinRR * slDist;
         sl     = EnforceStops(entry, sl, true,  -1);
         tp     = EnforceStops(entry, tp, false, -1);
        }

      double lots = risk.CalcLots(slDist);
      if(lots <= 0.0) { PrintFormat("Reject: lot size 0 (risk too small for min lot)"); return false; }

      bool ok;
      if(sig.direction > 0)
         ok = g_trade.Buy (lots, m_symbol, 0.0, sl, tp, "StructScalper BUY");
      else
         ok = g_trade.Sell(lots, m_symbol, 0.0, sl, tp, "StructScalper SELL");

      if(!ok)
        {
         PrintFormat("OrderSend failed: retcode=%d (%s)", g_trade.ResultRetcode(),
                     g_trade.ResultRetcodeDescription());
         return false;
        }

      m_lastRiskDist = slDist;
      PrintFormat("OPEN %s lots=%.2f entry=%.*f SL=%.*f TP=%.*f R=%.*f",
                  (sig.direction > 0 ? "BUY" : "SELL"), lots,
                  m_digits, entry, m_digits, sl, m_digits, tp, m_digits, slDist);
      return true;
     }

   //--- trailing stop: after +TrailStartR, lock >= breakeven then trail by R
   void              ManageTrailing()
     {
      if(!InpUseTrailingStop) return;
      if(m_lastRiskDist <= 0.0) return;

      for(int i = PositionsTotal() - 1; i >= 0; i--)
        {
         if(!g_pos.SelectByIndex(i)) continue;
         if(g_pos.Symbol() != m_symbol) continue;
         if(g_pos.Magic()  != InpMagicNumber) continue;

         double open   = g_pos.PriceOpen();
         double curSL  = g_pos.StopLoss();
         double R      = m_lastRiskDist;
         bool   isBuy  = (g_pos.PositionType() == POSITION_TYPE_BUY);
         double bid    = SymbolInfoDouble(m_symbol, SYMBOL_BID);
         double ask    = SymbolInfoDouble(m_symbol, SYMBOL_ASK);
         double profit = isBuy ? (bid - open) : (open - ask);

         if(profit < InpTrailStartR * R) continue;

         double newSL;
         if(isBuy)
           {
            newSL = bid - R;
            if(newSL < open) newSL = open;            // never worse than breakeven
            newSL = NormPrice(newSL);
            if(curSL <= 0.0 || newSL > curSL)
               g_trade.PositionModify(g_pos.Ticket(), newSL, g_pos.TakeProfit());
           }
         else
           {
            newSL = ask + R;
            if(newSL > open) newSL = open;
            newSL = NormPrice(newSL);
            if(curSL <= 0.0 || newSL < curSL)
               g_trade.PositionModify(g_pos.Ticket(), newSL, g_pos.TakeProfit());
           }
        }
     }

   //--- is there an open position for this EA on this symbol?
   bool              HasOpenPosition()
     {
      for(int i = PositionsTotal() - 1; i >= 0; i--)
        {
         if(!g_pos.SelectByIndex(i)) continue;
         if(g_pos.Symbol() == m_symbol && g_pos.Magic() == InpMagicNumber)
            return true;
        }
      return false;
     }
  };

//+------------------------------------------------------------------+
//| CDashboard - on-chart status panel                               |
//+------------------------------------------------------------------+
class CDashboard
  {
private:
   string            m_prefix;
   int               m_x, m_y;
   int               m_rowH;

   void              Row(const int idx, const string text, const color clr)
     {
      string name = m_prefix + "row" + (string)idx;
      if(ObjectFind(0, name) < 0)
        {
         ObjectCreate(0, name, OBJ_LABEL, 0, 0, 0);
         ObjectSetInteger(0, name, OBJPROP_CORNER, CORNER_LEFT_UPPER);
         ObjectSetInteger(0, name, OBJPROP_XDISTANCE, m_x + 8);
         ObjectSetInteger(0, name, OBJPROP_YDISTANCE, m_y + 8 + idx * m_rowH);
         ObjectSetInteger(0, name, OBJPROP_FONTSIZE, 9);
         ObjectSetString (0, name, OBJPROP_FONT, "Consolas");
         ObjectSetInteger(0, name, OBJPROP_SELECTABLE, false);
         ObjectSetInteger(0, name, OBJPROP_HIDDEN, true);
        }
      ObjectSetString (0, name, OBJPROP_TEXT, text);
      ObjectSetInteger(0, name, OBJPROP_COLOR, clr);
     }

public:
   void              Init(const int x, const int y)
     {
      m_prefix = "SS_DASH_";
      m_x = x; m_y = y; m_rowH = 18;
      if(!InpShowDashboard) return;

      string bg = m_prefix + "bg";
      if(ObjectFind(0, bg) < 0)
        {
         ObjectCreate(0, bg, OBJ_RECTANGLE_LABEL, 0, 0, 0);
         ObjectSetInteger(0, bg, OBJPROP_CORNER, CORNER_LEFT_UPPER);
         ObjectSetInteger(0, bg, OBJPROP_XDISTANCE, m_x);
         ObjectSetInteger(0, bg, OBJPROP_YDISTANCE, m_y);
         ObjectSetInteger(0, bg, OBJPROP_XSIZE, 260);
         ObjectSetInteger(0, bg, OBJPROP_YSIZE, 8 + 8 * m_rowH);
         ObjectSetInteger(0, bg, OBJPROP_BGCOLOR, C'20,24,32');
         ObjectSetInteger(0, bg, OBJPROP_BORDER_TYPE, BORDER_FLAT);
         ObjectSetInteger(0, bg, OBJPROP_COLOR, C'60,70,90');
         ObjectSetInteger(0, bg, OBJPROP_SELECTABLE, false);
         ObjectSetInteger(0, bg, OBJPROP_HIDDEN, true);
        }
     }

   void              Update(const ETrend trend, const double riskPct, const double dailyLoss,
                            const double dailyCap, const int trades, const int maxTrades,
                            const long spread, const bool sessionOK, const bool hasPos)
     {
      if(!InpShowDashboard) return;

      color cTrend = (trend == TREND_BULL) ? clrLime : (trend == TREND_BEAR ? clrTomato : clrSilver);
      string sTrend = (trend == TREND_BULL) ? "BULLISH" : (trend == TREND_BEAR ? "BEARISH" : "RANGE");

      double lossShown = (dailyLoss < 0.0) ? -dailyLoss : 0.0;
      color cLoss = (lossShown >= dailyCap * 0.75) ? clrTomato :
                    (lossShown >= dailyCap * 0.4 ? clrOrange : clrSilver);

      Row(0, "  STRUCTURE SCALPER  |  " + _Symbol, clrWhite);
      Row(1, "  Trend (" + g_trendName + ")  : " + sTrend, cTrend);
      Row(2, "  Risk / trade : " + DoubleToString(riskPct, 2) + " %", clrGold);
      Row(3, "  Daily loss   : -" + DoubleToString(lossShown, 2) + " / " + DoubleToString(dailyCap, 2),
             cLoss);
      Row(4, "  Trades today : " + (string)trades + " / " + (string)maxTrades, clrSilver);
      Row(5, "  Spread (pts) : " + (string)spread, (spread <= InpMaxSpreadPoints ? clrSilver : clrTomato));
      Row(6, "  Session      : " + (sessionOK ? "OPEN" : "CLOSED"),
             (sessionOK ? clrLime : clrSilver));
      Row(7, "  Position     : " + (hasPos ? "IN TRADE" : "FLAT"),
             (hasPos ? clrAqua : clrSilver));
     }

   void              Destroy() { ObjectsDeleteAll(0, m_prefix); }
  };

//+------------------------------------------------------------------+
//| MODULE INSTANCES                                                 |
//+------------------------------------------------------------------+
CSwingStructure g_struct;
CLiquidity      g_liq;
CSignalEngine   g_signal;
CRiskManager    g_risk;
CFilters        g_filter;
CTradeExecutor  g_exec;
CDashboard      g_dash;

datetime        g_lastBarTime = 0;    // entry-timeframe new-bar detection

//+------------------------------------------------------------------+
//| Helpers                                                          |
//+------------------------------------------------------------------+
//--- short timeframe name for the dashboard, e.g. PERIOD_M15 -> "M15"
string TFName(const ENUM_TIMEFRAMES tf)
  {
   string s = EnumToString(tf);
   StringReplace(s, "PERIOD_", "");
   return s;
  }

//--- true once per completed entry-timeframe bar
bool IsNewEntryBar()
  {
   datetime t = iTime(_Symbol, InpEntryTF, 0);
   if(t != g_lastBarTime) { g_lastBarTime = t; return true; }
   return false;
  }

//+------------------------------------------------------------------+
//| OnInit                                                           |
//+------------------------------------------------------------------+
int OnInit()
  {
   //--- validate inputs
   if(InpRiskPercent <= 0.0 || InpReducedRiskPercent <= 0.0)
     { Print("Invalid risk percent inputs"); return INIT_PARAMETERS_INCORRECT; }
   if(InpMinRR < 1.0)
     { Print("MinRR should be >= 1.0"); return INIT_PARAMETERS_INCORRECT; }

   double point = SymbolInfoDouble(_Symbol, SYMBOL_POINT);

   g_struct.Init(_Symbol, InpSwingLookback, InpStructureDepthBars);
   g_liq.Init(_Symbol, InpEqualLevelTolPoints * point);
   g_signal.Init(_Symbol, InpEntryTF, InpRetestTolPoints * point, InpConfirmBodyRatio);
   g_risk.Init(_Symbol, InpRiskPercent, InpReducedRiskPercent, InpLossesToReduce,
               InpDailyMaxLoss, InpMaxTradesPerDay);
   g_filter.Init(_Symbol);
   g_exec.Init(_Symbol);
   g_dash.Init(InpPanelX, InpPanelY);

   g_trendName   = TFName(InpTrendTF);
   g_lastBarTime = iTime(_Symbol, InpEntryTF, 0);

   Print("XAU_StructureScalper initialized on ", _Symbol,
         " | Entry=", TFName(InpEntryTF), " Trend=", TFName(InpTrendTF),
         " | Magic=", InpMagicNumber);
   return INIT_SUCCEEDED;
  }

//+------------------------------------------------------------------+
//| OnDeinit                                                         |
//+------------------------------------------------------------------+
void OnDeinit(const int reason)
  {
   g_dash.Destroy();
   ChartRedraw(0);
  }

//+------------------------------------------------------------------+
//| OnTick                                                           |
//+------------------------------------------------------------------+
void OnTick()
  {
   g_risk.CheckNewDay();

   //--- trailing runs every tick
   g_exec.ManageTrailing();

   //--- current higher-timeframe trend (also used by dashboard)
   ETrend htfTrend = g_struct.GetTrend(InpTrendTF);

   //--- refresh dashboard every tick
   bool sessionOK = g_filter.SessionOK();
   bool hasPos    = g_exec.HasOpenPosition();
   long spread    = SymbolInfoInteger(_Symbol, SYMBOL_SPREAD);
   g_dash.Update(htfTrend, g_risk.CurrentRisk(), g_risk.DailyRealized(),
                 InpDailyMaxLoss, g_risk.TradesToday(), InpMaxTradesPerDay,
                 spread, sessionOK, hasPos);

   //--- signal logic only on a new closed entry-timeframe bar (deterministic / tester-safe)
   if(!IsNewEntryBar()) return;

   //--- need enough history to classify structure
   if(Bars(_Symbol, InpEntryTF) < InpStructureDepthBars + 5) return;
   if(Bars(_Symbol, InpTrendTF) < 60) return;

   //--- evaluate the setup state machine
   SSignal sig = g_signal.Evaluate(g_struct, g_liq, htfTrend);
   if(!sig.valid) return;

   //--- gates before any entry
   if(InpOnlyOneOpenTrade && hasPos) return;

   string reason = "";
   if(!g_risk.CanTrade(reason)) { PrintFormat("Blocked (%s)", reason); return; }
   if(!g_filter.AllOK(reason))  { PrintFormat("Filtered (%s)", reason); return; }

   //--- execute
   g_exec.OpenFromSignal(sig, g_risk);
  }

//+------------------------------------------------------------------+
//| OnTradeTransaction - track opens, closes, streaks, daily P/L     |
//+------------------------------------------------------------------+
void OnTradeTransaction(const MqlTradeTransaction &trans,
                        const MqlTradeRequest     &request,
                        const MqlTradeResult      &result)
  {
   if(trans.type != TRADE_TRANSACTION_DEAL_ADD) return;
   if(trans.deal == 0) return;

   if(!HistoryDealSelect(trans.deal)) return;

   long   dealMagic = (long)HistoryDealGetInteger(trans.deal, DEAL_MAGIC);
   string dealSym   = HistoryDealGetString (trans.deal, DEAL_SYMBOL);
   if(dealMagic != InpMagicNumber || dealSym != _Symbol) return;

   long entry = (long)HistoryDealGetInteger(trans.deal, DEAL_ENTRY);

   //--- net cash flow of THIS deal (entry or exit): profit + swap + commission
   double dealNet = HistoryDealGetDouble(trans.deal, DEAL_PROFIT)
                  + HistoryDealGetDouble(trans.deal, DEAL_SWAP)
                  + HistoryDealGetDouble(trans.deal, DEAL_COMMISSION);
   g_risk.AddRealized(dealNet);   // feeds the daily-loss cap (incl. entry commission)

   if(entry == DEAL_ENTRY_IN)
     {
      g_risk.OnPositionOpened();
     }
   else if(entry == DEAL_ENTRY_OUT || entry == DEAL_ENTRY_OUT_BY)
     {
      g_risk.OnTradeResult(dealNet);   // win/loss streak on the closing deal
      PrintFormat("CLOSED deal net=%.2f | risk=%.2f%% dailyPL=%.2f",
                  dealNet, g_risk.CurrentRisk(), g_risk.DailyRealized());
     }
  }
//+------------------------------------------------------------------+
