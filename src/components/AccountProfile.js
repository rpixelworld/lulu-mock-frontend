import '../assets/css/AccountProfile.scss';
import { useDispatch, useSelector } from 'react-redux';

export const AccountProfile = () => {
	// const dispatch = useDispatch();
	const userInfo = useSelector(state => state.userReducer.userInfo);

	return (
		<div className="account-profile">
			<h1>Hi {userInfo.firstName}</h1>
			<section className="detail">
				<div className="title">Profile</div>
				<div className="content-section">
					<div className="content">
						<div className="subtitle">Name</div>
						<div className="value">
							{userInfo.firstName} {userInfo.lastName}
						</div>
					</div>
					<div className="operation">
						<span>Edit</span>
					</div>
				</div>
			</section>

			<section className="detail">
				<div className="title">Account</div>
				<div className="content-section">
					<div className="content">
						<div className="subtitle">Email</div>
						<div className="value">{userInfo.email}</div>
					</div>
					<div className="operation">
						<span>Edit</span>
					</div>
				</div>
				<div className="seperator"></div>
				<div className="content-section">
					<div className="content">
						<div className="subtitle">Password</div>
						<div className="value">*******</div>
					</div>
					<div className="operation">
						<span>Edit</span>
					</div>
				</div>
			</section>
		</div>
	);
};
