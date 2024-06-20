import Constants from "../Constants";
import React, {useState} from "react";
import {Link} from "react-router-dom";

export const ProductYouMayAlsoLike = ({product}) => {

    const [showCarousel, setShowCarousel] = useState(false)
    const colorsPerPage = 7
    const [currentPage, setCurrentPage] = useState(0)
    // const [displayPalettes, setDisplayPalettes] = useState(product.swatches.slice(0 * colorsPerPage, (0 + 1) * colorsPerPage))
    const [currentColorIndex, setCurrentColorIndex] = useState(0)
    const [currentBg, setCurrentBg] = useState(product.images[currentColorIndex].mainCarousel.media.split(' | ')[0]);
    const [currentLink, setCurrentLink] = useState(`${Constants.LOCAL_BASE_URL}/product/${product.productId}?color=${product.images[currentColorIndex].colorId}`)

    const toggleCarousel = () =>{
        setShowCarousel(prev => !prev)
    }

    const altImg = (whyWeMadeThis)=> {
        console.log("altimg")
        if(whyWeMadeThis){
            setCurrentBg(product.images[currentColorIndex].whyWeMadeThis[0]);
        }
        else {
            setCurrentBg(product.images[currentColorIndex].mainCarousel.media.split(' | ')[0])
        }
    }

    const switchColor = (cIndex)=> {
        setCurrentColorIndex(cIndex)
        setCurrentBg(product.images[cIndex].mainCarousel.media.split(' | ')[0])
        setCurrentLink(`${Constants.LOCAL_BASE_URL}/product/${product.productId}?color=${product.images[cIndex].colorId}`)
    }

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(product.swatches.length / colorsPerPage) - 1))
        // setDisplayPalettes(product.swatches.slice(currentPage * colorsPerPage, (currentPage + 1) * colorsPerPage))
    }

    const handlePrevPage = () => {
        setCurrentPage((page) => Math.max(page - 1, 0))
        // setDisplayPalettes(product.swatches.slice(currentPage * colorsPerPage, (currentPage + 1) * colorsPerPage))
    }

    const displayPalettes = product.swatches.slice(currentPage * colorsPerPage, (currentPage + 1) * colorsPerPage)

    return (
        <li className="swiper-slide" onMouseEnter={toggleCarousel} onMouseLeave={toggleCarousel}>
            <div className="product-tile">
                <a href={currentLink} alt={product.productId}>
                    <div className="imageAlt-container" onMouseEnter={() => { altImg(true)
                    }} onMouseOut={() => { altImg(false)}}></div>
                    <div className="image-container"
                         style={{backgroundImage: `url(${currentBg})`}}></div>
                </a>
                    {showCarousel &&
                        <div className="palette-container">
                            {product.swatches.length >= 8 && (
                                <button onClick={handlePrevPage}
                                        className="carousel-button prev-button"
                                        disabled={currentPage === 0}
                                >
                                    &lt;
                                </button>
                            )}
                            <ul className="palette">
                                {displayPalettes.map((swatch, cIndex) =>
                                    <li key={swatch.colorId} className='color' onMouseEnter={()=>{switchColor(cIndex)}}>
                                        <a href={currentLink}>
                                            <img className={currentColorIndex==cIndex?'active-color':''}
                                                src={swatch.swatch}
                                                alt={swatch.swatchAlt}/>
                                        </a>
                                    </li>
                                )}
                            </ul>
                            {product.swatches.length >= 8 && currentPage < Math.floor(product.swatches.length / colorsPerPage) && (
                                <button onClick={handleNextPage}
                                        className="carousel-button next-button"
                                        disabled={(currentPage + 1) * colorsPerPage >= product.swatches.length}
                                >
                                    &gt;
                                </button>
                            )}
                        </div>
                    }
                {/*</a>*/}
                <div className="details">
                    <div className="product-name">
                    <a href=""><h3>{product.name}</h3></a>
                    </div>
                    <div className="price">
                        <span className="number">{product.price.replace('CAD', '')}</span>
                        <span className='currency'> CAD</span>
                    </div>
                </div>
            </div>
        </li>
    )
}