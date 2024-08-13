import '../assets/css/ProductDetail.scss';
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductCatagories, fetchProductDetail, fetchProducts } from '../redux/actions/productAction';
import { Breadcrumb } from '../components/Breadcrumb';
import { Reviews } from '../components/Reviews';
import { YouMayLike } from '../components/YouMayLike';
import { fetchTemplateFilters } from '../redux/actions/filterAction';
import { Breadsrumb_CatagoryIndex } from '../Constants';
import { YouMayAlsoLike } from '../components/YouMayAlsoLike';
import { FeaturePanel } from '../components/FeaturesPanel';
import { ProductCarousel } from '../components/ProductCarousel';
import { WhyWeMadeThis } from '../components/WhyWeMadeThis';
import ProductInfo from '../components/ProductInfo';

export const ProductDetail = () => {
	let valuePassed = useParams();
	const [queryParams] = useSearchParams();
	const dispatch = useDispatch();
	const productDetail = useSelector(state => state.productReducer.productDetail);
	const templateFilters = useSelector(state => state.productReducer.templateFilters);
	const productCatagories = useSelector(state => state.productReducer.productCatagories);
	const [selectedColorIndex, setSelectedColorIndex] = useState(0);
	const [showUnavailable, setShowUnavailable] = useState(false);

	const handleColorChange = index => {
		setSelectedColorIndex(index);
	};

	useEffect(() => {
		setShowUnavailable(false)
		dispatch(fetchTemplateFilters());
	}, []);

	useEffect(() => {
		if (valuePassed && valuePassed.productId) {
			dispatch(fetchProductDetail(valuePassed.productId));

				// setTimeout(()=>{
				// 	if(!productDetail) {
				// 		setShowUnavailable(true)
				// 	}
				// }, 3000)
		}
	}, [valuePassed]);

	useEffect(()=>{
		if(productDetail && productDetail.name) {
			document.title = productDetail.name;
		}
		else {
			setShowUnavailable(true)
		}
	},[productDetail])


	return (
		<div className="productdetail-container">
			<div className="productdetail-container-wrapper">
				{productDetail && productDetail.productId && <>
					<div className="productintro-container">
						<div className="carousel-container">
							<ProductCarousel product={productDetail} colorIndex={selectedColorIndex} />
						</div>
						<div className="detailinfo-container">
							<Breadcrumb />
							<ProductInfo
								product={productDetail}
								colorIndex={selectedColorIndex}
								handleColorChange={handleColorChange}
							/>
						</div>
						<div className="verticalrecos-container">
							<YouMayLike />
						</div>
					</div>

					<div className="whywemadethis-container">
						<WhyWeMadeThis product={productDetail} colorIndex={selectedColorIndex} />
					</div>

					<div className="featurepanel-container">
						<FeaturePanel product={productDetail} />
					</div>

					<div className="youmayalsolike-container">
						<YouMayAlsoLike />
					</div>

					<div className="reviews-container">
						<Reviews />
					</div>
				</>}
				{showUnavailable &&
					<h2 style={{ textAlign: 'center' }}>Not available</h2>}
			</div>
		</div>
	);
	// } else {
	// 	return (
	// 		<div className="productdetail-container">
	// 			<div className="productdetail-container-wrapper">
	// 				<h2 style={{ textAlign: 'center' }}>Not available</h2>
	// 			</div>
	// 		</div>
	// 	);
	// }
};
