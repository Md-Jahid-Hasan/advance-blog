"use client"

import TextArea from "../atoms/TextArea"

interface TextEditorProps {
  value: string
  onChange: (value: string) => void
}

export default function TextEditor({ value, onChange }: TextEditorProps) {
  return (
    <div className="bg-light p-3 rounded">
      <TextArea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your blog content here..."
        className="bg-white p-3 fs-5"
        style={{ minHeight: "200px" }}
      />
    </div>
  )
}

