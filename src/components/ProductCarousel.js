import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchProductDetail} from "../redux/actions/productAction";
import '../assets/css/ProductCarousel.scss'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
export const ProductCarousel = () => {
    const [bigImg, setBigImg] = useState('');
    const [colorSelected, setColorSelected] = useState('56496');
    const dispatch = useDispatch();
    const details = useSelector( state => state.productReducer.productDetail)
    const colors = details?.swatches || []
    const imgs = details?.images?.flatMap((image)=>
        image.colorId === colorSelected ? image.mainCarousel.media.split('|'):[])
// console.log('imgs',imgs)
    useEffect(()=>{
        dispatch(fetchProductDetail())
    },[])
    console.log('details,',details)

    useEffect(()=>{
        if (imgs.length> 0){
            setBigImg(imgs[0])
            setIndex(0)
        }
    },[])

    const handleColorClick = (item) => {
            setColorSelected(item)
        const selectedImages = details.images.find(
            (img) => img.colorId === item
        );
            if(selectedImages){
                setBigImg(selectedImages.mainCarousel.media.split('|')[0])
            }
    }

    const handleImageClick = (item) => {
        setBigImg(item)
    }

    const [index, setIndex] = useState(0)
    const handleNextPage = () => {
        if (index < imgs.length){
            const newIndex = index + 1;
            console.log(newIndex)
            setIndex(newIndex)
            setBigImg(imgs[newIndex])
        } if (index===imgs.length-1){
            const newIndex = 0;
            setIndex(newIndex)
            setBigImg(imgs[newIndex])
        }
    }
    const handlePrevPage = () => {
        if (index===0) {
            const newIndex =imgs.length-1;
            setIndex(newIndex)
            setBigImg(imgs[newIndex])
        }
        if (index > 0){
            const newIndex = index - 1;
            setIndex(newIndex)
            setBigImg(imgs[newIndex])
        }
    }

    return (<div className='upperContainer'>
    <div className='productCarousel' >
        <div className='bigImg'
             style={{background: bigImg ? `url('${bigImg}') no-repeat center center / cover` : "none"}}>
            <div className=' navBar'>
                <div style={{width:'48px',
                    height:'48px',
                    background:'white',
                    margin:'5px',
                    borderRadius:'5px'
                }}><ChevronLeftIcon className='nav-icon' onClick={handlePrevPage}/></div>
                <div style={{width:'48px',
                    height:'48px',
                    background:'white',
                    margin:'5px',
                    borderRadius:'5px'
                }}><ChevronRightIcon className='nav-icon' onClick={handleNextPage}/></div>
            </div>
        </div>

        <div className='productList'>
            {imgs.map((item, index) => (
                <div key={index} className='smallImgList'>
                    <img className='img-list-item' onClick={() => handleImageClick(item)} src={item} alt=""/>
                 </div>
             ))}
            <div className='img-list-item' style={{margin:'0 4px'}}>
                <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                     className="product-media-carousel_thumbnailImage__XG3rS product-media-carousel_tagIcon__RDuKa"
                     focusable="false" role="img" aria-hidden="true">
                    <g fill="currentColor" fill-rule="evenodd">
                        <path
                            d="m22.283 11.802-.016-7.696-1.614 1.615.029 6.017-10.355 10.355-8.653-8.653L11.96 3.11l6.074.013 1.625-1.626-7.697-.016c-.41 0-.794.16-1.085.452L.45 12.36a1.519 1.519 0 0 0-.011 2.146l8.82 8.82a1.52 1.52 0 0 0 2.146-.01l10.429-10.43c.285-.285.449-.681.449-1.085"></path>
                        <path
                            d="m14.404 9.374-.012-.012a1.837 1.837 0 0 1 0-2.596l2.052-2.052a3.44 3.44 0 0 0-3.186.919 3.45 3.45 0 0 0 0 4.876 3.451 3.451 0 0 0 4.875 0 3.437 3.437 0 0 0 .919-3.187L17 9.374a1.838 1.838 0 0 1-2.597 0"></path>
                        <path
                            d="m21.82.872-.63.629-1.624 1.625-2.033 2.033-1.208 1.209-1.165 1.165a.751.751 0 0 0 0 1.062l.012.01a.752.752 0 0 0 1.06 0l1.166-1.164 1.208-1.21 2.039-2.038 1.619-1.62L24 .84a1.57 1.57 0 0 0-2.181.033"></path>
                    </g>
                </svg>
            </div>
        </div>

    </div>
        <div>
            右
            <div className='productColorList'>
                {colors.map((item) => <img onClick={() => handleColorClick(item.colorId)}
                                           key={item.colorId}
                                           src={item.swatch} alt=""/>)}

            </div>
        </div>
    </div>)
}
