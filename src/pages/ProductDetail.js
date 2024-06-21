import '../assets/css/ProductDetail.scss'
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchProductCatagories, fetchProductDetail, fetchProducts} from "../redux/actions/productAction";
import {Breadcrumb} from "../components/Breadcrumb";
import {Reviews} from "../components/Reviews";
import {YouMayLike} from "../components/YouMayLike";
import {fetchTemplateFilters} from "../redux/actions/filterAction";
import {Breadsrumb_CatagoryIndex} from "../Constants";
import {YouMayAlsoLike} from "../components/YouMayAlsoLike";
import {FeaturePanel} from "../components/FeaturesPanel";
import {ProductCarousel} from "../components/ProductCarousel";
import {WhyWeMadeThis} from "../components/WhyWeMadeThis";
import ProductInfo from "../components/ProductInfo";

export const ProductDetail = () => {

    let valuePassed = useParams();
    const dispatch = useDispatch()
    const productDetail = useSelector(state => state.productReducer.productDetail)
    const templateFilters = useSelector(state => state.productReducer.templateFilters)
    const productCatagories = useSelector(state => state.productReducer.productCatagories)
    const [colorSelected, setColorSelected] = useState('')


    useEffect(() => {

        dispatch(fetchTemplateFilters())
    }, []);

    useEffect(() => {
        if(valuePassed && valuePassed.productId){
            dispatch(fetchProductDetail(valuePassed.productId))
            // dispatch(fetchProductCatagories(valuePassed.productId))
        }
    }, [valuePassed]);

    if(productDetail && productDetail.productId) {
        document.title = productDetail.name
        return (
            <div className='productdetail-container'>
                <div className="productdetail-container-wrapper">

                    <div className="productintro-container">
                        <div className="carousel-container">
                            <ProductCarousel  details={productDetail} colorIds={colorSelected}/>
                        </div>
                        <div className="detailinfo-container">
                            <Breadcrumb />
                            <ProductInfo details={productDetail} colorId={setColorSelected}/>
                        </div>
                        <div className="verticalrecos-container">
                            <YouMayLike />
                        </div>
                    </div>

                    <div className="whywemadethis-container">
                        <WhyWeMadeThis details={productDetail} colorIds={colorSelected}/>
                    </div>

                    <div className="featurepanel-container">
                        <FeaturePanel product={productDetail} />
                    </div>

                    <div className="youmayalsolike-container">
                        <YouMayAlsoLike />
                    </div>

                    <div className="reviews-container">
                        <Reviews/>
                    </div>

                </div>

            </div>
        )
    }
    else {
        return <div className='productdetail-container'>
            <div className="productdetail-container-wrapper">
                <h2 style={{textAlign: "center"}}>Not available</h2>
            </div>
        </div>
    }

}
