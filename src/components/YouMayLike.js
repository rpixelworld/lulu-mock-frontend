import '../assets/css/YouMayLike.scss'
import Constants from "../Constants";
import {Link} from "react-router-dom";
export const YouMayLike = ({recommendations}) => {

    return (
        <section className="youmaylike-wrapper">
            <div style={{maxWidth: '87px'}}>
                <h4>You may like</h4>
                {recommendations.map(prod =>
                    <div className="recommend-product">
                        <Link className='picture-link' to={`${Constants.LOCAL_BASE_URL}/product/${prod.productId}?colour=${prod.images[0].colorId}`} alt={prod.name} >
                            <img src={prod.images[0].mainCarousel.media.split(' | ')[0]} alt={prod.name } />
                        </Link>
                        <Link to={`${Constants.LOCAL_BASE_URL}/product/${prod.productId}?colour=${prod.images[0].colorId}`} className="title-link">{prod.name}</Link>
                    </div>
                )}
                {/*<div className="recommend-product">*/}
                {/*    <a className='picture-link' href="">*/}
                {/*        <img*/}
                {/*            src="https://images.lululemon.com/is/image/lululemon/LW9FLAS_067801_1?wid=174&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72"*/}
                {/*            alt=""/>*/}
                {/*    </a>*/}
                {/*    <a href="" className="title-link">Dual Pouch Wristlet</a>*/}

                {/*</div>*/}
            </div>
        </section>
    )
}