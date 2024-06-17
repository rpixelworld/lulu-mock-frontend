import '../assets/css/ProductDetail.scss'
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchProductCatagories, fetchProductDetail} from "../redux/actions/productAction";
import {Breadcrumb} from "../components/Breadcrumb";

export const ProductDetail = () => {

    let valuePassed = useParams();
    const dispatch = useDispatch()
    const productDetail = useSelector(state => state.productReducer.productDetail)
    const productCatagories = useSelector(state => state.productReducer.productCatagories)

    useEffect(() => {
        if(valuePassed && valuePassed.productId){
            dispatch(fetchProductDetail(valuePassed.productId))
            dispatch(fetchProductCatagories(valuePassed.productId))
        }
    }, [valuePassed]);

    // useEffect(() => {
    //     productDetail && dispatch(fetchProductCatagories(productDetail.productId))
    // }, [productDetail]);

    if(productDetail && productDetail.productId) {
        return (
            <div className='productdetail-container'>
                <div className="productdetail-container-wrapper">

                    <div className="productintro-container">
                        <div className="carousel-container">
                            <h2>Carousel</h2>
                        </div>
                        <div className="detailinfo-container">
                            <Breadcrumb catagories={productCatagories}/>
                            <h2>Product Introduction & detail</h2>
                            <h2>{productDetail.productId}</h2>
                            <h2>{productDetail.name}</h2>
                        </div>
                        <div className="verticalrecos-container">
                            <h2>You may like</h2>
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
    else {
        return <div className='productdetail-container'>
            <div className="productdetail-container-wrapper">
                <h2>not available</h2>
            </div>
        </div>
    }

}