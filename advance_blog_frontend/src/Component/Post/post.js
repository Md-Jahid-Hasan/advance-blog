import React from "react";
import image from "../../publicImage/fe-1.webp"
import PlainText from "./plainText";
import TextImage from "./textImage";

const Post = () => {
    return (
        <div className="p-3">
            {/* Header of the post */}
            <div className="card mb-3">
                <img src={image} className="card-img" style={{height: "250px"}} alt="..."></img>
                <div className="card-img-overlay d-flex align-items-center p-3 p-sm-4">
                    <div className="w-100 my-auto">
                        <h5 className="card-title text-center align-middle text-white">Blog title</h5>
                        {/*<p className="card-text">This is a wider card with supporting text below as a natural lead-in to*/}
                        {/*    additional content. This content is a little bit longer.</p>*/}
                        {/*<p className="card-text"><small>Last updated 3 mins ago</small></p>*/}
                    </div>
                </div>
            </div>

            {/*    Post body Start*/}
            <PlainText/>
            <TextImage/>
        </div>
)
}


export default Post