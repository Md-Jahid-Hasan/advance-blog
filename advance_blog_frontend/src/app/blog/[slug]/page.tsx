"use client"
import 'quill/dist/quill.snow.css';
import {useState, useEffect} from "react"
import Image from "next/image"
import Link from "next/link"
import {useParams} from 'next/navigation';
import type {BlogContent} from "@/utility/types"
import moment from "moment/moment";

// This would normally come from a database or API
const getDummyBlogPost = (slug: string) => {
    return {
        title: "The Art of Creative Writing",
        slug: slug,
        author: "Jane Doe",
        date: "April 8, 2025",
        readTime: "5 min read",
        cover_photo: "/placeholder.jpg",
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
            {type: "image", value: ["/placeholder.jpg?width=800&height=500"]},
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

export default function BlogViewPage({params}: { params: { id: string } }) {
    const [blog, setBlog] = useState<any>(null)
    const xxx = useParams();
    const id = xxx?.slug;

    useEffect(() => {
        // In a real app, this would be an API call
        // const blogData = getDummyBlogPost(params.id)
        console.log(id)
        const fetchData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/blog/${id}/`, {
                    method: 'GET'
                })
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                } else {
                    const data = await response.json()
                    setBlog(data)
                }

            } catch (error) {
                console.error("Error fetching blogs:", error)
            }
        }
        fetchData()
    }, [id])

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
            {/* Hero Header with Cover Image Background */}
            <div className="hero-header">
                {/* Cover Image */}
                <Image
                    src={blog.cover_photo || "/placeholder.jpg"}
                    alt={blog.title}
                    fill
                    style={{objectFit: "cover"}}
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
                <div className="container h-100 position-relative" style={{zIndex: 2}}>
                    <div className="row h-100 align-items-end">
                        <div className="col-lg-10 text-white pb-5">
                            <Link href="/" className="text-decoration-none mb-3 d-inline-block">
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
                                        {moment(blog.created_at).format("MMMM D, YYYY")} · {blog.readTime || "5 min read"}
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
                                <div key={index} className="mb-4 ql-editor">
                                    {item.section_type === "text" ? (
                                        <div dangerouslySetInnerHTML={{__html: item.text as string}}/>
                                    ) : (
                                        <div className="blog-image-container shadow-sm">
                                            <div className="row g-3">
                                                {(item.blog_section_images as string[]).map((image, imgIndex) => (
                                                    <div key={imgIndex}
                                                         className={getColumnClasses((item.blog_section_images as string[]).length)}>
                                                        <div className="position-relative" style={{height: "300px"}}>
                                                            <Image
                                                                src={image.image}
                                                                alt={`Blog image ${imgIndex + 1}`}
                                                                fill
                                                                style={{objectFit: "cover"}}
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
                                    <h6 className="mb-2">Share this article</h6>
                                    <div className="d-flex">
                                        {/* Social Media Share Buttons with Icons and Tooltips */}
                                        <button
                                            className="social-share-btn btn btn-outline-primary"
                                            title="Share on Twitter"
                                            aria-label="Share on Twitter"
                                        >
                                            <i className="bi bi-twitter"></i>
                                        </button>
                                        <button
                                            className="social-share-btn btn btn-outline-primary"
                                            title="Share on Facebook"
                                            aria-label="Share on Facebook"
                                        >
                                            <i className="bi bi-facebook"></i>
                                        </button>
                                        <button
                                            className="social-share-btn btn btn-outline-primary"
                                            title="Share on LinkedIn"
                                            aria-label="Share on LinkedIn"
                                        >
                                            <i className="bi bi-linkedin"></i>
                                        </button>
                                        <button
                                            className="social-share-btn btn btn-outline-primary"
                                            title="Share via Email"
                                            aria-label="Share via Email"
                                        >
                                            <i className="bi bi-envelope"></i>
                                        </button>
                                        <button
                                            className="social-share-btn btn btn-outline-primary"
                                            title="Copy Link"
                                            aria-label="Copy Link"
                                        >
                                            <i className="bi bi-link-45deg"></i>
                                        </button>
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
