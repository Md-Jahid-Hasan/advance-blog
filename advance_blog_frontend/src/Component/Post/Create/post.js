import React, {useState, useRef} from "react";
import Image from "./image";
import Text from "./text";
import Post from "../index";
import 'react-quill/dist/quill.snow.css';

const PostCreate = () => {
    const [post, setPost] = useState({blog_text: []})
    const titleRef = useRef()
    const [titleSection, setTitleSection] = useState({title: "", cover_photo: null})
    const [blogText, setBlogText] = useState({blog_text:[]})
    const [section, setSection] = useState("title")

    const onChangeSection = event => {
        setSection(event.target.value)
    }

    const updatePostTitle = () => {
        setPost(prevState => ({...prevState, ...titleSection}))
    }

    const updatePostBlogSection = (data) => {
        setPost(prevState => ({...prevState, blog_text: [...prevState.blog_text, ...data]}))
    }

    const updateTitleValue = event => {
        if(event.target.name === "cover_photo") setTitleSection(prevState => ({...prevState, [event.target.name]: titleRef.current.files[0]}))
        else setTitleSection(prevState => ({...prevState, [event.target.name]: event.target.value}))
    }

    console.log(post)

    return (
        <>
            <div className="input-group mb-3 mt-3">
                <label className="input-group-text fw-bolder" htmlFor="sectionGroup">Select Section For Edit/Update</label>
                <select className="form-select" id="sectionGroup" onChange={onChangeSection}>
                    <option value="title" selected>Update Title</option>
                    <option value="text">Update Text</option>
                    <option value="image">Update Image</option>
                </select>
            </div>

            <div className="mt-2 p-2 container border rounded">
                <div>
                    {section === "title" && <><div className="mb-3">
                        <label htmlFor="titleInput" className="form-label">Blog Title</label>
                        <input type="text" className="form-control" id="titleInput" name={"title"}
                               onChange={updateTitleValue} value={titleSection.title}></input>
                        <div id="titleHelp" className="form-text">Write your title here within 100 words</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="cover_photo" className="form-label">Insert Image</label>
                        <div className={"d-flex flex-row justify-content-between"}>
                            <input className="form-control me-3" type="file" id="cover_photo" name="cover_photo"
                                   onChange={updateTitleValue} ref={titleRef}></input>
                            <button type="button" className="btn btn-info" onClick={updatePostTitle}>Save</button>
                        </div>
                    </div></>}

                    {section === "text" && <Text updatePostBlogSection={updatePostBlogSection}/>}
                    {section === "image" && <Image img={[]}/>}

                </div>
            </div>
            <Post/>
        </>
    )
}
export default PostCreate
