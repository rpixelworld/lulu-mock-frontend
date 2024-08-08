import Constants from '../../Constants';

const initState = {
	productList: [],
	pagination: {
		totalProducts: 0,
		perPage: 0,
		curPage: 0,
		totalPage: 0,
	},
	templateFilters: {},
	selectedFilters: {},
	productDetail: {},
	productCatagories: '',
	youMayLike: [],
	youMayAlsoLike: [],
};

export const productReducer = (state = initState, action) => {
	switch (action.type) {
		case Constants.ACTION_FETCH_FILTERS:
			// console.log('FETCH_FILTERS', action.payload);
			return { ...state, selectedFilters: action.payload };

		case Constants.ACTION_FETCH_TEMPLATE_FILTERS:
			// console.log('FETCH_FILTERS', action.payload);
			return { ...state, templateFilters: action.payload };

		case Constants.ACTION_FETCH_PRODUCTLIST:
			// console.log(action.payload['products'])
			return {
				...state,
				productList: action.payload['products'],
				pagination: action.payload['pageParams'],
				selectedFilters: action.payload['filters'],
				// totalNumOfProducts: action.payload['pageParams']['totalProducts'],
				// totalPages: action.payload['pageParams']['totalProducts']
			};

		case Constants.ACTION_FETCH_PRODUCTLIST_MORE:
			const temp = [...state.productList, ...action.payload['products']];
			// temp.push(action.payload['products'])
			// console.log('productList.length===>', state.productList.length, 'temp.length===>', temp.length)
			return {
				...state,
				productList: temp,
				pagination: action.payload['pageParams'],
				selectedFilters: action.payload['filters'],
			};

		case Constants.ACTION_SORT_PRODUCTLIST:
			const tobeSorted = [...state.productList];
			tobeSorted.sort((proda, prodb) => {
				let priceA = proda.price;
				let priceB = prodb.price;
				priceA =
					priceA.indexOf('-') > 0
						? priceA.substring(priceA.indexOf('$') + 1, priceA.indexOf('-') - 1)
						: priceA.substring(priceA.indexOf('$') + 1, priceA.indexOf('CAD'));
				priceB =
					priceB.indexOf('-') > 0
						? priceB.substring(priceB.indexOf('$') + 1, priceB.indexOf('-') - 1)
						: priceB.substring(priceB.indexOf('$') + 1, priceB.indexOf('CAD'));
				if (action.payload == 'Price: Low to High') {
					return Number(priceA) - Number(priceB);
				}
				if (action.payload == 'Price: High to Low') {
					return Number(priceB) - Number(priceA);
				}
			});
			// console.log("tobeSorted ===> ", tobeSorted)
			return { ...state, productList: tobeSorted };

		case Constants.ACTION_FETCH_PRODUCT_DETAIL:
			return {
				...state,
				productDetail: action.payload,
				youMayLike: [],
				youMayAlsoLike: [],
			};

		case Constants.ACTION_FETCH_PRODUCT_CATAGORY:
			console.log('ACTION_FETCH_PRODUCT_CATAGORY====>', action.payload);
			return { ...state, productCatagories: action.payload };

		case Constants.ACTION_FETCH_RECOMMENDATIONS:
			const productId = action.payload.productId;
			const recommendProductList = action.payload.recommends.products;
			// console.log("recommendProductList====>", recommendProductList)
			let count = 0;
			let recommendeds = [];
			let recommendations1 = [];
			let recommendations2 = [];
			for (let i = 0; i < recommendProductList.length; i++) {
				// console.log('productId===', productId, 'recommendProductList[i].productId=====', recommendProductList[i].productId)
				if (
					productId == recommendProductList[i].productId ||
					recommendeds.includes(recommendProductList[i].productId)
				) {
					continue;
				}
				if (count < 4) {
					recommendeds.push(recommendProductList[i].productId);
					recommendations1.push(recommendProductList[i]);
					count++;
				} else if (count > 3 && count < 8) {
					recommendeds.push(recommendProductList[i].productId);
					recommendations2.push(recommendProductList[i]);
					count++;
				}
			}
			console.log('recommendProductList===>', recommendProductList);
			console.log('recommendations1===>', recommendations1);
			console.log('recommendations2===>', recommendations2);
			return {
				...state,
				youMayLike: recommendations1,
				youMayAlsoLike: recommendations2,
			};

		default:
			return state;
	}
	// return state
};
