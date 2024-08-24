import '../assets/css/ProductList.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchProducts } from '../redux/actions/productAction';
import Product from './Product';
import { useParams } from 'react-router-dom';

export const ProductList = () => {
	let valuePassed = useParams();
	// console.log(valuePassed.key, valuePassed.index)

	const dispatch = useDispatch();
	const productList = useSelector(state => state.productReducer.productList);
	const pagination = useSelector(state => state.productReducer.pagination);
	const selectedFilters = useSelector(state => state.productReducer.selectedFilters);

	const handleViewMore = () => {
		dispatch(fetchProducts(pagination.curPage + 1, selectedFilters));
	};

	useEffect(() => {
		dispatch(fetchProducts());
	}, []);

	useEffect(() => {
		if (valuePassed && valuePassed.key && valuePassed.index) {
			// if(selectedFilters && selectedFilters[valuePassed.key] && selectedFilters[valuePassed.key].length>0) {
			const parmFilters = JSON.parse(JSON.stringify(selectedFilters));
			for (let i = 0; i < parmFilters[valuePassed.key].length; i++) {
				if (i != valuePassed.index) {
					parmFilters[valuePassed.key][i].isChecked = false;
				} else {
					parmFilters[valuePassed.key][valuePassed.index].isChecked = true;
				}
			}
			dispatch(fetchProducts(1, parmFilters));
			// }
		} else {
			dispatch(fetchProducts());
		}
	}, [valuePassed]);
	return (
		<>
			<div className="productlist-container">
				<div className="row">
					{productList &&
						productList.length > 0 &&
						productList.map((prod, index) => {
							return <Product key={prod.productId + index} product={prod} showColorCarousel={true} />;
						})}
				</div>
			</div>
			<div className="paging-container">
				<p>
					View&nbsp;
					{pagination.curPage == pagination.totalPage
						? pagination.totalProducts
						: pagination.curPage * pagination.perPage}
					&nbsp;of&nbsp;
					{pagination.totalProducts}
				</p>
				{pagination.totalPage > pagination.curPage ? (
					<button type="button" onClick={handleViewMore}>
						view more products
					</button>
				) : (
					''
				)}
			</div>
		</>
	);
};
