import '../assets/css/ShippingAddress.scss';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NewShippingAddress } from './NewShippingAddress';
import { dispatchZeroTaxRate, fetchTaxRate } from '../redux/actions/shoppingAction';

export const ShippingAddress = forwardRef((props, ref) => {
	const [selectedRadio, setSelectedRadio] = useState(0);
	const [numOfSavedAddresses, setNumOfSavedAddresses] = useState(0);

	const dispatch = useDispatch();
	const cookieAuth = useSelector(state => state.userReducer.cookieAuth);
	const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
	const userInfo = useSelector(state => state.userReducer.userInfo);

	const newAddressRef = useRef();

	useImperativeHandle(ref, () => ({
		toSaveShippingAddress: () => {
			return selectedRadio == numOfSavedAddresses && newAddressRef.current.toSaveAddress();
		},

		getShippingAddress: () => {
			if (selectedRadio < numOfSavedAddresses) {
				return userInfo.shippingAddresses[selectedRadio];
			} else {
				return newAddressRef.current.getNewAddress();
			}
		},

		isValid: () => {
			console.log(selectedRadio, numOfSavedAddresses);
			if (selectedRadio == numOfSavedAddresses) {
				console.log(newAddressRef.current.isValid());
				return newAddressRef.current.isValid();
			} else {
				return true;
			}
		},
	}));

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

	const toggleRadioSelection = i => {
		console.log('toggleRadioSelection', i);
		setSelectedRadio(i);
		if( i < userInfo.shippingAddresses.length) {
			dispatch(fetchTaxRate(userInfo.shippingAddresses[i].province));
		}
		else {
			dispatch(dispatchZeroTaxRate())
		}

	};

	useEffect(() => {
		if (userInfo && userInfo.shippingAddresses && userInfo.shippingAddresses.length) {
			// console.log(userInfo.addresses.length)
			setNumOfSavedAddresses(userInfo.shippingAddresses.length);
			if(selectedRadio<userInfo.shippingAddresses.length) {
				dispatch(fetchTaxRate(userInfo.shippingAddresses[selectedRadio].province));
			}
			else {
				dispatch(dispatchZeroTaxRate())
			}

		}
	}, [userInfo]);

	return (
		<div className="shipping-address-container">
			<h2>Shipping address</h2>

			{isLoggedIn &&
				userInfo &&
				userInfo.shippingAddresses &&
				userInfo.shippingAddresses.map((address, index) => (
					<>
						{index > 0 && <hr />}
						<div className="saved-shipping">
							<div className="address-detail-wrapper">
								<input className="radio-button" type="radio" />
								<label htmlFor="">
									<span
										className={selectedRadio === index ? 'radio-icon selected' : 'radio-icon'}
										onClick={() => {
											toggleRadioSelection(index);
										}}
									></span>
									<div className="full-address">
										<p className="name">
											{address.firstName} {address.lastName}
										</p>
										<p className="address-line">{address.addressLine}</p>
										<p className="address-line">
											{address.city}, {address.province} {address.postalCode}, {address.countryCode}
										</p>
										<p className="tel">{formatPhoneNumber(address.phoneNumber)}</p>
									</div>
								</label>
							</div>
							<div className="operation">
								<span>Edit</span>
							</div>
						</div>
					</>
				))}
			<hr />
			<div className="new-shipping">
				<div className="address-detail-wrapper">
					<input className="radio-button" type="radio" />
					<label htmlFor="">
						<span
							className={selectedRadio === numOfSavedAddresses ? 'radio-icon selected' : 'radio-icon'}
							onClick={() => {
								toggleRadioSelection(numOfSavedAddresses);
							}}
						></span>
						<div className="new-address">
							<p className="title">New shipping address</p>
							{selectedRadio == numOfSavedAddresses && <NewShippingAddress ref={newAddressRef} />}
						</div>
					</label>
				</div>
			</div>
		</div>
	);
});
