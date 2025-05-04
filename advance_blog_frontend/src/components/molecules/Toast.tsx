"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"

export type ToastType = "success" | "error" | "warning" | "info"

interface ToastProps {
  message: string
  type: ToastType
  duration?: number
  onClose: () => void
}

export default function Toast({ message, type, duration = 5000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    // Create portal element if it doesn't exist
    let element = document.getElementById("toast-container")
    if (!element) {
      element = document.createElement("div")
      element.id = "toast-container"
      element.className = "position-fixed top-0 end-0 p-3"
      element.style.zIndex = "1050"
      document.body.appendChild(element)
    }
    setPortalElement(element)

    // Set timeout to hide the toast
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300) // Wait for fade out animation
    }, duration)

    return () => {
      clearTimeout(timer)
    }
  }, [duration, onClose])

  if (!portalElement) return null

  const getToastClass = () => {
    switch (type) {
      case "success":
        return "bg-success text-white"
      case "error":
        return "bg-danger text-white"
      case "warning":
        return "bg-warning text-dark"
      case "info":
        return "bg-info text-dark"
      default:
        return "bg-light text-dark"
    }
  }

  const getToastIcon = () => {
    switch (type) {
      case "success":
        return "bi-check-circle-fill"
      case "error":
        return "bi-exclamation-circle-fill"
      case "warning":
        return "bi-exclamation-triangle-fill"
      case "info":
        return "bi-info-circle-fill"
      default:
        return "bi-bell-fill"
    }
  }

  return createPortal(
    <div
      className={`toast ${isVisible ? "show" : ""} ${getToastClass()}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style={{
        transition: "opacity 0.3s ease",
        opacity: isVisible ? 1 : 0,
      }}
    >
      <div className="toast-header">
        <i className={`bi ${getToastIcon()} me-2`}></i>
        <strong className="me-auto">{type.charAt(0).toUpperCase() + type.slice(1)}</strong>
        <small>Just now</small>
        <button
          type="button"
          className="btn-close"
          onClick={() => {
            setIsVisible(false)
            setTimeout(onClose, 300)
          }}
          aria-label="Close"
        ></button>
      </div>
      <div className="toast-body">{message}</div>
    </div>,
    portalElement,
  )
}
