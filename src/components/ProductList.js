import '../assets/css/ProductList.scss'
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchProducts} from "../redux/actions/productAction";

export const ProductList = ()=> {

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productReducer.productList)
    const pagination = useSelector(state => state.productReducer.pagination)
    const selectedFilters = useSelector(state => state.productReducer.selectedFilters)

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
                dispatch(fetchProducts(pagination.curPage+1, selectedFilters))
            }
        }
    }

    const handleViewMore = ()=> {
        dispatch(fetchProducts(pagination.curPage+1, selectedFilters))
    }

    useEffect(() => {
        dispatch(fetchProducts())
    }, []);

    useEffect(() => {
        if(pagination.curPage==1 && pagination.totalPage>1) {
            window.addEventListener('scroll', handleScroll)
        }
    }, [productList])

    return (<>
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
            </div>
        </div>
        <div className="paging-container">
            <p>View&nbsp;
                { pagination.curPage==pagination.totalPage
                    ? pagination.totalProducts
                    : pagination.curPage*pagination.perPage}
                &nbsp;of&nbsp;
                {pagination.totalProducts}
            </p>
            {pagination.totalPage > pagination.curPage
                ? <button type='button' onClick={handleViewMore}>view more products</button>
                : ''}
        </div>
    </>)
}