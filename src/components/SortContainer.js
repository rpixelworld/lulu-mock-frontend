import '../assets/css/SortContainer.scss'
import {useEffect, useRef, useState} from "react";
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import {FormControl, MenuItem, Select} from "@mui/material";
import {useSelector} from "react-redux";

export const SortContainer = ()=> {
    const anchorRefs = useRef([])
    const [sortDropDownDisplay, setSortDropDownDisplay] = useState(false)

    const pagination = useSelector(state => state.productReducer.pagination)

    const handleAnchorClick = (index) => {
        anchorRefs.current[index].className += ' selected'
        for(let i=0; i<2; i++) {
            if(i!==index){
                anchorRefs.current[i].className = anchorRefs.current[i].className.replace('selected', '')
            }
        }
    }

    const toggleDropDown = ()=> {
        setSortDropDownDisplay(prev => !prev)
    }

    return (
        <div className="sort-container">
            <div className="row">
                <div className="links-wrapper">
                    <a className='selected'
                       onClick={()=>{handleAnchorClick(0)}}
                       ref={(element) => {anchorRefs.current.push(element)}}
                       href="#">All Items ({pagination && pagination.totalProducts})</a>
                    <a onClick={()=>{handleAnchorClick(1)}}
                       ref={(element) => {anchorRefs.current.push(element)}}
                       href="#">Available Near You </a>
                    <ChevronRightOutlinedIcon sx={{cursor:'pointer'}}/>
                </div>
                <div className="sorting-wrapper">
                    <p>Sort by </p>
                    <p className='pointer' onClick={toggleDropDown}>Featured </p>
                    <KeyboardArrowDownOutlinedIcon
                        sx={{paddingTop:'0.6rem',cursor:'pointer'}}
                        onClick={toggleDropDown}/>

                    {/*<p> <KeyboardArrowDownOutlinedIcon xs={{fontSize: '0.9rem', padding:'0', margin:'0'}}/></p>*/}

                    <div className={sortDropDownDisplay?'custom-dropdown':'custom-dropdown hide'} >
                        <ul>
                            <li value='Featured'>Featured</li>
                            <li>New Arrivals</li>
                            <li>Top Rated</li>
                            <li>Price: High to Low</li>
                            <li>Price: Low to High</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}