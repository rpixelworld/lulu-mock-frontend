import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfo } from '../redux/actions/userAction';
import { Dialog, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
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
	const [errors, setErrors] = useState({});
	const [validForm, setValidForm] = useState(true);

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

	const validateName = () => {
		let valid = true;
		setErrors(prev => ({ ...prev, name: '' }));
		if (!firstName || !lastName) {
			valid = false;
			setErrors(prev => ({
				...prev,
				name: 'First name and last name are required',
			}));
		}
		return valid;
	};

	const validateEmail = () => {
		let valid = true;
		setErrors(prev => ({ ...prev, email: '' }));
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!email) {
			valid = false;
			setErrors(prev => ({
				...prev,
				email: 'Please enter an email address',
			}));
		} else if (!re.test(String(email).toLowerCase())) {
			valid = false;
			setErrors(prev => ({
				...prev,
				email: 'Email address is not in the correct format (xxx@yyy.zzz).',
			}));
		}
		return valid;
	};

	const validatePassword = () => {
		let valid = true;
		setErrors(prev => ({ ...prev, password: '' }));
		if (!password) {
			valid = false;
			setErrors(prev => ({
				...prev,
				password: 'Password is required',
			}));
		}
		return valid;
	};

	const handleSave = async e => {
		e.preventDefault();
		const isValid = validateName();
		if (!isValid) return;

		try {
			const userId = userInfo?.id;
			if (!userId) {
				console.error('User ID is not available.');
				return;
			}

			const response = await axios.put(
				`http://localhost:3399/users/${userId}`,
				{ firstName, lastName },
				{ headers: { 'Content-Type': 'application/json' } }
			);

			if (response.status === 200) {
				dispatch(fetchUserInfo(userId));
				setDialogIsOpen(false);
			}
		} catch (error) {
			console.error('Error updating user information:', error.response?.data || error.message);
		}
	};

	const handleEmailSave = async e => {
		e.preventDefault();
		const isValid = validateEmail();
		if (!isValid) return;

		try {
			const userId = userInfo?.id;
			if (!userId) {
				console.error('User ID is not available.');
				return;
			}

			const response = await axios.put(
				`http://localhost:3399/users/${userId}`,
				{ email },
				{ headers: { 'Content-Type': 'application/json' } }
			);

			if (response.status === 200) {
				dispatch(fetchUserInfo(userId));
				setEmailDialogIsOpen(false);
			}
		} catch (error) {
			console.error('Error updating email information:', error.response?.data || error.message);
		}
	};

	const handlePasswordSave = async e => {
		e.preventDefault();
		const isValid = validatePassword();
		if (!isValid) return;

		try {
			const userId = userInfo?.id;
			if (!userId) {
				console.error('User ID is not available.');
				return;
			}

			const response = await axios.put(
				`http://localhost:3399/users/${userId}`,
				{ password },
				{ headers: { 'Content-Type': 'application/json' } }
			);

			if (response.status === 200) {
				dispatch(fetchUserInfo(userId));
				setPasswordDialogIsOpen(false);
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
						<Button variant="outlined" onClick={() => setDialogIsOpen(true)}>
							Edit
						</Button>
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
						<Button variant="outlined" onClick={() => setEmailDialogIsOpen(true)}>
							Edit
						</Button>
					</div>
				</div>
				<div className="seperator"></div>
				<div className="content-section">
					<div className="content">
						<div className="subtitle">Password</div>
						<div className="value">*******</div>
					</div>
					<div className="operation">
						<Button variant="outlined" onClick={() => setPasswordDialogIsOpen(true)}>
							Edit
						</Button>
					</div>
				</div>
			</section>

			<Dialog open={dialogIsOpen} onClose={() => setDialogIsOpen(false)}>
				<DialogTitle>Edit your name</DialogTitle>
				<DialogContent>
					<form>
						<TextField
							label="First name"
							value={firstName}
							onChange={e => setFirstName(e.target.value)}
							fullWidth
							margin="normal"
							error={!!errors.name}
							helperText={errors.name}
						/>
						<TextField
							label="Last name"
							value={lastName}
							onChange={e => setLastName(e.target.value)}
							fullWidth
							margin="normal"
							error={!!errors.name}
							helperText={errors.name}
						/>
						<div className="btn23">
							<Button
								variant="contained"
								color="primary"
								onClick={handleSave}
								sx={{ backgroundColor: 'gray', '&:hover': { backgroundColor: 'darkgray' } }}
							>
								SAVE NAME
							</Button>
							<Button
								variant="outlined"
								onClick={() => setDialogIsOpen(false)}
								sx={{
									borderColor: 'black',
									color: 'black',
									'&:hover': {
										borderColor: 'darkgray',
										color: 'darkgray',
									},
								}}
							>
								Cancel
							</Button>
						</div>
					</form>
				</DialogContent>
			</Dialog>

			<Dialog open={emailDialogIsOpen} onClose={() => setEmailDialogIsOpen(false)}>
				<DialogTitle>Change your email</DialogTitle>
				<DialogContent>
					<form>
						<TextField
							label="New Email"
							type="email"
							value={email}
							onChange={e => setEmail(e.target.value)}
							fullWidth
							margin="normal"
							error={!!errors.email}
							helperText={errors.email}
						/>
						<div className="btn23">
							<Button
								variant="contained"
								color="primary"
								onClick={handleEmailSave}
								sx={{ backgroundColor: 'gray', '&:hover': { backgroundColor: 'darkgray' } }}
							>
								SAVE EMAIL
							</Button>
							<Button
								variant="outlined"
								onClick={() => setEmailDialogIsOpen(false)}
								sx={{
									borderColor: 'black',
									color: 'black',
									'&:hover': {
										borderColor: 'darkgray',
										color: 'darkgray',
									},
								}}
							>
								Cancel
							</Button>
						</div>
					</form>
				</DialogContent>
			</Dialog>

			<Dialog open={passwordDialogIsOpen} onClose={() => setPasswordDialogIsOpen(false)}>
				<DialogTitle>Change your password</DialogTitle>
				<DialogContent>
					<form>
						<TextField
							label="New Password"
							type="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
							fullWidth
							margin="normal"
							error={!!errors.password}
							helperText={errors.password}
						/>
						<div className="btn23">
							<Button
								variant="contained"
								color="primary"
								onClick={handlePasswordSave}
								sx={{ backgroundColor: 'gray', '&:hover': { backgroundColor: 'darkgray' } }}
							>
								SAVE PASSWORD
							</Button>
							<Button
								variant="outlined"
								onClick={() => setPasswordDialogIsOpen(false)}
								sx={{
									borderColor: 'black',
									color: 'black',
									'&:hover': {
										borderColor: 'darkgray',
										color: 'darkgray',
									},
								}}
							>
								Cancel
							</Button>
						</div>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
};
