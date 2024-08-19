import '../assets/css/AccountAddresses.scss';
import { useDispatch, useSelector } from 'react-redux';
import { formatPhoneNumber } from '../Helper';
import { getCookie } from '../UserHelper';
import * as UserHelper from '../UserHelper';
import Constants from '../Constants';
import { fetchUserInfo } from '../redux/actions/userAction';

export const AccountAddresses = () => {
	const dispatch = useDispatch();
	const userInfo = useSelector(state => state.userReducer.userInfo);

	const handleRemoveAddress = addressId => {
		const options = {
			method: 'DELETE',
			headers: { Authorization: `Bearer ${UserHelper.getCookie('_token')}` },
		};
		fetch(`${Constants.BACKEND_BASE_URL}/users/addresses/${addressId}`, options)
			.then(resp => resp.json())
			.then(result => {
				if (result.status === 'success') {
					dispatch(fetchUserInfo(UserHelper.getCookie('_userId')));
				}
			});
	};

	return (
		<div className="account-addresses">
			<h1>Checkout Preferences</h1>
			<section className="detail">
				<div className="title">Shipping addresses</div>
				<div className="content-section">
					{userInfo &&
						userInfo.shippingAddresses &&
						userInfo.shippingAddresses.length &&
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
		</div>
	);
};
