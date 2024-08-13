import '../assets/css/ShoppingCartItem.scss';
import { RemoveConfirmDialog } from './RemoveConfirmDialog';
import { useEffect, useState } from 'react';
import * as CartIndexedDBHelper from '../IndexedDBHelper';
import { useDispatch } from 'react-redux';
import { dispatchShoppingCart } from '../redux/actions/shoppingAction';
import EditWindow from './EditWindow';
import { updateItem } from '../IndexedDBHelper';
import Constants from '../Constants';

export const ShoppingCartItem = ({ item }) => {
	const dispatch = useDispatch();
	const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
	const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [quantity, setQuantity] = useState(item.amount);
	const [totalPrice, setTotalPrice] = useState(item.amount * item.price);
	const [arrowUp, setArrowUp] = useState(false);
	const [exceedLimit, setExceedLimit] = useState(false);
	const [qtyArray, setQtyArray] = useState([]);

	const openRemoveConfirmDialog = () => {
		setOpenRemoveDialog(true);
	};

	const closeRemoveConfirmDialog = () => {
		setOpenRemoveDialog(false);
	};

	const openUpdateItemDialog = () => {
		setOpenUpdateDialog(true);
	};

	const closeUpdateItemDialog = () => {
		setExceedLimit(false);
		setOpenUpdateDialog(false);
	};

	const refreshShoppingCart = () => {
		CartIndexedDBHelper.getAllItems(shoppingCart => {
			dispatch(dispatchShoppingCart(shoppingCart));
		});
		closeUpdateItemDialog();
		closeRemoveConfirmDialog();
		setQuantity(item.amount);
	};
	const removeItem = itemKey => {
		CartIndexedDBHelper.deleteItem(itemKey, refreshShoppingCart);
	};

	const updateItem = (itemKey, newItem) => {
		CartIndexedDBHelper.insertOrUpdateItem(
			newItem.itemKey,
			newItem,
			() => {
				CartIndexedDBHelper.deleteItem(itemKey, refreshShoppingCart);
			},
			evt => {
				if (evt.type == 'error' && evt.name === 'ExceedAmountLimit') {
					setExceedLimit(true);
				}
			}
		);
		// CartIndexedDBHelper.deleteItem(itemKey, ()=>{
		//     CartIndexedDBHelper.insertOrUpdateItem(newItem.itemKey, newItem, refreshShoppingCart)
		// })
	};

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};
	const handleQuantityChange = value => {
		setQuantity(value);
		setIsOpen(false);
		console.log(`Selected value: ${value}`);
		setTotalPrice(item.price * value);
		let itemToUpdate = { ...item, amount: value, updatedAt: Date.now() };
		CartIndexedDBHelper.updateItem(item.itemKey, itemToUpdate, refreshShoppingCart);
	};

	const handleArrowRotate = () => {
		setArrowUp(!arrowUp);
	};

	const dropdownArrow = (
		<svg
			height="8"
			width="14"
			fill="currentColor"
			stroke="currentColor"
			viewBox="0 0 14 8"
			xmlns="http://www.w3.org/2000/svg"
			focusable="false"
			role="img"
			aria-hidden="true"
			className={`rotate-svg ${arrowUp ? 'rotated' : ''}`}
		>
			<path
				d="m13 .99-6.47 6.5a.74.74 0 0 1-1.06 0L-1 .99l.35-.35a1 1 0 0 1 1.41 0L6 5.86 11.24.6a1 1 0 0 1 1.41 0z"
				fill-rule="evenodd"
				stroke="none"
			></path>
		</svg>
	);
	useEffect(() => {
		setQtyArray(Array.from({ length: item.stock >= 5 ? 5 : item.stock }, (_, index) => index + 1));
	}, []);

	return (
		<div className="cart-item">
			<div className="alert">
				{item.stock > 0 && item.stock <= 5 && <div className="only-1-left">Hurry, only {item.stock} left!</div>}
				{item.stock <= 0 && <div className="out-of-stock">Sold out. Unavailable online!</div>}
			</div>
			<div className="product-primary">
				<div className="item-image">
					<img width="199px" src={item.imageUrl} alt="" />
				</div>
				<div className="item-detail">
					<h3 onClick={openUpdateItemDialog}>{item.productName}</h3>
					<div className="item-color">
						<p>{item.colorAlt}</p>
					</div>
					<div className="four-cols">
						<div className="col-1">
							<p>Size {item.size}</p>
							<a onClick={openUpdateItemDialog}>{item.stock > 0 ? 'Edit' : 'Try different color'}</a>
						</div>
						<div className="col-2">
							<div className="item-price">
								<p>Item Price</p>
							</div>
							<div className="price">
								<p>${item.price}.00</p>
							</div>
						</div>
						<div className="col-3">
							<label htmlFor="quantity">Quantity</label>
							{item.stock >= item.amount && (
								<div className="dropdown-container" onClick={toggleDropdown}>
									<div className="box-content" onClick={handleArrowRotate}>
										<button className="custom-dropdown" value={item.amount}>
											{item.amount}
										</button>
										<div className="dropdown-arrow">{dropdownArrow}</div>
									</div>

									{isOpen && (
										<div className="dropdown-options" style={{ height: 65 * qtyArray.length }}>
											{qtyArray.map(i => (
												<>
													<div className="option-container">
														<div
															className="dropdown-option"
															onClick={() => handleQuantityChange(i)}
														>
															{i}
														</div>
													</div>
													{i < qtyArray.length && <div className="dropdown-separator"></div>}
												</>
											))}
										</div>
									)}
								</div>
							)}
						</div>
						<div className="col-4">
							<div className="total-price">
								<p>Total Price</p>
							</div>
							<div className="price">
								<p>${totalPrice}.00</p>
							</div>
						</div>
					</div>
					<div className="operation-line">
						<div className="product-message">
							<p>Free Shipping + Free Returns</p>
						</div>
						<div className="add-button">
							<a href="">Save for Later</a>
						</div>
						<div className="separator"></div>
						<div className="remove-button">
							<span style={{ cursor: 'pointer' }} onClick={openRemoveConfirmDialog}>
								Remove
							</span>
						</div>
					</div>
					<EditWindow
						state={openUpdateDialog}
						closeEdit={closeUpdateItemDialog}
						item={item}
						handleUpdate={updateItem}
						handleExceedLimitReset={() => setExceedLimit(false)}
						exceedLimit={exceedLimit}
					/>
					<RemoveConfirmDialog
						isOpen={openRemoveDialog}
						itemKey={item.itemKey}
						handleRemove={removeItem}
						handleClose={closeRemoveConfirmDialog}
					/>
				</div>
			</div>
		</div>
	);
};
