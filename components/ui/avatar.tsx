import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

// Grey-based gradient colors (shadcn style)
const memojiGradients = [
  "from-slate-600 via-slate-500 to-slate-400",
  "from-zinc-600 via-zinc-500 to-zinc-400",
  "from-neutral-600 via-neutral-500 to-neutral-400",
  "from-stone-600 via-stone-500 to-stone-400",
  "from-gray-600 via-gray-500 to-gray-400",
  "from-slate-700 via-slate-600 to-slate-500",
]

// Generate a consistent gradient based on initials
const getMemojiGradient = (initials: string) => {
  const index = initials.charCodeAt(0) % memojiGradients.length
  return memojiGradients[index]
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-border",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover rounded-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

interface AvatarFallbackProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> {
  children?: React.ReactNode
}

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(({ className, children, ...props }, ref) => {
  const initials = typeof children === 'string' ? children : '?'
  const gradient = getMemojiGradient(initials)
  
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br text-foreground font-semibold text-sm sm:text-base",
        gradient,
        className
      )}
      {...props}
    >
      {children}
    </AvatarPrimitive.Fallback>
  )
})
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }

