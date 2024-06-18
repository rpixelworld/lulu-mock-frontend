import axios from "axios";
import Constants from "../../Constants";
import product from "../../components/Product";

export const fetchProducts = (pageNo=1, filters={})=> dispatch => {
    let url = `${Constants.BASE_URL}/product/allProducts?page=${pageNo}&mykey=${Constants.MY_KEY}`
    // let url = Constants.LOCAL_BASE_URL + `/data/mock_allproducts_${pageNo}.json`
    let options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(filters)
    }
    fetch(url, options)
        .then(resp => {
            if(resp.ok){
                return resp.json()
            }
        })
        .then(result => {
            // console.log(result)
            if(pageNo>1){
                dispatch({
                    type: Constants.ACTION_FETCH_PRODUCTLIST_MORE,
                    payload: result.rs
                })
            }
            else{
                dispatch({
                    type: Constants.ACTION_FETCH_PRODUCTLIST,
                    payload: result.rs
                })
            }

        })
}

export const fetchRecommendations = (productId, filters={})=> dispatch => {
    let url = `${Constants.BASE_URL}/product/allProducts?page=1&mykey=${Constants.MY_KEY}`
    // let url = Constants.LOCAL_BASE_URL + `/data/mock_allproducts_${pageNo}.json`
    let options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(filters)
    }
    // console.log("filter======>", filters)
    fetch(url, options)
        .then(resp => {
            if(resp.ok){
                return resp.json()
            }
        })
        .then(result => {
            // console.log(result)
            dispatch({
                type: Constants.ACTION_FETCH_RECOMMENDATIONS,
                payload: {
                    productId: productId,
                    recommends: result.rs
                }
            })
        })
}

export const sortProduct = (sortBy=4) => {
    return {
        type: Constants.ACTION_SORT_PRODUCTLIST,
        payload: sortBy
    }
}

export const fetchProductDetail = (productId) => dispatch => {
    // let url = `${Constants.BASE_URL}/product/${productId}?mykey=${Constants.MY_KEY}`
    let url = Constants.LOCAL_BASE_URL + '/data/product_'+productId+'.json'
    // console.log(url)
    fetch(url)
        .then(resp => {
            // console.log(resp)
            if (resp.ok) {
                return resp.json()
            }
        })
        .then(res => {
            dispatch({
                type: Constants.ACTION_FETCH_PRODUCT_DETAIL,
                payload: res.rs
            })
        })
}

export const fetchProductCatagories = (productId) => dispatch => {
    let url = Constants.LOCAL_BASE_URL + '/data/products_catagories.json'
    fetch(url)
        .then(resp => {
            if (resp.ok) {
                return resp.json()
            }
        })
        .then(res => {
            dispatch({
                type: Constants.ACTION_FETCH_PRODUCT_CATAGORY,
                payload: res[productId]
            })
        })
}