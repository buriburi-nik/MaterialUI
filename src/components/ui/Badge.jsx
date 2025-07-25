import React from 'react'
import { cn } from '@utils/cn'


const Badge = React.forwardRef(({
  variant = 'default',
  size = 'md',
  removable = false,
  onRemove,
  className,
  children,
  ...props
}, ref) => {
  const baseClasses = 'inline-flex items-center gap-1 font-medium rounded-full'

  const variants = {
    default: 'bg-gray-100 text-gray-800 border border-gray-200',
    secondary: 'bg-gray-800 text-gray-100',
    success: 'bg-green-100 text-green-800 border border-green-200',
    warning: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    error: 'bg-red-100 text-red-800 border border-red-200',
    brand: 'bg-brand-100 text-brand-800 border border-brand-200'
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base'
  }

  return (
    <span
      ref={ref}
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
      {removable && onRemove && (
        <button
          type="button"
          className="w-3 h-3 ml-1 rounded-full hover:bg-black/10 focus:outline-none focus:bg-black/10"
          onClick={onRemove}
          aria-label="Remove"
        >
          <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 8 8">
            <path d="M1.5 1.5l5 5m0-5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </span>
  )
})

Badge.displayName = 'Badge'

export default Badge

