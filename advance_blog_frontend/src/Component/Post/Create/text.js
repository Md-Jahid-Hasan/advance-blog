import React, {useState} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Text = () => {
    const [value, setValue] = useState("")

  return (
      <div style={{"height": "300px"}}>
          <label className={"form-label"}>Post body</label>
          <ReactQuill theme="snow"
                      value={value} onChange={setValue} placeholder={"Your Blog Body...."}
                      className={"mb-5"} style={{"height": "180px"}}
          />
          <button type="button" className="btn btn-info float-end">Save</button>
      </div>
  )
}
export default Text
