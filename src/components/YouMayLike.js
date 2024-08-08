import '../assets/css/YouMayLike.scss';
import Constants from '../Constants';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
export const YouMayLike = () => {
	const youMayLike = useSelector(state => state.productReducer.youMayLike);

	// console.log('youMayLike.length===>',youMayLike.length)
	if (youMayLike && youMayLike.length > 0) {
		return (
			<section className="youmaylike-wrapper">
				<div style={{ maxWidth: '87px' }}>
					<h4>You may like</h4>
					{youMayLike &&
						youMayLike.length > 0 &&
						youMayLike.map(prod => (
							<div key={prod.productId} className="recommend-product">
								<a
									className="picture-link"
									href={`${Constants.LOCAL_BASE_URL}/product/${prod.productId}?colour=${prod.images[0].colorId}`}
									alt={prod.name}
								>
									<img src={prod.images[0].mainCarousel.media.split(' | ')[0]} alt={prod.name} />
								</a>
								<a
									href={`${Constants.LOCAL_BASE_URL}/product/${prod.productId}?colour=${prod.images[0].colorId}`}
									className="title-link"
								>
									{prod.name}
								</a>
							</div>
						))}
				</div>
			</section>
		);
	}
};
