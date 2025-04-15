"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import type { BlogContent } from "@/utility/types"

// This would normally come from a database or API
const getDummyBlogPost = (slug: string) => {
  return {
    title: "The Art of Creative Writing",
    slug: slug,
    author: "Jane Doe",
    date: "April 8, 2025",
    readTime: "5 min read",
    coverImage: "/placeholder.jpg",
    content: [
      {
        type: "text",
        value:
          "Writing is an art form that allows us to express our thoughts, ideas, and emotions. It's a powerful tool for communication and self-expression.",
      },
      {
        type: "text",
        value:
          "Creative writing, in particular, gives us the freedom to explore new worlds, characters, and scenarios. It's a journey of imagination and discovery.",
      },
      { type: "image", value: ["/placeholder.jpg?width=800&height=500"] },
      {
        type: "text",
        value:
          "When starting your creative writing journey, it's important to find your unique voice. Your voice is what sets your writing apart from others. It's your perspective, your style, and your approach to storytelling.",
      },
      {
        type: "text",
        value:
          "Don't be afraid to experiment with different genres and styles. Try writing short stories, poetry, or even a novel. Each form offers its own challenges and rewards.",
      },
      {
        type: "image",
        value: [
          "/placeholder.jpg?width=800&height=500",
          "/placeholder.jpg?width=800&height=500",
          "/placeholder.jpg?width=800&height=500",
        ],
      },
      {
        type: "text",
        value:
          "Remember, the key to improving your writing is practice. Write regularly, even if it's just for a few minutes each day. Over time, you'll see your skills develop and your confidence grow.",
      },
    ],
  }
}

export default function BlogViewPage({ params }: { params: { id: string } }) {
  const [blog, setBlog] = useState<any>(null)

  useEffect(() => {
    // In a real app, this would be an API call
    const blogData = getDummyBlogPost(params.id)
    setBlog(blogData)
  }, [params.id])

  if (!blog) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    )
  }

  // Helper function to get Bootstrap column classes based on image count
  const getColumnClasses = (imageCount: number): string => {
    if (imageCount === 1) {
      return "col-12"
    } else if (imageCount === 2) {
      return "col-md-6"
    } else if (imageCount === 3 || imageCount > 4) {
      return "col-md-4"
    } else if (imageCount === 4) {
      return "col-md-6"
    } else {
      return "col-md-4"
    }
  }

  return (
    <>
      {/* Bootstrap CSS */}
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
        crossOrigin="anonymous"
      />

      {/* Custom CSS */}
      <style jsx global>{`
        .blog-content p {
          font-size: 1.1rem;
          line-height: 1.8;
          margin-bottom: 1.5rem;
          color: #333;
        }
        
        .blog-image-container {
          margin: 2rem 0;
          border-radius: 8px;
          overflow: hidden;
        }
        
        .blog-image {
          transition: transform 0.3s ease;
        }
        
        .blog-image:hover {
          transform: scale(1.02);
        }
        
        .hero-header {
          position: relative;
          height: 70vh;
          min-height: 500px;
          max-height: 800px;
          margin-bottom: 2rem;
        }
        
        @media (max-width: 768px) {
          .hero-header {
            height: 50vh;
            min-height: 400px;
          }
        }
      `}</style>

      {/* Hero Header with Cover Image Background */}
      <div className="hero-header">
        {/* Cover Image */}
        <Image
          src={blog.coverImage || "/placeholder.jpg"}
          alt={blog.title}
          fill
          style={{ objectFit: "cover" }}
          priority
        />

        {/* Dark Overlay */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7))",
            zIndex: 1,
          }}
        ></div>

        {/* Content Container */}
        <div className="container h-100 position-relative" style={{ zIndex: 2 }}>
          <div className="row h-100 align-items-end">
            <div className="col-lg-10 text-white pb-5">
              <Link href="/blog" className="text-decoration-none mb-3 d-inline-block">
                <span className="badge bg-primary">← Back to all blogs</span>
              </Link>

              {/* Title with enhanced shadow */}
              <h1
                className="display-4 fw-bold mb-3"
                style={{
                  textShadow: "2px 2px 4px rgba(0,0,0,0.9)",
                  color: "white",
                }}
              >
                {blog.title}
              </h1>

              {/* Author info with enhanced visibility */}
              <div className="d-flex align-items-center">
                <div
                  className="position-relative me-3"
                  style={{
                    width: "50px",
                    height: "50px",
                  }}
                >
                  <Image
                    src="/placeholder.jpg"
                    alt={blog.author}
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
                      color: "white",
                    }}
                  >
                    {blog.author}
                  </div>
                  <div
                    style={{
                      textShadow: "2px 2px 4px rgba(0,0,0,0.9)",
                      color: "white",
                    }}
                  >
                    {blog.date} · {blog.readTime}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mb-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="blog-content">
              {blog.content.map((item: BlogContent, index: number) => (
                <div key={index} className="mb-4">
                  {item.type === "text" ? (
                    <p>{item.value as string}</p>
                  ) : (
                    <div className="blog-image-container shadow-sm">
                      <div className="row g-3">
                        {(item.value as string[]).map((image, imgIndex) => (
                          <div key={imgIndex} className={getColumnClasses((item.value as string[]).length)}>
                            <div className="position-relative" style={{ height: "300px" }}>
                              <Image
                                src={image || "/placeholder.jpg"}
                                alt={`Blog image ${imgIndex + 1}`}
                                fill
                                style={{ objectFit: "cover" }}
                                className="blog-image"
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

            <div className="border-top pt-4 mt-5">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1">Share this article</h5>
                  <div className="d-flex gap-2">
                    <button className="btn btn-outline-primary">Twitter</button>
                    <button className="btn btn-outline-primary">Facebook</button>
                    <button className="btn btn-outline-primary">LinkedIn</button>
                  </div>
                </div>
                <Link href="/blog/create" className="btn btn-primary">
                  Create Your Own Blog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
