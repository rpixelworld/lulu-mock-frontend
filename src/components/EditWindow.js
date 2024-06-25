import React, {useEffect, useState} from "react";
import '../assets/css/EditWindow.scss'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import Constants from "../Constants";
import {Dialog, DialogContent} from "@mui/material";

const EditWindow = ({state, closeEdit, item, handleUpdate}) => {

    const [product, setProduct] = useState(null)
    const [selectedColorIndex, setSelectedColorIndex] = useState(0)
    const [selectedSizeIndex, setSelectedSizeIndex] = useState(0)
    const [selectedColor, setSelectedColor] = useState('')
    const [selectedSize, setSelectedSize] = useState('')

    const [bgIndex, setBgIndex] = useState('0');
    const [bgImg, setBgImg] = useState(null);
    const [pageIndex, setPageIndex] = useState(0);

    const confirmUpdate = ()=> {
        let newItem = {
            ...item,
            itemKey: `${product.productId}_${product.swatches[selectedColorIndex].colorId}_${selectedSize}`,
            colorAt: selectedColor,
            size: selectedSize,
            imageUrl: product.images[selectedColorIndex].mainCarousel.media.split(' | ')[0],
            createdAt: Date.now(),
            updatedAt: Date.now()
        }

        handleUpdate(item.itemKey, newItem)
    }

    const sizeButtonClick = (index, item) => {
        setSelectedSizeIndex(index)
        setSelectedSize(item)
    }

    const colorButtonClick = (index, swatchAlt) => {
        setSelectedColorIndex(index)
        setSelectedColor(swatchAlt)
        setBgImg(product.images[index].mainCarousel.media.split(' | ')[0])
        setBgIndex(index)
        setPageIndex(0)
    }

    const handleNextPage = () => {
        if (pageIndex < product.images[selectedColorIndex].mainCarousel.media.split(' | ').length-1) {
            const newIndex = pageIndex + 1;
            // console.log(newIndex)
            setPageIndex(newIndex)
            setBgImg(product.images[selectedColorIndex].mainCarousel.media.split(' | ')[newIndex])
        }

    }
    const handlePrevPage = () => {
        if (pageIndex > 0) {
            const newIndex = pageIndex - 1;
            setPageIndex(newIndex)
            setBgImg(product.images[selectedColorIndex].mainCarousel.media.split(' | ')[newIndex])
        }
    }

    useEffect(() => {
        console.log('useeffect, state=', state)
        let arr = item.itemKey.split('_')
        let productId = arr[0]
        setSelectedColor(item.colorAlt)
        setSelectedSize(arr[2])

        fetch(`${Constants.BASE_URL}/product/${productId}?mykey=${Constants.MY_KEY}`)
            .then(resp => {
                // console.log(resp)
                if (resp.ok && resp.status==200) {
                    return resp.json()
                }
            })
            .then(res => {
                setProduct(res.rs)
                let productDetail = res.rs

                for(let i=0; i<productDetail.swatches.length; i++) {
                    if(arr[1] === productDetail.swatches[i].colorId) {
                        setSelectedColorIndex(i)
                        setBgImg(productDetail.images[i].mainCarousel.media.split('|')[0])
                        break;
                    }
                }
                if(arr[2] === 'ONE SIZE' || arr[2] === '') {
                    setSelectedSizeIndex(0)
                    setSelectedSize(arr[2])
                }
                else {
                    for(let i=0; i<productDetail.sizes[0].details.length; i++) {
                        if(arr[2] === productDetail.sizes[0].details[i]) {
                            setSelectedSizeIndex(i)
                        }
                    }
                }
            })
    }, []);

    return product && <Dialog fullScreen={false} open={state}>
        <DialogContent className=''>
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
                            disabled={pageIndex === product.images[selectedColorIndex].mainCarousel.media.split(' | ').length - 1}
                            style={{ display: pageIndex === product.images[selectedColorIndex].mainCarousel.media.split(' | ').length-1 ? 'none' : 'block' }}>
                        <ChevronRightIcon/> </button>
                </div>


                <div className='edit-colorAndSize'>
                    <CloseIcon onClick={closeEdit} style={{position:"relative",left:'104%',cursor:'pointer'}} />
                    {/*name*/}
                    <h2>{item.productName}</h2>
                    {/*price*/}
                    <p>${item.price}.00</p>
                    {/*color*/}
                    <p>{selectedColor}</p>
                    <div className='edit-colorList'>
                        {product.swatches.map((swa, index) =>
                            <div className={selectedColorIndex===index? 'edit-colorBoxClicked' : 'edit-colorBox'}
                                 key={index}
                                 onClick={() => colorButtonClick(index, swa.swatchAlt)}>
                                <img className='edit-color-button'
                                     src={swa.swatch} alt={swa.swatchAlt}/>
                            </div>)
                        }
                    </div>
                    {/*size*/}
                    <p>Size:{selectedSize}</p>
                    <div className='edit-sizeList'>
                        {product.sizes[0].details.length>0 && product.sizes[0].details.map((size, index) =>
                            <div className='edit-sizeBox' key={index}>
                                <button className={selectedSizeIndex===index ? 'edit-size-buttonClicked' : 'edit-size-button'}
                                        onClick={() => sizeButtonClick(index, size)}
                                >{size}</button>
                            </div>)
                        }
                        {product.sizes[0].details.length==0 && <button className='onesize-buttonClicked'>ONE SIZE</button>}
                    </div>
                    <button className='update-edit'
                            onClick={confirmUpdate}>UPDATE ITEM</button>
                    <div className='view-detail-link'><span><a href={`/product/${product.productId}?color=${product.swatches[selectedColorIndex].colorId}`}>View product details</a></span></div>
                </div>
            </div>
        </div>
        </DialogContent>
    </Dialog>
}

export default EditWindow
