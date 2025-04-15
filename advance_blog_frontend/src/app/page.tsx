"use client"

import {useState, useEffect} from "react"
import Image from "next/image"
import Link from "next/link"

import moment from "moment";

// This would normally come from a database or API
const getDummyBlogs = () => {
    return [
        {
            id: 1,
            title: "The Art of Creative Writing",
            slug: "the-art-of-creative-writing",
            excerpt: "Discover the joy and power of creative writing with these tips and insights.",
            coverImage: "/placeholder.jpg",
            author: "Jane Doe",
            date: "April 8, 2025",
            readTime: "5 min read",
        },
        {
            id: 2,
            title: "Exploring Nature Photography",
            slug: "exploring-nature-photography",
            excerpt: "Learn how to capture the beauty of nature through your camera lens.",
            coverImage: "/placeholder.jpg",
            author: "John Smith",
            date: "April 5, 2025",
            readTime: "7 min read",
        },
        {
            id: 3,
            title: "The Science of Baking",
            slug: "the-science-of-baking",
            excerpt: "Understanding the chemistry behind perfect baked goods.",
            coverImage: "/placeholder.jpg",
            author: "Maria Garcia",
            date: "April 2, 2025",
            readTime: "6 min read",
        },
        {
            id: 4,
            title: "Mindfulness in Daily Life",
            slug: "mindfulness-in-daily-life",
            excerpt: "Simple practices to bring mindfulness into your everyday routine.",
            coverImage: "/placeholder.jpg",
            author: "David Chen",
            date: "March 30, 2025",
            readTime: "4 min read",
        },
    ]
}

export default function BlogListingPage() {
    const [blogs, setBlogs] = useState<any[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/blog/', {
                    method: 'GET'
                })
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                } else {
                    const data = await response.json()
                    setBlogs(data)
                }

            } catch (error) {
                console.error("Error fetching blogs:", error)
            }
        }
        fetchData()
    }, [])

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
                .blog-card {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    height: 100%;
                }

                .blog-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
                }

                .blog-card-img-container {
                    position: relative;
                    height: 200px;
                    overflow: hidden;
                }

                .blog-card-img {
                    transition: transform 0.5s ease;
                }

                .blog-card:hover .blog-card-img {
                    transform: scale(1.05);
                }

                .blog-header {
                    background-color: #f8f9fa;
                    padding: 3rem 0;
                    margin-bottom: 2rem;
                    border-bottom: 1px solid #e9ecef;
                }
            `}</style>

            <div className="blog-header">
                <div className="container">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-md-6">
                            <h1 className="display-4 fw-bold mb-3">Our Blog</h1>
                            <p className="lead">Discover stories, thinking, and expertise from writers on any topic.</p>
                        </div>
                        <div className="col-md-4 text-md-end">
                            <Link href="/blog/create" className="btn btn-primary btn-lg">
                                Create New Blog
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mb-5">
                <div className="row g-4">
                    {blogs.map((blog) => (
                        <div key={blog.id} className="col-md-6 col-lg-4">
                            <div className="card blog-card h-100 border-0 shadow-sm">
                                <div className="blog-card-img-container">
                                    <Image
                                        src={blog.cover_photo || "/placeholder.jpg"}
                                        alt={blog.title}
                                        fill
                                        style={{objectFit: "cover"}}
                                        className="blog-card-img"
                                    />
                                </div>
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <span className="badge bg-light text-dark">{moment(blog.created_at).format("MMMM D, YYYY")}</span>
                                        {/*<small className="text-muted">{blog.readTime}</small>*/}
                                    </div>
                                    <h5 className="card-title fw-bold">{blog.title}</h5>
                                    {/*<p className="card-text text-muted">{blog.excerpt}</p>*/}
                                </div>
                                <div
                                    className="card-footer bg-white border-top-0 d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <div className="position-relative me-2" style={{width: "30px", height: "30px"}}>
                                            <Image
                                                src="/placeholder.jpg"
                                                alt={blog.author_name}
                                                fill
                                                style={{
                                                    objectFit: "cover",
                                                    borderRadius: "50%",
                                                }}
                                            />
                                        </div>
                                        <small className="text-muted">{blog.author_name}</small>
                                    </div>
                                    <Link href={`/blog/${blog.id}`} className="btn btn-sm btn-outline-primary">
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
