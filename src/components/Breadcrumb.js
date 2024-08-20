import '../assets/css/Breadcrumb.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Breadsrumb_CatagoryIndex } from '../Constants';
import { fetchProducts, fetchRecommendations } from '../redux/actions/productAction';
export const Breadcrumb = () => {
	const [categoryArr, setCategoryArr] = useState([]);

	const dispatch = useDispatch();
	const productDetail = useSelector(state => state.productReducer.productDetail);
	const productCatagories = useSelector(state => state.productReducer.productCatagories);
	const templateFilters = useSelector(state => state.productReducer.templateFilters);

	// useEffect(() => {
	//     console.log("use effect frm breadcrumb")
	//     if(productCatagories && productCatagories.length>0){
	//         setCategoryArr(productCatagories.split('|'))
	//     }
	// }, [productCatagories]);

	useEffect(() => {
		const catArr = productCatagories.split('|');
		setCategoryArr(catArr);
		if (templateFilters && templateFilters['Gender'] && catArr.length > 0 && catArr[0] != '') {
			const recommendFilters = JSON.parse(JSON.stringify(templateFilters));
			// console.log(recommendFilters, catArr)
			for (let i = 0; i < catArr.length; i++) {
				if (i == 0 && (catArr[0].includes('Men') || catArr[0].includes('Women'))) {
					let index = Breadsrumb_CatagoryIndex['Gender'][catArr[0]];
					recommendFilters['Gender'][index].isChecked = true;
				} else {
					let index = Breadsrumb_CatagoryIndex['Catagory'][catArr[catArr.length - 1]];
					recommendFilters['Category'][index].isChecked = true;
					break;
				}
			}
			// console.log("fetch recommend")
			// console.log('categoryArr===>', productCatagories.split('|'))
			// console.log('recommendFilters===>', recommendFilters)
			dispatch(fetchRecommendations(productDetail.productId, recommendFilters));
		}
	}, [templateFilters]);

	return (
		<nav className="breadcrumb product-info">
			<ul className="breadcrumb">
				{categoryArr.length > 0 &&
					categoryArr[0] != '' &&
					categoryArr.map((cat, index) => {
						return (
							<li data-slash={index != categoryArr.length - 1 ? '/' : ''}>
								<a href="">{cat}</a>
							</li>
						);
					})}
				{categoryArr.length == 1 && categoryArr[0] == '' && (
					<li data-slash="">
						<a href="">NO CATEGORY</a>
					</li>
				)}
			</ul>
		</nav>
	);
};
