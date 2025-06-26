import * as React from 'react'
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

// Context for dropdown state
const DropdownMenuContext = React.createContext<{
  open: boolean
  setOpen: (open: boolean) => void
  triggerRef: React.RefObject<HTMLElement | null>
  contentRef: React.RefObject<HTMLDivElement | null>
} | null>(null)

// Hook to use dropdown context
function useDropdownMenu() {
  const context = React.useContext(DropdownMenuContext)
  if (!context) {
    throw new Error('DropdownMenu components must be used within DropdownMenu')
  }
  return context
}

// Root component
function DropdownMenu({ children, ...props }: React.ComponentProps<'div'>) {
  const [open, setOpen] = React.useState(false)
  const triggerRef = React.useRef<HTMLElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        open &&
        triggerRef.current &&
        contentRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        !contentRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen, triggerRef, contentRef }}>
      <div {...props}>{children}</div>
    </DropdownMenuContext.Provider>
  )
}

// Trigger component
function DropdownMenuTrigger({ children, ...props }: React.ComponentProps<'button'>) {
  const { setOpen, triggerRef } = useDropdownMenu()

  return (
    <button
      ref={triggerRef as React.RefObject<HTMLButtonElement>}
      onClick={() => setOpen(true)}
      {...props}
    >
      {children}
    </button>
  )
}

// Content component
function DropdownMenuContent({
  className,
  sideOffset = 4,
  children,
  ...props
}: React.ComponentProps<'div'> & { sideOffset?: number }) {
  const { open, setOpen, triggerRef, contentRef } = useDropdownMenu()

  // Position the content relative to trigger
  React.useEffect(() => {
    if (open && triggerRef.current && contentRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect()
      const content = contentRef.current
      
      content.style.position = 'fixed'
      content.style.top = `${triggerRect.bottom + sideOffset}px`
      content.style.left = `${triggerRect.left}px`
      content.style.zIndex = '50'
    }
  }, [open, sideOffset])

  if (!open) return null

  return (
    <div
      ref={contentRef}
      className={cn(
        'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-96 min-w-[8rem] overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md',
        className,
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setOpen(false)
        }
      }}
      {...props}
    >
      {children}
    </div>
  )
}

// Group component
function DropdownMenuGroup({ children, ...props }: React.ComponentProps<'div'>) {
  return <div {...props}>{children}</div>
}

// Item component
function DropdownMenuItem({
  className,
  inset,
  variant = 'default',
  onClick,
  disabled,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  inset?: boolean
  variant?: 'default' | 'destructive'
  disabled?: boolean
}) {
  const { setOpen } = useDropdownMenu()

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return
    onClick?.(e)
    setOpen(false)
  }

  return (
    <div
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      onClick={handleClick}
      style={{ pointerEvents: disabled ? 'none' : 'auto', opacity: disabled ? 0.5 : 1 }}
      {...props}
    >
      {children}
    </div>
  )
}

// Checkbox Item component
function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  onCheckedChange,
  ...props
}: React.ComponentProps<'div'> & {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}) {
  const { setOpen } = useDropdownMenu()

  const handleClick = () => {
    onCheckedChange?.(!checked)
    setOpen(false)
  }

  return (
    <div
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        {checked && <CheckIcon className="size-4" />}
      </span>
      {children}
    </div>
  )
}

// Radio Group component
function DropdownMenuRadioGroup({ children, ...props }: React.ComponentProps<'div'>) {
  return <div {...props}>{children}</div>
}

// Radio Item component
function DropdownMenuRadioItem({
  className,
  children,
  value,
  onValueChange,
  ...props
}: React.ComponentProps<'div'> & {
  value: string
  onValueChange?: (value: string) => void
}) {
  const { setOpen } = useDropdownMenu()

  const handleClick = () => {
    onValueChange?.(value)
    setOpen(false)
  }

  return (
    <div
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <CircleIcon className="size-2 fill-current" />
      </span>
      {children}
    </div>
  )
}

// Label component
function DropdownMenuLabel({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  inset?: boolean
}) {
  return (
    <div
      data-inset={inset}
      className={cn('px-2 py-1.5 text-sm font-medium data-[inset]:pl-8', className)}
      {...props}
    >
      {children}
    </div>
  )
}

// Separator component
function DropdownMenuSeparator({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('bg-border -mx-1 my-1 h-px', className)}
      {...props}
    />
  )
}

// Shortcut component
function DropdownMenuShortcut({ className, children, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn('text-muted-foreground ml-auto text-xs tracking-widest', className)}
      {...props}
    >
      {children}
    </span>
  )
}

// Sub components (simplified implementation)
function DropdownMenuSub({ children, ...props }: React.ComponentProps<'div'>) {
  return <div {...props}>{children}</div>
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  inset?: boolean
}) {
  return (
    <div
      data-inset={inset}
      className={cn(
        'focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8',
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </div>
  )
}

function DropdownMenuSubContent({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-lg',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Portal component (simplified - renders in place)
function DropdownMenuPortal({ children, ...props }: React.ComponentProps<'div'>) {
  return <div {...props}>{children}</div>
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}
