import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { Message } from '@mui/icons-material';
import Constants from '../Constants';

export const Paypal = ({ orderInfo, handlePayment }) => {
	const initialOptions = {
		'client-id': 'AS7hrpIxslJw5hTb2GhaPvbUSQNy-jQOcQmBigOHFl6cxSdlFA0mDKwk8t9urjF4N_B2kL3yfmMDcry4',
		'enable-funding': '',
		'disable-funding': 'paylater,venmo,card',
		'data-sdk-integration-source': 'integrationbuilder_sc',
		components: 'buttons',
		currency: 'CAD',
	};

	const [message, setMessage] = useState('');

	const paypalButtonStyle = {
		shape: 'rect',
		layout: 'horizontal',
		color: 'blue',
		label: 'paypal',
	};

	const createOrder = async () => {
		try {
			const response = await fetch(`${Constants.BACKEND_BASE_URL}/paypal/orders`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				// use the "body" param to optionally pass additional order information
				// like product ids and quantities
				body: JSON.stringify({
					// cart: [
					// 	{
					// 		id: "YOUR_PRODUCT_ID",
					// 		quantity: "YOUR_PRODUCT_QUANTITY",
					// 	},
					// ],
					orderId: orderInfo.id,
					totalCost: orderInfo.orderTotalAmount,
				}),
			});

			const orderData = await response.json();

			if (orderData.id) {
				return orderData.id;
			} else {
				const errorDetail = orderData?.details?.[0];
				const errorMessage = errorDetail
					? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
					: JSON.stringify(orderData);

				throw new Error(errorMessage);
			}
		} catch (error) {
			console.error(error);
			setMessage(`Could not initiate PayPal Checkout...${error}`);
		}
	};

	const onApprove = async (data, actions) => {
		try {
			const response = await fetch(`${Constants.BACKEND_BASE_URL}/paypal/orders/${data.orderID}/capture`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const orderData = await response.json();
			// Three cases to handle:
			//   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
			//   (2) Other non-recoverable errors -> Show a failure message
			//   (3) Successful transaction -> Show confirmation or thank you message

			const errorDetail = orderData?.details?.[0];

			if (errorDetail?.issue === 'INSTRUMENT_DECLINED') {
				// (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
				// recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
				return actions.restart();
			} else if (errorDetail) {
				// (2) Other non-recoverable errors -> Show a failure message
				throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
			} else {
				// (3) Successful transaction -> Show confirmation or thank you message
				// Or go to another URL:  actions.redirect('thank_you.html');
				const transaction = orderData.purchase_units[0].payments.captures[0];
				setMessage(
					`Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
				);
				console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
				handlePayment();
			}
		} catch (error) {
			console.error(error);
			setMessage(`Sorry, your transaction could not be processed...${error}`);
		}
	};

	return (
		<>
			<PayPalScriptProvider options={initialOptions}>
				<PayPalButtons style={paypalButtonStyle} createOrder={createOrder} onApprove={onApprove} />
			</PayPalScriptProvider>
			<Message content={message} />
		</>
	);
};
