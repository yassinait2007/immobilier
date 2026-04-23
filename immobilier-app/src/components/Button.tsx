import { cn } from "@/lib/utils"
import type React from "react"

type ButtonVariant = "default" | "primary" | "outline" | "secondary" | "ghost" | "link"
type ButtonSize = "default" | "sm" | "lg" | "icon"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: React.ReactNode
}

const buttonVariants = {
  variant: {
    default: "bg-gradient-to-r from-primary to-primary-light text-white shadow-md hover:shadow-lg transition-all duration-300",
    primary: "bg-gradient-to-r from-primary to-primary-light text-white shadow-md hover:shadow-lg transition-all duration-300",
    outline: "border border-gray-300 bg-white hover:bg-gray-50",
    secondary: "bg-secondary text-white hover:bg-secondary/80",
    ghost: "hover:bg-gray-100",
    link: "text-primary underline-offset-4 hover:underline",
  },
  size: {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3 text-sm",
    lg: "h-11 rounded-md px-8 text-lg",
    icon: "h-10 w-10",
  },
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = "default",
  size = "default",
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        buttonVariants.variant[variant],
        buttonVariants.size[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
