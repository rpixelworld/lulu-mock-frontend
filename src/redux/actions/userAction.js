import Constants from "../../Constants";

export const dispatchCookieAuth = (cookieData) => {
    return {
        type: Constants.ACTION_DISPATCH_AUTH,
        payload: cookieData
    }
}

export const dispatchClearCookieAuth = () => {
    return {
        type: Constants.ACTION_DISPATCH_CLEAR_AUTH,
        payload: {}
    }
}

export const dispatchUserInfo = (userInfo) => {
    return {
        type: Constants.ACTION_DISPATCH_USERINFO,
        payload: userInfo
    }
}