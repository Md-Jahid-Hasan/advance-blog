import React from "react";
import PlainText from "./plainText";
import Image from "./image";
import img1 from "../../publicImage/1.jpg"
import img2 from "../../publicImage/2.webp"
import img3 from "../../publicImage/3.jpg"
import img4 from "../../publicImage/4.jpeg"
import img5 from "../../publicImage/5.jpeg"
import img6 from "../../publicImage/6.jpg"
import img7 from "../../publicImage/7.jpg"

const TextImage = () => {
    const imgset_1 = [img1, img2, img3, img4, img5, img6];
    const imgset_2 = [img1];
    const imgset_3 = [img1, img2, img3, img4, img5, img6, img7];
    const imgset_4 = [img1, img2, img3];

    return (
      <div>
          <PlainText/>
          <Image img={imgset_1} imageStyle={"row g-2 my-1"}/>
      </div>
  )
}

export default TextImage