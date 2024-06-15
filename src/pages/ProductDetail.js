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
        return <>
            <h1>{productDetail.productId}</h1>
            <h2>{productDetail.name}</h2>
        </>
    }

}