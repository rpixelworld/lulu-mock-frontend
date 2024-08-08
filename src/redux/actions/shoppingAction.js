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
	for (let i = 0; i < stockPromises.length; i++) {
		if (stockPromises[i].status === 'fulfilled') {
			shoppingCart.items[i].stock = stockPromises[i].value.stock;
			if (stockPromises[i].value.stock > 0) {
				shoppingCart.items[i].available = true;
				totalItems += stockPromises[i].value.item.amount;
				totalCost += stockPromises[i].value.item.amount * stockPromises[i].value.item.price;
			} else {
				shoppingCart.items[i].available = false;
			}
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
