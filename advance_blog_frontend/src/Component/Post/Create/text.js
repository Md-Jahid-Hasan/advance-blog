import React, {useState} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Text = ({updatePostBlogSection}) => {
    const [value, setValue] = useState("")

    const updateTextPost = () => {
        updatePostBlogSection([{text: value}])
    }
  return (
      <div style={{"height": "300px"}}>
          <label className={"form-label"}>Post body</label>
          <ReactQuill theme="snow"
                      value={value} onChange={setValue} placeholder={"Your Blog Body...."}
                      className={"mb-5"} style={{"height": "180px"}}
          />
          <button type="button" className="btn btn-info float-end" onClick={updateTextPost}>Save</button>
      </div>
  )
}
export default Text
