"use client"

import BlogForm from "@/components/organisms/BlogForm"

export default function CreateBlogPage() {
  return (
    <>
      {/* Attractive Header */}
      <div className="create-header">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
        <div className="container position-relative" style={{ zIndex: 1 }}>
          <div className="row">
            <div className="col-lg-8">
              <div className="header-icon">
                <i className="bi bi-pencil-square"></i>
              </div>
              <h1 className="display-4">Craft Your Story</h1>
              <p className="lead">
                Share your ideas, experiences, and insights with the world. Create a compelling blog post that engages
                and inspires your readers.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid px-4">
        <div className="row justify-content-center">
          <div className="col-12 col-xxl-10">
            <BlogForm />
          </div>
        </div>
      </div>
    </>
  )
}
