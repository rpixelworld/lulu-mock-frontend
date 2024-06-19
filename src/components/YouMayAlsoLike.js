import '../assets/css/YouMayAlsoLike.scss'

import {useSelector} from "react-redux";
import {ProductYouMayAlsoLike} from "./ProductYouMayAlsoLike";

export const YouMayAlsoLike = ()=> {

    const youMayAlsoLike = useSelector(state => state.productReducer.youMayAlsoLike)
    console.log('youMayAlsoLike=====>', youMayAlsoLike)

    if(youMayAlsoLike && youMayAlsoLike.length>0) {
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
                    </ul>
                </div>
            </div>
        </>
    )}
}