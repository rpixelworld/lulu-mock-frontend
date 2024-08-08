import '../assets/css/SortContainer.scss';
import { useEffect, useRef, useState } from 'react';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import { FormControl, MenuItem, Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { sortProduct } from '../redux/actions/productAction';

export const SortContainer = () => {
	const anchorRefs = useRef([]);
	const [sortDropDownDisplay, setSortDropDownDisplay] = useState(false);
	const [sortBy, setSortBy] = useState('Featured');

	const dispatch = useDispatch();
	const pagination = useSelector(state => state.productReducer.pagination);

	const handleAnchorClick = index => {
		anchorRefs.current[index].className += ' selected';
		for (let i = 0; i < 2; i++) {
			if (i !== index) {
				anchorRefs.current[i].className = anchorRefs.current[i].className.replace('selected', '');
			}
		}
	};

	const toggleDropDown = e => {
		setSortDropDownDisplay(prev => !prev);
	};

	const selectSortBy = e => {
		console.log(e);
		setSortBy(e.target.textContent);
		setSortDropDownDisplay(prev => !prev);
		if (e.target.textContent == 'Price: High to Low' || e.target.textContent == 'Price: Low to High') {
			dispatch(sortProduct(e.target.textContent));
		}
	};
	return (
		<div className="sort-container">
			<div className="row">
				<div className="links-wrapper">
					<a
						className="selected"
						onClick={() => {
							handleAnchorClick(0);
						}}
						ref={element => {
							anchorRefs.current.push(element);
						}}
						href="#"
					>
						All Items ({pagination && pagination.totalProducts})
					</a>
					<a
						onClick={() => {
							handleAnchorClick(1);
						}}
						ref={element => {
							anchorRefs.current.push(element);
						}}
						href="#"
					>
						Available Near You{' '}
					</a>
					<ChevronRightOutlinedIcon sx={{ cursor: 'pointer' }} />
				</div>
				<div className="sorting-wrapper">
					<p>Sort by </p>
					<p className="pointer" onClick={toggleDropDown}>
						{sortBy}
					</p>
					<KeyboardArrowDownOutlinedIcon
						sx={{ paddingTop: '0.6rem', cursor: 'pointer' }}
						onClick={toggleDropDown}
					/>

					{/*<p> <KeyboardArrowDownOutlinedIcon xs={{fontSize: '0.9rem', padding:'0', margin:'0'}}/></p>*/}

					<div className={sortDropDownDisplay ? 'custom-dropdown' : 'custom-dropdown hide'}>
						<ul>
							<li onClick={selectSortBy} value="Featured">
								Featured
							</li>
							<li onClick={selectSortBy} value="New Arrivals">
								New Arrivals
							</li>
							<li onClick={selectSortBy} value="Top Rated">
								Top Rated
							</li>
							<li onClick={selectSortBy} value="Price: High to Low">
								Price: High to Low
							</li>
							<li onClick={selectSortBy} value="Price: Low to High">
								Price: Low to High
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};
