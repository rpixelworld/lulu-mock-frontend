import { useEffect, useState } from "react";
import "../assets/css/WhyWeMadeThis.scss";
import { useSearchParams } from "react-router-dom";
import { getRandomInt } from "../Helper";

export const WhyWeMadeThis = ({ product, colorIndex }) => {
  const [queryParams] = useSearchParams();
  const [selectedColorIndex, setSelectedColorIndex] = useState(colorIndex);

  useEffect(() => {
    console.log("color index change to ===>", colorIndex);
    setSelectedColorIndex(colorIndex);
  }, [colorIndex]);

  useEffect(() => {
    let activeColor = queryParams.get("color");
    for (let i = 0; i < product.swatches.length; i++) {
      if (activeColor === product.swatches[i].colorId) {
        setSelectedColorIndex(i);
        break;
      }
    }
  }, []);

  return (
    <div className="WWMT-container">
      <div className="title">
        <h1 className="WWMT">Why we made this</h1>
        <p>
          Go ahead, get sweaty. The Swiftly Tech collection, powered by seamless
          construction, is the ultimate gear for running and training.
        </p>
      </div>
      <div className="img-content">
        {product.images[selectedColorIndex].whyWeMadeThis.map((item, index) => (
          <img className="WWMT-img" key={index} src={item} alt="" />
        ))}
      </div>
    </div>
  );
};
