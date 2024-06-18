import '../assets/css/Breadcrumb.scss'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Breadsrumb_CatagoryIndex} from "../Constants";
import {fetchProducts, fetchRecommendations} from "../redux/actions/productAction";
export const Breadcrumb = () => {

    const [categoryArr, setCategoryArr] = useState([])

    const dispatch = useDispatch()
    const productDetail = useSelector(state => state.productReducer.productDetail)
    const productCatagories = useSelector(state => state.productReducer.productCatagories)
    const templateFilters = useSelector(state => state.productReducer.templateFilters)

    useEffect(() => {
        console.log("use effect frm breadcrumb")
        if(productCatagories && productCatagories.length>0){
            setCategoryArr(productCatagories.split('|'))
        }
    }, [productCatagories]);


    useEffect(() => {
        console.log(templateFilters, categoryArr)
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
            console.log("fetch recommend")
            dispatch(fetchRecommendations(productDetail.productId, recommendFilters))
        }
    }, [categoryArr, templateFilters]);

    return (
        <nav>
            <ul className="breadcrumb">
                {categoryArr.map((cat, index) => {
                    return (
                        <li data-slash={index!=categoryArr.length-1?'/':''}>
                            <a href="">{cat}</a>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}