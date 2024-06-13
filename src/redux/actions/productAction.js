import axios from "axios";
import Constants from "../../Constants";

export const fetchProducts = (pageNo=1, filters={})=> dispatch => {
    let url = `${Constants.BASE_URL}/product/allProducts?page=${pageNo}&mykey=${Constants.MY_KEY}`
    // let url = `./data/mock_allproducts_${pageNo}.json`
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
            console.log(result)
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