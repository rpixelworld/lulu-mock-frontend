import {useState} from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const CardSize =({filter,obj})=> {
    const ctSize0to20=filter && filter[obj] && filter[obj].slice && filter[obj].slice(0,39)
    const ctSizeXStoXXXL=filter && filter[obj] &&filter[obj].slice(40,52)
    const ctSizeONESIZE=filter && filter[obj] &&filter[obj].slice(-1)
    const [isHidden, setIsHidden] = useState(false);
    const [clickedButtons, setClickedButtons] = useState({});
    const hiddenList = () => {
        setIsHidden(!isHidden)
    }
    const toggleButtonClick = (index) => {
        setClickedButtons((prevState) => ({
            ...prevState, [index]: !prevState[index],
        }));
    };
    return <>
        <div className='accordion-container'>
            <div className="accordion-header" onClick={hiddenList}>
                <p>{obj}</p>
                <div>{isHidden ? <AddIcon className='add-icon'/> : <RemoveIcon className='add-icon'/>}</div>
            </div>
            {!isHidden && (<>
                <div className='accordion-container'>
                    <div className='accordion-box'>
                        <div className='size-box'>
                            {filter && filter[obj] && filter[obj].length > 0 &&
                                ctSize0to20.map((item, index) =>
                                    <div>
                                        <button key={index}
                                                onClick={() => toggleButtonClick(index)}
                                                style={{
                                                    backgroundColor: clickedButtons[index] ? "black" : "white",
                                                    color: clickedButtons[index] ? "white" : "black",
                                                }}
                                                className='size-number-one'>{item.name}</button>
                                    </div>)}
                        </div>
                        <hr className='doted'/>
                        <div className='size-box'>
                            {filter && filter[obj] && filter[obj].length > 0 &&
                                ctSizeXStoXXXL.map((item, index) =>
                                    <div>
                                        <button key={index+40}
                                                onClick={() => toggleButtonClick(index+40)}
                                                style={{
                                                    backgroundColor: clickedButtons[index+40] ? "black" : "white",
                                                    color: clickedButtons[index+40] ? "white" : "black",
                                                }}
                                                className='size-number-two'>{item.name}</button>
                                    </div>)}
                        </div>
                        <hr className='doted'/>
                        <div className='size-box'>
                            {filter && filter[obj] && filter[obj].length > 0 &&
                                ctSizeONESIZE.map((item, index) =>
                                    <div>
                                        <button key={index+52}
                                                onClick={() => toggleButtonClick(index+52)}
                                                style={{
                                                    backgroundColor: clickedButtons[index+52] ? "black" : "white",
                                                    color: clickedButtons[index+52] ? "white" : "black",
                                                }}
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