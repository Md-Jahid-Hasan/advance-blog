import type React from "react"

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export default function TextArea({ className = "", ...props }: TextAreaProps) {
  return <textarea className={`form-control ${className}`} {...props} />
}

