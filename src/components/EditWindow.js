import {useEffect, useState} from "react";
import '../assets/css/EditWindow.scss'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {Link} from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';

const EditWindow = ({state,closeEdit}) => {
    const [clickedColor, setClickedColor] = useState({});
    const [clickedSize, setClickedSize] = useState({});
    const [colorTitle, setColorTitle] = useState(null);
    const [sizeTitle, setSizeTitle] = useState(null);
    const [bgIndex, setBgIndex] = useState('0');
    const [bgImg, setBgImg] = useState(null);
    const [pageIndex, setPageIndex] = useState(0);
    // const [isWindow, setIsWindow] = useState(state);

    const [newData, setNewData] = useState(null)

    const imgs = newData?.images[bgIndex]?.mainCarousel?.media?.split('|') || []
    useEffect(() => {
        fetch('http://api-lulu.hibitbyte.com/product/prod10550089?mykey=Dqhr38t/EStgqM/rjjutXO1B3CgwtquL0Jk8XVP7G4vInpTIMZwF01zwJ906Y27ijkbmQT3sCz3bJ/63p3otAA==')
            .then(res => res.json())
            .then(res => {
                setNewData(res.rs)
            })

            .catch(error => console.error('Fetch error:', error));
    }, []);
    console.log(newData)

    const sizeButtonClick = (index, item) => {
        setClickedSize('')
        setClickedSize((prevState) => ({
            ...prevState, [index]: !prevState[index],
        }));
        setSizeTitle(item)
    }

    const colorButtonClick = (index, swatchAlt) => {
        setClickedColor('')
        setClickedColor((prevState) => ({
            ...prevState, [index]: !prevState[index],
        }));
        setColorTitle(swatchAlt)
        setBgIndex(index)
        setPageIndex(0)
    }

    const handleNextPage = () => {
        if (pageIndex < imgs.length-1) {
            const newIndex = pageIndex + 1;
            // console.log(newIndex)
            setPageIndex(newIndex)
            setBgImg(imgs[newIndex])
        }

    }
    const handlePrevPage = () => {
        if (pageIndex > 0) {
            const newIndex = pageIndex - 1;
            setPageIndex(newIndex)
            setBgImg(imgs[newIndex])
        }
    }



    useEffect(() => {
        setBgImg(newData?.images[bgIndex]?.mainCarousel?.media?.split('|')[0] || null)
    }, [bgIndex, newData])

    return <>{state &&
        <div className='edit-window' >
            <div className='edit-container'>
                <div className='bgI'
                     style={{background: `url(${bgImg}) no-repeat center center/cover`}}>
                    <button className='prev-button'
                            onClick={handlePrevPage}
                            disabled={pageIndex === 0}
                            style={{ display: pageIndex === 0 ? 'none' : 'block' }}>
                        <ChevronLeftIcon/> </button>
                    <button className='next-button'
                            onClick={handleNextPage}
                            disabled={pageIndex === imgs.length - 1}
                            style={{ display: pageIndex === imgs.length-1 ? 'none' : 'block' }}>
                        <ChevronRightIcon/> </button>
                </div>


                <div className='edit-colorAndSize'>
                    <CloseIcon onClick={closeEdit} style={{position:"relative",left:'104%',cursor:'pointer'}} />
                    {/*name*/}
                    <h2>{newData?.name || null}</h2>
                    {/*price*/}
                    <p>{newData?.price?.replace('CAD', '') || null}</p>
                    {/*color*/}
                    <p>Color:{' '}{colorTitle}</p>
                    <div className='edit-colorList'>
                        {newData?.swatches?.map((item, index) =>
                            <div className={clickedColor[index] ? 'edit-colorBoxClicked' : 'edit-colorBox'}
                                 key={index}
                                 onClick={() => colorButtonClick(index, item.swatchAlt)}>
                                <img className='edit-color-button'
                                     src={item.swatch} alt={item.swatchAlt}/>
                            </div>) || []}
                    </div>
                    {/*size*/}
                    <p>Size:{' '}{sizeTitle}</p>
                    <div className='edit-sizeList'>
                        {newData?.sizes[0]?.details?.map((item, index) =>
                            <div className='edit-sizeBox' key={index}>
                                <button className={clickedSize[index] ? 'edit-size-buttonClicked' : 'edit-size-button'}
                                        onClick={() => sizeButtonClick(index, item)}
                                >{item}</button>
                            </div>) || []}
                    </div>
                    <button className='update-edit'>UPDATE ITEM</button>
                    <Link className='link' to={'/product/:productId'}>View product details</Link>
                </div>
            </div>
        </div>
    }

    </>
}

export default EditWindow
