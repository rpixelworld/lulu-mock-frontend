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
					<Route path="/shop/checkout/payment" element={<Payment />} />
					{/*<Route path="/admin/login" element={<AdminLogin />} />*/}
					{/*<Route path="/admin/management" element={<AdminOrderManagement />} />*/}
				</Route>
				<Route path="/admin" element={<NoHeaderAndFooter />}>
					<Route path="/admin/login" element={<AdminLogin />} />
					<Route path="/admin/management" element={<AdminOrderManagement />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
