"use client"

import BlogForm from "@/components/organisms/BlogForm"

export default function CreateBlogPage() {
  return (
    <>
      {/* Bootstrap CSS */}
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
        crossOrigin="anonymous"
      />

      {/* Bootstrap Icons */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />

      {/* Custom CSS */}
      <style jsx global>{`
        .create-header {
          background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
          padding: 3rem 0;
          margin-bottom: 2rem;
          color: white;
          position: relative;
          overflow: hidden;
        }
        
        .create-header::before {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
          pointer-events: none;
        }
        
        .create-header h1 {
          font-weight: 800;
          letter-spacing: -0.5px;
          margin-bottom: 0.5rem;
        }
        
        .create-header p {
          opacity: 0.9;
          max-width: 600px;
        }
        
        .header-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        
        .floating-shapes {
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
        }
        
        .shape {
          position: absolute;
          background-color: rgba(255,255,255,0.1);
          border-radius: 50%;
        }
        
        .shape-1 {
          width: 80px;
          height: 80px;
          top: 20%;
          right: 10%;
        }
        
        .shape-2 {
          width: 60px;
          height: 60px;
          bottom: 20%;
          right: 20%;
        }
        
        .shape-3 {
          width: 40px;
          height: 40px;
          top: 30%;
          right: 30%;
        }
      `}</style>

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
