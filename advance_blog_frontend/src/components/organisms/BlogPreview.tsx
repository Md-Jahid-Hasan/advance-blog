"use client"

import Image from "next/image"
import type { BlogContent, BlogPost } from "@/utility/types"
import Button from "../atoms/Button"

interface BlogPreviewProps {
  content?: BlogContent[]
  blogPost?: BlogPost
  onEdit: (index: number) => void
}

export default function BlogPreview({ content, blogPost, onEdit }: BlogPreviewProps) {
  // Use either the content array or the blogPost.content
  const contentToDisplay = blogPost?.content || content || []

  if (contentToDisplay.length === 0 && !blogPost?.title) {
    return (
      <div className="text-center p-5">
        <p className="text-muted">No content to preview yet. Add some content to see the preview.</p>
      </div>
    )
  }

  // Helper function to get Bootstrap column classes based on image count
  const getColumnClasses = (imageCount: number): string => {
    if (imageCount === 1) {
      return "col-12"
    } else if (imageCount === 2) {
      return "col-6"
    } else if (imageCount === 3 || imageCount > 4) {
      return "col-12 col-sm-6 col-md-4"
    } else if (imageCount === 4) {
      return "col-6"
    } else {
      return "col-12 col-sm-6 col-md-4"
    }
  }

  return (
    <div className="blog-preview">
      <h2 className="fs-4 fw-bold mb-4">Blog Preview</h2>

      {/* Hero Header with Cover Image Background */}
      {blogPost?.title && blogPost?.coverImage && (
        <div className="position-relative mb-4 rounded overflow-hidden shadow">
          <div style={{ height: "400px" }}>
            <Image
              src={blogPost.coverImage || "/placeholder.svg"}
              alt="Cover image"
              fill
              style={{ objectFit: "cover" }}
            />

            {/* Dark overlay for better text visibility */}
            <div
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{
                background: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7))",
                zIndex: 1,
              }}
            ></div>

            {/* Title and author container */}
            <div
              className="position-absolute w-100 p-4 text-white"
              style={{
                bottom: 0,
                zIndex: 2,
              }}
            >
              <h1
                className="display-5 fw-bold mb-3"
                style={{
                  textShadow: "2px 2px 4px rgba(0,0,0,0.9)",
                }}
              >
                {blogPost.title}
              </h1>

              <div className="d-flex align-items-center">
                <div
                  className="position-relative me-3"
                  style={{
                    width: "40px",
                    height: "40px",
                    zIndex: 3,
                  }}
                >
                  <Image
                    src="/placeholder.svg"
                    alt="Author"
                    fill
                    style={{
                      objectFit: "cover",
                      borderRadius: "50%",
                      border: "2px solid white",
                    }}
                  />
                </div>
                <div>
                  <div
                    className="fw-bold"
                    style={{
                      textShadow: "2px 2px 4px rgba(0,0,0,0.9)",
                    }}
                  >
                    John Doe
                  </div>
                  <div
                    style={{
                      textShadow: "2px 2px 4px rgba(0,0,0,0.9)",
                    }}
                  >
                    {new Date().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    · 5 min read
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Title only (no cover image) */}
      {blogPost?.title && !blogPost?.coverImage && <h1 className="display-5 fw-bold mb-4">{blogPost.title}</h1>}

      {/* Content */}
      <div className="bg-white rounded shadow p-4">
        {contentToDisplay.map((item, index) => (
          <div key={index} className={`${index !== 0 ? "mt-4 pt-4 border-top" : ""} position-relative`}>
            <div className="position-absolute top-0 end-0">
              <Button
                type="button"
                onClick={() => onEdit(index)}
                variant="primary"
                size="sm"
                className="px-2 py-1 fs-6"
              >
                Edit
              </Button>
            </div>
            {item.type === "text" ? (
              <div className="pe-5">
                <p className="text-dark">{item.value as string}</p>
              </div>
            ) : (
              <div className="d-flex justify-content-center my-3 pe-5">
                <div className="row g-3 w-100">
                  {(item.value as string[]).map((image, imgIndex) => (
                    <div key={imgIndex} className={getColumnClasses((item.value as string[]).length)}>
                      <div
                        className="position-relative"
                        style={{ aspectRatio: "1/1", maxWidth: "250px", margin: "0 auto" }}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Blog image ${imgIndex + 1}`}
                          fill
                          style={{ objectFit: "cover", borderRadius: "0.375rem" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
