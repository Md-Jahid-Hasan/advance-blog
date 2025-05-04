"use client"

import type React from "react"
import { useRef, useState } from "react"
import Button from "../atoms/Button"
import { useToast } from "../context/ToastContext"

interface ImageUploaderProps {
  images: string[]
  onChange: (images: string[], files: File[]) => void
}

export default function ImageUploader({ images, onChange }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<File[]>([])
  const [dragActive, setDragActive] = useState<boolean>(false)
  const { showToast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    if (selectedFiles.length === 0) return

    processFiles(selectedFiles)
  }

  const processFiles = (selectedFiles: File[]) => {
    // Check file sizes (2MB limit per file)
    const validFiles = selectedFiles.filter((file) => file.size <= 2 * 1024 * 1024)
    const oversizedFiles = selectedFiles.length - validFiles.length

    if (oversizedFiles > 0) {
      showToast(`${oversizedFiles} file(s) exceeded the 2MB size limit and were not added.`, "warning")
    }

    if (validFiles.length === 0) return

    // Create object URLs for preview
    const newImageUrls = validFiles.map((file) => URL.createObjectURL(file))

    // Store the actual file objects
    const newFiles = [...files, ...validFiles]
    setFiles(newFiles)

    // Update with both preview URLs and file objects
    onChange([...images, ...newImageUrls], newFiles)

    if (validFiles.length > 0) {
      showToast(`Successfully added ${validFiles.length} image${validFiles.length > 1 ? "s" : ""}.`, "success", 3000)
    }
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)

    const newFiles = [...files]
    newFiles.splice(index, 1)
    setFiles(newFiles)

    onChange(newImages, newFiles)
    showToast("Image removed successfully.", "info", 3000)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files)
      processFiles(droppedFiles)
    }
  }

  return (
    <div className="bg-white p-3 rounded border">
      <div
        className={`p-4 rounded border ${dragActive ? "border-primary bg-primary bg-opacity-10" : "border-dashed"}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <div className="text-center mb-3">
          <i className="bi bi-cloud-arrow-up fs-1 text-primary"></i>
          <p className="mb-2">Drag and drop images here or click to browse</p>
          <small className="text-muted d-block mb-3">Supports: JPG, PNG, GIF (Max: 2MB per image)</small>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            accept="image/*"
            className="d-none"
          />
          <Button type="button" onClick={() => fileInputRef.current?.click()} variant="outline-primary">
            <i className="bi bi-folder me-2"></i>
            Browse Files
          </Button>
        </div>
      </div>

      {/* Image Size Best Practices */}
      <div className="mt-3 p-3 bg-light rounded">
        <h6 className="mb-2">
          <i className="bi bi-lightbulb me-2 text-warning"></i>
          Image Best Practices
        </h6>
        <ul className="small text-muted mb-0">
          <li>Recommended dimensions: 1200×800px for optimal display</li>
          <li>Keep file sizes under 2MB for faster uploads</li>
          <li>Use JPG format for photos and PNG for graphics with transparency</li>
          <li>Consider resizing large images before uploading for better performance</li>
        </ul>
      </div>

      {images.length > 0 && (
        <div className="mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="m-0">Selected Images ({images.length})</h6>
            <small className="text-muted">Click on an image to preview</small>
          </div>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {images.map((image, index) => (
              <div key={index} className="col">
                <div className="card h-100 border-0 shadow-sm">
                  <div
                    className="position-relative p-2 d-flex justify-content-center align-items-center bg-light"
                    style={{ minHeight: "200px" }}
                  >
                    <div className="image-container" style={{ maxHeight: "200px", overflow: "hidden" }}>
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Uploaded image ${index + 1}`}
                        className="img-fluid"
                        style={{ maxHeight: "200px", maxWidth: "100%" }}
                      />
                    </div>
                    <Button
                      type="button"
                      onClick={() => removeImage(index)}
                      variant="danger"
                      size="sm"
                      className="position-absolute top-0 end-0 m-2 rounded-circle"
                      style={{ width: "32px", height: "32px", padding: "0" }}
                    >
                      <i className="bi bi-x-lg"></i>
                    </Button>
                  </div>
                  <div className="card-body p-2">
                    {files[index] && <small className="text-muted d-block text-truncate">{files[index].name}</small>}
                    <small className="text-muted d-block">
                      {files[index] && (files[index].size / 1024).toFixed(1)} KB
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
