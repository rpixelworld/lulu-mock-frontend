import Constants from '../../Constants';

export const fetchFilters = () => dispatch => {
	fetch(`${Constants.BASE_URL}/products/filter`)
		// fetch('./data/filters.json')
		.then(res => res.json())
		.then(res => {
			const filters = res.rs;
			dispatch({
				type: Constants.ACTION_FETCH_FILTERS,
				payload: filters,
			});
		})
		.catch(error => {
			console.error('API Request Failed:', error);
		});
};

export const fetchTemplateFilters = () => dispatch => {
	fetch(`${Constants.BASE_URL}/products/filter`)
		// fetch('./data/filters.json')
		.then(res => res.json())
		.then(res => {
			const filters = res.rs;
			dispatch({
				type: Constants.ACTION_FETCH_TEMPLATE_FILTERS,
				payload: filters,
			});
		})
		.catch(error => {
			console.error('API Request Failed:', error);
		});
};
