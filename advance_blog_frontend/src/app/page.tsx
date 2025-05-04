"use client"

import {useState, useEffect} from "react"
import Image from "next/image"
import Link from "next/link"
import moment from "moment";

import {useToast} from "../components/context/ToastContext"
import Pagination from "@/components/molecules/Pagination"

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
    const {showToast} = useToast()
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        const fetchData = async (fetch_url) => {
            try {
                const response = await fetch(fetch_url, {
                    method: 'GET'
                })
                if (!response.ok) {
                    showToast("Failed to fetched your data", "error")
                    throw new Error('Network response was not ok')
                } else {
                    const data = await response.json()
                    setTotalPages(data.total_pages)
                    setBlogs(data.results)
                }

            } catch (error) {
                console.error("Error fetching blogs:", error)
            }
        }
        let blog_list_url = 'http://127.0.0.1:8000/blog/'
        if (currentPage > 1)
            blog_list_url = blog_list_url + `?page=${currentPage}`
        fetchData(blog_list_url)
    }, [currentPage])

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        // Scroll to top when changing pages
        window.scrollTo({top: 0, behavior: "smooth"})
    }

    return (
        <>
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
                                        <span
                                            className="badge bg-light text-dark">{moment(blog.created_at).format("MMMM D, YYYY")}</span>
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

                {/* Pagination */}
                <div className="mt-5">
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
                </div>
            </div>
        </>
    )
}
