import '../assets/css/ProductDetail.scss'
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchProductCatagories, fetchProductDetail, fetchProducts} from "../redux/actions/productAction";
import {Breadcrumb} from "../components/Breadcrumb";
import {YouMayLike} from "../components/YouMayLike";
import {fetchTemplateFilters} from "../redux/actions/filterAction";
import {Breadsrumb_CatagoryIndex} from "../Constants";
import {YouMayAlsoLike} from "../components/YouMayAlsoLike";

export const ProductDetail = () => {

    let valuePassed = useParams();
    const dispatch = useDispatch()
    const productDetail = useSelector(state => state.productReducer.productDetail)
    const templateFilters = useSelector(state => state.productReducer.templateFilters)
    const productCatagories = useSelector(state => state.productReducer.productCatagories)

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
        return (
            <div className='productdetail-container'>
                <div className="productdetail-container-wrapper">

                    <div className="productintro-container">
                        <div className="recommendation-container">
                            <h2>Carousel</h2>
                        </div>
                        <div className="detailinfo-container">
                            <Breadcrumb/>
                            <h2>Product Introduction & detail</h2>
                            <h2>{productDetail.productId}</h2>
                            <h2>{productDetail.name}</h2>
                        </div>
                        <div className="verticalrecos-container">
                            <YouMayLike />
                        </div>
                    </div>

                    <div className="whywemadethis-container">
                        <h2>Why we made this</h2>
                    </div>

                    <div className="featurepanel-container">
                        <h2>Features Panel</h2>
                    </div>

                    <div className="youmayalsolike-container">
                        <YouMayAlsoLike />
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