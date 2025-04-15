"use client"

import type React from "react"

import {useState, useRef} from "react"
import Button from "../atoms/Button"
import TextEditor from "../molecules/TextEditor"
import ImageUploader from "../molecules/ImageUploader"
import BlogPreview from "./BlogPreview"
import Image from "next/image"
import type {BlogContent, BlogPost} from "@/utility/types"
import {useRouter} from "next/navigation";

export default function BlogForm() {
    const router = useRouter()
    const [blogPost, setBlogPost] = useState<BlogPost>({
        title: "",
        coverImage: "",
        content: [],
    })
    const [currentContent, setCurrentContent] = useState<BlogContent | null>(null)
    const [editingIndex, setEditingIndex] = useState<number | null>(null)
    const [previewMode, setPreviewMode] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const formRef = useRef<HTMLFormElement>(null)

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBlogPost({...blogPost, title: e.target.value})
    }

    const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            // Check file size (5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                setErrorMessage({
                    type: "error",
                    message: "Cover image size exceeds 5MB limit. Please choose a smaller file.",
                })
                return
            }
            const imageUrl = URL.createObjectURL(file)
            setBlogPost({
                ...blogPost,
                coverImage: imageUrl,
                coverImageFile: file,
            })
            setErrorMessage(null)
        }
    }

    const addTextField = () => {
        setCurrentContent({type: "text", value: ""})
        setEditingIndex(null)
        setErrorMessage(null)
    }

    const addImageField = () => {
        setCurrentContent({type: "image", value: [], files: []})
        setEditingIndex(null)
        setErrorMessage(null)
    }

    const updateCurrentContent = (value: string | string[] | File[], files?: File[]) => {
        if (currentContent) {
            if (currentContent.type === "image" && files) {
                setCurrentContent({...currentContent, value, files})
            } else {
                setCurrentContent({...currentContent, value})
            }
        }
    }

    const saveContent = () => {
        if (!currentContent) return

        // Validate content is not empty
        if (
            (currentContent.type === "text" && (currentContent.value as string).trim() === "") ||
            (currentContent.type === "image" && (currentContent.value as string[]).length === 0)
        ) {
            setErrorMessage({
                type: "warning",
                message: "Content cannot be empty. Please add some text or images.",
            })
            return
        }

        const newContent = [...blogPost.content]

        if (editingIndex !== null) {
            // Update existing content
            newContent[editingIndex] = currentContent
        } else {
            // Add new content
            newContent.push(currentContent)
        }

        setBlogPost({...blogPost, content: newContent})
        setCurrentContent(null)
        setEditingIndex(null)
        setErrorMessage(null)
    }

    const editContent = (index: number) => {
        setCurrentContent(blogPost.content[index])
        setEditingIndex(index)
        setPreviewMode(false)
        setErrorMessage(null)
    }

    const dismissError = () => {
        setErrorMessage(null)
    }

    const cancelEdit = () => {
        setCurrentContent(null)
        setEditingIndex(null)
    }

    const togglePreviewMode = () => {
        setPreviewMode(!previewMode)
        setCurrentContent(null)
        setEditingIndex(null)
    }

    const removeCoverImage = () => {
        setBlogPost({...blogPost, coverImage: "", coverImageFile: undefined})
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setErrorMessage(null)

        // Validate required fields
        if (!blogPost.title.trim()) {
            setErrorMessage({
                type: "error",
                message: "Please enter a blog title.",
            })
            setIsSubmitting(false)
            return
        }

        if (!blogPost.coverImageFile) {
            setErrorMessage({
                type: "error",
                message: "Please upload a cover image.",
            })
            setIsSubmitting(false)
            return
        }

        if (blogPost.content.length === 0) {
            setErrorMessage({
                type: "error",
                message: "Please add some content to your blog.",
            })
            setIsSubmitting(false)
            return
        }

        try {
            // Create a FormData object to send to Django
            const formData = new FormData()

            // Add blog title
            formData.append("title", blogPost.title)

            // Add cover image if exists
            if (blogPost.coverImageFile) {
                formData.append("cover_photo", blogPost.coverImageFile)
            }
            // Process content items
            const contentForDjango = blogPost.content
                .map((item, index) => {
                    if (item.type === "text") {
                        // For text content, just return the value
                        return {
                            type: "text",
                            text: item.value,
                            order: index,
                        }
                    } else if (item.type === "image") {
                        // For image content, we'll handle the files separately
                        // and just include references in the JSON
                        const imageFiles = item.files || []
                        const imageRefs = imageFiles.map((file, i) => {
                            const fieldName = `content_image_${index}_${i}`
                            formData.append(fieldName, file)
                            return fieldName
                        })

                        return {
                            type: "image",
                            text: "a",
                            image_refs: imageRefs,
                            order: index,
                        }
                    }
                    return null
                })
                .filter(Boolean)

            formData.append("content", JSON.stringify(contentForDjango))

            // Send to Django backend
            const response = await fetch('http://127.0.0.1:8000/blog/', {
                method: 'POST',
                body: formData,
                // No need to set Content-Type header, browser will set it with boundary
            })

            if(!response.ok){
                const errorData = await response.json()
                setErrorMessage({
                    type: "error",
                    message: "Failed to submit blog post. ",
                })
            } else {
                if(response.status == 201){
                    const blog = await response.json()
                    console.log(blog)
                    router.push(`/blog/${blog.id}`)
                }
                console.log(response)
            }


        } catch (error) {
            console.error("Error submitting blog post:", error)
            setErrorMessage({
                type: "error",
                message: error instanceof Error ? error.message : "Failed to submit blog post. Please try again.",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form ref={formRef} onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-5">
                <div className="card shadow-lg border-0">
                    {/* Error Message Display */}
                    {errorMessage && (
                        <div
                            className={`alert alert-${
                                errorMessage.type === "error" ? "danger" : errorMessage.type === "warning" ? "warning" : "info"
                            } alert-dismissible fade show m-3 mb-0`}
                            role="alert"
                        >
                            <i
                                className={`bi bi-${
                                    errorMessage.type === "error"
                                        ? "exclamation-triangle"
                                        : errorMessage.type === "warning"
                                            ? "exclamation-circle"
                                            : "info-circle"
                                } me-2`}
                            ></i>
                            {errorMessage.message}
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="alert"
                                aria-label="Close"
                                onClick={dismissError}
                            ></button>
                        </div>
                    )}

                    <div className="card-header bg-white py-3 border-0">
                        <div className="d-flex justify-content-between align-items-center">
                            <h2 className="fs-4 fw-bold m-0">
                                <i className="bi bi-file-earmark-text me-2 text-primary"></i>
                                Blog Editor
                            </h2>
                            <Button type="button" onClick={togglePreviewMode}
                                    variant={previewMode ? "primary" : "outline-primary"}>
                                <i className={`bi bi-${previewMode ? "pencil" : "eye"} me-2`}></i>
                                {previewMode ? "Edit Mode" : "Preview Mode"}
                            </Button>
                        </div>
                    </div>
                    <div className="card-body p-4">
                        {!previewMode ? (
                            <>
                                {/* Title Input */}
                                <div className="mb-4">
                                    <label htmlFor="blogTitle" className="form-label fw-bold">
                                        Blog Title <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        id="blogTitle"
                                        placeholder="Enter an engaging title for your blog"
                                        value={blogPost.title}
                                        onChange={handleTitleChange}
                                        required
                                    />
                                </div>

                                {/* Cover Image Upload */}
                                <div className="mb-4">
                                    <label className="form-label fw-bold">
                                        Cover Image <span className="text-danger">*</span>
                                    </label>
                                    <div className="p-4 bg-light rounded">
                                        {blogPost.coverImage ? (
                                            <div className="position-relative mb-3" style={{height: "300px"}}>
                                                <Image
                                                    src={blogPost.coverImage || "/placeholder.svg"}
                                                    alt="Cover image"
                                                    fill
                                                    style={{objectFit: "cover", borderRadius: "0.375rem"}}
                                                />
                                                <Button
                                                    type="button"
                                                    onClick={removeCoverImage}
                                                    variant="danger"
                                                    size="sm"
                                                    className="position-absolute top-0 end-0 m-2"
                                                >
                                                    <i className="bi bi-trash me-1"></i>
                                                    Remove
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="text-center p-5 border border-dashed rounded mb-3">
                                                <div className="mb-3">
                                                    <i className="bi bi-image fs-1 text-secondary"></i>
                                                </div>
                                                <p className="mb-3">Drag and drop an image or click to browse</p>
                                                <input
                                                    type="file"
                                                    id="coverImage"
                                                    className="d-none"
                                                    accept="image/*"
                                                    onChange={handleCoverImageChange}
                                                />
                                                <Button type="button"
                                                        onClick={() => document.getElementById("coverImage")?.click()}>
                                                    <i className="bi bi-upload me-2"></i>
                                                    Upload Cover Image
                                                </Button>
                                            </div>
                                        )}
                                        <small className="text-muted d-block">
                                            Recommended size: 1200 x 600 pixels. Max file size: 5MB.
                                        </small>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="mb-4">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <label className="form-label fw-bold m-0">Blog Content</label>
                                        <div>
                                            <Button
                                                type="button"
                                                onClick={addTextField}
                                                variant="outline-primary"
                                                className="me-2"
                                                disabled={currentContent !== null}
                                            >
                                                <i className="bi bi-text-paragraph me-1"></i> Add Text
                                            </Button>
                                            <Button
                                                type="button"
                                                onClick={addImageField}
                                                variant="outline-primary"
                                                disabled={currentContent !== null}
                                            >
                                                <i className="bi bi-image me-1"></i> Add Image
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Current editing section */}
                                    {currentContent && (
                                        <div className="mb-4 p-4 border rounded bg-light">
                                            <h5 className="fs-6 fw-medium mb-3">
                                                <i
                                                    className={`bi bi-${
                                                        currentContent.type === "text" ? "text-paragraph" : "images"
                                                    } me-2 text-primary`}
                                                ></i>
                                                {editingIndex !== null ? "Edit Content" : "Add New Content"}
                                            </h5>
                                            {currentContent.type === "text" ? (
                                                <TextEditor
                                                    value={currentContent.value as string}
                                                    onChange={(value) => updateCurrentContent(value)}
                                                />
                                            ) : (
                                                <ImageUploader
                                                    images={currentContent.value as string[]}
                                                    onChange={(images, files) => updateCurrentContent(images, files)}
                                                />
                                            )}
                                            <div className="mt-3">
                                                <Button type="button" onClick={saveContent} className="me-2">
                                                    <i className={`bi bi-${editingIndex !== null ? "check-circle" : "plus-circle"} me-2`}></i>
                                                    {editingIndex !== null ? "Update" : "Add to Blog"}
                                                </Button>
                                                <Button type="button" onClick={cancelEdit} variant="secondary">
                                                    <i className="bi bi-x-circle me-2"></i>
                                                    Cancel
                                                </Button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Content list */}
                                    {blogPost.content.length > 0 && (
                                        <div className="border rounded p-4">
                                            <h5 className="fs-6 fw-medium mb-3">
                                                <i className="bi bi-list-ul me-2 text-primary"></i>
                                                Content Sections ({blogPost.content.length})
                                            </h5>
                                            {blogPost.content.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="d-flex justify-content-between align-items-center p-3 border-bottom"
                                                >
                                                    <div className="d-flex align-items-center">
                            <span className={`badge ${item.type === "text" ? "bg-info" : "bg-success"} me-3 p-2`}>
                              <i className={`bi bi-${item.type === "text" ? "text-paragraph" : "images"}`}></i>
                            </span>
                                                        <span className="text-truncate">
                              {item.type === "text"
                                  ? `${(item.value as string).substring(0, 50)}${
                                      (item.value as string).length > 50 ? "..." : ""
                                  }`
                                  : `${(item.value as string[]).length} image(s)`}
                            </span>
                                                    </div>
                                                    <Button
                                                        type="button"
                                                        onClick={() => editContent(index)}
                                                        variant="outline-primary"
                                                        size="sm"
                                                        disabled={currentContent !== null}
                                                    >
                                                        <i className="bi bi-pencil me-1"></i>
                                                        Edit
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {blogPost.content.length === 0 && !currentContent && (
                                        <div className="text-center p-5 border border-dashed rounded bg-light">
                                            <i className="bi bi-journal-text fs-1 text-secondary mb-3 d-block"></i>
                                            <p className="text-muted mb-3">Your blog is empty. Add some content to get
                                                started!</p>
                                            <div>
                                                <Button type="button" onClick={addTextField} variant="primary"
                                                        className="me-2">
                                                    <i className="bi bi-text-paragraph me-2"></i>
                                                    Add Text
                                                </Button>
                                                <Button type="button" onClick={addImageField} variant="outline-primary">
                                                    <i className="bi bi-image me-2"></i>
                                                    Add Image
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Publish Section */}
                                <div className="d-flex justify-content-between align-items-center mt-4 pt-4 border-top">
                                    <Button type="button" variant="outline-secondary">
                                        <i className="bi bi-save me-2"></i>
                                        Save as Draft
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="success"
                                        disabled={!blogPost.title || !blogPost.coverImage || blogPost.content.length === 0 || isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status"
                                                      aria-hidden="true"></span>
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-send me-2"></i>
                                                Publish Blog
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <BlogPreview blogPost={blogPost} onEdit={editContent}/>
                        )}
                    </div>
                </div>
            </div>
        </form>
    )
}
