import '../assets/css/Header.scss';
import { useEffect, useRef, useState } from 'react';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { ChildMenus } from './ChildMenus';
import Constants from '../Constants';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dispatchShoppingCart } from '../redux/actions/shoppingAction';
import * as CartIndexedDBHelper from '../IndexedDBHelper';
import { LoginDialog } from './LoginDialog';
import * as UserHelper from '../UserHelper';
import { dispatchClearCookieAuth, dispatchCookieAuth, dispatchUserInfo } from '../redux/actions/userAction';
import * as IndexedDBHelper from '../IndexedDBHelper';

export const Header = () => {
	const location = useLocation();
	const menubarWapper = useRef();
	const [hoverMenu, setHoverMenu] = useState(0);
	const [menuList, setMenuList] = useState([]);
	const timeoutRef = useRef(null);
	const dispatch = useDispatch();
	const shoppingCart = useSelector(state => state.shoppingReducer.shoppingCart);
	const cookieAuth = useSelector(state => state.userReducer.cookieAuth);
	const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
	const navigate = useNavigate();
	const [openLogin, setOpenLogin] = useState(false);
	const [showLogout, setShowLogout] = useState(false);

	const navAnimation = obj => {
		if (!obj || !obj.className) {
			return;
		}
		// console.log(obj, obj.className)
		obj.className = obj.className.replace('fixed', '');

		let topDistance;
		// Check fixed nav contains any element before get the topDistance
		if (obj.childNodes) {
			topDistance = window.scrollY + obj.getBoundingClientRect().top;
		}
		let scrollTop = window.scrollY;
		if (topDistance > scrollTop) {
			obj.className = obj.className.replace('fixed', '');
		}

		if (topDistance < scrollTop) {
			obj.className = obj.className + ' fixed';
		}
	};
	window.onload = () => {
		navAnimation(menubarWapper.current);
	};

	window.onresize = () => {
		navAnimation(menubarWapper.current);
	};

	window.onscroll = () => {
		navAnimation(menubarWapper.current);
	};

	const handleHoverMenu = parent => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		setHoverMenu(parent);
	};
	const handleUnhoverMenu = () => {
		timeoutRef.current = setTimeout(() => {
			setHoverMenu(0);
		}, 300);
	};

	const openLoginDialog = evt => {
		// console.log('open login')
		// evt.preventDefault()
		setOpenLogin(true);
	};
	const closeLoginDialog = () => {
		setOpenLogin(false);
	};

	const logout = () => {
		UserHelper.logoutUser({}, () => {
			setShowLogout(false);
			UserHelper.clearCookies(cookieAuth);
			dispatch(dispatchClearCookieAuth());
		});
	};

	useEffect(() => {
		// fetch('http://'+ location.host + `/data/menu.json`)
		fetch(Constants.LOCAL_BASE_URL + `/data/menu.json`)
			.then(resp => resp.json())
			.then(res => {
				setMenuList(res.menus);
			});

		CartIndexedDBHelper.getAllItems(shoppingCart => {
			dispatch(dispatchShoppingCart(shoppingCart));
		});
		//console.log('total amount===>', CartIndexedDBHelper.getTotalAmount(setNoOfBagItems))

		let firstName = UserHelper.getCookie('_firstname');
		let token = UserHelper.getCookie('_token');
		let email = UserHelper.getCookie('_email');
		if (firstName && token && email) {
			dispatch(
				dispatchCookieAuth({
					_firstname: firstName,
					_token: token,
					_email: email,
				})
			);
			IndexedDBHelper.getUser(email, userInfo => {
				dispatch(dispatchUserInfo(userInfo));
			});
		}
		// if(isLoggedIn) {
		//     let firstName = UserHelper.getCookie('_firstname')
		//     let token = UserHelper.getCookie('_token')
		//     let email = UserHelper.getCookie('_email')
		//     if(firstName && token && email) {
		//         dispatch(dispatchCookieAuth({
		//             _firstname: firstName,
		//             _token: token,
		//             _email: email
		//         }))
		//         IndexedDBHelper.getUser(email, (userInfo)=>{ dispatch(dispatchUserInfo(userInfo)) })
		//     }
		// }
		// if(!cookieAuth || !cookieAuth._firstname ||!cookieAuth._token || !cookieAuth._email) {
		//     console.log('user logged in, fetch info')
		//     let firstName = UserHelper.getCookie('_firstname')
		//     let token = UserHelper.getCookie('_token')
		//     let email = UserHelper.getCookie('_email')
		//     if(firstName && token && email) {
		//         dispatch(dispatchCookieAuth({
		//             _firstname: firstName,
		//             _token: token,
		//             _email: email
		//         }))
		//     }
		//     IndexedDBHelper.getUser(email, (userInfo)=>{ dispatch(dispatchUserInfo(userInfo)) })
		// }
	}, []);

	return (
		<header>
			{!location.pathname.includes('shop') && (
				<div className="header-menu">
					<div className="menu-item">
						<PinDropOutlinedIcon sx={{ paddingTop: '4px' }} />
						<a href="#">Store Locator</a>
					</div>
					<div className="menu-item">
						<CardGiftcardOutlinedIcon sx={{ paddingTop: '4px' }} />
						<a href="#">Gift Cards</a>
					</div>
					<div className="menu-item">
						<HelpOutlineOutlinedIcon sx={{ paddingTop: '4px' }} />
						<a href="#">Get Help</a>
					</div>
					<div className="menu-item">
						<LanguageOutlinedIcon sx={{ paddingTop: '4px' }} />
						<a href="#">USA</a>
					</div>
				</div>
			)}
			<div className="header-menubar-holder">
				<div ref={menubarWapper} className="header-menubar-wrapper">
					<div className="header-menubar">
						<div>
							<img
								className="logo"
								onClick={() => {
									navigate('/');
								}}
								src="https://upload.wikimedia.org/wikipedia/commons/2/22/Lululemon_Athletica_logo.svg"
								alt="logo"
							/>
						</div>

						{!location.pathname.includes('shop') && (
							<ul>
								{menuList
									.filter(menu => menu.parent == 0)
									.map(rootMenu => {
										return (
											<r key={rootMenu.id}>
												<li
													onMouseEnter={() => {
														handleHoverMenu(rootMenu.id);
													}}
													onMouseLeave={handleUnhoverMenu}
													className={rootMenu.isSpecial ? 'special' : ''}
												>
													{' '}
													{rootMenu.name}
												</li>
												<ChildMenus
													handleMouseEnter={() => {
														handleHoverMenu(rootMenu.id);
													}}
													handleMouseLeave={handleUnhoverMenu}
													parent={rootMenu.id}
													display={hoverMenu === rootMenu.id}
													title={rootMenu.name}
													submenus={menuList.filter(menu => menu.rootMenu == rootMenu.id)}
													advertisement={rootMenu.adv}
													activities={rootMenu.activity}
												/>
											</r>
										);
									})}
							</ul>
						)}
					</div>
					<div className="header-input">
						{!location.pathname.includes('shop') && (
							<>
								<div className="header-input-icon1">
									<SearchOutlinedIcon />
								</div>
								<input type="text" placeholder={'Search'} />
							</>
						)}

						<div className="header-input-icon2">
							<AccountCircleOutlinedIcon />
							{!isLoggedIn && (
								<a href="#" onClick={openLoginDialog}>
									Sign In
								</a>
							)}
							{isLoggedIn && !showLogout && (
								<a
									onMouseEnter={() => {
										setShowLogout(true);
									}}
									href="#"
								>
									Hi! {cookieAuth._firstname}
								</a>
							)}
							{isLoggedIn && showLogout && (
								<a
									onMouseLeave={() => {
										setShowLogout(false);
									}}
									onClick={logout}
									href="#"
								>
									Logout
								</a>
							)}
						</div>
						{!location.pathname.includes('shop') && (
							<>
								<div className="header-input-icon3">
									<FavoriteBorderOutlinedIcon />
								</div>
								<div className="header-shopping-bag">
									<Link to="/shop/cart">{shoppingCart.total}</Link>
								</div>
							</>
						)}
						<LoginDialog isOpen={openLogin} handleClose={closeLoginDialog} />
					</div>
				</div>
			</div>
		</header>
	);
};
