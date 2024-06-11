import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {useState} from "react";

const CardColor=({filter,obj})=>{
    const [isHidden, setIsHidden] = useState(false);
    const [selectedColor, setSelectedColor] = useState({});
    const hiddenList = () => {
        setIsHidden(!isHidden)
    }
    const toggleSelected = (index) => {
        setSelectedColor((prevState) => ({
            ...prevState, [index]: !prevState[index],
        }));
    };
    return <>
        <div className='accordion-container'>
            <div className="accordion-header" onClick={hiddenList} >
                <p>{obj}</p>
                <div>{isHidden ? <AddIcon className='add-icon'/> : <RemoveIcon className='add-icon'/>}</div>
            </div>
            {!isHidden &&
                    <div className=' type-box' >
                        {filter && filter[obj] && filter[obj].length > 0 &&
                            filter[obj].map((item, index) =>
                                <div className='typeColorContainer'
                                     onClick={()=>toggleSelected(index)}>
                                    <img key={index} className={`typeColor ${selectedColor[index] ? 'selected' : ''}`} src={item.swatch} alt={item.alt}/>
                                    <p className='text-color'> {item.alt}</p>
                                </div>
                            )}
                    </div>
                }

            <br/>
            <hr/>
        </div>
    </>
}
export default CardColor