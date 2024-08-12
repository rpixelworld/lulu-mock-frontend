import '../assets/css/Payment.scss';
import OrderSummary from '../components/OrderSummary';
import { OrderReview } from '../components/OrderReview';
import { Alert, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import * as IndexedDBHelper from '../IndexedDBHelper';
import {
	dispatchClearShoppingCart,
	dispatchShippingFee,
	dispatchShoppingCart,
	fetchTaxRate,
} from '../redux/actions/shoppingAction';
import * as CartIndexedDBHelper from '../IndexedDBHelper';
import Constants from '../Constants';
import * as UserHelper from '../UserHelper';
import { dispatchClearCookieAuth } from '../redux/actions/userAction';

export const Payment = () => {
	const valuePassed = useParams();
	const [openAlert, setOpenAlert] = useState(false);
	const [orderInfo, setOrderInfo] = useState(null)
	const [openSuccessPayment, setOpenSuccessPayment] = useState(false);
	const [openPaymentFailed, setOpenPaymentFailed] = useState(false);
	const [failureMsg, setFailureMsg] = useState('');

	const dispatch = useDispatch();
	const shoppingCart = useSelector(state => state.shoppingReducer.shoppingCart);
	// const orderInfo = useSelector(state => state.shoppingReducer.orderInfo);

	const navigate = useNavigate();

	const handlePayment = () => {
		IndexedDBHelper.clearShoppingCart(() => {
			setOpenSuccessPayment(true);
		});
	};

	const handleClosePaymentSuccess = () => {
		dispatch(dispatchClearShoppingCart());
		navigate('/shop/cart');
	};

	const handleClosePaymentFailed = () => {
		setOpenPaymentFailed(false);
	};

	const handleLoginExpired = ()=> {
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
	}
	useEffect(() => {
		if (valuePassed && valuePassed.orderId) {
			const option = {
				method: 'GET',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
					authorization: 'Bearer ' + UserHelper.getCookie('_token'),
				},
			}
			fetch(`${Constants.BACKEND_BASE_URL}/orders/${valuePassed.orderId}`, option)
				.then(resp => resp.json())
				.then(result => {
					if(result.status == 'success'){
						setOrderInfo(result.data)
						dispatch(fetchTaxRate(result.data.shippingAddress.province));
						dispatch(dispatchShippingFee(result.data.deliveryFee));
						// console.log(result.data)
					}
					else {
						let error = result.error
						if (error.errorCode == 'TOKEN_EXPIRED') {
							handleLoginExpired()
						} else {
							setFailureMsg(error.message);
						}
						setOpenPaymentFailed(true);
					}

				})
		}
	}, [valuePassed]);

	useEffect(() => {
		CartIndexedDBHelper.getAllItems(shoppingCart => dispatch(dispatchShoppingCart(shoppingCart)));
		// if (!orderInfo || !orderInfo.shipping || !orderInfo.deliveryOption || !orderInfo.giftOption) {
		// 	setOpenAlert(true);
		// }
	}, []);

	return (
		<div className="payment-fluid-container">
			<div className="header">
				<h1>Order Review & Payment</h1>
			</div>
			<Snackbar
				open={openAlert}
				autoHideDuration={3000}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				onClose={handleClosePaymentSuccess}
			>
				<Alert onClose={handleClosePaymentSuccess} severity="error" variant="filled" sx={{ width: '100%' }}>
					You haven't placed order! You will be directed to your shopping cart to checkout.{' '}
				</Alert>
			</Snackbar>
			<Snackbar
				open={openSuccessPayment}
				autoHideDuration={3000}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				onClose={() => {
					navigate('/shop/cart');
				}}
			>
				<Alert
					onClose={() => {
						navigate('/shop/cart');
					}}
					severity="success"
					variant="filled"
					sx={{ width: '100%' }}
				>
					We received your payment. Thanks for shopping with us.
				</Alert>
			</Snackbar>
			<Snackbar
				open={openPaymentFailed}
				autoHideDuration={3000}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				onClose={handleClosePaymentFailed}
			>
				<Alert
					onClose={handleClosePaymentFailed}
					severity="error"
					variant="filled"
					sx={{ width: '100%' }}
				>
					{failureMsg}
				</Alert>
			</Snackbar>
			{orderInfo  && (
					<div className="main">
						<div className="col-1">
							<div className="order-review">
								<OrderReview orderInfo={orderInfo} handlePayment={handlePayment} />
								{/*<div className="paypal">*/}
								{/*<Paypal />*/}
								{/*<button onClick={handlePayment}></button>*/}
								{/*</div>*/}
							</div>
						</div>
						<div className="col-2">
							<div className="order-summary">
								<OrderSummary shoppingCart={shoppingCart} />
							</div>
						</div>
					</div>
				)}
		</div>
	);
};
