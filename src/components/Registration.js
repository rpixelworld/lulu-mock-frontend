import '../assets/css/Registration.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
const Registration = () => {
	const library=[
		"https://images.lululemon.com/is/image/lululemon/NA_Jul24_Membership_Partner-Perks_LogInScreen_Main_Sign-in_D_Membership",
		'https://images.lululemon.com/is/image/lululemon/NA_Jul24_Membership_Partner-Perks_LogInScreen_Main_Sign-in_D_PartnerPerks'
	]
	const navigate = useNavigate();
	const [isSuccess, setIsSuccess] = useState(false);
	const [showPassword, setShowPassword] = useState(true);
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		age: '',
		email: '',
		password: '',
	});

	const [state, setState] = useState({
		isFirstName: true,
		isLastName: true,
		isAge: true,
		isEmail: true,
		isPassword: true,
	});

	const isAllTrue = Object.values(state).every(value => value === true);
	const isFormValid = () => {
		return (
			formData?.firstName?.length > 0 &&
			formData?.lastName?.length > 0 &&
			formData?.age?.length > 0 &&
			formData?.email?.length >= 5 &&
			formData?.password?.length >= 6
		);
	};
	const [errorEmail, setErrorEmail] = useState('');
	const handleChange = ({ target }) => {
		const { name, value } = target;
		switch (name) {
			case 'firstName':
				if (value.length > 0) {
					setState(prevState => ({ ...prevState, isFirstName: true }));
				}
				setFormData(prevFromData => ({ ...prevFromData, [name]: value }));
				break;
			case 'lastName':
				if (value.length > 0) {
					setState(prevState => ({ ...prevState, isLastName: true }));
				}
				setFormData(prevFromData => ({ ...prevFromData, [name]: value }));
				break;
			case 'age':
				if (value > 0 && value <= 150) {
					setState(prevState => ({ ...prevState, isAge: true }));
				}
				setFormData(prevFromData => ({ ...prevFromData, [name]: Number(value) }));
				break;
			case 'email':
				setErrorEmail('');
				if (value.length > 5 && value?.includes('@')) {
					setState(prevState => ({ ...prevState, isEmail: true }));
				}
				setFormData(prevFromData => ({ ...prevFromData, [name]: value }));
				break;
			case 'password':
				if (value.length >= 6) {
					setState(prevState => ({ ...prevState, isPassword: true }));
				}
				setFormData(prevFromData => ({ ...prevFromData, [name]: value }));
				break;
			default:
				break;
		}
	};
	const errorHandler = ({ target }) => {
		const { name, value } = target;
		switch (name) {
			case 'firstName':
				if (value.length === 0) {
					setState(prevState => ({ ...prevState, isFirstName: false }));
				}
				break;
			case 'lastName':
				if (value.length === 0) {
					setState(prevState => ({ ...prevState, isLastName: false }));
				}
				break;
			case 'age':
				if (value < 0 || value > 150 || value.length === 0) {
					setState(prevState => ({ ...prevState, isAge: false }));
				}
				break;
			case 'email':
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (!emailRegex.test(value)) {
					setErrorEmail('The password must be at least 5 characters long or longer with"@". Try again!');
					setState(prevState => ({ ...prevState, isEmail: false }));
				}
				break;
			case 'password':
				if (value.length < 6) {
					setState(prevState => ({ ...prevState, isPassword: false }));
				}
				break;
			default:
				break;
		}
	};
	const submitHandler = async e => {
		e.preventDefault();
		try {
			const res = await axios.post(`http://localhost:3399/users/`, formData);
			console.log(res);
			setIsSuccess(true);
		} catch (error) {
			if (error.response.data.error.message.code === 'ER_DUP_ENTRY') {
				setState(prevState => ({ ...prevState, isEmail: false }));

				setErrorEmail('This email is already in use, please try other one!');
			}
			return console.log(error);
		}
	};
	const displayPassword = () => {
		setShowPassword(!showPassword);
	};


	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentImageIndex((prevIndex) =>
				prevIndex === library.length - 1 ? 0 : prevIndex + 1
			);
		}, 5000);

		// Clean up the interval on component unmount
		return () => clearInterval(timer);
	}, [library.length,currentImageIndex]);


	return (
		<div className="regi-basebord">
			<div
				className="side-face"
				style={{
					backgroundImage: `url(${library[currentImageIndex]})`,
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center center',
					backgroundSize: 'cover',
				}}
			/>


			{isSuccess ? (
				<div className="success-signup">
					<div className="logo">
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/2/22/Lululemon_Athletica_logo.svg"
							alt="logo"
						/>
					</div>
					<h1>
						Congratulations! <br />
						You created an account successfully.
					</h1>
					<button className="backToShopping"
							onClick={() => navigate('/')}>Back To Shopping
					</button>
				</div>
			) : (
				<div className="registration">
					<div className="signup-box">
						{/*logo*/}
						{/*{JSON.stringify(formData)}*/}
						<div className="logo">
							<img
								src="https://upload.wikimedia.org/wikipedia/commons/2/22/Lululemon_Athletica_logo.svg"
								alt="logo"
							/>
						</div>
						<div className="regi-title">
							<h2>Create a member account</h2>
						</div>
						<form onSubmit={submitHandler}>
							{/*1.first name*/}
							<label htmlFor="firstName">First name:</label>
							<div className="row">
								<input
									type="text"
									name="firstName"
									id="fistName"
									onChange={handleChange}
									onBlur={errorHandler}
								/>
								{!state.isFirstName && <CloseIcon style={{ color: 'red' }} />}
							</div>
							{!state.isFirstName && <p className="regi-err">First name can not be empty.</p>}

							{/*2.last name*/}
							<label htmlFor="lastName">Last name:</label>
							<div className="row">
								<input
									type="text"
									name="lastName"
									id="lastName"
									onChange={handleChange}
									onBlur={errorHandler}
								/>
								{!state.isLastName && <CloseIcon style={{ color: 'red' }} />}
							</div>
							{!state.isLastName && <p className="regi-err">Last name can not be empty.</p>}

							{/*3.age*/}
							<label htmlFor="age">Age:</label>
							<div className="row">
								<input
									type="number"
									name="age"
									id="age"
									onChange={handleChange}
									onBlur={errorHandler}
								/>
								{!state.isAge && <CloseIcon style={{ color: 'red' }} />}
							</div>
							{!state.isAge && (
								<p className="regi-err">
									Age can not be empty, and the number is allowed between 1~150. Try again!
								</p>
							)}

							{/*4.email*/}
							<label htmlFor="email">Email address:</label>
							<div className="row">
								<input
									type="email"
									name="email"
									id="email"
									onChange={handleChange}
									onBlur={errorHandler}
								/>
								{!state.isEmail && <CloseIcon style={{ color: 'red' }} />}
							</div>
							{!state.isEmail && <p className="regi-err">{errorEmail}</p>}

							{/*5.password*/}
							<label htmlFor="password">Password:</label>
							<div className="row">
								<input
									type={showPassword ? 'password' : 'text'}
									name="password"
									id="password"
									onChange={handleChange}
									onBlur={errorHandler}
								/>

								<button type="button" className="eye" onClick={displayPassword}>
									{showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
								</button>
								{!state.isPassword && <CloseIcon style={{ color: 'red' }} />}
							</div>

							{!state.isPassword && (
								<p className="regi-err">
									The password must be at least 6 characters long or longer. Try again!
								</p>
							)}
							<div className="policy">
								<p>
									By clicking "Create Member Account" you agree to the Terms of Use and to join
									lululemon Membership. See our Privacy Policy for details about our information
									practices. California consumers, also see our Notice of Financial Incentives.
									lululemon will use information you submit (including identifiers, commercial
									information, and internet or other electronic network activity information) to
									fulfill this request.
								</p>
							</div>
							<button
								type="submit"
								className={isAllTrue && isFormValid ? 'already' : 'not-ready'}
								disabled={!(isAllTrue && isFormValid)}
							>
								SIGN UP
							</button>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default Registration;
