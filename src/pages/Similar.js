import '../assets/css/WhatsNew.scss';
import { Filter } from '../components/Filter';
import { Banner } from '../components/Banner';
import { SortContainer } from '../components/SortContainer';
import { SimilarProductList } from '../components/SimilarProductList';

export const Similar = () => {
	return (
		<div className="fluid-container">
			<Filter />
			<div className="main-container">
				<Banner hideLink={true} />
				{/*<SortContainer />*/}
				<SimilarProductList />
			</div>
		</div>
	);
};
