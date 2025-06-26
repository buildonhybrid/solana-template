import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

// Custom Slot component that mimics Radix UI Slot behavior
const Slot = React.forwardRef<
  any,
  React.HTMLAttributes<any> & {
    asChild?: boolean
    children?: React.ReactElement
  }
>(({ asChild = false, children, ...props }, ref) => {
  if (!asChild || !React.isValidElement(children)) {
    return <div ref={ref} {...(props as React.HTMLAttributes<HTMLDivElement>)}>{children}</div>
  }

  return React.cloneElement(children, {
    ...props,
    ...(children.props as object),
    ref: ref ? mergeRefs([ref, (children as any).ref]) : (children as any).ref,
  } as any)
})
Slot.displayName = 'Slot'

// Utility function to merge refs
function mergeRefs<T = any>(refs: Array<React.MutableRefObject<T> | React.LegacyRef<T> | null>): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value)
      } else if (ref != null) {
        ;(ref as React.MutableRefObject<T | null>).current = value
      }
    })
  }
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  if (asChild && React.isValidElement(children)) {
    return (
      <Slot 
        data-slot="button" 
        className={cn(buttonVariants({ variant, size, className }))} 
        asChild={asChild}
        {...(props as any)}
      >
        {children}
      </Slot>
    )
  }

  return (
    <button 
      data-slot="button" 
      className={cn(buttonVariants({ variant, size, className }))} 
      {...props}
    >
      {children}
    </button>
  )
}

export { Button, buttonVariants }
