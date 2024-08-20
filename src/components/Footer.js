import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Footer.scss'; //
import { useLocation } from 'react-router-dom';

export const Footer = () => {
	const [menuItems, setMenuItems] = useState([]);
	const location = useLocation();

	useEffect(() => {
		fetch('/data/footer-menu.json')
			.then(res => res.json())
			.then(data => setMenuItems(data.menus))
			.catch(error => console.error('Fetch error:', error));
	}, []);

	const topMenuItems = menuItems.slice(0, 4); // 前四个菜单项
	const middleMenuItems = menuItems.slice(4, 12); // 中间八个菜单项
	const bottomMenuItems = menuItems.slice(-6); // 最后六个菜单项

	return (
		<div className="footer-mainContainer">
			<div className="footer-mainPageContainer">
				{!(
					location.pathname.includes('cart') ||
					location.pathname.includes('forgot-password') ||
					location.pathname.includes('account')
				) && (
					<>
						<div className="footer-container">
							{topMenuItems.map((item, index) => (
								<div key={index} className="footer-column">
									<a style={{ fontWeight: item.isBold ? 'bold' : 'normal' }} href="#">
										{item.text}
									</a>
									<ul>
										{item.subs &&
											item.subs.map((subItem, index) => (
												<li key={index}>
													<Link
														to={subItem.url}
														style={{
															fontWeight: subItem.isBold ? 'bold' : 'normal',
														}}
													>
														{subItem.text}
													</Link>
												</li>
											))}
									</ul>
								</div>
							))}
							<div className="footer-column">
								{middleMenuItems.map((item, index) => (
									<React.Fragment key={index}>
										<a style={{ fontWeight: item.isBold ? 'bold' : 'normal' }} href="#">
											{item.text}
										</a>
										<ul>
											{item.subs &&
												item.subs.map((subItem, index) => (
													<li key={index}>
														<Link
															to={subItem.url}
															style={{
																fontWeight: subItem.isBold ? 'bold' : 'normal',
															}}
														>
															{subItem.text}
														</Link>
													</li>
												))}
										</ul>
									</React.Fragment>
								))}
							</div>
							<div className="footer-column">
								{bottomMenuItems.map((item, index) => (
									<React.Fragment key={index}>
										<a style={{ fontWeight: item.isBold ? 'bold' : 'normal' }} href="#">
											{item.text}
										</a>
										<ul>
											{item.subs &&
												item.subs.map((subItem, index) => (
													<li key={index}>
														<Link
															to={subItem.url}
															style={{
																fontWeight: subItem.isBold ? 'bold' : 'normal',
															}}
														>
															{subItem.text}
														</Link>
													</li>
												))}
										</ul>
									</React.Fragment>
								))}
								<img src="https://images.lululemon.com/is/content/lululemon/ccpa-icon" alt="" />
							</div>
							<div className="footer-social footer-column">
								<div>
									<a href="https://x.com/lululemon">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											width="20"
											height="20"
										>
											<path
												d="M20 1.894a8.296 8.296 0 01-2.358.637A4.068 4.068 0 0019.448.296a8.378 8.378 0 01-2.606.98A4.13 4.13 0 0013.846 0C11.58 0 9.744 1.808 9.744 4.04c0 .316.035.624.106.92A11.715 11.715 0 011.392.74a3.978 3.978 0 00-.555 2.03c0 1.402.724 2.638 1.826 3.362a4.14 4.14 0 01-1.86-.504v.05c0 1.957 1.415 3.589 3.292 3.96a4.17 4.17 0 01-1.854.07 4.1 4.1 0 003.833 2.805A8.317 8.317 0 01.98 14.242a8.33 8.33 0 01-.979-.057A11.738 11.738 0 006.29 16c7.547 0 11.674-6.155 11.674-11.492 0-.176-.004-.35-.012-.523A8.266 8.266 0 0020 1.894"
												fill="currentColor"
												fillRule="evenodd"
											></path>
										</svg>
									</a>
								</div>

								<div>
									<a href="https://www.pinterest.com/lululemon/">
										<svg
											viewBox="0 0 13 16"
											xmlns="http://www.w3.org/2000/svg"
											width="20"
											height="20"
										>
											<path
												d="M3.487 15.772c.414-.66 1.035-1.744 1.262-2.609l.636-2.366c.332.619 1.301 1.144 2.332 1.144 3.07 0 5.283-2.762 5.283-6.192C13 2.459 10.255 0 6.724 0 2.332 0 0 2.883 0 6.023c0 1.46.794 3.278 2.065 3.857.194.087.296.048.34-.133.033-.139.206-.814.283-1.13a.293.293 0 00-.072-.285c-.418-.5-.755-1.416-.755-2.272 0-2.194 1.699-4.32 4.595-4.32 2.502 0 4.251 1.667 4.251 4.051 0 2.693-1.389 4.558-3.2 4.558-.999 0-1.745-.808-1.506-1.8.287-1.182.842-2.46.842-3.313 0-.764-.419-1.402-1.286-1.402-1.023 0-1.843 1.033-1.843 2.417 0 .881.305 1.478.305 1.478l-1.195 4.947c-.202.86-.124 2.068-.033 2.856l.194.468.502-.228z"
												fill="currentColor"
												fillRule="evenodd"
											></path>
										</svg>
									</a>
								</div>

								<div>
									<a href="https://www.youtube.com/lululemon">
										<svg
											viewBox="0 0 1022 719"
											xmlns="http://www.w3.org/2000/svg"
											width="20"
											height="20"
										>
											<path
												d="M970.642 53.599c-38.842-40.683-82.38-40.885-102.346-43.266C725.359 0 510.946 0 510.946 0c-.444 0-214.852 0-357.794 10.333-19.967 2.381-63.489 2.583-102.345 43.266-30.626 30.997-40.592 101.386-40.592 101.386S0 237.645 0 320.304v77.493c0 82.658 10.215 165.317 10.215 165.317s9.966 70.39 40.592 101.387c38.856 40.684 89.896 39.397 112.629 43.661 81.717 7.836 347.289 10.261 347.289 10.261s214.634-.323 357.571-10.655c19.966-2.382 63.504-2.583 102.346-43.267 30.628-30.997 40.608-101.387 40.608-101.387s10.2-82.659 10.2-165.317v-77.493c0-82.659-10.2-165.319-10.2-165.319s-9.98-70.389-40.608-101.386zM405.225 204.704l276 144-275.953 143-.047-287z"
												fill="currentColor"
												fillRule="evenodd"
											></path>
										</svg>
									</a>
								</div>

								<div>
									<a href="https://www.facebook.com/lululemon">
										<svg
											viewBox="0 0 8 16"
											xmlns="http://www.w3.org/2000/svg"
											width="20"
											height="20"
										>
											<path
												d="M5.193 16V8.702h2.36l.352-2.845H5.193V4.042c0-.824.22-1.385 1.357-1.385L8 2.655V.11C7.75.077 6.89 0 5.887 0c-2.09 0-3.521 1.325-3.521 3.76v2.097H0v2.845h2.366V16h2.827z"
												fill="currentColor"
												fillRule="evenodd"
											></path>
										</svg>
									</a>
								</div>

								<div>
									<a href="https://www.instagram.com/lululemon/">
										<svg
											viewBox="0 0 504 504"
											xmlns="http://www.w3.org/2000/svg"
											width="20"
											height="20"
										>
											<g fill="currentColor" fillRule="evenodd">
												<path d="M251.921.159c-68.418 0-76.997.29-103.867 1.516-26.814 1.223-45.127 5.482-61.151 11.71-16.566 6.437-30.615 15.051-44.621 29.056-14.005 14.006-22.619 28.055-29.056 44.621-6.228 16.024-10.487 34.337-11.71 61.151C.29 175.083 0 183.662 0 252.08c0 68.417.29 76.996 1.516 103.866 1.223 26.814 5.482 45.127 11.71 61.151 6.437 16.566 15.051 30.615 29.056 44.621 14.006 14.005 28.055 22.619 44.621 29.057 16.024 6.227 34.337 10.486 61.151 11.709 26.87 1.226 35.449 1.516 103.867 1.516 68.417 0 76.996-.29 103.866-1.516 26.814-1.223 45.127-5.482 61.151-11.709 16.566-6.438 30.615-15.052 44.621-29.057 14.005-14.006 22.619-28.055 29.057-44.621 6.227-16.024 10.486-34.337 11.709-61.151 1.226-26.87 1.516-35.449 1.516-103.866 0-68.418-.29-76.997-1.516-103.867-1.223-26.814-5.482-45.127-11.709-61.151-6.438-16.566-15.052-30.615-29.057-44.621-14.006-14.005-28.055-22.619-44.621-29.056-16.024-6.228-34.337-10.487-61.151-11.71C328.917.449 320.338.159 251.921.159zm0 45.391c67.265 0 75.233.257 101.797 1.469 24.562 1.12 37.901 5.224 46.778 8.674 11.759 4.57 20.151 10.029 28.966 18.845 8.816 8.815 14.275 17.207 18.845 28.966 3.45 8.877 7.554 22.216 8.674 46.778 1.212 26.564 1.469 34.532 1.469 101.798 0 67.265-.257 75.233-1.469 101.797-1.12 24.562-5.224 37.901-8.674 46.778-4.57 11.759-10.029 20.151-18.845 28.966-8.815 8.816-17.207 14.275-28.966 18.845-8.877 3.45-22.216 7.554-46.778 8.674-26.56 1.212-34.527 1.469-101.797 1.469-67.271 0-75.237-.257-101.798-1.469-24.562-1.12-37.901-5.224-46.778-8.674-11.759-4.57-20.151-10.029-28.966-18.845-8.815-8.815-14.275-17.207-18.845-28.966-3.45-8.877-7.554-22.216-8.674-46.778-1.212-26.564-1.469-34.532-1.469-101.797 0-67.266.257-75.234 1.469-101.798 1.12-24.562 5.224-37.901 8.674-46.778 4.57-11.759 10.029-20.151 18.845-28.966 8.815-8.816 17.207-14.275 28.966-18.845 8.877-3.45 22.216-7.554 46.778-8.674 26.564-1.212 34.532-1.469 101.798-1.469z"></path>
												<path d="M168.391 252.365c0-46.378 37.596-83.974 83.974-83.974 46.377 0 83.973 37.596 83.973 83.974 0 46.377-37.596 83.973-83.973 83.973-46.378 0-83.974-37.596-83.974-83.973zm-45.391 0c0 71.446 57.918 129.364 129.365 129.364 71.446 0 129.364-57.918 129.364-129.364 0-71.447-57.918-129.365-129.364-129.365C180.918 123 123 180.918 123 252.365zm263.396-104.531c-16.695 0-30.23-13.534-30.23-30.23 0-16.696 13.535-30.231 30.23-30.231 16.696 0 30.231 13.535 30.231 30.231s-13.535 30.23-30.231 30.23z"></path>
											</g>
										</svg>
									</a>
								</div>
							</div>
						</div>

						<hr className="line-before-bttom" />
						<div className="footer-bottom">
							<div>© lululemon athletica 1818 Cornwall Ave, Vancouver BC V6J 1C7</div>
							<div className="footer-terms">
								<a href="https://info.lululemon.com/legal/terms-of-use">Terms of Use</a>
								<hr className="footer-bottom-hr" />
								<a href="https://info.lululemon.com/legal/privacy-policy">Privacy Policy </a>
							</div>
						</div>
					</>
				)}
			</div>

			<div className="footer-paging">
				{(location.pathname.includes('cart') ||
					location.pathname.includes('forgot-password') ||
					location.pathname.includes('account')) && (
					<>
						<div className="contactMenu">
							<a href="#">Contact Us</a>
							<a href="#">Live Chat</a>
							<a href="#">1.877.263.9300</a>
						</div>
						<hr color={'#d3d5d7'} />
						<div className="legelMenu">
							<div className="legalLinks">
								<a href="#">Shipping Policy</a>
								<a href="#">Privacy Policy</a>
								<a href="#">Terms of Use</a>
								<a href="#">California Privacy Rights</a>
								<a href="#">California Transparency Act</a>
								<a href="#">
									Your Privacy Choices
									<img src="https://images.lululemon.com/is/content/lululemon/ccpa-icon" alt="" />
								</a>
								<a href="#">Accessibility Statement</a>
								<div>© lululemon athletica 1818 Cornwall Ave, Vancouver BC V6J 1C7</div>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Footer;
