import Constants from "../../Constants";

const initState = {
    cookieAuth: {},
    isLoggedIn: false
}

export const userReducer = (state=initState, action)=>{
    switch (action.type) {
        case Constants.ACTION_DISPATCH_AUTH:
            return {...state, cookieAuth: action.payload, isLoggedIn: true}

        case Constants.ACTION_DISPATCH_CLEAR_AUTH:
            return {
                cookieAuth: {},
                isLoggedIn: false
            }
        default:
            return state
    }
}