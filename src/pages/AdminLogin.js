import { useEffect, useState } from 'react';
import '../assets/css/AdminLogin.scss';
import { json, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Constants from '../Constants';

export const AdminLogin = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	// useEffect(() => {
	// 	console.log('Error state changed:', error);
	// }, [error]);

	const handleSubmit = async e => {
		e.preventDefault();
		setError('');
		if (!username || !password) {
			setError('Enter username or password please');
			return;
		}

		try {
			const options = {
				method: 'POST',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: username,
					password: password,
				}),
			};

			const response = await fetch(`${Constants.BACKEND_BASE_URL}/auth/admin/login`, options);
			const result = await response.json();

			if (!response.ok) {
				setError(result.error.message);
			} else {
				console.log('Login successful:', result);
				navigate(`/admin/management`);
			}
		} catch (error) {
			console.error('Login error:', error);
			setError('System errors, please try again later');
			console.log('Error set to: System errors, please try again later');
		}
	};

	return (
		<div className="container">
			<h1>Admin Login</h1>
			<div className="login-container">
				<form onSubmit={handleSubmit}>
					<div className="row">
						<label htmlFor="username">username : </label>
						<input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} />
					</div>
					<div className="row">
						<label htmlFor="password">password : </label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
					</div>
					<div className="button">
						<button type="submit">Login</button>
					</div>
					<p className="error-msg">{error}</p>
				</form>
			</div>
		</div>
	);
};
