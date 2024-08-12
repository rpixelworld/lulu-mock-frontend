import Constants from './Constants';

export const loginUser = (user, onSuccess, onFailure) => {
	const url = Constants.BACKEND_BASE_URL + '/auth/login';
	const options = {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: JSON.stringify(user),
	};
	fetch(url, options)
		.then(resp => {
			return resp.json();
		})
		.then(result => {
			let status = result.status;
			if (status && status === 'success') {
				onSuccess && onSuccess(result.data);
			} else {
				onFailure && onFailure(result.error);
			}
		});
};

export const logoutUser = (user, onSuccess, onFailure) => {
	onSuccess && onSuccess();
};

export const getCookie = name => {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
};

//token will be expired in 2 hours, so set the cookie for 1 hour
export const setCookies = pairs => {
	for (const key in pairs) {
		document.cookie = `${key}=${pairs[key]}; path=/; max-age=${1 * 60 * 60}`;
	}
};

export const clearCookies = pairs => {
	for (const key in pairs) {
		document.cookie = `${key}=; path=/; max-age=0`;
	}
};
