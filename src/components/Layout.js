import '../assets/css/Layout.scss';
import feedback from '../assets/images/feedback.jpeg';
import SmartToyIcon from '@mui/icons-material/SmartToy';

import { Header } from './Header';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { useState } from 'react';
import ChatBotWindow from './ChatBotWindow';
export const Layout = () => {
	const [isHover, setHover] = useState(false);
	const [isRobot, setIsRobot] = useState(true);

	return (
		<>
			<Header />
			<div className="right-fixed">
				<img src={feedback} alt="Feedback" />
			</div>
			{isRobot ? (
				<div className="chatBotBox">
					<button
						className="chatBotIcon"
						onMouseEnter={() => setHover(!isHover)}
						onMouseLeave={() => setHover(!isHover)}
					>
						<SmartToyIcon
							style={{ width: '30px', height: '30px' }}
							onClick={() => {
								setIsRobot(!isRobot);
								setHover(false);
							}}
						/>
					</button>
					{isHover && <div className="botMessage">Click me, I will help you!</div>}
				</div>
			) : (
				<ChatBotWindow closeWindow={() => setIsRobot(!isRobot)} />
			)}

			<Outlet />
			<Footer />
		</>
	);
};
