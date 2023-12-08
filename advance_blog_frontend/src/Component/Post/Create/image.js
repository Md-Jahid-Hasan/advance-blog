import React, {useState, useEffect} from "react";
import img1 from "../../../publicImage/insert-image.png"

const Image = ({img}) => {
    const [allImage, setAllImage] = useState([1, 2, 3, 4, 5, 6])

    // useEffect(() => {
    //     setAllImage(img)
    // }, [img])

    // console.log(allImage)
      return (
          <div className={"row g-2 my-1"}>
              {allImage.map((image, index) => (
                  <div className={"col-md-4 text-center"}>
                      <img src={img1} alt={""} key={index} className={"img-fluid rounded "} style={{"height":"10rem"}}/>
                      <input className="form-control form-control-sm" type="file" id="imageFile"></input>
                  </div>
              ))}
          </div>
      )
}

export default Image