import {useEffect, useState} from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import {useDispatch} from "react-redux";
import {fetchProducts} from "../redux/actions/productAction";

const CardCheckBox = ({filter, obj}) => {

    const [isHidden, setIsHidden] = useState(false);
    const [showMore, setShowMore] = useState(true);
    const [checkBox, setCheckBox] = useState({});

    const dispatch = useDispatch();
    let seletedFilters = JSON.parse(JSON.stringify(filter))

    const hiddenList = () => {
        setIsHidden(!isHidden)
    }
    const show= ()=>{
        setShowMore(!showMore)
    }
    const toggleCheck = (index) => {
        setCheckBox((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));

        seletedFilters[obj][index]['isChecked'] = !seletedFilters[obj][index]['isChecked']
        dispatch(fetchProducts(1, seletedFilters))

    };

    useEffect(() => {
        if(filter[obj] && filter[obj].length>0){
            // console.log(filter[obj])
            let receivedCheckbox = {};
            filter[obj].forEach((item,index) => {
                receivedCheckbox[index] = item.isChecked
            })
            // console.log(obj, '===>', receivedCheckbox)
            setCheckBox(receivedCheckbox)
        }
    }, [filter[obj]]);

    return <>
        <div className='accordion-container'>
            <div className="accordion-header" onClick={hiddenList} >
                <div><p>{obj}</p></div>
                {/*+/-*/}
                <div className='add-minus'>
                    {isHidden
                    ? <><div className='move-to-vertical'></div>
                        <div className='need-fix'/>
                    </>
                    : <>
                        <div className='move-to-horizontal'></div>
                        <div className='need-fix'/>
                    </>
                }
                </div>

            </div>
            {!isHidden && (<>
                <div className='accordion-box'>
                    {filter && filter[obj] && filter[obj].length > 0 &&
                        filter[obj].slice(0, 5).map((item, index) =>
                            <div key={`${obj}_${item.name}`} className='checkList' onClick={()=>toggleCheck(index)}>
                                {checkBox[index] ? <CheckBoxRoundedIcon className='icon'/> :<CheckBoxOutlineBlankIcon className='icon'/> }
                                <p>{item.name}</p>
                            </div>)}
                </div>
                {filter && filter[obj] && filter[obj].length > 5 && (<>
                    {!showMore && (
                        <div className='accordion-box'>
                            {filter && filter[obj] && filter[obj].length > 0 &&
                                filter[obj].slice(5).map((item, index) =>
                                    <div key={`${obj}_${item.name}`} className='checkList' onClick={()=>toggleCheck(index+5)}>
                                        {checkBox[index+5] ? <CheckBoxRoundedIcon className='icon'/> :<CheckBoxOutlineBlankIcon className='icon'/> }
                                        <p>{item.name}</p>
                                    </div>)}
                        </div>
                    )}
                    <br/>
                    <div className='accordion-view-more-header' style={{color:'#53565a'}} onClick={show}>
                        <div>{showMore ? 'View More' : 'View Less'}</div>
                        {/*+/-*/}
                        <div className='add-minus'>{showMore
                            ? <><div className='move-to-vertical' style={{background:"#56535a"}}></div>
                                <div className='need-fix' style={{background:"#56535a"}}/>
                            </>
                            : <>
                                <div className='move-to-horizontal' style={{background:"#56535a"}}></div>
                                <div className='need-fix' style={{background:"#56535a"}}/>
                            </>
                        }</div>
                    </div>
                </>)}
            </>)}
            <br/>
            <hr/>
        </div>
    </>
}
export default CardCheckBox