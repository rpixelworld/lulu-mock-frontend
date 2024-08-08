import '../assets/css/TabBar.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tab } from '@testing-library/user-event/dist/tab';
import { fetchProducts } from '../redux/actions/productAction';

export const TabBar = () => {
	const dispatch = useDispatch();
	const selectedFilters = useSelector(state => state.productReducer.selectedFilters);

	const [tabButtons, setTabButtons] = useState([]);

	const handleRemoveFilter = tab => {
		let keyIndexName = tab.split('_');
		let newFilters = JSON.parse(JSON.stringify(selectedFilters));
		newFilters[keyIndexName[0]][keyIndexName[1]]['isChecked'] = false;
		// console.log(newFilters)
		dispatch(fetchProducts(1, newFilters));
	};

	useEffect(() => {
		console.log('selectedFilters===>', selectedFilters);
		let buttons = [];
		for (let key in selectedFilters) {
			if (Array.isArray(selectedFilters[key])) {
				selectedFilters[key].forEach((filter, index) => {
					// console.log(key, filter)
					if (key === 'Colour') {
						filter.isChecked && buttons.push(key + '_' + index + '_' + filter.alt);
					} else {
						filter.isChecked && buttons.push(key + '_' + index + '_' + filter.name);
					}
				});
			}
		}
		setTabButtons(buttons);
	}, [selectedFilters]);

	return (
		<div className="tabbar-container">
			<div className="tablist-wrapper">
				{tabButtons.map(tab => {
					// let arr = tab.split('_');
					return (
						<div
							key={tab}
							className="tab"
							onClick={() => {
								handleRemoveFilter(tab);
							}}
						>
							{tab.split('_')[2]} <ion-icon name="close-outline"></ion-icon>
						</div>
					);
				})}
				{/*<div className="tab">*/}
				{/*    Women <ion-icon name="close-outline"></ion-icon>*/}
				{/*</div>*/}
				{/*<div className="tab">*/}
				{/*    0 <ion-icon name="close-outline"></ion-icon>*/}
				{/*</div>*/}
				{/*<div className="tab">*/}
				{/*    Legging <ion-icon name="close-outline"></ion-icon>*/}
				{/*</div>*/}
			</div>
		</div>
	);
};
