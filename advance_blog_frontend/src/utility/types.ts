export interface BlogContent {
  section_type: "text" | "image"
  text?: string | string[] | File[]
  blog_section_images?: string[] | File[]
  files?: File[] // For image content, store the actual file objects
}

export interface BlogPost {
  id?: number
  title: string
  slug?: string
  excerpt?: string
  author?: string
  date?: string
  readTime?: string
  coverImage?: string
  coverImageFile?: File // Store the actual cover image file
  content: BlogContent[]
}
