import '../assets/css/AccountAddresses.scss';
import { useDispatch, useSelector } from 'react-redux';
import { formatPhoneNumber } from '../Helper';
import { getCookie } from '../UserHelper';
import * as UserHelper from '../UserHelper';
import Constants from '../Constants';
import { fetchUserInfo } from '../redux/actions/userAction';
import { RemoveConfirmDialog } from './RemoveConfirmDialog';
import { useState } from 'react';
import { EditAddressDialog } from './EditAddressDiaLog';

export const AccountAddresses = () => {
	const dispatch = useDispatch();
	const userInfo = useSelector(state => state.userReducer.userInfo);
	const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
	const [addressIdToRemove, setAddressIdToRemove] = useState(0);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
	const [addressToEdit, setAddressToEdit] = useState(null);
	const [dialogMode, setDialogMode] = useState('');

	const handleAddClick = () => {
		setAddressToEdit(null);
		setDialogMode('add');
		setIsEditDialogOpen(true);
	};

	const handleEditClick = address => {
		setAddressToEdit(address);
		setDialogMode('edit');
		setIsEditDialogOpen(true);
	};

	const handleRemoveAddress = addressId => {
		setOpenRemoveDialog(true);
		setAddressIdToRemove(addressId);
	};

	const closeRemoveConfirmDialog = () => {
		setOpenRemoveDialog(false);
		setAddressIdToRemove(0);
	};

	const closeEditConfirmDialog = async () => {
		setIsEditDialogOpen(false);
		setAddressToEdit(null);
		setDialogMode('');
		await dispatch(fetchUserInfo(UserHelper.getCookie('_userId')))
	};

	const saveAddress = async address => {
		if (dialogMode === 'edit') {
			await editAddress(address);
		} else if (dialogMode === 'add') {
			await addAddress(address);
		}
	};

	const editAddress = async updatedAddress => {
		const options = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${UserHelper.getCookie('_token')}`,
			},
			body: JSON.stringify(updatedAddress),
		};
		try {
			console.log("Sending update request for address:", updatedAddress);
			const response = await fetch(`${Constants.BACKEND_BASE_URL}/users/addresses/${updatedAddress.id}`, options);
			const result = await response.json();
			console.log("Received response:", result);

			if (result.status === 'success') {
				console.log("Address updated successfully, fetching new user info...");
				await dispatch(fetchUserInfo(UserHelper.getCookie('_userId')));
				console.log("User info fetched, closing dialog...");
				closeEditConfirmDialog();
			} else {
				console.error("Failed to update address:", result);
			}
		} catch (error) {
			console.error('Failed to edit address', error);
		}
	};

	const addAddress = async newAddress => {
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${UserHelper.getCookie('_token')}`,
			},
			body: JSON.stringify(newAddress),
		};
		try {
			console.log("Sending add request for address:", newAddress);
			const response = await fetch(`${Constants.BACKEND_BASE_URL}/users/addresses`, options);
			const result = await response.json();
			console.log("Received response:", result);

			if (response.ok) { // Check if the response status is OK
				console.log("Address added successfully, fetching new user info...");
				await dispatch(fetchUserInfo(UserHelper.getCookie('_userId')));
				console.log("User info fetched, closing dialog...");
				closeEditConfirmDialog();
			} else {
				console.error("Failed to add address:", result);
			}
		} catch (error) {
			console.error('Failed to add address', error);
		}
	};

	const removeAddress = async addressId => {
		const options = {
			method: 'DELETE',
			headers: { Authorization: `Bearer ${UserHelper.getCookie('_token')}` },
		};
		fetch(`${Constants.BACKEND_BASE_URL}/users/addresses/${addressId}`, options)
			.then(resp => resp.json())
			.then(result => {
				if (result.status === 'success') {
					dispatch(fetchUserInfo(UserHelper.getCookie('_userId')));
					setOpenRemoveDialog(false);
					setAddressIdToRemove(0);
				}
			});
	};

	return (
		<div className="account-addresses">
			<h1>Checkout Preferences</h1>
			<section className="detail">
				<div className="title">Shipping addresses
					<span className='add-user' onClick={handleAddClick}>+</span>
				</div>
				<div className="content-section">
					{userInfo &&
						userInfo.shippingAddresses &&
						Array.isArray(userInfo.shippingAddresses) &&
						userInfo.shippingAddresses.map((address, index) => (
							<div key={address.id}>
								<div className="one-address" key={address.id}>
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
										<span onClick={() => handleEditClick(address)}>Edit</span>
										<span onClick={() => handleRemoveAddress(address.id)}>Remove</span>
									</div>
								</div>
								{index < userInfo.shippingAddresses.length - 1 && <div className="separator"></div>}
							</div>
						))}
				</div>
			</section>
			<EditAddressDialog
				addressData={addressToEdit}
				isOpen={isEditDialogOpen}
				handleSave={saveAddress}
				handleClose={closeEditConfirmDialog}
				mode={dialogMode}
			/>
			<RemoveConfirmDialog
				confirmMessage="Are you sure you want to remove this shipping address?"
				yesMessage="Yes, remove this address"
				noMessage="No, keep this address"
				isOpen={openRemoveDialog}
				itemKey={addressIdToRemove}
				handleRemove={removeAddress}
				handleClose={closeRemoveConfirmDialog}
			/>
		</div>
	);
};