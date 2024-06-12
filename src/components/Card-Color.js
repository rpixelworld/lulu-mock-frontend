import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {useState} from "react";

const CardColor=({filter,obj})=>{
    const [isHidden, setIsHidden] = useState(false);
    const hiddenList = () => {
        setIsHidden(!isHidden)
    }
    return <>
        <div className='accordion-container'>
            <div className="accordion-header" onClick={hiddenList} >
                <p>{obj}</p>
                <div>{isHidden ? <AddIcon className='icon'/> : <RemoveIcon className='icon'/>}</div>
            </div>
            {!isHidden &&
                    <div className=' type-box'>
                        {filter && filter[obj] && filter[obj].length > 0 &&
                            filter[obj].map((item, index) =>
                                <div className='typeColorContainer'>
                                    <img key={index} className='typeColor' src={item.swatch} alt={item.alt}/>
                                    <label  htmlFor="">{item.alt}</label>
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