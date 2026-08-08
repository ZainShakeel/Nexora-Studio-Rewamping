@echo off
REM ============================================================
REM  Nexora Studio -> push to GitHub
REM  Just double-click this file. A browser window will open
REM  the first time -> log in to GitHub (ZainShakeel) & Authorize.
REM ============================================================
cd /d "%~dp0"
echo Pushing Nexora Studio to GitHub...
echo.
"C:\Users\Zain ul Abideen\AppData\Local\Programs\Git\cmd\git.exe" push -u origin main
echo.
echo ============================================================
echo  If it says "Everything up-to-date" or lists your files,
echo  the push worked. You can now connect the repo in Cloudflare.
echo.
echo  If it says "rejected / non-fast-forward", run this instead:
echo     git push -u origin main --force
echo ============================================================
pause
