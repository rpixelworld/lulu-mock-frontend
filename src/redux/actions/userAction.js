import Constants from '../../Constants';

export const dispatchCookieAuth = cookieData => {
	return {
		type: Constants.ACTION_DISPATCH_AUTH,
		payload: cookieData,
	};
};

export const dispatchClearCookieAuth = () => {
	return {
		type: Constants.ACTION_DISPATCH_CLEAR_AUTH,
		payload: {},
	};
};


export const fetchUserInfo = (userId) => dispatch => {
	let url = `${Constants.BACKEND_BASE_URL}/users/${userId}`
	fetch(url)
		.then(resp => resp.json())
		.then(obj => {
			dispatch({
				type: Constants.ACTION_DISPATCH_USERINFO,
				payload: obj.data,
			})

		})
}
export const dispatchUserInfo = userInfo => {
	return {
		type: Constants.ACTION_DISPATCH_USERINFO,
		payload: userInfo,
	};
};
