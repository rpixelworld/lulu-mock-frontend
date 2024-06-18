import '../assets/css/YouMayAlsoLike.scss'

import {useSelector} from "react-redux";
import {ProductYouMayAlsoLike} from "./ProductYouMayAlsoLike";

export const YouMayAlsoLike = ()=> {

    const youMayAlsoLike = useSelector(state => state.productReducer.youMayAlsoLike)
    console.log('youMayAlsoLike=====>', youMayAlsoLike)
    return (
        <>
            <div className="title">
                <h2>You may also like</h2>
            </div>
            <div className='recommendation-container'>
                <div className="swiper-container">
                    <ul className="swiper-wrapper">
                        {youMayAlsoLike && youMayAlsoLike.map((product) =>
                            <ProductYouMayAlsoLike key={product.productId} product={product} />
                        )}
                        {/*<li className="swiper-slide">*/}
                        {/*    <div className="product-tile">*/}
                        {/*        <a href="#">*/}
                        {/*            <div className="image-container"></div>*/}
                        {/*            {showCarousel[0] &&*/}
                        {/*                <div className="palette-container">*/}
                        {/*                    <ul className="palette">*/}
                        {/*                        <li className='color'>*/}
                        {/*                            <a href="">*/}
                        {/*                                <img*/}
                        {/*                                    src="https://images.lululemon.com/is/image/lululemon/45609?wid=68&hei=68&fit=crop,1&op_usm=0.8,1,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72"*/}
                        {/*                                    alt=""/>*/}
                        {/*                            </a>*/}
                        {/*                        </li>*/}
                        {/*                        <li className='color'>*/}
                        {/*                            <a href="">*/}
                        {/*                                <img*/}
                        {/*                                    src="https://images.lululemon.com/is/image/lululemon/45609?wid=68&hei=68&fit=crop,1&op_usm=0.8,1,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72"*/}
                        {/*                                    alt=""/>*/}
                        {/*                            </a>*/}
                        {/*                        </li>*/}
                        {/*                        <li className='color'>*/}
                        {/*                            <a href="">*/}
                        {/*                                <img*/}
                        {/*                                    src="https://images.lululemon.com/is/image/lululemon/45609?wid=68&hei=68&fit=crop,1&op_usm=0.8,1,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72"*/}
                        {/*                                    alt=""/>*/}
                        {/*                            </a>*/}
                        {/*                        </li>*/}
                        {/*                    </ul>*/}
                        {/*                </div>*/}
                        {/*            }*/}

                        {/*        </a>*/}


                        {/*        <div className="details">*/}
                        {/*            <div className="product-name">*/}
                        {/*                <a href=""><h3>lululemon Align™ High-Rise Mini-Flare Pant</h3></a>*/}
                        {/*            </div>*/}
                        {/*            <div className="price">*/}
                        {/*                <span className="number">$59 - $89</span>*/}
                        {/*                <span className='currency'> CAD</span>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</li>*/}
                        {/*<li className="swiper-slide"></li>*/}
                        {/*<li className="swiper-slide"></li>*/}
                        {/*<li className="swiper-slide"></li>*/}
                    </ul>
                </div>
            </div>
        </>
    )
}