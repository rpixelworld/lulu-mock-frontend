import '../assets/css/Filter.scss'
import {useEffect} from "react";
import {fetchFilters} from "../redux/actions/filterAction";
import {useDispatch, useSelector} from "react-redux";
import CardCheckBox from "./Card-CheckBox";
import CardColor from "./Card-Color";
import CardSize from "./Card-Size";


export const Filter = () => {
    const dispatch = useDispatch();
    const filters = useSelector(state => state.filterReducer.filterLibrary)

    useEffect(() => {
        dispatch(fetchFilters())
    }, [])
    return <div className="filter-container">
        <h2 className='filter-title'>Women's What's New</h2>
        <hr/>
        <CardCheckBox filter={filters} obj='Gender'/>
        <CardCheckBox filter={filters} obj='Category'/>
        <CardCheckBox filter={filters} obj='Type'/>
        <CardColor filter={filters} obj='Colour'/>
        <CardSize filter={filters} obj='Size'/>
        <CardCheckBox filter={filters} obj='SizeType'/>
        <CardCheckBox filter={filters} obj='Collection'/>
        <CardCheckBox filter={filters} obj='Features'/>
        <CardCheckBox filter={filters} obj='Fabric'/>
    </div>
}