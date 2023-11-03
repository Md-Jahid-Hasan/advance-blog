import React, {useState, useEffect} from "react";

const Image = ({img, imageStyle}) => {
    const [allImage, setAllImage] = useState([])
    const [imagePosition, setImagePosition] = useState("")

    useEffect(() => {
        setAllImage(img)
    }, [img])

    useEffect(() => {
        setImagePosition(imageStyle)
    }, [imageStyle])
    // console.log(allImage)
      return (
          <div className={imagePosition}>
              {allImage.map((image, index) => (
                  <div className={"col-md-4"}>
                    <img src={image} alt={""} key={index} className={"img-fluid rounded "} style={{"height":"15rem"}}/>
                  </div>
              ))}
          </div>
      )
}

export default Image