import React, { useState, useEffect } from 'react';
import ProfileDialog from './ProfileDialog';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfo, updateUserInfo } from '../redux/actions/userAction';
import '../assets/css/AccountProfile.scss';

export const AccountProfile = () => {
	const dispatch = useDispatch();
	const userInfo = useSelector(state => state.userReducer.userInfo) || { firstName: '', lastName: '', email: '' };
	const [dialogIsOpen, setDialogIsOpen] = useState(false);
	const [firstName, setFirstName] = useState(userInfo.firstName || '');
	const [lastName, setLastName] = useState(userInfo.lastName || '');


	useEffect(() => {
		dispatch(fetchUserInfo());
	}, [dispatch]);

	const openDialog = () => {
		setDialogIsOpen(true);
	};

	const closeDialog = () => setDialogIsOpen(false);

	const handleSave = (e) => {
		closeDialog();
	};


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
						<span onClick={openDialog}>Edit</span>
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
			<ProfileDialog isOpen={dialogIsOpen} onClose={closeDialog}>
				<h2>Edit your name</h2>
				<form>
					<div>
						<label className="first-name">First name</label>
						<div className="first-name-input">
						<input
							type="text"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
						/>
						</div>
					</div>
					<div>
						<label className="last-name">Last name</label>
						<div className="last-name-input">
						<input
							type="text"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
						/>
						</div>
					</div>
					<div className="btn23">
					<button className="btn2" onClick={handleSave}>SAVE NAME</button>
					<button className="btn3" onClick={closeDialog}>Cancel</button>
					</div>
				</form>
			</ProfileDialog>
		</div>
);
};