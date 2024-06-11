import '../assets/css/ProductList.scss'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {fetchProducts} from "../redux/actions/productAction";

export const ProductList = ()=> {

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productReducer.productList)
    const pagination = useSelector(state => state.productReducer.pagination)

    //for infinite scrolling
    const handleScroll = ()=> {
        // console.log("scrolling")
        let scrollY = window.scrollY;
        let windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        // console.log('scrollY===>', scrollY, 'windowHeight===>', windowHeight, 'documentHeight===>', documentHeight)
        if (scrollY + windowHeight >= documentHeight - 100) {
            console.log("last line, scroll listener removed")
            window.removeEventListener('scroll', handleScroll);
            if(pagination && pagination.curPage<pagination.totalPage){
                dispatch(fetchProducts(pagination.curPage+1))
            }

        }
    }


    useEffect(() => {
        dispatch(fetchProducts())
    }, []);

    useEffect(() => {
        // console.log("add listener")
        window.addEventListener('scroll', handleScroll)
        // return () => {
        //     window.removeEventListener('scroll', handleScroll);
        //     console.log("remove listener")
        // };
    }, [productList])

    return (
        <div className="productlist-container">
            <div className="row">
                {productList
                    && productList.length > 0
                    && productList.map((prod, index) => {
                        return (
                            <div key={prod.productId + index} className="product">
                                <p>{index+1}</p>
                                <p>{prod.productId}</p>
                                <p>{prod.name}</p>
                                <p>{prod.price}</p>
                            </div>
                        )
                    })
                }
                {/*<div className="product"></div>*/}
                {/*<div className="product"></div>*/}
                {/*<div className="product"></div>*/}
                {/*<div className="product"></div>*/}
                {/*<div className="product"></div>*/}
                {/*<div className="product"></div>*/}
            </div>
        </div>
    )
}