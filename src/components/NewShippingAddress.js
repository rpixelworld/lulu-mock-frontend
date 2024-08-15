import '../assets/css/NewShippingAddress.scss';
import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select } from '@mui/material';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { dispatchZeroTaxRate, fetchTaxRate } from '../redux/actions/shoppingAction';
import { useDispatch } from 'react-redux';

export const NewShippingAddress = forwardRef((props, ref) => {
	const fieldRefs = useRef(new Array(7));
	const addressLineRef = useRef(null);
	const [address, setAddress] = useState({
		firstName: '',
		lastName: '',
		phoneNumber: '',
		addressLine: '',
		city: '',
		province: ' ',
		postalCode: '',
		countryCode: 'CA',
	});
	const [saveAddress, setSaveAddress] = useState(false);

	const [touched, setTouched] = useState({});
	const [errors, setErrors] = useState({});
	const dispatch = useDispatch();

	useImperativeHandle(ref, () => ({
		toSaveAddress: () => {
			return saveAddress;
		},
		getNewAddress: () => {
			return {
				firstName: address.firstName,
				lastName: address.lastName,
				addressLine: address.addressLine,
				city: address.city,
				postalCode: address.postalCode,
				phoneNumber: address.phoneNumber.replace(/\D/g, ''),
				province: address.province,
				countryCode: 'CA',
			};
		},
		isValid: () => {
			const errorMsgs = validate();
			if (
				errorMsgs.firstName ||
				errorMsgs.lastName ||
				errorMsgs.addressLine ||
				errorMsgs.city ||
				errorMsgs.countryCode ||
				errorMsgs.postalCode ||
				errorMsgs.phoneNumber
			) {
				return false;
			} else {
				return true;
			}
		},
	}));

	const handleFieldChange = e => {
		const { name, value } = e.target;
		console.log(name, value);
		setAddress(prev => {
			return { ...prev, [name]: value };
		});
		validate();
	};

	const handleFieldFocus = e => {
		const { name, value } = e.target;
		console.log(e.target, name, value);
		setTouched(prev => {
			return { ...prev, [name]: true };
		});
	};

	const handleSelectChange = e => {
		const { name, value } = e.target;
		setAddress(prev => {
			return { ...prev, [name]: value };
		});
		validateProvince(value);
	};
	const validateProvince = province => {
		if (province.trim() === '') {
			setErrors(prev => ({ ...prev, province: 'Please select your province.' }));
			dispatch(dispatchZeroTaxRate());
		} else {
			setErrors(prev => ({ ...prev, province: null }));
			dispatch(fetchTaxRate(province));
		}
	};
	const validate = () => {
		console.log('validating new shipping ', fieldRefs.current);
		const firstName = fieldRefs.current[0].value;
		const lastName = fieldRefs.current[1].value;
		const phoneNumber = fieldRefs.current[2].value;
		const phoneRemoveDigit = fieldRefs.current[2].value.replace(/\D/g, '');
		const addressLine = fieldRefs.current[3].value;
		const city = fieldRefs.current[4].value;
		const province = fieldRefs.current[5].value;
		const postalCode = fieldRefs.current[6].value;

		console.log('state===', fieldRefs.current[5].value);

		let errorMsgs = { state: errors.state };
		setErrors({});

		if (firstName.trim() === '') {
			errorMsgs.firstName = 'Please enter your first name.';
		}

		if (lastName.trim() === '') {
			errorMsgs.lastName = 'Please enter your last name.';
		}
		if (true) {
			if (phoneNumber.trim() === '') {
				errorMsgs.phoneNumber = 'Please enter your phone.';
			} else if (!isValidPhoneNumber(phoneNumber) && !isValidPhoneNumber(phoneRemoveDigit)) {
				errorMsgs.phoneNumber = 'Please enter a valid 10-digit phone number.';
			} else {
				setAddress(prev => {
					return { ...prev, phoneNumber: formatPhoneNumber(phoneNumber) };
				});
			}
		}
		if (addressLine.trim() === '') {
			errorMsgs.addressLine = 'Please enter your street address.';
		}
		if (city.trim() === '') {
			errorMsgs.city = 'Please enter your city.';
		}

		if (province.trim() === '') {
			errorMsgs.province = 'Please select your province.';
		}

		if (postalCode.trim() === '') {
			errorMsgs.postalCode = 'Please enter a valid postal code.';
		}

		console.log(errorMsgs);

		setErrors(errorMsgs);
		return errorMsgs;
	};

	const isValidPhoneNumber = phoneNumber => {
		// Regular expression to match exactly 10 digits
		const phoneRegex = /^\d{10}$/;
		return phoneRegex.test(phoneNumber);
	};

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

	useEffect(() => {
		const script = document.createElement('script');
		script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAKxFKjjiSJ2J2EnViKkWHh3UlNp1XS70s&libraries=places`;
		script.async = true;
		script.defer = true;
		script.onload = () => {
			if (window.google) {
				const autocomplete = new window.google.maps.places.Autocomplete(fieldRefs.current[3], {
					componentRestrictions: { country: 'ca' },
					types: ['geocode'], // You can restrict the types as per your needs
				});
				autocomplete.setFields(['address_component']);
				autocomplete.addListener('place_changed', () => {
					const place = autocomplete.getPlace();
					const addressComponents = place.address_components;
					const updatedAddress = {
						addressLine: '',
						city: '',
						province: '',
						postalCode: '',
						countryCode: '',
					};
					addressComponents.forEach(component => {
						const types = component.types;
						if (types.includes('street_number')) {
							updatedAddress.addressLine = component.long_name + ' ' + updatedAddress.addressLine;
						}
						if (types.includes('route')) {
							updatedAddress.addressLine += component.long_name;
						}
						if (types.includes('locality')) {
							updatedAddress.city = component.long_name;
						}
						if (types.includes('administrative_area_level_1')) {
							updatedAddress.province = component.short_name;
							dispatch(fetchTaxRate(component.short_name));
						}
						if (types.includes('postal_code')) {
							updatedAddress.postalCode = component.long_name;
						}
						if (types.includes('country')) {
							updatedAddress.countryCode = component.long_name;
						}
					});
					setAddress(updatedAddress);
					setErrors(prev => ({...prev, addressLine:'', city:'', province:'', postalCode:''}))
				});
			}
		};
		document.head.appendChild(script);
	}, []);

	return (
		<div className="new-address-form-wrapper">
			<form className="new-address-form" action="">
				<div className="row-2">
					<div className="col">
						<label className="label" htmlFor="">
							First name
						</label>
						<input
							type="text"
							className={errors.firstName ? 'invalid' : ''}
							name="firstName"
							value={address.firstName}
							ref={ele => {
								fieldRefs.current[0] = ele;
							}}
							onChange={handleFieldChange}
							onFocus={handleFieldFocus}
							onBlur={validate}
						/>
						{errors.firstName && (
							<div className="icons">
								<div className="error-icon"></div>
							</div>
						)}
						{errors.firstName && <div className="errr-hint">{errors.firstName}</div>}
					</div>
					<div className="col">
						<label className="label" htmlFor="">
							Last name
						</label>
						<input
							type="text"
							className={errors.lastName ? 'invalid' : ''}
							name="lastName"
							value={address.lastName}
							ref={ele => {
								fieldRefs.current[1] = ele;
							}}
							onChange={handleFieldChange}
							onFocus={handleFieldFocus}
							onBlur={validate}
						/>
						{errors.lastName && (
							<div className="icons">
								<div className="error-icon"></div>
							</div>
						)}
						{errors.lastName && <div className="errr-hint">{errors.lastName}</div>}
					</div>
				</div>
				<div className="row-1">
					<label className="label" htmlFor="">
						Phone number
					</label>
					<input
						type="text"
						className={errors.phoneNumber ? 'invalid' : ''}
						name="phoneNumber"
						value={address.phoneNumber}
						ref={ele => {
							fieldRefs.current[2] = ele;
						}}
						onChange={handleFieldChange}
						onFocus={handleFieldFocus}
						onBlur={validate}
					/>
					{errors.phoneNumber && (
						<div className="icons">
							<div className="error-icon"></div>
						</div>
					)}
					{errors.phoneNumber && <div className="errr-hint">{errors.phoneNumber}</div>}
					<p className="notice">This will be only used for delivery related issues.</p>
				</div>
				<div className="row-1">
					<label className="label" htmlFor="">
						Address
					</label>
					<input
						type="text"
						className={errors.addressLine ? 'invalid' : ''}
						name="addressLine"
						value={address.addressLine}
						ref={ele => {
							fieldRefs.current[3] = ele;
						}}
						onChange={handleFieldChange}
						onFocus={handleFieldFocus}
						onBlur={validate}
					/>
					{errors.addressLine && (
						<div className="icons">
							<div className="error-icon"></div>
						</div>
					)}
					{errors.addressLine && <div className="errr-hint">{errors.addressLine}</div>}
				</div>
				<div className="row-3">
					<div className="col">
						<label className="label" htmlFor="">
							City
						</label>
						<input
							type="text"
							className={errors.city ? 'invalid' : ''}
							name="city"
							value={address.city}
							ref={ele => {
								fieldRefs.current[4] = ele;
							}}
							onChange={handleFieldChange}
							onFocus={handleFieldFocus}
							onBlur={validate}
						/>
						{errors.city && (
							<div className="icons">
								<div className="error-icon"></div>
							</div>
						)}
						{errors.city && <div className="errr-hint">{errors.city}</div>}
					</div>
					<div className="col">
						<label className="label" htmlFor="">
							Province
						</label>
						<FormControl fullWidth>
							<InputLabel id="select-state"></InputLabel>
							<Select
								labelId="select-state"
								id="province"
								// label=" "
								className={`select ${errors.province ? 'invalid' : ''}`}
								name="province"
								value={address.province}
								inputRef={ele => {
									fieldRefs.current[5] = ele;
								}}
								onChange={handleSelectChange}
							>
								<MenuItem value=" ">Select...</MenuItem>
								<MenuItem value="AB">Alberta</MenuItem>
								<MenuItem value="BC">British Columbia</MenuItem>
								<MenuItem value="MB">Manitoba</MenuItem>
								<MenuItem value="NB">New Brunswick</MenuItem>
								<MenuItem value="NL">Newfoundland and Labrador</MenuItem>
								<MenuItem value="NS">Nova Scotia</MenuItem>
								<MenuItem value="ON">Ontario</MenuItem>
								<MenuItem value="PE">Prince Edward Island</MenuItem>
								<MenuItem value="QC">Quebec</MenuItem>
								<MenuItem value="SK">Saskatchewan</MenuItem>
							</Select>
						</FormControl>
						{errors.province && (
							<div className="icons">
								<div className="error-icon-province"></div>
							</div>
						)}
						{errors.province && <div className="errr-hint-province">{errors.province}</div>}
					</div>
					<div className="col">
						<label className="label" htmlFor="">
							Postal code
						</label>
						<input
							type="text"
							className={errors.postalCode ? 'invalid' : ''}
							name="postalCode"
							value={address.postalCode}
							ref={ele => {
								fieldRefs.current[6] = ele;
							}}
							onChange={handleFieldChange}
							onFocus={handleFieldFocus}
							onBlur={validate}
						/>
						{errors.postalCode && (
							<div className="icons">
								<div className="error-icon"></div>
							</div>
						)}
						{errors.postalCode && <div className="errr-hint">{errors.postalCode}</div>}
					</div>
				</div>
			</form>
			<div>
				<FormControlLabel
					className="save-address"
					value={saveAddress}
					onClick={() => {
						setSaveAddress(prev => !prev);
					}}
					control={<Checkbox color="default" />}
					label="Save address to my account"
				/>
			</div>
		</div>
	);
});
