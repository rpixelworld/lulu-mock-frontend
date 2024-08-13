import '../assets/css/Checkout.scss';
import OrderSummary from '../components/OrderSummary';
import { ContactInformation } from '../components/ContactInformation';
import { AskForLogin } from '../components/AskForLogin';
import { useDispatch, useSelector } from 'react-redux';
import { ShippingAddress } from '../components/ShippingAddress';
import { GiftOptions } from '../components/GiftOptions';
import { useEffect, useRef, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { dispatchClearShoppingCart, dispatchOrderInfo, dispatchShoppingCart } from '../redux/actions/shoppingAction';
import Constants from '../Constants';
import * as UserHelper from '../UserHelper';
import { dispatchClearCookieAuth, dispatchUserInfo } from '../redux/actions/userAction';
import * as IndexedDBHelper from '../IndexedDBHelper';
import * as CartIndexedDBHelper from '../IndexedDBHelper';

export const Checkout = () => {
	const dispatch = useDispatch();
	const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
	const shoppingCart = useSelector(state => state.shoppingReducer.shoppingCart);
	const userInfo = useSelector(state => state.userReducer.userInfo);

	const navigate = useNavigate();
	const contactRef = useRef();
	const shippingRef = useRef();
	const giftOptionRef = useRef();
	const [validCheckout, setValidCheckout] = useState(true);
	const [orderId, setOrderId] = useState(0);
	const [openAlert, setOpenAlert] = useState(false);
	const [openPlaceOrderSuccess, setOpenPlaceOrderSuccess] = useState(false);
	const [openPlaceOrderFailed, setOpenPlaceOrderFailed] = useState(false);
	const [failureMsg, setFailureMsg] = useState('');

	const handleClosePladeOrderSuccess = () => {
		setOpenPlaceOrderSuccess(false);
		IndexedDBHelper.clearShoppingCart(()=>{
			dispatch(dispatchClearShoppingCart())
		})
		navigate(`/shop/checkout/payment/${orderId}`);
	};
	const handleClosePladeOrderFailed = () => {
		setOpenPlaceOrderFailed(false);
	};

	const handlePlaceOrder = () => {
		console.log(
			'contact infomation valid=',
			contactRef.current.isValid(),
			'shipping valid=',
			shippingRef.current.isValid(),
			'gift valid=',
			giftOptionRef.current.isValid()
		);
		// console.log('toSaveShippingAddress', shippingRef.current.toSaveShippingAddress());

		if (!contactRef.current.isValid() || !shippingRef.current.isValid() || !giftOptionRef.current.isValid()) {
			setValidCheckout(false);
			setOpenAlert(true);
		} else {
			setValidCheckout(true);

			const orderInfo = {
				notification: contactRef.current.getContact(),
				isNewShippingAddress: shippingRef.current.toSaveShippingAddress(),
				shipping: shippingRef.current.getShippingAddress(),
				deliveryOption: giftOptionRef.current.getDeliveryOption(),
				giftOption: giftOptionRef.current.getGiftOption(),
			};

			placeOrder(
				orderInfo,
				shoppingCart,
				savedOrderInfo => {
					// dispatch(dispatchOrderInfo(savedOrderInfo));
					setOrderId(savedOrderInfo.id);
					setOpenPlaceOrderSuccess(true);
				},
				error => {
					if (error.errorCode == 'TOKEN_EXPIRED') {
						handleLoginExpired();
					} else {
						setFailureMsg(error.message);
					}
					setOpenPlaceOrderFailed(true);
				}
			);
		}
	};

	const handleLoginExpired = () => {
		setFailureMsg('Login Expired. Please logn again.');
		UserHelper.logoutUser({}, () => {
			UserHelper.clearCookies({
				_userId: '',
				_email: '',
				_firstname: '',
				_token: '',
			});
			dispatch(dispatchClearCookieAuth());
		});
	};

	const placeOrder = (orderInfo, shoppingCart, onSuccess, onError) => {
		let bodyItems = [];
		shoppingCart.items.forEach(item => {
			if (item.stock >= item.amount) {
				bodyItems.push({
					productId: item.itemKey.split('_')[0],
					productName: item.productName,
					imageUrl: item.imageUrl,
					colorId: item.itemKey.split('_')[1],
					colorAlt: item.colorAlt,
					size: item.itemKey.split('_')[2],
					price: item.price,
					quantity: item.amount,
				});
			}
		});
		let postBody = {
			userId: userInfo.id,
			notificationEmail: orderInfo.notification,
			isNewShippingAddress: orderInfo.isNewShippingAddress,
			shippingAddress: orderInfo.shipping,
			deliveryOption: orderInfo.deliveryOption.option,
			deliveryFee: orderInfo.deliveryOption.fee,
			orderItems: bodyItems,
			totalItem: bodyItems.reduce((total, item) => total + item.quantity, 0),
			totalAmount: bodyItems.reduce((sum, item) => sum + item.quantity * item.price, 0),
			isGift: orderInfo.giftOption.isGift,
		};
		if (orderInfo.giftOption.isGift) {
			postBody.giftTo = orderInfo.giftOption.giftInfo.to;
			postBody.giftFrom = orderInfo.giftOption.giftInfo.from;
			postBody.giftMessage = orderInfo.giftOption.giftInfo.message;
		}

		let url = `${Constants.BACKEND_BASE_URL}/orders`;
		let options = {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				authorization: 'Bearer ' + UserHelper.getCookie('_token'),
			},
			body: JSON.stringify(postBody),
		};
		console.log(options);
		//onSuccess && onSuccess();
		fetch(url, options)
			.then(resp => {
				return resp.json();
			})
			.then(res => {
				if (res.status == 'success') {
					onSuccess && onSuccess(res.data);
				} else {
					if (res.status.toLowerCase() == 'failed') {
						onError && onError(res.error);
					}
				}
			});
	};

	useEffect(() => {
		CartIndexedDBHelper.getAllItems(shoppingCart => dispatch(dispatchShoppingCart(shoppingCart)));
	}, []);

	return (
		<div className="checkout-fluid-container">
			<div className="header">
				<h1>Checkout</h1>
			</div>
			<div className="main">
				<div className="col-1">
					<Snackbar
						open={openAlert}
						autoHideDuration={3000}
						anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
						onClose={() => {
							setOpenAlert(false);
						}}
					>
						<Alert
							onClose={() => {
								setOpenAlert(false);
							}}
							severity="error"
							variant="filled"
							sx={{ width: '100%' }}
						>
							Please correct the information you provided.
						</Alert>
					</Snackbar>
					<Snackbar
						open={openPlaceOrderSuccess}
						autoHideDuration={3000}
						anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
						onClose={handleClosePladeOrderSuccess}
					>
						<Alert
							onClose={handleClosePladeOrderSuccess}
							severity="success"
							variant="filled"
							sx={{ width: '100%' }}
						>
							Order placed successfully. You will be directed to the payment.
						</Alert>
					</Snackbar>
					<Snackbar
						open={openPlaceOrderFailed}
						autoHideDuration={3000}
						anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
						onClose={handleClosePladeOrderFailed}
					>
						<Alert
							onClose={handleClosePladeOrderFailed}
							severity="error"
							variant="filled"
							sx={{ width: '100%' }}
						>
							{failureMsg}
						</Alert>
					</Snackbar>
					{isLoggedIn && <ContactInformation ref={contactRef} />}
					{!isLoggedIn && <AskForLogin />}
					{isLoggedIn && <ShippingAddress ref={shippingRef} />}
					{isLoggedIn && <GiftOptions ref={giftOptionRef} />}
					{/*{!validCheckout && <Alert className='alert' severity="error">Please correct the information you provided.</Alert>}*/}
					<div className="next-step">
						<button className="next-step-button" onClick={handlePlaceOrder} disabled={!isLoggedIn}>
							Place Order
						</button>
					</div>
				</div>

				<div className="col-2">
					<div className="order-summary">
						<OrderSummary shoppingCart={shoppingCart} />
					</div>
				</div>
			</div>
		</div>
	);
};
