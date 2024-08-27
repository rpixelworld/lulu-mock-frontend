import React, { useState, useEffect } from 'react';
import ProfileDialog from './ProfileDialog';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfo } from '../redux/actions/userAction';
import '../assets/css/AccountProfile.scss';
import axios from 'axios';

export const AccountProfile = () => {
	const dispatch = useDispatch();
	const userInfo = useSelector(state => state.userReducer.userInfo) || { firstName: '', lastName: '', email: '' };
	const [dialogIsOpen, setDialogIsOpen] = useState(false);
	const [emailDialogIsOpen, setEmailDialogIsOpen] = useState(false);
	const [passwordDialogIsOpen, setPasswordDialogIsOpen] = useState(false);
	const [firstName, setFirstName] = useState(userInfo.firstName || '');
	const [lastName, setLastName] = useState(userInfo.lastName || '');
	const [email, setEmail] = useState(userInfo.email || '');
	const [password, setPassword] = useState('');

	useEffect(() => {
		if (userInfo.id) {
			dispatch(fetchUserInfo(userInfo.id));
		}
	}, [dispatch, userInfo.id]);

	useEffect(() => {
		setFirstName(userInfo.firstName || '');
		setLastName(userInfo.lastName || '');
		setEmail(userInfo.email || '');
	}, [userInfo]);

	const openDialog = () => {
		setDialogIsOpen(true);
	};

	const closeDialog = () => setDialogIsOpen(false);

	const openEmailDialog = () => {
		setEmailDialogIsOpen(true);
	};

	const closeEmailDialog = () => setEmailDialogIsOpen(false);

	const openPasswordDialog = () => {
		setPasswordDialogIsOpen(true);
	};

	const closePasswordDialog = () => setPasswordDialogIsOpen(false);

	const handleSave = async e => {
		e.preventDefault();
		try {
			const userId = userInfo?.id;
			if (!userId) {
				console.error('User ID is not available.');
				return;
			}

			if (!firstName || !lastName) {
				console.error('First name or last name is missing.');
				return;
			}

			const response = await axios.put(
				`http://localhost:3399/users/${userId}`,
				{
					firstName,
					lastName,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			if (response.status === 200) {
				dispatch(fetchUserInfo(userId));
				closeDialog();
			}
		} catch (error) {
			console.error('Error updating user information:', error.response?.data || error.message);
		}
	};

	const handleEmailSave = async e => {
		e.preventDefault();
		try {
			const userId = userInfo?.id;
			if (!userId) {
				console.error('User ID is not available.');
				return;
			}

			if (!email) {
				console.error('Email is missing.');
				return;
			}

			const response = await axios.put(
				`http://localhost:3399/users/update/${userId}`,
				{
					email,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			if (response.status === 200) {
				dispatch(fetchUserInfo(userId));
				closeEmailDialog();
			}
		} catch (error) {
			console.error('Error updating email information:', error.response?.data || error.message);
		}
	};

	const handlePasswordSave = async e => {
		e.preventDefault();
		try {
			const userId = userInfo?.id;
			if (!userId) {
				console.error('User ID is not available.');
				return;
			}

			if (!password) {
				console.error('Password is missing.');
				return;
			}

			const response = await axios.put(
				`http://localhost:3399/users/update/${userId}`,
				{
					password,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			if (response.status === 200) {
				dispatch(fetchUserInfo(userId));
				closePasswordDialog();
			}
		} catch (error) {
			console.error('Error updating password information:', error.response?.data || error.message);
		}
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
						<span onClick={openEmailDialog}>Edit</span>
					</div>
				</div>
				<div className="seperator"></div>
				<div className="content-section">
					<div className="content">
						<div className="subtitle">Password</div>
						<div className="value">*******</div>
					</div>
					<div className="operation">
						<span onClick={openPasswordDialog}>Edit</span>
					</div>
				</div>
			</section>

			<ProfileDialog isOpen={dialogIsOpen} onClose={closeDialog}>
				<h2>Edit your name</h2>
				<form>
					<div>
						<label className="first-name">First name</label>
						<div className="first-name-input">
							<input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
						</div>
					</div>
					<div>
						<label className="last-name">Last name</label>
						<div className="last-name-input">
							<input type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
						</div>
					</div>
					<div className="btn23">
						<button type="button" className="btn2" onClick={handleSave}>
							SAVE NAME
						</button>
						<button type="button" className="btn3" onClick={closeDialog}>
							Cancel
						</button>
					</div>
				</form>
			</ProfileDialog>

			<ProfileDialog isOpen={emailDialogIsOpen} onClose={closeEmailDialog}>
				<h2>Change your email</h2>
				<form>
					<div>
						<label className="email"> New Email</label>
						<div className="email-input">
							<input type="email" value={email} onChange={e => setEmail(e.target.value)} />
						</div>
					</div>
					<div className="btn23">
						<button type="button" className="btn4" onClick={handleEmailSave}>
							SAVE EMAIL
						</button>
						<button type="button" className="btn5" onClick={closeEmailDialog}>
							Cancel
						</button>
					</div>
				</form>
			</ProfileDialog>

			<ProfileDialog isOpen={passwordDialogIsOpen} onClose={closePasswordDialog}>
				<h2>Change your password</h2>
				<form>
					<div>
						<label className="password">New Password</label>
						<div className="password-input">
							<input type="password" value={password} onChange={e => setPassword(e.target.value)} />
						</div>
					</div>
					<div className="btn23">
						<button type="button" className="btn4" onClick={handlePasswordSave}>
							SAVE PASSWORD
						</button>
						<button type="button" className="btn5" onClick={closePasswordDialog}>
							Cancel
						</button>
					</div>
				</form>
			</ProfileDialog>
		</div>
	);
};
