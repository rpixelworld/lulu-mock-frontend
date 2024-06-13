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
            <div className="accordion-header" onClick={hiddenList}>
                <div><p>{obj}</p></div>
                {/*+/-*/}
                <div className='add-minus'>
                    {isHidden
                        ? <>
                            <div className='move-to-vertical'></div>
                            <div className='need-fix'/>
                        </>
                        : <>
                            <div className='move-to-horizontal'></div>
                            <div className='need-fix'/>
                        </>
                    }
                </div>
            </div>

            {!isHidden &&
                <div className=' type-box'>
                    {filter && filter[obj] && filter[obj].length > 0 &&
                        filter[obj].map((item, index) =>
                            <div className='typeColorContainer'
                                 onClick={() => toggleSelected(index)}>
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
