import '../assets/css/AskForLogin.scss';
import { LoginDialog } from './LoginDialog';
import { useState } from 'react';

export const AskForLogin = ({message}) => {
	const [openLogin, setOpenLogin] = useState(false);

	const openLoginDialog = () => {
		setOpenLogin(true);
	};

	const closeLoginDialog = () => {
		setOpenLogin(false);
	};

	return (
		<div className="no-login-block">
			<h2>Have an account?</h2>
			<div onClick={openLoginDialog}>
				<span>Log in</span> to {message}
			</div>
			<LoginDialog isOpen={openLogin} handleClose={closeLoginDialog} />
		</div>
	);
};
