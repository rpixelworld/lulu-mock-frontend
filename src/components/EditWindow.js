import React, { useEffect, useState } from 'react';
import '../assets/css/EditWindow.scss';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import Constants from '../Constants';
import { Dialog, DialogContent } from '@mui/material';

const EditWindow = ({ state, closeEdit, item, handleUpdate, handleExceedLimitReset, exceedLimit }) => {
	const [product, setProduct] = useState(null);
	const [selectedColorIndex, setSelectedColorIndex] = useState(0);
	const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
	const [selectedColor, setSelectedColor] = useState('');
	const [selectedSize, setSelectedSize] = useState('');
	const [storages, setStorages] = useState([]);
	const [outOfStock, setOutOfStock] = useState(false);
	const [only1Left, setOnly1Left] = useState(false);

	const [bgIndex, setBgIndex] = useState('0');
	const [bgImg, setBgImg] = useState(null);
	const [pageIndex, setPageIndex] = useState(0);

	const confirmUpdate = () => {
		let newItem = {
			...item,
			itemKey: `${product.productId}_${product.swatches[selectedColorIndex].colorId}_${selectedSize}`,
			colorAlt: selectedColor,
			size: selectedSize,
			imageUrl: product.images[selectedColorIndex].mainCarousel.media.split(' | ')[0],
			createdAt: Date.now(),
			updatedAt: Date.now(),
		};

		handleUpdate(item.itemKey, newItem);
	};

	const sizeButtonClick = (storage, index, item) => {
		if (selectedSizeIndex != index) {
			handleExceedLimitReset();
		}
		setSelectedSizeIndex(index);
		setSelectedSize(item);

		if (storage <= 0) {
			setOutOfStock(true);
			setOnly1Left(false);
		} else if (storage <= 5) {
			setOutOfStock(false);
			setOnly1Left(true);
		} else {
			setOutOfStock(false);
			setOnly1Left(false);
		}
	};

	const colorButtonClick = (index, swatchAlt) => {
		if (selectedColorIndex != index) {
			handleExceedLimitReset();
		}
		setSelectedColorIndex(index);
		setSelectedColor(product.swatches[index].swatchAlt);
		setBgImg(product.images[index].mainCarousel.media.split(' | ')[0]);
		setBgIndex(index);
		setPageIndex(0);
		fetchStorage(product.productId, product.swatches[index].colorId);
	};

	const handleNextPage = () => {
		if (pageIndex < product.images[selectedColorIndex].mainCarousel.media.split(' | ').length - 1) {
			const newIndex = pageIndex + 1;
			// console.log(newIndex)
			setPageIndex(newIndex);
			setBgImg(product.images[selectedColorIndex].mainCarousel.media.split(' | ')[newIndex]);
		}
	};
	const handlePrevPage = () => {
		if (pageIndex > 0) {
			const newIndex = pageIndex - 1;
			setPageIndex(newIndex);
			setBgImg(product.images[selectedColorIndex].mainCarousel.media.split(' | ')[newIndex]);
		}
	};

	const fetchStorage = (productId, colorId) => {
		let currentStorages = [];
		fetch(`${Constants.BACKEND_BASE_URL}/inventory/${productId}/${colorId}`)
			.then(resp => resp.json())
			.then(obj => {
				let stocks = obj.data;
				for (let j = 0; j < product.sizes[0].details.length; j++) {
					for (let i = 0; i < stocks.length; i++) {
						if (product.sizes[0].details[j] == stocks[i].size) {
							currentStorages.push(stocks[i].stock);
							break;
						}
					}
					if (currentStorages.length == j) {
						currentStorages.push(0);
					}
				}
				setStorages(currentStorages);
				setOutOfStock(false);
				setOnly1Left(false);
				// let activeSize = queryParams.get('sz');
				let index = product.sizes[0].details.indexOf(selectedSize);
				if (currentStorages[index] <= 0) {
					setOutOfStock(true);
				} else if (currentStorages[index] <= 5) {
					setOnly1Left(true);
				}
			});
	};

	useEffect(() => {
		console.log('useeffect, state=', state);
		let arr = item.itemKey.split('_');
		let productId = arr[0];
		setSelectedColor(item.colorAlt);
		setSelectedSize(arr[2]);

		fetch(`${Constants.BASE_URL}/product/${productId}?mykey=${Constants.MY_KEY}`)
			.then(resp => {
				// console.log(resp)
				if (resp.ok && resp.status == 200) {
					return resp.json();
				}
			})
			.then(res => {
				let productDetail = res.rs;
				for (let i = 0; i < productDetail.swatches.length; i++) {
					if (arr[1] === productDetail.swatches[i].colorId) {
						setSelectedColorIndex(i);
						setBgImg(productDetail.images[i].mainCarousel.media.split('|')[0]);
						break;
					}
				}
				if (productDetail.sizes[0].details.length == 0) {
					productDetail.sizes[0].details.push('ONESIZE');
				}

				// if (arr[2] === 'ONESIZE' || arr[2] === '') {
				// 	setSelectedSizeIndex(0);
				// 	setSelectedSize(arr[2]);
				// } else {
				for (let i = 0; i < productDetail.sizes[0].details.length; i++) {
					if (arr[2] === productDetail.sizes[0].details[i]) {
						setSelectedSizeIndex(i);
						setSelectedSize(arr[2]);
					}
				}
				// }
				setProduct(res.rs);
			});
	}, []);

	useEffect(() => {
		setOutOfStock(false);
		setOnly1Left(false);

		if (state && product.name) {
			let arr = item.itemKey.split('_');
			let productId = arr[0];
			setSelectedColor(item.colorAlt);
			setSelectedSize(arr[2]);

			for (let i = 0; i < product.swatches.length; i++) {
				if (arr[1] === product.swatches[i].colorId) {
					setSelectedColorIndex(i);
					setBgImg(product.images[i].mainCarousel.media.split('|')[0]);
					break;
				}
			}

			// if (arr[2] === 'ONESIZE' || arr[2] === '') {
			// 	setSelectedSizeIndex(0);
			// 	setSelectedSize(arr[2]);
			// } else {
			// 	for (let i = 0; i < product.sizes[0].details.length; i++) {
			// 		if (arr[2] === product.sizes[0].details[i]) {
			// 			setSelectedSizeIndex(i);
			// 			setSelectedSize(arr[2]);
			// 		}
			// 	}
			// }
			fetchStorage(product.productId, product.swatches[selectedColorIndex].colorId);
		}
	}, [state]);

	return (
		product && (
			<Dialog fullScreen={false} open={state}>
				<DialogContent className="">
					<div className="edit-window">
						<div className="edit-container">
							<div
								className="bgI"
								style={{
									background: `url(${bgImg}) no-repeat center center/cover`,
								}}
							>
								<button
									className="prev-button"
									onClick={handlePrevPage}
									disabled={pageIndex === 0}
									style={{ display: pageIndex === 0 ? 'none' : 'block' }}
								>
									<ChevronLeftIcon />{' '}
								</button>
								<button
									className="next-button"
									onClick={handleNextPage}
									disabled={
										pageIndex ===
										product.images[selectedColorIndex].mainCarousel.media.split(' | ').length - 1
									}
									style={{
										display:
											pageIndex ===
											product.images[selectedColorIndex].mainCarousel.media.split(' | ').length -
												1
												? 'none'
												: 'block',
									}}
								>
									<ChevronRightIcon />{' '}
								</button>
							</div>

							<div className="edit-colorAndSize">
								<CloseIcon
									onClick={closeEdit}
									style={{
										position: 'relative',
										left: '104%',
										cursor: 'pointer',
									}}
								/>
								{/*name*/}
								<h2>{item.productName}</h2>
								{/*price*/}
								<p>${item.price}.00</p>
								{/*color*/}
								<p>{selectedColor}</p>
								<div className="edit-colorList">
									{product.swatches.map((swa, index) => (
										<div
											className={
												selectedColorIndex === index ? 'edit-colorBoxClicked' : 'edit-colorBox'
											}
											key={index}
											onClick={() => colorButtonClick(index, swa.swatchAlt)}
										>
											<img className="edit-color-button" src={swa.swatch} alt={swa.swatchAlt} />
										</div>
									))}
								</div>
								{/*size*/}
								<div className="alert">
									{outOfStock && <div className="out-of-stock">Sold out online.</div>}
									{only1Left && (
										<div className="only-1-left">
											Hurry, only {storages[selectedSizeIndex]} left!
										</div>
									)}
								</div>
								<p>Size:{selectedSize}</p>
								<div className="edit-sizeList">
									{product.sizes[0].details.length > 0 &&
										product.sizes[0].details.map((size, index) => {
											let storage = storages[index];
											return (
												<div className="edit-sizeBox" key={index}>
													<button
														className={`
														${selectedSizeIndex === index ? 'edit-size-buttonClicked' : 'edit-size-button'} ${storage === 0 && ' outOfStock'}`}
														onClick={() => sizeButtonClick(storage, index, size)}
													>
														{size}
														{/*({storage})*/}
													</button>
												</div>
											);
										})}
									{product.sizes[0].details.length == 0 && (
										<button className="onesize-buttonClicked">ONE SIZE</button>
									)}
								</div>
								<div className="alert">
									{' '}
									{/*{console.log('exceedLimit==>', exceedLimit, 'closeExceedLimit==>', closeExceedLimit)}*/}
									{exceedLimit && (
										<div className="exceed-limit">
											Exceeded maximum allowed quantity per line item.
										</div>
									)}
								</div>
								{!outOfStock && (
									<button className="update-edit" onClick={confirmUpdate}>
										UPDATE ITEM
									</button>
								)}
								{outOfStock && <button className="soldout-button">SOLD OUT - NOTIFY ME</button>}
								<div className="view-detail-link">
									<span>
										<a
											href={`/product/${product.productId}?color=${product.swatches[selectedColorIndex].colorId}&sz=${selectedSize.replace(' ', '')}`}
										>
											View product details
										</a>
									</span>
								</div>
							</div>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		)
	);
};

export default EditWindow;
