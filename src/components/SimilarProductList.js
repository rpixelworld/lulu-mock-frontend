import '../assets/css/ProductList.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../redux/actions/productAction';
import Product from './Product';
import { useParams, useSearchParams } from 'react-router-dom';
import Constants from '../Constants';

export const SimilarProductList = () => {
	const [searchParams] = useSearchParams();
	const [productList, setProductList] = useState([]);
	const [uploadedImg, setUploadedImg] = useState('');

	const pagination = useSelector(state => state.productReducer.pagination);
	const selectedFilters = useSelector(state => state.productReducer.selectedFilters);


	useEffect(() => {
		if (searchParams && searchParams.get('f')) {
			fetch(`${Constants.BACKEND_BASE_URL}/products/similar`, {
				method: 'POST',
				headers: {
					"Content-Type":'application/json',
				},
				body: JSON.stringify({filename: searchParams.get('f')})
			})
			.then(resp => resp.json())
			.then(result => {
				setProductList(result.data.similars)
				setUploadedImg(result.data.uploadedImage)
			})
		}
	}, [searchParams]);
	return (
		<>
			<div className="productlist-container">
				<span style={{fontSize: '18px', fontWeight: '600'}}>Search For</span>
				<div className="row" style={{display: 'flex', justifyContent: 'start', marginBottom: '20px', marginLeft: '1px'}}>
					<img width={200} src={uploadedImg} alt="" />
				</div>
				{productList &&
					Array.isArray(productList) > 0 && <div className="row" style={{marginBottom: '5px', marginLeft: '1px'}}>
					<span style={{ fontSize: '18px', fontWeight: '600' }}>We found {productList.length} similar items</span>
				</div>}
				<div className="row">
					{productList &&
						Array.isArray(productList) > 0 &&
						productList.map((prod, index) => {
							return (
								<Product key={prod.productId + index} product={prod} showColorCarousel={false} colorId={prod.colorId}/>

							);
						})}
				</div>
			</div>
		</>
	);
};
