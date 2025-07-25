import React from 'react'
import { cn } from '@utils/cn'

/**
 * Container component for consistent page layout
 * @param {object} props - Component props
 * @param {string} props.size - Container size (sm, md, lg, xl, full)
 * @param {boolean} props.padding - Whether to include padding
 * @param {string} props.className - Additional CSS classes
 * @returns {React.Component} Container component
 */
const Container = React.forwardRef(({
  size = 'lg',
  padding = true,
  className,
  children,
  ...props
}, ref) => {
  const sizes = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full'
  }

  return (
    <div
      ref={ref}
      className={cn(
        'mx-auto',
        sizes[size],
        padding && 'px-4 sm:px-6 lg:px-8',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})

Container.displayName = 'Container'

export default Container

// Example usage:
// <Container size="md">
//   <h1>Page content</h1>
// </Container>
// 
// <Container size="full" padding={false}>
//   <div className="custom-spacing">Full width content</div>
// </Container>
