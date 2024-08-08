import '../assets/css/WhatsNew.scss';
import { Filter } from '../components/Filter';
import { Banner } from '../components/Banner';
import { SortContainer } from '../components/SortContainer';
import { TabBar } from '../components/TabBar';
import { ProductList } from '../components/ProductList';

export const WhatsNew = () => {
	return (
		<div className="fluid-container">
			<Filter />
			<div className="main-container">
				<Banner />
				<SortContainer />
				<TabBar />
				<ProductList />
			</div>
		</div>
	);
};
