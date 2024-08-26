import '../assets/css/AccountPurchaseHistory.scss';
import { InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import * as UserHelper from '../UserHelper';
import Constants from '../Constants';
import { formatDate, formatDateTime, formatPhoneNumber, generateOrderNumber, getStatus } from '../Helper';
import { Pagination } from './Pagination';
import { NoIconHtmlTooltip } from './NoIconHtmlToolTip';
import { useNavigate } from 'react-router-dom';
import { RemoveConfirmDialog } from './RemoveConfirmDialog';
import { fetchUserInfo } from '../redux/actions/userAction';

export const AccountPurchaseHistory = () => {
	const navigator = useNavigate();
	const [orders, setOrders] = useState([]);
	const [expandedIndex, setExpandedIndex] = useState(-1);
	const [pagination, setPagination] = useState({
		pageNo: 1,
		pageSize: 10,
		totalPages: 0,
		totalRecords: 0,
		currentTotalRecords: 0,
	});
	const [filters, setFilters] = useState({
		orderNumber: '',
		orderStatus: 0,
		timeRange: 'ALL',
	});
	const [openCancelOrderDialog, setOpenCancelOrderDialog] = useState(false);
	const [orderIdToCancel, setOrderIdToCancel] = useState(0);

	const handleExpand = selectedIndex => {
		if (expandedIndex === selectedIndex) {
			setExpandedIndex(-1);
		} else {
			setExpandedIndex(selectedIndex);
		}
	};

	const handleGotoPage = pageNo => {
		fetchAndSetOrders(pageNo);
	};

	const setOrderStatusFilter = orderStatus => {
		setFilters(prev => ({ ...prev, orderStatus: orderStatus }));
		fetchAndSetOrders(pagination.pageNo, { ...filters, orderStatus: orderStatus });
	};

	const setTimeRangeFilter = timeRange => {
		setFilters(prev => ({ ...prev, timeRange: timeRange }));
		fetchAndSetOrders(pagination.pageNo, { ...filters, timeRange: timeRange });
	};
	const setOrderNumberFilter = orderNumber => {
		let newFilters = {
			orderNumber: orderNumber,
			orderStatus: 0,
			timeRange: 'ALL',
		};
		setFilters(newFilters);
		fetchAndSetOrders(1, newFilters);
	};
	const fetchAndSetOrders = (pn = 1, paramFilter) => {
		let options = {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${UserHelper.getCookie('_token')}`,
				'Content-Type': 'application/json',
			},
			body: paramFilter ? JSON.stringify(paramFilter) : JSON.stringify(filters),
		};
		fetch(`${Constants.BACKEND_BASE_URL}/orders/user?pageNo=${pn}&pageSize=${pagination.pageSize}`, options)
			.then(resp => resp.json())
			.then(result => {
				if (result.status === 'success') {
					setOrders(result.data.orders);
					const currentPageNo = result.data.pagination.pageNo;
					const totalPages = Math.ceil(result.data.pagination.total / result.data.pagination.pageSize);

					setPagination({
						pageNo: currentPageNo,
						pageSize: result.data.pagination.pageSize,
						totalPages: totalPages,
						totalRecords: result.data.pagination.total,
						currentTotalRecords: result.data.pagination.currentTotal,
						// pageNumbers: pageNumbers
					});
				}
			});
	};

	const handlePayOrder = orderId => {
		navigator(`/shop/checkout/payment/${orderId}`);
	};

	const handleCancelOrder = orderId => {
		setOpenCancelOrderDialog(true);
		setOrderIdToCancel(orderId);
	};

	const closeCancelOrderDialog = () => {
		setOpenCancelOrderDialog(false);
		setOrderIdToCancel(0);
	};

	const cancelOrder = orderId => {
		let options = {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${UserHelper.getCookie('_token')}`,
				'Content-Type': 'application/json',
			},
		};
		fetch(`${Constants.BACKEND_BASE_URL}/orders/${orderId}/cancel`, options)
			.then(resp => resp.json())
			.then(result => {
				if (result.status === 'success') {
					fetchAndSetOrders(pagination.pageNo);
					setOpenCancelOrderDialog(false);
					setOrderIdToCancel(0);
				}
			});
	};

	const downloadInvoice = orderId => {
		let options = {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${UserHelper.getCookie('_token')}`,
				'Content-Type': 'application/json',
			},
		};
		fetch(`${Constants.BACKEND_BASE_URL}/orders/${orderId}/invoice`, options)
			.then(resp => resp.blob())
			.then(blob => {
				const url = window.URL.createObjectURL(blob);
				window.open(url, '_blank');
				setTimeout(() => {
					window.URL.revokeObjectURL(url);
				}, 100);
			});
	};

	const downloadReceipt = orderId => {
		let options = {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${UserHelper.getCookie('_token')}`,
				'Content-Type': 'application/json',
			},
		};
		fetch(`${Constants.BACKEND_BASE_URL}/orders/${orderId}/receipt`, options)
			.then(resp => resp.blob())
			.then(blob => {
				const url = window.URL.createObjectURL(blob);
				window.open(url, '_blank');
				setTimeout(() => {
					window.URL.revokeObjectURL(url);
				}, 100);
			});
	};

	useEffect(() => {
		fetchAndSetOrders();
	}, []);

	return (
		<div className="account-purchase-history">
			<h1>Order History</h1>
			<div className="filter-section">
				<div className="line1">
					<div className="order-number">
						<label className="label" htmlFor="">
							Order #
						</label>
						<input
							type="text"
							placeholder="Order Number (10 digits)"
							value={filters.orderNumber}
							onChange={e => {
								setFilters(prev => ({ ...prev, orderNumber: e.target.value }));
							}}
							onKeyDown={e => {
								e.key == 'Enter' && setOrderNumberFilter(e.target.value);
							}}
						/>
					</div>
				</div>
				<div className="line2">
					<div className="status-filter">
						<div
							className={`status ${filters.orderStatus == 0 ? 'filtered' : ''}`}
							onClick={() => setOrderStatusFilter(0)}
						>
							all
						</div>
						<div
							className={`status ${filters.orderStatus == 1 ? 'filtered' : ''}`}
							onClick={() => setOrderStatusFilter(1)}
						>
							unpaid
						</div>
						<div
							className={`status ${filters.orderStatus == 2 ? 'filtered' : ''}`}
							onClick={() => setOrderStatusFilter(2)}
						>
							paid
						</div>
						<div
							className={`status ${filters.orderStatus == 3 ? 'filtered' : ''}`}
							onClick={() => setOrderStatusFilter(3)}
						>
							shipped
						</div>
						<div
							className={`status ${filters.orderStatus == 9 ? 'filtered' : ''}`}
							onClick={() => setOrderStatusFilter(9)}
						>
							cancelled
						</div>
					</div>
					<div className="time-range">
						<label className="label" htmlFor="">
							{pagination.totalRecords} orders found in{' '}
						</label>
						<InputLabel id="select-timeRange"></InputLabel>
						<Select
							size="smallz"
							sx={{ minWidth: 100, fontSize: '0.75rem', height: '28px' }}
							labelId="select-timeRange"
							id="timeRange"
							value={filters.timeRange}
							onChange={e => {
								setTimeRangeFilter(e.target.value);
							}}
						>
							<MenuItem sx={{ fontSize: '0.75rem' }} value="PAST_1_MONTH">
								Past 1 month
							</MenuItem>
							<MenuItem sx={{ fontSize: '0.75rem' }} value="PAST_3_MONTHS">
								Past 3 months
							</MenuItem>
							<MenuItem sx={{ fontSize: '0.75rem' }} value="PAST_6_MONTHS">
								Past 6 months
							</MenuItem>
							<MenuItem sx={{ fontSize: '0.75rem' }} value="YEAR_2024">
								2024
							</MenuItem>
							<MenuItem sx={{ fontSize: '0.75rem' }} value="BEFORE_YEAR_2024">
								Before 2024
							</MenuItem>
							<MenuItem sx={{ fontSize: '0.75rem' }} value="ALL">
								All
							</MenuItem>
						</Select>
					</div>
				</div>
			</div>

			<div className="orders-list">
				<div className="order-header">
					<div className="header">
						<div className="col-header left" style={{ width: '25px' }}></div>
						<div className="col-header left" style={{ width: '15%' }}>
							order #
						</div>
						<div className="col-header" style={{ width: '20%' }}>
							order placed
						</div>
						<div className="col-header" style={{ width: '34%' }}>
							ship to
						</div>
						<div className="col-header right" style={{ width: '10%' }}>
							Status
						</div>
						<div className="col-header right" style={{ width: '10%' }}>
							items
						</div>
						<div className="col-header right" style={{ width: '10%' }}>
							total
						</div>
					</div>
					{/*<div className="operation"></div>*/}
				</div>
				{orders &&
					Array.isArray(orders) &&
					orders.length > 0 &&
					orders.map((order, index) => (
						<>
							<div key={order.id} className="one-order">
								<div className="order">
									<div className="order-info">
										<div
											className="col left"
											style={{ width: '25px', cursor: 'pointer' }}
											onClick={() => {
												handleExpand(index);
											}}
										>
											{expandedIndex === index && <ion-icon name="chevron-up-outline"></ion-icon>}
											{expandedIndex !== index && (
												<ion-icon name="chevron-down-outline"></ion-icon>
											)}
										</div>
										<div className="col left" style={{ width: '15%' }}>
											{generateOrderNumber(order.id)}
										</div>
										<div className="col" style={{ width: '20%' }}>
											{formatDateTime(order.createdAt)}
										</div>
										<div className="col" style={{ width: '34%' }}>
											<NoIconHtmlTooltip
												positon="bottom-start"
												text={`${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`}
												tooltip={
													<>
														{formatPhoneNumber(order.shippingAddress.phoneNumber)}
														<br />
														{order.shippingAddress.addressLine}
														<br />
														{order.shippingAddress.city} {order.shippingAddress.province}{' '}
														{order.shippingAddress.postalCode}
													</>
												}
											/>
										</div>
										<div className="col right" style={{ width: '10%' }}>
											{getStatus(order.status)}
										</div>
										<div className="col right" style={{ width: '10%' }}>
											{order.totalItem}
										</div>
										<div className="col right" style={{ width: '10%' }}>
											${order.totalAmount.toFixed(2)}
										</div>
									</div>
									{expandedIndex == index && (
										<div className="order-items">
											{order.orderItems &&
												order.orderItems.length &&
												order.orderItems.map((item, index) => (
													<div className="item">
														<div className="col-1 right" style={{ width: '31%' }}>
															<img src={item.imageUrl} alt="" />
														</div>
														<div className="col-2" style={{ width: '49%' }}>
															<div className="product-name">{item.productName}</div>
															<div className="color-size">{item.colorAlt}</div>
															<div className="color-size">{item.size}</div>
														</div>
														<div className="col-3 right" style={{ width: '10%' }}>
															{item.quantity}
														</div>
														<div className="col-4 right" style={{ width: '10%' }}>
															${(item.quantity * item.price).toFixed(2)}
														</div>
													</div>
												))}
										</div>
									)}
								</div>
								<div className="operation left">
									{order.status === 1 && (
										<span
											onClick={() => {
												handlePayOrder(order.id);
											}}
										>
											Pay
										</span>
									)}
									{order.status === 1 && (
										<span
											onClick={() => {
												handleCancelOrder(order.id);
											}}
										>
											Cancel
										</span>
									)}
									{(order.status === 2 || order.status === 3) && (
										<span>
											<a
												href="#"
												title="Invoice"
												onClick={() => {
													downloadInvoice(order.id);
												}}
											>
												<ion-icon name="document-attach-outline"></ion-icon>
											</a>
										</span>
									)}
									{(order.status === 2 || order.status === 3) && (
										<span>
											<a
												href="#"
												title="Reciept"
												onClick={() => {
													downloadReceipt(order.id);
												}}
											>
												<ion-icon name="document-outline"></ion-icon>
											</a>
										</span>
									)}
								</div>
							</div>
							{index < orders.length - 1 && <div className="seperator"></div>}
						</>
					))}
			</div>

			<Pagination pagination={pagination} handleGotoPage={handleGotoPage} />

			<RemoveConfirmDialog
				confirmMessage="Are you sure you want to cancel this order?"
				yesMessage="Yes, cancel this order"
				noMessage="No, keep this order"
				isOpen={openCancelOrderDialog}
				itemKey={orderIdToCancel}
				handleRemove={cancelOrder}
				handleClose={closeCancelOrderDialog}
			/>
		</div>
	);
};
