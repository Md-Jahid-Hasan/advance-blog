"use client"
import 'quill/dist/quill.snow.css'; 
import { useEffect, useRef, useState } from "react"
import SimpleEditor from "./SimpleEditor"

interface QuillEditorProps {
  value: string
  onChange: (value: string) => void
}

export default function QuillEditor({ value, onChange }: QuillEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const quillInstanceRef = useRef<any>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [isQuillLoaded, setIsQuillLoaded] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const contentChangeRef = useRef(false)

  useEffect(() => {
    setIsMounted(true)
    return () => {
      // Clean up Quill instance on unmount
      if (quillInstanceRef.current) {
        quillInstanceRef.current = null
      }
    }
  }, [])

  // Initialize Quill only once when component mounts
  useEffect(() => {
    if (!isMounted || isQuillLoaded || !editorRef.current) return

    // Import Quill and its styles only on the client side
    const loadQuill = async () => {
      try {
        // Load Quill CSS first to ensure styles are available
        if (!document.getElementById("quill-snow-css")) {
          const styleLink = document.createElement("link")
          styleLink.rel = "stylesheet"
          styleLink.id = "quill-snow-css"
          styleLink.href = "https://cdn.jsdelivr.net/npm/quill@1.3.7/dist/quill.snow.css"
          document.head.appendChild(styleLink)
        }

        // Use a more reliable way to import Quill
        const QuillModule = await import("quill")
        const Quill = QuillModule.default || QuillModule

        if (!editorRef.current) return

        // Initialize Quill with more formatting options including alignment
        const quill = new Quill(editorRef.current, {
          theme: "snow",
          modules: {
            toolbar: [
              [{ header: [1, 2, 3, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ color: [] }, { background: [] }],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ align: ["", "center", "right", "justify"] }], // Add alignment options
              ["blockquote", "code-block"],
              ["link"],
              ["clean"],
            ],
          },
          placeholder: "Write your blog content here...",
        })

        // Set initial content
        if (value) {
          quill.clipboard.dangerouslyPasteHTML(value)
        }

        // Handle content changes
        quill.on("text-change", () => {
          if (contentChangeRef.current) return

          contentChangeRef.current = true
          const html = quill.root.innerHTML
          onChange(html)
          setTimeout(() => {
            contentChangeRef.current = false
          }, 0)
        })

        // Save the Quill instance
        quillInstanceRef.current = quill
        setIsQuillLoaded(true)
      } catch (error) {
        console.error("Error loading Quill:", error)
        setLoadError(true)
      }
    }

    loadQuill()
  }, [isMounted, onChange, value])

  // Update content when value prop changes (if not from user input)
  useEffect(() => {
    if (!quillInstanceRef.current || !isQuillLoaded || contentChangeRef.current) return

    const currentContent = quillInstanceRef.current.root.innerHTML
    if (value !== currentContent) {
      contentChangeRef.current = true
      quillInstanceRef.current.clipboard.dangerouslyPasteHTML(value)
      setTimeout(() => {
        contentChangeRef.current = false
      }, 0)
    }
  }, [value, isQuillLoaded])

  // If there was an error loading Quill, fall back to SimpleEditor
  if (loadError) {
    return <SimpleEditor value={value} onChange={onChange} />
  }

  return (
    <div className="quill-editor-container">
      {!isMounted ? (
        <div className="border p-3 bg-light">Loading editor...</div>
      ) : (
        <>
          <div ref={editorRef} style={{ minHeight: "200px" }}></div>
          <div className="mt-2 text-end">
            <small className="text-muted">
              <i className="bi bi-info-circle me-1"></i>
              Tip: Use the alignment buttons to center, right-align, or justify text
            </small>
          </div>
        </>
      )}
    </div>
  )
}
