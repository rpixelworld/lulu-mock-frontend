import { useState } from 'react';
import '../assets/css/Login.scss';
import {useNavigate} from "react-router-dom";
import axios from "axios";

export const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('')
		if (!username || !password) {
			setError('Enter username or password please')
			return
		}

		try {
			const response = await fetch('http://localhost:3399/auth/admin/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({username, password})
			})
			if (!response.ok) {
				if (response.status === 400) {
					throw new Error('username or password incorrect, please try again')
				} else {
					throw new Error('Login failed, please try again')
				}
			}
			const data = await response.json();
			console.log('login success', data);
			navigate('/auth/admin/management');
		} catch (error) {
			setError(error.message)
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
					{error && <p>{error}</p>}
				</form>
			</div>
		</div>
	);
};
