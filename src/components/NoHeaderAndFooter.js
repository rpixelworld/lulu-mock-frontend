import '../assets/css/Layout.scss';
import feedback from '../assets/images/feedback.jpeg';

import { Header } from './Header';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';

export const NoHeaderAndFooter = () => {
	return (
		<>
			<Outlet />
		</>
	);
};
