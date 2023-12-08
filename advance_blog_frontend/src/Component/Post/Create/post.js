import React, {useState} from "react";
import ReactQuill from 'react-quill';
import Image from "./image";
import Text from "./text";
import Post from "../index";
import 'react-quill/dist/quill.snow.css';

const PostCreate = () => {
    const [value, setValue] = useState("")
    const [section, setSection] = useState("title")

    return (
        <>
            <div className="mt-2 p-2 container border rounded">
                <div>
                    {section === "title" && <><div className="mb-3">
                        <label htmlFor="titleInput" className="form-label">Blog Title</label>
                        <input type="text" className="form-control" id="titleInput"></input>
                        <div id="titleHelp" className="form-text">Write your title here within 100 words</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="imageFile" className="form-label">Insert Image</label>
                        <div className={"d-flex flex-row justify-content-between"}>
                            <input className="form-control me-3" type="file" id="imageFile"></input>
                            <button type="button" className="btn btn-info ">Save</button>
                        </div>
                    </div></>}

                    {section === "text" && <Text/>}
                    {section === "image" && <Image img={[]}/>}

                </div>
            </div>
            <Post/>
        </>
    )
}
export default PostCreate
