import {useEffect, useState} from "react";
import '../assets/css/WhyWeMadeThis.scss'

export const WhyWeMadeThis = ({details, colorIds}) => {
    const [activeColorIds, setActiveColorIds] = useState(colorIds || []);
    const [WWMT, setWWMT] = useState([]);

    // 当details变化时，如果没有传入colorIds，则设置默认colorId
    useEffect(() => {
        if (details?.images && activeColorIds.length === 0) {
            const defaultColorId = details.images[0]?.colorId;
            if (defaultColorId) {
                setActiveColorIds([defaultColorId]);
            }
        }
    }, [details]);

    // 当details或activeColorIds变化时，更新WWMT
    useEffect(() => {
        if (details?.images && activeColorIds.length > 0) {
            const images = details.images.flatMap((image) =>
                activeColorIds.includes(image.colorId) ? image.whyWeMadeThis : []
            );
            setWWMT(images);
            console.log('Filtered images:', images);
        }
    }, [details, activeColorIds]);

    // 当传入的colorIds变化时，更新activeColorIds
    useEffect(() => {
        if (colorIds && colorIds.length > 0) {
            setActiveColorIds(colorIds);
        }
    }, [colorIds]);

    return (<div className='WWMT-container'>
        <div className='title'>
            <h1 className='WWMT'>Why we made this</h1>
            <p>Go ahead, get sweaty. The Swiftly Tech collection, powered by seamless construction, is the ultimate gear for running and training.</p>
        </div>
        <div className='img-content'>
            {WWMT.map((item, index) => (
                <img className='WWMT-img' key={index} src={item} alt=""/>
            ))}
        </div>
    </div>)
        ;
};
