import {useState} from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';

const CardCheckBox = ({filter, obj}) => {
    const [isHidden, setIsHidden] = useState(false);
    const [showMore, setShowMore] = useState(true);
    const [checkBox, setCheckBox] = useState({});
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
    };
    return <>
        <div className='accordion-container'>
            <div className="accordion-header" onClick={hiddenList} >
                <div><p>{obj}</p></div>
                <div>{isHidden ? <AddIcon className='add-icon'/> : <RemoveIcon className='add-icon'/>}</div>
            </div>
            {!isHidden && (<>
                <div className='accordion-box'>
                    {filter && filter[obj] && filter[obj].length > 0 &&
                        filter[obj].slice(0, 5).map((item, index) =>
                            <div  className='checkList' onClick={()=>toggleCheck(index)}>
                                {checkBox[index] ? <CheckBoxRoundedIcon className='icon'/> :<CheckBoxOutlineBlankIcon className='icon'/> }
                                <p>{item.name}</p>
                            </div>)}
                </div>
                {filter && filter[obj] && filter[obj].length > 5 && (<>
                    {!showMore && (
                        <div className='accordion-box'>
                            {filter && filter[obj] && filter[obj].length > 0 &&
                                filter[obj].slice(5).map((item, index) =>
                                    <div  className='checkList' onClick={()=>toggleCheck(index+5)}>
                                        {checkBox[index+5] ? <CheckBoxRoundedIcon className='icon'/> :<CheckBoxOutlineBlankIcon className='icon'/> }
                                        <p>{item.name}</p>
                                    </div>)}
                        </div>
                    )}
                    <br/>
                    <div className='accordion-view-more-header' style={{color:'#53565a'}} onClick={show}>
                        <div>{showMore ? 'View More' : 'View Less'}</div>
                        <div>{showMore ? <AddIcon className='icon'/> : <RemoveIcon className='icon'/>}</div>
                    </div>
                </>)}
            </>)}
            <br/>
            <hr/>
        </div>
    </>
}
export default CardCheckBox