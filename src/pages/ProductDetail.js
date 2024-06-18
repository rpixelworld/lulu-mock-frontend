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
import {ProductCarousel} from "../components/ProductCarousel";

export const ProductDetail = () => {

    let valuePassed = useParams();
    const dispatch = useDispatch()
    const productDetail = useSelector(state => state.productReducer.productDetail)
    const productCatagories = useSelector(state => state.productReducer.productCatagories)
    const templateFilters = useSelector(state => state.productReducer.templateFilters)
    const recommendProductList = useSelector(state => state.productReducer.productList)

    const [categoryArr, setCategoryArr] = useState([])

    useEffect(() => {
        if(valuePassed && valuePassed.productId){
            dispatch(fetchProductDetail(valuePassed.productId))
            dispatch(fetchProductCatagories(valuePassed.productId))
            dispatch(fetchTemplateFilters())
        }
    }, [valuePassed]);

    useEffect(() => {
        if(productCatagories && productCatagories.length>0){
            setCategoryArr(productCatagories.split('|'))
        }
    }, [productCatagories]);

    useEffect(() => {
        if(templateFilters && templateFilters['Gender']){
            const recommendFilters = JSON.parse(JSON.stringify(templateFilters))
            for(let i=0; i<categoryArr.length; i++) {
                if(i==0 && (categoryArr[0].includes('Men') || categoryArr[0].includes('Women'))){
                    let index = Breadsrumb_CatagoryIndex['Gender'][categoryArr[0]];
                    recommendFilters['Gender'][index].isChecked=true
                }
                else {
                    let index = Breadsrumb_CatagoryIndex['Catagory'][categoryArr[i]];
                    recommendFilters['Category'][index].isChecked=true
                }
            }
            dispatch(fetchProducts(1, recommendFilters))
        }
    }, [categoryArr, templateFilters]);

    if(productDetail && productDetail.productId) {
        return (
            <div className='productdetail-container'>
                <div className="productdetail-container-wrapper">

                    <div className="productintro-container">
                        <div className="carousel-container">
                            <ProductCarousel/>
                        </div>
                        <div className="detailinfo-container">
                            <Breadcrumb catagories={categoryArr}/>
                            <h2>Product Introduction & detail</h2>
                            <h2>{productDetail.productId}</h2>
                            <h2>{productDetail.name}</h2>
                        </div>
                        <div className="verticalrecos-container">
                            {recommendProductList && recommendProductList.length>3 && <YouMayLike recommendations={recommendProductList.slice(0,4)} />}
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
