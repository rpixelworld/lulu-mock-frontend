import '../assets/css/AccountAddresses.scss';
import { useDispatch, useSelector } from 'react-redux';
import { formatPhoneNumber } from '../Helper';
import { getCookie } from '../UserHelper';
import * as UserHelper from '../UserHelper';
import Constants from '../Constants';
import { fetchUserInfo } from '../redux/actions/userAction';
import { RemoveConfirmDialog } from './RemoveConfirmDialog';
import { useState } from 'react';

export const AccountAddresses = () => {
	const dispatch = useDispatch();
	const userInfo = useSelector(state => state.userReducer.userInfo);
	const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
	const [addressIdToRemove, setAddressIdToRemove] = useState(0);

	const handleRemoveAddress = addressId => {
		setOpenRemoveDialog(true)
		setAddressIdToRemove(addressId)
	};

	const closeRemoveConfirmDialog = () => {
		setOpenRemoveDialog(false)
		setAddressIdToRemove(0)
	}

	const removeAddress = addressId => {
		const options = {
			method: 'DELETE',
			headers: { Authorization: `Bearer ${UserHelper.getCookie('_token')}` },
		};
		fetch(`${Constants.BACKEND_BASE_URL}/users/addresses/${addressId}`, options)
			.then(resp => resp.json())
			.then(result => {
				if (result.status === 'success') {
					dispatch(fetchUserInfo(UserHelper.getCookie('_userId')));
					setOpenRemoveDialog(false)
					setAddressIdToRemove(0)
				}
			});
	}

	return (
		<div className="account-addresses">
			<h1>Checkout Preferences</h1>
			<section className="detail">
				<div className="title">Shipping addresses</div>
				<div className="content-section">
					{userInfo &&
						userInfo.shippingAddresses &&
						Array.isArray(userInfo.shippingAddresses) &&
						userInfo.shippingAddresses.map((address, index) => (
							<>
								<div className="one-address">
									<div className="content">
										<div className="name">
											{address.firstName} {address.lastName}
										</div>
										<div className="value">{address.addressLine}</div>
										<div className="value">
											{address.city}, {address.province} {address.postalCode},{' '}
											{address.countryCode}
										</div>
										<div className="value">{formatPhoneNumber(address.phoneNumber)}</div>
									</div>
									<div className="operation">
										<span>Edit</span>
										<span onClick={() => handleRemoveAddress(address.id)}>Remove</span>
									</div>
								</div>
								{index < userInfo.shippingAddresses.length - 1 && <div className="seperator"></div>}
							</>
						))}
				</div>
			</section>
			<RemoveConfirmDialog
				confirmMessage='Are you sure you want to remove this shipping address?'
				yesMessage='Yes, remove this address'
				noMessage='No, keep this address'
				isOpen={openRemoveDialog}
				itemKey={addressIdToRemove}
				handleRemove={removeAddress}
				handleClose={closeRemoveConfirmDialog}
			/>
		</div>
	);
};
