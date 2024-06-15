import '../assets/css/ProductDetail.scss'
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchProductDetail} from "../redux/actions/productAction";

export const ProductDetail = () => {

    let valuePassed = useParams();
    const dispatch = useDispatch()
    const productDetail = useSelector(state => state.productReducer.productDetail)

    useEffect(() => {
        if(valuePassed && valuePassed.productId){
            dispatch(fetchProductDetail(valuePassed.productId))
        }
    }, [valuePassed]);

    if(productDetail) {
        return (
            <div className='productdetail-container'>
                <div className="productdetail-container-wrapper">

                    <div className="productintro-container">
                        <div className="carousel-container">

                        </div>
                        <div className="detailinfo-container">
                            <h1>{productDetail.productId}</h1>
                            <h2>{productDetail.name}</h2>
                        </div>
                        <div className="verticalrecos-container">

                        </div>
                    </div>

                    <div className="whywemadethis-container">
                        <h2>Why we made this</h2>
                    </div>

                    <div className="featurepanel-container">
                        <h2>Features Panel</h2>
                    </div>

                    <div className="youmayalsolike-container">
                        <h2>You may also like</h2>
                    </div>

                    <div className="reviews-container">
                        <h2>Reviews</h2>
                    </div>

                </div>

            </div>
        )
    }

}