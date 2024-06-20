import '../assets/css/Product.scss';
import React, {useState} from 'react';
import { LikedProducts } from './LikedProducts';
import {useLikedProducts} from "../hook/useLikedProducts";

import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import Constants from "../Constants";
import {Link} from "react-router-dom";



const Product = ({ product }) => {
    const [currentImage, setCurrentImage] = useState(product.images[0].whyWeMadeThis[0])
    const [currentColorIndex, setCurrentColorIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(0)
    const [hoveredColorId, setHoveredColorId] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [currentLink, setCurrentLink] = useState(`${Constants.LOCAL_BASE_URL}/product/${product.productId}?color=${product.images[currentColorIndex].colorId}`)
    const colorsPerPage = 7
    const { likedProducts, toggleLike } = useLikedProducts();

    if (!product || !product.name || !product.swatches) {
        console.error('Invalid product object:', product);
        return null;
    }

    const handleImageHover = (isHovering) => {
        const imageToShow = isHovering ? product.images[currentColorIndex].whyWeMadeThis[1] : product.images[currentColorIndex].whyWeMadeThis[0];
        setCurrentImage(imageToShow);
    }
    const handleColorHover = (colorId, isHovering) => {
        const colorImageObject = product.images.find((img, index) => {
            if (img.colorId === colorId) {
                setCurrentColorIndex(index)
                return true
            }
            return false
        })
        if (colorImageObject) {
            setCurrentImage(colorImageObject.whyWeMadeThis[0])
        }
        setHoveredColorId(colorId);
        setCurrentLink(`${Constants.LOCAL_BASE_URL}/product/${product.productId}?color=${colorId}`)
    }

    const handleNextPage = () => {
            setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(product.swatches.length / colorsPerPage) - 1))

    }

    const handlePrevPage = () => {
            setCurrentPage((page) => Math.max(page - 1, 0))
    }

    const displayColors = product.swatches.slice(currentPage * colorsPerPage, (currentPage + 1) * colorsPerPage)

    const handleCheckboxClick = () => {
        setIsChecked(!isChecked);
    };

    return(
        <div className="product">
            <div className="products-grid">
                <div className="product-grid">
                    <div className="image-wrapper"
                         onMouseEnter={() => handleImageHover(true)}
                         onMouseLeave={() => handleImageHover(false)}
                    >
                        <a href={currentLink}><img
                            className="product-image"
                            src={currentImage}
                            alt={product.name}
                        /></a>
                    </div>
                    <LikedProducts
                        productId={product.productId}
                        isLiked={likedProducts.includes(product.productId)}
                        toggleLike={toggleLike}
                    />
                </div>
            </div>
            <div className="product-details">
                <div className="color-carousel">
                    {product.swatches.length >= 8 && (
                        <button onClick={handlePrevPage}
                                className="carousel-button prev-button"
                                disabled={currentPage === 0}
                        >
                            &lt;
                        </button>
                    )}
                        {displayColors.map((swa) => (
                            <div
                                key={swa.colorId}
                                className={`color-circle ${hoveredColorId === swa.colorId ? 'hovered' : ''}`}
                                onMouseEnter={() => handleColorHover(swa.colorId)}
                            >
                                <a href={currentLink}><img src={swa.swatch} alt={swa.swatchAlt}/></a>
                                <div className="tooltip">{swa.swatchAlt}</div>
                            </div>
                        ))}
                    {product.swatches.length >= 8 && currentPage < Math.floor(product.swatches.length / colorsPerPage) && (
                        <button onClick={handleNextPage}
                                className="carousel-button next-button"
                                disabled={(currentPage + 1) * colorsPerPage >= product.swatches.length}
                        >
                            &gt;
                        </button>
                    )}
                </div>
                <div className="title-and-price">
                    <div className="product-name">
                        <div>{product.name}</div>
                    </div>
                    <div className="product-price">
                        <div>{product.price.slice(0, -4)}</div>
                    </div>
                </div>
            </div>
            <div
                className="compare-checkbox"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleCheckboxClick}
            >
                {!isChecked ? (
                    isHovered ? (
                        <CheckBoxOutlinedIcon/>
                    ) : (
                        <CheckBoxOutlineBlankOutlinedIcon/>
                    )
                ) : (
                    <CheckBoxIcon/>
                )}
                <label>Compare</label>
            </div>
        </div>
    );
};

export default Product;
