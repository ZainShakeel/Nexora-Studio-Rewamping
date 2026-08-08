import { Link } from 'react-router-dom'

const base =
  'inline-flex items-center justify-center gap-2 rounded-md text-sm font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed'

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3',
  lg: 'px-8 py-4 text-base',
}

const variants = {
  primary: 'bg-brand text-white shadow-soft hover:bg-brand-dark hover:shadow-card-hover',
  secondary: 'bg-navy text-white hover:bg-navy-800',
  outline: 'border border-brand text-brand bg-transparent hover:bg-brand hover:text-white',
  white: 'bg-white text-navy hover:bg-surface',
  ghostWhite:
    'border border-white/40 text-white bg-transparent hover:bg-white hover:text-navy',
}

/**
 * Unified button. Renders as <Link>, <a> (for tel:/mailto:/external), or <button>.
 */
export default function Button({
  children,
  to,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  external = false,
  ...rest
}) {
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...rest}>
      {children}
    </button>
  )
}
