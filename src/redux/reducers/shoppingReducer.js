import Constants from "../../Constants";

const initState = {
    shoppingCart: {
        total: 0,
        totalCost: 0,
        items: []
    }
}

export const shoppingReducer = (state=initState, action)=>{
    switch (action.type){
        case Constants.ACTION_DISPATCH_SHOPPING_CART:
            const sortedItems = action.payload.items.sort((a, b)=>b.createdAt-a.createdAt)
            return {...state, shoppingCart: {...action.payload, items: sortedItems}}

        default:
            return state
    }
}