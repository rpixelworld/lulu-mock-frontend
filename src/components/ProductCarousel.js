import { useEffect, useRef, useState } from "react";
import "../assets/css/ProductCarousel.scss";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./Add-MinusMark";
import { PicturesDialog } from "./PicturesDialog";
import { useSearchParams } from "react-router-dom";

export const ProductCarousel = ({ product, colorIndex }) => {
  const [bigImg, setBigImg] = useState(
    product.images[colorIndex].mainCarousel.media.split(" | ")[0],
  );
  const [queryParams] = useSearchParams();
  const [selectedColorIndex, setSelectedColorIndex] = useState(colorIndex);
  const [index, setIndex] = useState(0);
  const imgRef = useRef(null);

  const [openDialog, setOpenDialog] = useState(false);
  const handleDialogOpen = (e) => {
    setOpenDialog(true);
    console.log(e.target);
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  // const handleNavMouseEnter = () => {
  // console.log('mouse enter', imgRef.current)
  // imgRef.current.removeEventListener('click', {handleDialogOpen})
  // }

  useEffect(() => {
    console.log("color index change to ===>", colorIndex);
    setSelectedColorIndex(colorIndex);
    setBigImg(product.images[colorIndex].mainCarousel.media.split(" | ")[0]);
  }, [colorIndex]);

  useEffect(() => {
    let activeColor = queryParams.get("color");
    for (let i = 0; i < product.swatches.length; i++) {
      if (activeColor === product.swatches[i].colorId) {
        setSelectedColorIndex(i);
        setBigImg(product.images[i].mainCarousel.media.split(" | ")[0]);
        break;
      }
    }
  }, []);

  const handleImageClick = (item) => {
    setBigImg(item);
  };

  const handleNextPage = (e) => {
    let imgs =
      product.images[selectedColorIndex].mainCarousel.media.split(" | ");
    if (index < imgs.length) {
      const newIndex = index + 1;
      // console.log(newIndex)
      setIndex(newIndex);
      setBigImg(imgs[newIndex]);
    }
    if (index === imgs.length - 1) {
      const newIndex = 0;
      setIndex(newIndex);
      setBigImg(imgs[newIndex]);
    }
    e.stopPropagation();
  };
  const handlePrevPage = (e) => {
    let imgs =
      product.images[selectedColorIndex].mainCarousel.media.split(" | ");
    if (index === 0) {
      const newIndex = imgs.length - 1;
      setIndex(newIndex);
      setBigImg(imgs[newIndex]);
    }
    if (index > 0) {
      const newIndex = index - 1;
      setIndex(newIndex);
      setBigImg(imgs[newIndex]);
    }
    e.stopPropagation();
  };

  return (
    <div className="upperContainer">
      {/*partOfLeft*/}
      <div className="productCarousel">
        {/*bigBackground*/}
        <div
          className="bigImg"
          ref={imgRef}
          onClick={handleDialogOpen}
          style={{
            background: bigImg
              ? `url('${bigImg}') no-repeat center center / cover`
              : "none",
          }}
        >
          {/*SIDEARROW*/}
          <div className=" navBar">
            <div
              style={{
                width: "48px",
                height: "48px",
                background: "white",
                margin: "5px",
                borderRadius: "5px",
              }}
            >
              <ChevronLeftIcon className="nav-icon" onClick={handlePrevPage} />
            </div>
            <div
              style={{
                width: "48px",
                height: "48px",
                background: "white",
                margin: "5px",
                borderRadius: "5px",
              }}
            >
              <ChevronRightIcon className="nav-icon" onClick={handleNextPage} />
            </div>
          </div>
          <div onClick={handleDialogOpen} className="magnifiers"></div>
        </div>
        <PicturesDialog
          isOpen={openDialog}
          dialogIsClosed={handleDialogClose}
          title={product.name}
          pictures={product.images[selectedColorIndex].mainCarousel.media.split(
            " | ",
          )}
        />
        {/*CAROUSEL*/}
        <div className="productList">
          {product &&
            product.images[selectedColorIndex].mainCarousel.media
              .split(" | ")
              .map((item, index) => (
                <div key={index} className="smallImgList">
                  <img
                    className="img-list-item"
                    onClick={() => handleImageClick(item)}
                    src={item}
                    alt=""
                  />
                </div>
              ))}
          <div className="smallImgList">
            <svg
              height="36"
              width="36"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="product-media-carousel_thumbnailImage__XG3rS product-media-carousel_tagIcon__RDuKa"
              focusable="false"
              role="img"
              aria-hidden="true"
            >
              <g fill="currentColor" fill-rule="evenodd">
                <path d="m22.283 11.802-.016-7.696-1.614 1.615.029 6.017-10.355 10.355-8.653-8.653L11.96 3.11l6.074.013 1.625-1.626-7.697-.016c-.41 0-.794.16-1.085.452L.45 12.36a1.519 1.519 0 0 0-.011 2.146l8.82 8.82a1.52 1.52 0 0 0 2.146-.01l10.429-10.43c.285-.285.449-.681.449-1.085"></path>
                <path d="m14.404 9.374-.012-.012a1.837 1.837 0 0 1 0-2.596l2.052-2.052a3.44 3.44 0 0 0-3.186.919 3.45 3.45 0 0 0 0 4.876 3.451 3.451 0 0 0 4.875 0 3.437 3.437 0 0 0 .919-3.187L17 9.374a1.838 1.838 0 0 1-2.597 0"></path>
                <path d="m21.82.872-.63.629-1.624 1.625-2.033 2.033-1.208 1.209-1.165 1.165a.751.751 0 0 0 0 1.062l.012.01a.752.752 0 0 0 1.06 0l1.166-1.164 1.208-1.21 2.039-2.038 1.619-1.62L24 .84a1.57 1.57 0 0 0-2.181.033"></path>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
