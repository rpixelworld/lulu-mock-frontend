import * as CartIndexedDBHelper from "../../IndexedDBHelper";
import Constants from "../../Constants";

export const dispatchShoppingCart = (shoppingCart) => {
    return {
        type: Constants.ACTION_DISPATCH_SHOPPING_CART,
        payload: shoppingCart
    }
}

export const dispatchShippingFee = (fee) => {
    return {
        type: Constants.ACTION_DISPATCH_SHIPPING_FEE,
        payload: fee
    }
}

export const dispatchOrderInfo = (orderInfo) => {
    return {
        type: Constants.ACTION_DISPATCH_ORDER_INFO,
        payload: orderInfo
    }
}

// export const placeOrderAndDispatch = (orderInfo, shoppingCart) => dispatch => {
//     let bodyItems = [];
//     shoppingCart.items.forEach(item => {
//         bodyItems.push({
//             productId: item.itemKey.split('_')[0],
//             colorId: item.itemKey.split('_')[1],
//             size: item.itemKey.split('_')[2],
//             quantity: item.amount
//         })
//     })
//
//     let url = `${Constants.BASE_URL}/order?mykey=${Constants.MY_KEY}`
//     let options = {
//         headers: {
//             method: "POST",
//             mode: "cors",
//             "Content-Type": "application/json",
//             authorization: 'bear ' + UserHelper.getSetCookie('_token')
//         },
//         body: JSON.stringify({
//             taxRate: 1.2,
//             isActive: true,
//             isDelete: false,
//             orderItems: bodyItems
//         })
//     }
//     fetch(url, options)
//         .then(resp => {
//             return resp.json()
//         })
//         .then(res => {
//             if(res.status == 'success'){
//
//             }
//             else {
//                 if(res.status=='Failed' && res.message.substring(0, res.message.indexOf('/'))=='Invalid token. ' ){
//
//                 }
//             }
//         })
// }

export const dispatchClearShoppingCart = ()=> {
    return {
        type: Constants.ACTION_CLEAR_SHOPPING_CART,
        payload: null
    }
}
