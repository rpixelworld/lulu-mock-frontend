import {useState} from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const CardSize =({filter,obj})=> {
    const ctSize0to20=filter && filter[obj] && filter[obj].slice && filter[obj].slice(0,39)
    const ctSizeXStoXXXL=filter && filter[obj] &&filter[obj].slice(40,52)
    const ctSizeONESIZE=filter && filter[obj] &&filter[obj].slice(-1)
    const [isHidden, setIsHidden] = useState(false);
    const hiddenList = () => {
        setIsHidden(!isHidden)
    }
    return <>
        <div className='accordion-container'>
            <div className="accordion-header" onClick={hiddenList}>
                <p>{obj}</p>
                <div>{isHidden ? <AddIcon className='icon'/> : <RemoveIcon className='icon'/>}</div>
            </div>
            {!isHidden && (<>
                <div className='accordion-container'>
                    <div className='accordion-box'>
                        <div className='size-box'>
                            {filter && filter[obj] && filter[obj].length > 0 &&
                                ctSize0to20.map((item, index) =>
                                    <div>
                                        <button key={index}
                                                className='size-number-one'>{item.name}</button>
                                    </div>)}
                        </div>
                        <hr className='doted'/>
                        <div className='size-box'>
                            {filter && filter[obj] && filter[obj].length > 0 &&
                                ctSizeXStoXXXL.map((item, index) =>
                                    <div>
                                        <button key={index}
                                                className='size-number-two'>{item.name}</button>
                                    </div>)}
                        </div>
                        <hr className='doted'/>
                        <div className='size-box'>
                            {filter && filter[obj] && filter[obj].length > 0 &&
                                ctSizeONESIZE.map((item, index) =>
                                    <div>
                                        <button key={index}
                                                className='size-number-two'>{item.name}</button>
                                    </div>)}
                        </div>
                    </div>

                </div>
            </>)}
            <br/>
            <hr/>
        </div>
    </>
}
export default CardSize;