"use client"

interface SimpleEditorProps {
  value: string
  onChange: (value: string) => void
}

export default function SimpleEditor({ value, onChange }: SimpleEditorProps) {
  return (
    <div className="simple-editor">
      <div className="border bg-light p-2 mb-1 rounded-top d-flex flex-wrap gap-2">
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          onClick={() => onChange(value + "<h2>Heading</h2>")}
        >
          Heading
        </button>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          onClick={() => onChange(value + "<strong>Bold text</strong>")}
        >
          Bold
        </button>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          onClick={() => onChange(value + "<em>Italic text</em>")}
        >
          Italic
        </button>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          onClick={() => onChange(value + "<ul><li>List item</li></ul>")}
        >
          List
        </button>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          onClick={() => onChange(value + "<blockquote>Quote text</blockquote>")}
        >
          Quote
        </button>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          onClick={() => onChange(value + "<pre><code>Code block</code></pre>")}
        >
          Code
        </button>
      </div>
      <textarea
        className="form-control rounded-top-0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={8}
        placeholder="Write your content here... HTML formatting is supported"
      />
    </div>
  )
}
