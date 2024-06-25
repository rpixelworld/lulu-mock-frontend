import * as CartIndexedDBHelper from "../../CartIndexedDBHelper";
import Constants from "../../Constants";

export const dispatchShoppingCart = (shoppingCart) => {
    return {
        type: Constants.ACTION_DISPATCH_SHOPPING_CART,
        payload: shoppingCart
    }
}
