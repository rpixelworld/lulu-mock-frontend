import * as CartIndexedDBHelper from '../../IndexedDBHelper';
import Constants from '../../Constants';

export const dispatchShoppingCart = shoppingCart => dispatch => {
	console.log(shoppingCart);
	fetchStorage(shoppingCart).then(() => {
		// shoppingCart.total = summary.totalItems;
		// shoppingCart.totalCost = summary.totalCost;
		console.log(shoppingCart);
		dispatch({
			type: Constants.ACTION_DISPATCH_SHOPPING_CART,
			payload: shoppingCart,
		});
	});
};

export const dispatchShippingFee = fee => {
	return {
		type: Constants.ACTION_DISPATCH_SHIPPING_FEE,
		payload: fee,
	};
};

export const fetchTaxRate = province => dispatch => {
	let url = `${Constants.BACKEND_BASE_URL}/master/tax-rates/${province}`;
	fetch(url)
		.then(resp => resp.json())
		.then(obj => {
			let taxRate =
				((obj.data.gst ? obj.data.gst : 0) +
					(obj.data.pst ? obj.data.pst : 0) +
					(obj.data.hst ? obj.data.hst : 0)) /
				100;
			dispatch({
				type: Constants.ACTION_DISPATCH_TAX_RATE,
				payload: taxRate,
			});
		});
};

export const dispatchZeroTaxRate = () => {
	return {
		type: Constants.ACTION_DISPATCH_ZERO_TAX_RATE,
		payload: 0,
	};
};

export const dispatchOrderInfo = orderInfo => {
	return {
		type: Constants.ACTION_DISPATCH_ORDER_INFO,
		payload: orderInfo,
	};
};

const fetchStorage = async shoppingCart => {
	let allPromises = shoppingCart.items.map(async item => {
		let productId = item.itemKey.split('_')[0];
		let colorId = item.itemKey.split('_')[1];
		let size = item.itemKey.split('_')[2];

		let resp = await fetch(`${Constants.BACKEND_BASE_URL}/inventory/${productId}/${colorId}/${size}`);
		let obj = await resp.json();
		return {
			item: item,
			stock: obj && obj.data && obj.data[0] ? obj.data[0].stock : 0,
		};
	});
	let stockPromises = await Promise.allSettled(allPromises);
	let totalItems = 0;
	let totalCost = 0;
	shoppingCart.items = []
	for (let i = 0; i < stockPromises.length; i++) {
		if (stockPromises[i].status === 'fulfilled') {
			const {item, stock} = stockPromises[i].value
			// shoppingCart.items[i].stock = stockPromises[i].value.stock;
			item.stock = stock;
			// if (stockPromises[i].value.stock >= shoppingCart.items[i].amount) {
			// 	shoppingCart.items[i].available = true;
			// 	totalItems += stockPromises[i].value.item.amount;
			// 	totalCost += stockPromises[i].value.item.amount * stockPromises[i].value.item.price;
			// } else {
			// 	shoppingCart.items[i].available = false;
			// }
			if(item.stock > 0){
				if(item.stock < item.amount) {
					item.amount = item.stock
				}
				item.available = true;
				totalItems += item.amount;
				totalCost += item.amount * item.price;
			}
			else {
				// item.amount = 0;
				item.available = false;
			}
			shoppingCart.items.push(item)
		}
	}
	shoppingCart.total = totalItems;
	shoppingCart.totalCost = totalCost;

	// console.log(stockPromises)
	//
	// return {
	//   totalItems: totalItems,
	//   totalCost: totalCost
	// }
};


export const dispatchClearShoppingCart = () => {
	return {
		type: Constants.ACTION_CLEAR_SHOPPING_CART,
		payload: null,
	};
};
