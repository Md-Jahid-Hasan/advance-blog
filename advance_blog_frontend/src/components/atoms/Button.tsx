import type React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  // variant?: "primary" | "secondary" | "danger" | "success" | "warning" | "info" | "light" | "dark" | "outline-primary"
  variant?: string
  size?: "sm" | "lg"
}

export default function Button({ children, className = "", variant = "primary", size, ...props }: ButtonProps) {
  const sizeClass = size ? `btn-${size}` : ""

  return (
    <button className={`btn btn-${variant} ${sizeClass} ${className}`} {...props}>
      {children}
    </button>
  )
}

