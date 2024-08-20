/*
add comment
author: Rita Zhou
 */
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { WhatsNew } from './pages/WhatsNew';
import { Layout } from './components/Layout';
import { ProductDetail } from './pages/ProductDetail';
import { ShoppingCart } from './pages/ShoppingCart';
import ScrollToTop from './components/ScrollToTop';
import { Checkout } from './pages/Checkout';
import { Payment } from './pages/Payment';
import { AdminLogin } from './pages/AdminLogin';
import { AdminOrderManagement } from './pages/AdminOrderManagement';
import { NoHeaderAndFooter } from './components/NoHeaderAndFooter';
import ForgotPassword from './components/ForgotPassword';
import { Account } from './pages/Account';
import { AccountProfile } from './components/AccountProfile';
import { AccountAddresses } from './components/AccountAddresses';
import { AccountPurchaseHistory } from './components/AccountPurchaseHistory';
import Registration from './components/Registration';

function App() {
	return (
		<BrowserRouter>
			<ScrollToTop />
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<WhatsNew />} />
					<Route path="/whatsnew/:key/:index" element={<WhatsNew />} />
					<Route path="/product/:productId" element={<ProductDetail />} />
					<Route path="/shop/cart" element={<ShoppingCart />} />
					<Route path="/shop/checkout" element={<Checkout />} />
					<Route path="/shop/checkout/payment/:orderId" element={<Payment />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />
					<Route path="/account" element={<Account />}>
						<Route path="/account/profile" element={<AccountProfile />} />
						<Route path="/account/shipping-addresses" element={<AccountAddresses />} />
						<Route path="/account/purchase-history" element={<AccountPurchaseHistory />} />
					</Route>
				</Route>
				<Route path="/registeraccount" element={<Registration />}></Route>
				<Route path="/admin" element={<NoHeaderAndFooter />}>
					<Route path="/admin/login" element={<AdminLogin />} />
					<Route path="/admin/management" element={<AdminOrderManagement />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
