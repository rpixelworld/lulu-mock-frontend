import Constants from "../Constants";
import {useState} from "react";
import {Link} from "react-router-dom";

export const ProductYouMayAlsoLike = ({product}) => {

    const [showCarousel, setShowCarousel] = useState(false)
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
    return (
        <li className="swiper-slide" onMouseEnter={toggleCarousel} onMouseLeave={toggleCarousel}>
            <div className="product-tile">
                <a href={currentLink} alt={product.productId}>
                    <div className="imageAlt-container" onMouseEnter={() => { altImg(true)
                    }} onMouseOut={() => { altImg(false)}}></div>
                    <div className="image-container"
                         style={{backgroundImage: `url(${currentBg})`}}></div>

                    {showCarousel &&
                        <div className="palette-container">
                            <ul className="palette">
                                {product.swatches.map((swatch, cIndex) =>
                                    <li key={swatch.colorId} className='color' onMouseEnter={()=>{switchColor(cIndex)}}>
                                        <a href={currentLink}>
                                            <img className={currentColorIndex==cIndex?'active-color':''}
                                                src={swatch.swatch}
                                                alt={swatch.swatchAlt}/>
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </div>
                    }
                </a>
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