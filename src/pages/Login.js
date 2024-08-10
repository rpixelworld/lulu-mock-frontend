import { useState } from 'react';
import '../assets/css/Login.scss';

export const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = e => {
		e.preventDefault();
		console.log('username', username);
		console.log('password', password);
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
				</form>
			</div>
		</div>
	);
};
