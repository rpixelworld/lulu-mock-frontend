import '../assets/css/Filter.scss'
import {useEffect, useState} from "react";
import {fetchFilters} from "../redux/actions/filterAction";
import {useDispatch, useSelector} from "react-redux";
import CardCheckBox from "./Card-CheckBox";
import CardColor from "./Card-Color";
import CardSize from "./Card-Size";


export const Filter = () => {
    const dispatch = useDispatch();
    const filters = useSelector(state => state.productReducer.selectedFilters)
    const [genderText, setGenderText] = useState('')

    useEffect(() => {
        dispatch(fetchFilters())
    }, [])

    useEffect(() => {
        if(filters['Gender']){
            if(filters['Gender'][0].isChecked && filters['Gender'][1].isChecked){
                setGenderText('');
            }
            else if(filters['Gender'][0].isChecked && !filters['Gender'][1].isChecked) {
                setGenderText("Men's")
            }
            else if(!filters['Gender'][0].isChecked && filters['Gender'][1].isChecked) {
                setGenderText("Women's")
            }
            else {
                setGenderText('');
            }
        }
    }, [filters['Gender']]);

    return <div className="filter-container">
        <h2 className='filter-title'>{genderText} What's New</h2>
        <hr/>
        <CardCheckBox filter={filters} obj='Gender'/>
        <CardCheckBox filter={filters} obj='Category'/>
        <CardCheckBox filter={filters} obj='Type'/>
        <CardColor filter={filters} obj='Colour'/>
        <CardCheckBox filter={filters} obj='Activity' />
        <CardSize filter={filters} obj='Size'/>
        <CardCheckBox filter={filters} obj='SizeType'/>
        <CardCheckBox filter={filters} obj='Collection'/>
        <CardCheckBox filter={filters} obj='Features'/>
        <CardCheckBox filter={filters} obj='Fabric'/>
    </div>
}