import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {fetchProducts} from "../redux/actions/productAction";

const CardColor=({filter,obj})=>{
    const [isHidden, setIsHidden] = useState(false);
    const [selectedColor, setSelectedColor] = useState({});

    const dispatch = useDispatch();
    let seletedFilters = JSON.parse(JSON.stringify(filter))

    const hiddenList = () => {
        setIsHidden(!isHidden)
    }
    const toggleSelected = (index) => {
        setSelectedColor((prevState) => ({
            ...prevState, [index]: !prevState[index],
        }));

        seletedFilters[obj][index]['isChecked'] = !seletedFilters[obj][index]['isChecked']
        dispatch(fetchProducts(1, seletedFilters))
    };

    useEffect(() => {
        if(filter[obj] && filter[obj].length>0){
            // console.log(filter[obj])
            let receivedColours = {};
            filter[obj].forEach((item,index) => {
                receivedColours[index] = item.isChecked
            })
            // console.log(obj, '===>', receivedCheckbox)
            setSelectedColor(receivedColours)
        }
    }, [filter[obj]]);

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
                            <div key={`${obj}_${item.alt}`} className='typeColorContainer'
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
