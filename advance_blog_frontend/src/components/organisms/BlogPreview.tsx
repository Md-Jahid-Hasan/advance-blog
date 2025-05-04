"use client"

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

  return (
    <div className="blog-preview">
      <h2 className="fs-4 fw-bold mb-4">Blog Preview</h2>

      {/* Hero Header with Cover Image Background */}
      {blogPost?.title && blogPost?.coverImage && (
        <div className="position-relative mb-4 rounded overflow-hidden shadow">
          <div style={{ height: "400px" }}>
            <div
              className="w-100 h-100 d-flex justify-content-center align-items-center"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${blogPost.coverImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
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
                    <img
                      src="/placeholder.svg"
                      alt="Author"
                      className="rounded-circle border border-2 border-white"
                      style={{ width: "40px", height: "40px", objectFit: "cover" }}
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
            {item.section_type === "text" ? (
              <div className="pe-5 rich-text-content">
                <style jsx global>{`
                  .rich-text-content h1,
                  .rich-text-content h2,
                  .rich-text-content h3,
                  .rich-text-content h4,
                  .rich-text-content h5,
                  .rich-text-content h6 {
                    margin-bottom: 0.75rem;
                    font-weight: 600;
                  }
                  
                  .rich-text-content p {
                    margin-bottom: 1rem;
                  }
                  
                  .rich-text-content blockquote {
                    border-left: 4px solid #ced4da;
                    padding-left: 16px;
                    margin-left: 0;
                    color: #6c757d;
                  }
                  
                  .rich-text-content pre {
                    background-color: #f8f9fa;
                    border-radius: 0.375rem;
                    padding: 1rem;
                    margin-bottom: 1rem;
                    overflow-x: auto;
                  }
                  
                  .rich-text-content code {
                    background-color: #f8f9fa;
                    padding: 0.2rem 0.4rem;
                    border-radius: 0.25rem;
                    font-family: monospace;
                  }
                  
                  .rich-text-content pre {
                    background-color: #23241f;
                    color: #f8f8f2;
                    padding: 1rem;
                    border-radius: 0.375rem;
                    margin-bottom: 1rem;
                  }
                  
                  .rich-text-content pre code {
                    background-color: transparent;
                    padding: 0;
                    color: inherit;
                  }
                  
                  .rich-text-content ul,
                  .rich-text-content ol {
                    margin-bottom: 1rem;
                    padding-left: 2rem;
                  }
                  
                  .rich-text-content a {
                    color: #0d6efd;
                    text-decoration: underline;
                  }
                  
                  .rich-text-content a:hover {
                    color: #0a58ca;
                  }
                  /* Text alignment styles */
                  .rich-text-content .ql-align-center {
                    text-align: center !important;
                  }
                  
                  .rich-text-content .ql-align-right {
                    text-align: right !important;
                  }
                  
                  .rich-text-content .ql-align-justify {
                    text-align: justify !important;
                  }
                `}</style>
                <div dangerouslySetInnerHTML={{ __html: item.text as string }} />
              </div>
            ) : (
              <div className="d-flex justify-content-center my-3 pe-5">
                <div className="row g-3 w-100">
                  {(item.blog_section_images as string[]).map((image, imgIndex) => (
                    <div key={imgIndex} className="col-12 col-sm-6 col-md-4 d-flex justify-content-center">
                      <div className="image-container p-2 bg-light rounded">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Blog image ${imgIndex + 1}`}
                          className="img-fluid"
                          style={{ maxHeight: "250px" }}
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
