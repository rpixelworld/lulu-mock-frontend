import '../assets/css/OrderReview.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Alert, Snackbar } from '@mui/material';
import { Paypal } from './Paypal';
import Constants from '../Constants';

export const OrderReview = ({ orderInfo, handlePayment }) => {
	const [openedIcon1, setOpenIcon1] = useState(false);
	const [openedIcon2, setOpenIcon2] = useState(false);
	const [openedIcon3, setOpenIcon3] = useState(false);
	const [openedIcon4, setOpenIcon4] = useState(true);

	const navigate = useNavigate();

	const titleIcon = (
		<svg
			height="24"
			width="24"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			className="checkout-block_summaryIcon__pjlw1"
			focusable="false"
			role="img"
			aria-hidden="true"
			data-testid="icon"
		>
			<g fill="none" fill-rule="evenodd" stroke="currentColor">
				<circle cx="12" cy="12" r="11" stroke-width="2"></circle>
				<path
					d="M9.837 17.6a.623.623 0 0 1-.4-.153L6 14.393l.264-.298a.8.8 0 0 1 1.138-.073l2.403 2.112 6.761-7.857a.798.798 0 0 1 1.13-.08l.304.266-7.666 8.928a.591.591 0 0 1-.417.2l-.08.009z"
					fill="currentColor"
					fill-rule="nonzero"
				></path>
			</g>
		</svg>
	);

	const rotateIcon = (
		<svg
			height="20"
			width="20"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			className="accordionItemToggleIcon-2RhVn"
			focusable="false"
			role="presentation"
			aria-hidden="true"
		>
			<path
				d="M21.39 12.75a1 1 0 0 0 1-1v-.5h-19a1 1 0 0 0-1 1v.5Z"
				stroke="currentColor"
				xmlns="http://www.w3.org/2000/svg"
			></path>
		</svg>
	);

	const fixedIcon = (
		<svg
			height="20"
			width="20"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			className="accordionItemToggleIcon-2RhVn"
			focusable="false"
			role="presentation"
			aria-hidden="true"
		>
			<path
				d="M21.39 12.75a1 1 0 0 0 1-1v-.5h-19a1 1 0 0 0-1 1v.5Z"
				stroke="currentColor"
				xmlns="http://www.w3.org/2000/svg"
			></path>
		</svg>
	);

	const formatPhoneNumber = phoneNumber => {
		// Remove all non-digit characters from the input
		let cleaned = ('' + phoneNumber).replace(/\D/g, '');
		// Check if the input is of correct length
		if (cleaned.length !== 10) {
			throw new Error('Invalid phone number length');
		}
		// Capture the parts of the phone number
		let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
		// Format and return the phone number
		if (match) {
			return `(${match[1]}) ${match[2]}-${match[3]}`;
		}
		return null;
	};

	return (
		<div className="order-review-container">
			<div className="order-summary">
				<div className="detailed-information">
					{/*notification*/}
					<div className="row-1">
						<div className="title-container">
							<div className="icon">{titleIcon}</div>
							<h2>Notifications to</h2>
						</div>
						<div className="content-container">
							<span className="content-title">Email</span>
							<div className="content">
								<span>{orderInfo && orderInfo.notificationEmail}</span>
							</div>
						</div>
						<div
							className="ending"
							onClick={() => {
								navigate('./Checkout');
							}}
						>
							Edit
						</div>
					</div>

					{/*shipping*/}
					<div className="row-2">
						<div className="title-container">
							<div className="icon">{titleIcon}</div>
							<h2>Sending to</h2>
						</div>
						<div className="content-container">
							<span className="content-title">Address</span>
							<div className="content">
								<span>
									{orderInfo.shippingAddress.firstName} {orderInfo.shippingAddress.lastName}
								</span>
								<span>{orderInfo.shippingAddress.addressLine}</span>
								<span>{`${orderInfo.shippingAddress.city}, ${orderInfo.shippingAddress.province} ${orderInfo.shippingAddress.postalCode}, ${orderInfo.shippingAddress.countryCode}`}</span>
								<span>{formatPhoneNumber(orderInfo.shippingAddress.phoneNumber)}</span>
							</div>
						</div>
						<div
							className="ending"
							onClick={() => {
								navigate('./Checkout');
							}}
						>
							Edit
						</div>
					</div>

					{/*delivery & gift*/}
					<div className="row-3">
						{/*delivery*/}
						<div className="title-container">
							<div className="icon">{titleIcon}</div>
							<h2>Estimated delivery</h2>
						</div>
						<div className="content-container">
							<div className="delivery-icon">
								<svg
									height="24"
									width="24"
									fill="none"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
									focusable="false"
									role="img"
									aria-hidden="true"
								>
									<path
										d="M8.5 16.85h6.12a.75.75 0 0 0 .75-.75V4.5a.75.75 0 0 0-.75-.75H1.5a.75.75 0 0 0-.75.75v11.6c0 .414.336.75.75.75h4"
										stroke="currentColor"
										stroke-width="1.5"
									></path>
									<path
										d="M7.077 18.931a2.077 2.077 0 1 0 0-4.154 2.077 2.077 0 0 0 0 4.154Zm11.981 0a2.077 2.077 0 1 0 0-4.154 2.077 2.077 0 0 0 0 4.154Z"
										stroke="currentColor"
										stroke-width="1.5"
									></path>
									<path
										d="M15.1 7.623h5.957l2.185 3.264v5.967h-2.327"
										stroke="currentColor"
										stroke-linejoin="round"
										stroke-width="1.5"
									></path>
									<path
										d="M22.91 19.5H1.09c-.603 0-1.091.448-1.091 1v.5h24v-.5c0-.552-.488-1-1.09-1h.001Z"
										fill="currentColor"
									></path>
								</svg>
							</div>
							<div className="content">
								<span>{Constants.deliveryOptions[orderInfo.deliveryOption]}</span>
							</div>
						</div>
						<div
							className="ending"
							onClick={() => {
								navigate('./Checkout');
							}}
						>
							Edit
						</div>
					</div>

					{orderInfo.isGift && (
						<div className="row-4">
							<div className="title-container">
								<div className="icon">{titleIcon}</div>
								<h2>Gift message</h2>
							</div>
							<div className="content-container">
								<span className="content-title">To</span>
								<div className="content">
									<span>{orderInfo.giftTo}</span>
									{/*<span>Toronto</span>*/}
								</div>
							</div>
							<div
								className="ending"
								onClick={() => {
									navigate('./Checkout');
								}}
							>
								Edit
							</div>
							<div className="content-container">
								<span className="content-title">From</span>
								<div className="content">
									<span>{orderInfo.giftFrom}</span>
									{/*<span>Toronto</span>*/}
								</div>
							</div>
							<div className="content-container">
								<span className="content-title">Message</span>
								<div className="content">
									<span>{orderInfo.giftMessage}</span>
									{/*<span>Toronto</span>*/}
								</div>
							</div>
						</div>
					)}
				</div>

				{/*payment*/}
				<div className="row-5">
					<div className="title-container">
						<div className="icon">{titleIcon}</div>
						<h2>Payment method</h2>
					</div>
					<div className="add">
						<button>
							<svg
								height="24"
								width="24"
								viewBox="0 0 16 16"
								xmlns="http://www.w3.org/2000/svg"
								className="gift-card-method_icon__EuuMp"
								focusable="false"
								role="img"
								aria-hidden="true"
							>
								<path
									d="M16 7.75v-.5H8.75V1a1 1 0 0 0-1-1h-.5v7.25H1a1 1 0 0 0-1 1v.5h7.25V15a1 1 0 0 0 1 1h.5V8.75H15a1 1 0 0 0 1-1Z"
									fill="currentColor"
									fill-rule="evenodd"
								></path>
							</svg>
							<span>Add a lululemon gift card</span>
						</button>
					</div>
					<div className="payment-container">
						<div className="paypal-container">
							<div className="picture">
								<svg
									height="35"
									width="56"
									viewBox="0 0 56 35"
									xmlns="http://www.w3.org/2000/svg"
									className="payment-accordion_headingIcon__xcQae"
									focusable="false"
									role="img"
									aria-labelledby="icon_:rl:"
									aria-hidden="false"
								>
									<title id="icon_:rl:">PayPal</title>
									<g fill="none" fill-rule="evenodd">
										<rect
											height="34"
											width="55"
											fill="#FFF"
											rx=".75"
											stroke="#D5D5D5"
											x=".5"
											y=".5"
										></rect>
									</g>
								</svg>
								<img
									src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png"
									alt=""
									height="29"
									width="30"
								/>
							</div>
							<span>Pay with PayPal</span>
							<div className="add-payment-fixed">{fixedIcon}</div>
							<div
								className={`add-payment ${openedIcon1 ? '' : 'rotated'}`}
								onClick={() => setOpenIcon1(!openedIcon1)}
							>
								{rotateIcon}
							</div>
						</div>
						{openedIcon1 && (
							<div className="payment1-dropdown-container">
								<div className="payment-dropdown">
									<span>
										You will be redirected to PayPal to login to your account and return here to
										complete your order.
									</span>
									<Paypal handlePayment={handlePayment} />
									{/*<div className="payment-button" onClick={handlePayment}></div>*/}
								</div>
							</div>
						)}
						<div className="afterpay-container">
							<div className="picture">
								<svg
									height="35"
									width="56"
									fill="none"
									viewBox="0 0 56 35"
									xmlns="http://www.w3.org/2000/svg"
									className="payment-accordion_headingIcon__xcQae"
									focusable="false"
									role="img"
									aria-labelledby="icon_:r7k:"
									aria-hidden="false"
								>
									<title id="icon_:r7k:">Afterpay</title>
									<path d="M0 0h56v35H0z" fill="#B2FCE4"></path>
									<path
										d="m40.032 10.65-3.895-2.208-3.95-2.241c-2.612-1.484-5.876.379-5.876 3.368v.501c0 .28.146.536.394.67l1.835 1.037a.76.76 0 0 0 1.136-.658V9.926c0-.592.642-.96 1.16-.67l3.602 2.053 3.59 2.04a.761.761 0 0 1 0 1.328l-3.59 2.04-3.602 2.053a.776.776 0 0 1-1.16-.67v-.59c0-2.99-3.264-4.863-5.875-3.369l-3.94 2.253-3.894 2.208c-2.623 1.495-2.623 5.253 0 6.748l3.894 2.208 3.951 2.241c2.611 1.484 5.876-.379 5.876-3.368v-.501a.754.754 0 0 0-.394-.67l-1.835-1.037a.76.76 0 0 0-1.137.658v1.194c0 .59-.641.959-1.16.669l-3.601-2.052-3.59-2.041a.761.761 0 0 1 0-1.328l3.59-2.04 3.602-2.053a.776.776 0 0 1 1.16.67v.59c0 2.99 3.263 4.863 5.875 3.369l3.95-2.242 3.895-2.208c2.611-1.506 2.611-5.264-.011-6.758Z"
										fill="#000"
									></path>
								</svg>
							</div>
							<div className="detail">
								<span>Pay with Afterpay</span>
								<span className="row-2">4 payments, every two weeks</span>
							</div>
							<div className="add-payment-fixed">{fixedIcon}</div>
							<div
								className={`add-payment ${openedIcon2 ? '' : 'rotated'}`}
								onClick={() => setOpenIcon2(!openedIcon2)}
							>
								{rotateIcon}
							</div>
						</div>
						{openedIcon2 && (
							<div className="payment2-dropdown-container">
								<div className="payment-dropdown">
									<span>
										Shop now. Pay Later. You will be redirected to Afterpay to fill out your payment
										information and then will return here to complete your order.
									</span>
									<div className="payment-button"></div>
								</div>
							</div>
						)}
						<div className="klarna-container">
							<div className="picture">
								<svg
									height="35"
									width="56"
									fill="none"
									viewBox="0 0 56 35"
									xmlns="http://www.w3.org/2000/svg"
									className="payment-accordion_headingIcon__xcQae"
									focusable="false"
									role="img"
									aria-labelledby="icon_:r7n:"
									aria-hidden="false"
								>
									<title id="icon_:r7n:">Klarna</title>
									<path d="M0 0h56v35H0z" fill="#FFB2C7"></path>
									<path
										d="M49.219 20.435a1.288 1.288 0 0 0-1.186 1.784 1.284 1.284 0 0 0 1.186.8c.707 0 1.281-.58 1.281-1.292a1.284 1.284 0 0 0-1.281-1.292Zm-4.216-.998c0-.977-.828-1.768-1.849-1.768s-1.85.793-1.85 1.768c0 .976.83 1.767 1.851 1.767 1.022 0 1.848-.79 1.848-1.767Zm.008-3.436h2.04v6.872h-2.04v-.44c-.595.41-1.301.63-2.024.63-1.986 0-3.597-1.623-3.597-3.626 0-2.002 1.61-3.625 3.597-3.625a3.55 3.55 0 0 1 2.024.63V16Zm-16.334.895v-.894h-2.09v6.87h2.095v-3.208c0-1.082 1.163-1.663 1.97-1.663h.025v-1.999c-.83 0-1.59.358-2 .894Zm-5.206 2.541c0-.977-.828-1.768-1.849-1.768s-1.85.793-1.85 1.768c0 .976.83 1.767 1.851 1.767 1.022 0 1.848-.79 1.848-1.767Zm.008-3.436h2.041v6.872h-2.04v-.44a3.561 3.561 0 0 1-2.024.63c-1.986 0-3.597-1.623-3.597-3.626 0-2.002 1.61-3.625 3.597-3.625a3.55 3.55 0 0 1 2.024.63V16Zm12.285-.184c-.815 0-1.587.255-2.103.958v-.773h-2.033v6.87h2.058v-3.61c0-1.044.694-1.557 1.532-1.557.896 0 1.413.54 1.413 1.543v3.625h2.038v-4.37c0-1.598-1.261-2.686-2.905-2.686Zm-20.879 7.056h2.137V12.94h-2.137v9.933Zm-9.385.002h2.263v-9.938H5.5v9.939Zm7.914-9.938a7.935 7.935 0 0 1-2.314 5.641l3.127 4.297h-2.794l-3.397-4.67.877-.662a5.724 5.724 0 0 0 2.285-4.605h2.216Z"
										fill="#0A0B09"
									></path>
								</svg>
							</div>
							<div className="detail">
								<span>Pay with Klarna</span>
								<span className="row-2">4 payments, every two weeks</span>
							</div>
							<div className="add-payment-fixed">{fixedIcon}</div>
							<div
								className={`add-payment ${openedIcon3 ? '' : 'rotated'}`}
								onClick={() => setOpenIcon3(!openedIcon3)}
							>
								{rotateIcon}
							</div>
						</div>
						{openedIcon3 && (
							<div className="payment3-dropdown-container">
								<div className="payment-dropdown">
									<span>
										You will be redirected to Klarna to fill out your payment information and then
										will return here to complete your order.
									</span>
									<div className="payment-button"></div>
								</div>
							</div>
						)}

						<div className="credit-card-container">
							<div className="picture">
								<svg
									height="32"
									width="56"
									viewBox="0 0 48 32"
									xmlns="http://www.w3.org/2000/svg"
									className="payment-accordion_headingIcon__xcQae"
									focusable="false"
									role="img"
									aria-labelledby="icon_:r7q:"
									aria-hidden="false"
								>
									<title id="icon_:r7q:">Credit card</title>
									<g fill="none" fill-rule="evenodd">
										<g stroke="currentColor" stroke-width="1.5">
											<rect height="20" width="30" rx=".75" x="1" y="11"></rect>
											<rect height="4" width="6" rx=".75" x="5" y="16"></rect>
											<path d="M17 10.742V1.91c0-.502.448-.909 1-.909h28c.552 0 1 .407 1 .91v18.18c0 .503-.448.91-1 .91H31"></path>
											<path d="M17.5 4h28v3h-28z" fill="currentColor"></path>
										</g>
										<path
											d="M27.25 23.5H13V23c0-.552.336-1 .75-1H28v.5c0 .552-.336 1-.75 1zm.167 3H21V26c0-.274.062-.53.173-.71a.817.817 0 0 1 .145-.182.386.386 0 0 1 .227-.108H28v.5c0 .268-.061.546-.178.726a.767.767 0 0 1-.156.18.416.416 0 0 1-.25.094z"
											fill="currentColor"
											fill-rule="nonzero"
										></path>
									</g>
								</svg>
							</div>
							<span>Pay with credit card</span>
							<div className="add-payment-fixed">{fixedIcon}</div>
							<div
								className={`add-payment ${openedIcon4 ? '' : 'rotated'}`}
								onClick={() => setOpenIcon4(!openedIcon4)}
							>
								{rotateIcon}
							</div>
						</div>
						{openedIcon4 && (
							<div className="payment4-dropdown-container">
								<div className="payment-dropdown">
									<input type="checkbox" className="select-card" />
									<span>New credit card</span>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
			{/*<div className="review-order">*/}
			{/*    /!*<div className="paypal">*!/*/}
			{/*    /!*    /!*<Paypal />*!/*!/*/}
			{/*    /!*    <button></button>*!/*/}
			{/*    /!*</div>*!/*/}
			{/*    /!*<button>Review your order</button>*!/*/}
			{/*    /!*<div className="proceed">Proceed to step 3 of 3</div>*!/*/}
			{/*</div>*/}
		</div>
	);
};
