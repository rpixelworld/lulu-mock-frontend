import './../assets/css/Account.scss';
import './../assets/css/Breadcrumb.scss';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AskForLogin } from '../components/AskForLogin';

export const Account = () => {
	const location = useLocation();
	// const dispatch = useDispatch();
	const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
	// const shoppingCart = useSelector(state => state.shoppingReducer.shoppingCart);
	// const userInfo = useSelector(state => state.userReducer.userInfo);

	return (
		<div className="fluid-container">
			<div className="account-container">
				<div className="account-breadcrumb">
					<nav className="breadcrumb">
						<ul className="breadcrumb">
							<li data-slash="/">
								<a href="/account/profile">Account</a>
							</li>
							<li data-slash="">
								{location.pathname.includes('profile') && <a href="#">Profile</a>}
								{location.pathname.includes('shipping-addresses') && <a href="#">Shipping Addresses</a>}
								{location.pathname.includes('purchase-history') && <a href="#">Order History</a>}
							</li>
						</ul>
					</nav>
				</div>

				<div className="account-main-container">
					<div className="left-nav">
						<Link
							className={`nav-item ${location.pathname.includes('profile') ? 'active' : ''}`}
							to="/account/profile"
						>
							Profile
						</Link>
						<Link
							className={`nav-item ${location.pathname.includes('shipping-addresses') ? 'active' : ''}`}
							to="/account/shipping-addresses"
						>
							Shipping Addresses
						</Link>
						<Link
							className={`nav-item ${location.pathname.includes('purchase-history') ? 'active' : ''}`}
							to="/account/purchase-history"
						>
							Purchase History
						</Link>
					</div>
					<div className="right-main">
						{isLoggedIn && <Outlet />}
						{!isLoggedIn && <AskForLogin message="to see your profile and order history" />}
					</div>
				</div>
			</div>
		</div>
	);
};
