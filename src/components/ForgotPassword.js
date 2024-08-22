import '../assets/css/ForgotPassword.scss';
import { useState } from 'react';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
	const navigate = useNavigate();
	const [error, setError] = useState('');
	const [isReset, setIsReset] = useState(false);
	const [showPassword, setShowPassword] = useState(true);
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [state, setState] = useState({
		isEmail: true,
		isPassword: true,
		isConfirmPassword: true,
	});

	const changeHandler = ({ target }) => {
		const { name, value } = target;
		switch (name) {
			case 'email':
				if (value?.length >= 6 && value?.includes('@')) {
					setState(prevState => ({ ...prevState, isEmail: true }));
				}
				setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
				break;
			case 'password':
				if (value?.length >= 6) {
					setState(prevState => ({ ...prevState, isPassword: true }));
				}
				setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
				break;
			case 'confirmPassword':
				if (value === formData.password) {
					setState(prevState => ({ ...prevState, isConfirmPassword: true }));
				}
				setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
				break;
			default:
				break;
		}
	};

	const errorHandler = ({ target }) => {
		const { name, value } = target;
		switch (name) {
			case 'email':
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (!emailRegex.test(value)) {
					setState(prevState => ({ ...prevState, isEmail: false }));
				}
				break;
			case 'password':
				if (value.length < 6) {
					setState(prevState => ({ ...prevState, isPassword: false }));
				}
				break;
			case 'confirmPassword':
				if (value.length === 0 || value !== formData.password) {
					setState(prevState => ({ ...prevState, isConfirmPassword: false }));
				}
				break;
			default:
				break;
		}
	};

	const displayPassword = () => {
		setShowPassword(!showPassword);
	};

	const submitHandler = async e => {
		e.preventDefault();
		if (formData.password !== formData.confirmPassword) {
			return setError('new password and confirm password are nat same, please try again');
		}
		try {
			setError('');
			const { confirmPassword, ...dataToSend } = formData;
			const res = await axios.post(`http://localhost:3399/auth/reset-password`, dataToSend);
			console.log(res);
		} catch (e) {
			return console.log(e);
		}
		setIsReset(!isReset);
	};
	return (
		<>
			<div className="forgot-password" style={{ display: isReset ? 'none' : '' }}>
				<h3>Reset password</h3>
				<p>
					Enter the email address associated with your lululemon account and we’ll send you a link to reset
					your password.
				</p>
				<form onSubmit={submitHandler}>
					{/*email*/}
					<label htmlFor="email">Email Address</label>
					<div className="row">
						<input
							type="email"
							id="email"
							name="email"
							minLength="5"
							onChange={changeHandler}
							onBlur={errorHandler}
						/>
						{!state.isEmail && <CloseIcon style={{ color: 'red' }} />}
					</div>

					{!state.isEmail && (
						<p className="error-message">
							The password must be at least 5 characters long or longer with"@". Try again!
						</p>
					)}

					{/*new password*/}
					<label htmlFor="password">New Password</label>
					<div className="row">
						<input
							type={showPassword ? 'password' : 'text'}
							id="password"
							name="password"
							minLength="6"
							onChange={changeHandler}
							onBlur={errorHandler}
						/>
						<button type="button" className="eye" onClick={displayPassword}>
							{showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
						</button>
					</div>

					{!state.isPassword && (
						<p className="error-message">
							The password must be at least 6 characters long or longer. Try again!
						</p>
					)}

					{/*confirm password*/}
					<label htmlFor="confirmPassword">Confirm Password</label>
					<div className="row">
						<input
							type={showPassword ? 'password' : 'text'}
							id="confirmPassword"
							name="confirmPassword"
							minLength="6"
							onChange={changeHandler}
							onBlur={errorHandler}
						/>
						<button type="button" className="eye" onClick={displayPassword}>
							{showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
						</button>
					</div>

					{!state.isConfirmPassword && (
						<p className="error-message">
							The Confirm Password is not same with New Password, please try it again!
						</p>
					)}
					<p className="error-message">{error}</p>
					<button
						type="submit"
						className={
							state &&
							formData.email.length > 0 &&
							formData.password.length > 0 &&
							formData.confirmPassword.length > 0
								? 'ready'
								: 'reset'
						}
						disabled={
							!(
								state &&
								formData.email.length > 0 &&
								formData.password.length > 0 &&
								formData.confirmPassword.length > 0
							)
						}
					>
						RESET
					</button>
				</form>
			</div>
			{isReset && (
				<div className="reseted">
					<h3>Set a new password</h3>
					<p>
						Keep an eye out for your password link! Please note you'll only receive a link if the email
						address you entered is associated with a lululemon account.
						<br /> Having trouble? Contact us.
					</p>
					<button className="backToHome" onClick={() => navigate('/')}>
						Back To Home
					</button>
				</div>
			)}
		</>
	);
};

export default ForgotPassword;
