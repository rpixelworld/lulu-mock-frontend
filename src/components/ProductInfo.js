import StorefrontIcon from "@mui/icons-material/Storefront";
import AddedMinusMark from "./Add-MinusMark";
import {useState} from "react";
import '../assets/css/ProductInfo.scss'

const ProductInfo = ({details,colorId}) => {
    const colors = details?.swatches || []
    const [selectedColor, setSelectedColor] = useState({});
    const [isHidden, setIsHidden] = useState(false);
    const size = details?.sizes?.flatMap((details) => details.details || [])
    const title = details?.sizes?.flatMap((title) => title.title || [])
    const featureTitles = details?.featureTitles || []

    const hiddenList = () => {
        setIsHidden(!isHidden)
    }
    const toggleSelected = (index) => {
        setSelectedColor({})
        setSelectedColor((prevState) => ({
            ...prevState, [index]: !prevState[index],
        }))

    }

    const handleColorClick = (item) => {

        colorId(item)
        // const selectedImages = details.images.find(
        //     (img) => img.colorId === item
        // );
        // if (selectedImages) {
        //     setBigImg(selectedImages.mainCarousel.media.split('|')[0])
        // }
    }

    return <div className='productInfo'>
        <div>Love Long Sleeve Shirt</div>
        <h1>{details.price}</h1>
        <div className='productColorList'>

            {colors.map((item, index) =>
                <div className='colorBox'>
                    <img onClick={() => {
                        handleColorClick(item.colorId)
                        toggleSelected(index)
                    }}
                         onMouseEnter={() => handleColorClick(item.colorId)}
                         className={`selectColor ${selectedColor[index] ? 'selected' : ''}`}
                         key={item.colorId}
                         src={item.swatch} alt=""/>
                </div>)}

        </div>
        <div className='sizeList'>
            <p style={{fontWeight: 'bold'}}>{title} </p>
            {size.map((item, index) => <button className='sizeButton' key={index}>{item}</button>)}
        </div>

        <div style={{
            display: 'flex',
            flexDirection: 'row',
            margin: '20px 0'
        }}>
            <div className='redT'>T</div>
            <a style={{color: 'black'}} href="#">what my size?</a>
        </div>

        <div className='purchase'>
            <div className='read-to-buy'>
                <h2>Ship to me</h2>
                <p>Free shipping and returns</p>
            </div>
            <div className='pick-up-container'>
                <div className='pick-up' onClick={hiddenList}>
                    <StorefrontIcon className='icon'/>
                    <h2>Pick up in store</h2>
                    <AddedMinusMark className='info-icon' status={isHidden} posistion={{left: '380px'}}/>
                </div>
                {isHidden && (<div style={{
                    margin: '0 10px',
                    overflowWrap: 'break-word',
                    fontSize: '15px',
                    padding: '0 10px 20px',
                    transition: 'all ease-in-out 0.3s'
                }}>This size/colour combination is not available for Buy & Pick-up at any stores near you. Try
                    selecting another size, colour or check all store inventory.</div>)}
            </div>

            <div className='add-to-bag'>
                <button className='add-button'>ADD TO BAG</button>
            </div>
            <div className='check-all'>Check All Store Inventory</div>
        </div>

        <div className='more-infro'>
            <div className='four-ways-payment'>
                <p>4 payments of $17.00 available with
                    {/*LOGO*/}
                    <div className="svg-container">
                        <svg viewBox="360.6 308.93 1148.88 220.83"
                             className="installment-payments_afterpayIcon__1gJx0" focusable="false" role="img"
                             aria-hidden="false"
                             aria-label="afterpay">
                            <path
                                d="m1492 353.5-34.6-19.8-35.1-20.1c-23.2-13.3-52.2 3.4-52.2 30.2v4.5c0 2.5 1.3 4.8 3.5 6l16.3 9.3c4.5 2.6 10.1-.7 10.1-5.9V347c0-5.3 5.7-8.6 10.3-6l32 18.4 31.9 18.3c4.6 2.6 4.6 9.3 0 11.9l-31.9 18.3-32 18.4c-4.6 2.6-10.3-.7-10.3-6V415c0-26.8-29-43.6-52.2-30.2l-35.1 20.1-34.6 19.8c-23.3 13.4-23.3 47.1 0 60.5l34.6 19.8 35.1 20.1c23.2 13.3 52.2-3.4 52.2-30.2v-4.5c0-2.5-1.3-4.8-3.5-6l-16.3-9.3c-4.5-2.6-10.1.7-10.1 5.9v10.7c0 5.3-5.7 8.6-10.3 6l-32-18.4-31.9-18.3c-4.6-2.6-4.6-9.3 0-11.9l31.9-18.3 32-18.4c4.6-2.6 10.3.7 10.3 6v5.3c0 26.8 29 43.6 52.2 30.2l35.1-20.1L1492 414c23.3-13.5 23.3-47.1 0-60.5zm-227 6.6-81 167.3h-33.6l30.3-62.5-47.7-104.8h34.5l30.6 70.2 33.4-70.2h33.5zm-809.9 59.4c0-20-14.5-34-32.3-34s-32.3 14.3-32.3 34c0 19.5 14.5 34 32.3 34s32.3-14 32.3-34m.3 59.4v-15.4c-8.8 10.7-21.9 17.3-37.5 17.3-32.6 0-57.3-26.1-57.3-61.3 0-34.9 25.7-61.5 58-61.5 15.2 0 28 6.7 36.8 17.1v-15h29.2v118.8h-29.2zm171.2-26.4c-10.2 0-13.1-3.8-13.1-13.8V386h18.8v-25.9h-18.8v-29h-29.9v29H545v-11.8c0-10 3.8-13.8 14.3-13.8h6.6v-23h-14.4c-24.7 0-36.4 8.1-36.4 32.8v15.9h-16.6V386h16.6v92.9H545V386h38.6v58.2c0 24.2 9.3 34.7 33.5 34.7h15.4v-26.4h-5.9zM734 408.8c-2.1-15.4-14.7-24.7-29.5-24.7-14.7 0-26.9 9-29.9 24.7H734zm-59.7 18.5c2.1 17.6 14.7 27.6 30.7 27.6 12.6 0 22.3-5.9 28-15.4h30.7c-7.1 25.2-29.7 41.3-59.4 41.3-35.9 0-61.1-25.2-61.1-61.1 0-35.9 26.6-61.8 61.8-61.8 35.4 0 61.1 26.1 61.1 61.8 0 2.6-.2 5.2-.7 7.6h-91.1zm282.2-7.8c0-19.2-14.5-34-32.3-34-17.8 0-32.3 14.3-32.3 34 0 19.5 14.5 34 32.3 34 17.8 0 32.3-14.7 32.3-34m-94.1 107.9V360.1h29.2v15.4c8.8-10.9 21.9-17.6 37.5-17.6 32.1 0 57.3 26.4 57.3 61.3s-25.7 61.5-58 61.5c-15 0-27.3-5.9-35.9-15.9v62.5h-30.1zm229.3-107.9c0-20-14.5-34-32.3-34-17.8 0-32.3 14.3-32.3 34 0 19.5 14.5 34 32.3 34 17.8 0 32.3-14 32.3-34m.3 59.4v-15.4c-8.8 10.7-21.9 17.3-37.5 17.3-32.6 0-57.3-26.1-57.3-61.3 0-34.9 25.7-61.5 58-61.5 15.2 0 28 6.7 36.8 17.1v-15h29.2v118.8H1092zM809.7 371.7s7.4-13.8 25.7-13.8c7.8 0 12.8 2.7 12.8 2.7v30.3s-11-6.8-21.1-5.4c-10.1 1.4-16.5 10.6-16.5 23v70.3h-30.2V360.1h29.2v11.6z"></path>
                        </svg>
                    </div>
                    or
                    {/*LOGO*/}
                    <div className="svg-container2">
                        <svg viewBox="0 0 452.9 101.1" xmlns="http://www.w3.org/2000/svg"
                             className="installment-payments_klarnaIcon__nzEEz" focusable="false" role="img"
                             aria-hidden="false"
                             aria-label="klarna">
                            <path
                                d="M79.7 0H57.4c0 18.3-8.4 35-23 46l-8.8 6.6 34.2 46.6h28.1L56.4 56.3C71.3 41.5 79.7 21.5 79.7 0zM0 0h22.8v99.2H0zm94.5 0H116v99.2H94.5zm210.1 28.7c-8.2 0-16 2.5-21.2 9.6v-7.7H263v68.6h20.7v-36c0-10.4 7-15.5 15.4-15.5 9 0 14.2 5.4 14.2 15.4v36.2h20.5V55.6c0-16-12.7-26.9-29.2-26.9zM181 30.6V35c-5.8-4-12.8-6.3-20.4-6.3-20 0-36.2 16.2-36.2 36.2s16.2 36.2 36.2 36.2c7.6 0 14.6-2.3 20.4-6.3v4.4h20.5V30.6H181zm-18.7 51.9c-10.3 0-18.6-7.9-18.6-17.6s8.3-17.6 18.6-17.6 18.6 7.9 18.6 17.6-8.3 17.6-18.6 17.6zm71-43v-8.9h-21v68.6h21.1v-32c0-10.8 11.7-16.6 19.8-16.6h.2v-20c-8.3 0-16 3.6-20.1 8.9zm164.3-8.9V35c-5.8-4-12.8-6.3-20.4-6.3-20 0-36.2 16.2-36.2 36.2s16.2 36.2 36.2 36.2c7.6 0 14.6-2.3 20.4-6.3v4.4h20.5V30.6h-20.5zm-18.7 51.9c-10.3 0-18.6-7.9-18.6-17.6s8.3-17.6 18.6-17.6 18.6 7.9 18.6 17.6c.1 9.7-8.3 17.6-18.6 17.6zM434 32.6c0-1-.7-1.6-1.8-1.6h-1.9v5.2h.9v-1.9h1l.8 1.9h1l-.9-2.1c.6-.3.9-.8.9-1.5zm-1.8.8h-1v-1.6h1c.6 0 .9.3.9.8s-.2.8-.9.8z"></path>
                            <path
                                d="M431.9 28.8c-2.7 0-4.9 2.2-4.9 4.9.1 2.7 2.2 4.9 4.9 4.9s4.9-2.2 4.9-4.9-2.2-4.9-4.9-4.9zm0 8.9c-2.2 0-3.9-1.8-3.9-4s1.8-4 3.9-4c2.2 0 3.9 1.8 3.9 4s-1.8 4-3.9 4zm8.1 37.2c-7.1 0-12.9 5.8-12.9 12.9 0 7.1 5.8 12.9 12.9 12.9 7.1 0 12.9-5.8 12.9-12.9 0-7.2-5.8-12.9-12.9-12.9z"></path>
                        </svg>
                    </div>
                </p>
            </div>
            <div className='heart-review'>
                {/*heart*/}
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <div style={{position: 'relative', top: '3px', margin: '0 3px 0 0'}}>
                        <svg height="21" width="24" viewBox="0 0 24 21" xmlns="http://www.w3.org/2000/svg"
                             className="icon wishlist-icon" focusable="false" role="img" aria-labelledby="icon_:rq:"
                             aria-hidden="false"><title id="icon_:rq:">Add to Wish List</title>
                            <path
                                d="M12 20.75a.72.72 0 0 1-.42-.13c-.32-.21-7.79-5.27-10.24-9.76C-.12 8.18-.45 4.4 2.09 2a6.48 6.48 0 0 1 8.82 0L12 3l1.08-1a6.48 6.48 0 0 1 8.82 0c2.54 2.41 2.21 6.19.75 8.87-2.45 4.49-9.9 9.55-10.22 9.76a.72.72 0 0 1-.43.12zm-5.5-19a4.89 4.89 0 0 0-3.37 1.32c-2 1.87-1.66 4.9-.47 7.07 2 3.59 7.73 7.82 9.34 9 1.6-1.14 7.36-5.36 9.32-8.95 1.28-2.34 1.54-5.68-1-7.49a5.07 5.07 0 0 0-6.32.52l-.88.84 1.45 1.4-.35.36a1 1 0 0 1-1.41 0L9.87 3.07A4.89 4.89 0 0 0 6.5 1.75z"
                                fill="currentColor" fill-rule="evenodd"></path>
                        </svg>
                    </div>
                    <div style={{position: 'relative'}}>
                        <a className='hover-underline' href="#">Add to Wish List</a>
                    </div>


                </div>
                {/*review*/}
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <div style={{position: 'relative', top: '2px', margin: '0 3px 0 0'}}>
                        <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                             className="icon reviews-icon" focusable="false" role="img" aria-labelledby="icon_:rkd:"
                             aria-hidden="false"><title id="icon_:rkd:">Reviews</title>
                            <path
                                d="M22.4 11.4c.4-.4.6-1 .6-1.5s-.2-1-.5-1.4c-.3-.4-.8-.7-1.3-.8L16.4 7c-.2 0-.3-.2-.4-.3l-2.1-4.5C13.5 1.4 12.7 1 12 1c-.8 0-1.5.4-1.9 1.2L8 6.7c-.1.2-.3.3-.4.4l-4.8.7c-.6.1-1 .4-1.3.8-.3.3-.5.8-.5 1.3s.2 1.1.6 1.5L5 14.9c.1.1.2.3.2.5v.1l-.8 4.9v.4c0 1.2 1 2.1 2.1 2.1.3 0 .7-.1 1-.3l4.3-2.3.3-.1.3.1 4.3 2.3c.3.2.7.3 1 .3 1.1 0 2.1-.9 2.1-2.1v-.4l-.8-4.9v-.1c0-.2.1-.4.2-.5l3.2-3.5zm-5.1 4.4.8 4.9v.1c0 .2-.1.3-.2.5-.1.1-.3.2-.4.2-.1 0-.2 0-.3-.1L13 19.1c-.3-.2-.6-.2-1-.2-.3 0-.7.1-1 .2l-4.3 2.3c-.1.1-.2.1-.3.1-.1 0-.3-.1-.4-.2-.1-.1-.2-.3-.2-.5v-.1l.8-4.9v-.4c0-.6-.2-1.1-.6-1.5l-3.5-3.5c-.1-.1-.2-.3-.2-.5s.1-.3.2-.4c.2-.1.4-.2.5-.2l4.8-.7c.7-.2 1.3-.6 1.6-1.2l2.1-4.5c.1-.3.3-.3.5-.3s.4.1.5.3l2.1 4.5c.4.6.9 1 1.6 1.1l4.8.8c.2 0 .3.1.4.2.1.1.1.3.1.4 0 .2-.1.3-.2.5l-3.4 3.5c-.4.4-.6 1-.6 1.5-.1.1 0 .3 0 .4z"
                                fill="currentColor"></path>
                        </svg>
                    </div>
                    <div style={{position: 'relative'}}>
                        <a className='hover-underline' href="#">Reviews</a>
                    </div>

                </div>
            </div>
        </div>
        <div className='wrapper'>
            <div style={{
                position: 'relative',
                top: '-10px',
                left: '-20px'
            }}>
                <svg width="36" height="48" viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg"
                     focusable="false" role="img" aria-hidden="true">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M35.3122 26.7038C35.2782 26.3323 35.2445 25.9768 35.2123 25.6369C35.0758 24.196 34.9659 23.0353 34.9659 22.125C34.9666 21.525 34.5279 21.03 33.9689 21H16.0019C15.4512 21.0414 15.0246 21.5332 15.0259 22.125C15.0259 23.1671 14.8998 24.5375 14.7394 26.2809L14.7006 26.7038C13.9384 32.5629 13.7976 38.4957 14.2808 44.3888C14.2977 44.6153 14.3782 44.831 14.5117 45.0075C14.5956 45.1313 16.7995 48 23.0229 48C23.4894 47.9795 23.8872 47.631 23.9989 47.145L24.9959 42.555L25.9929 47.145C26.1046 47.631 26.5024 47.9795 26.9689 48C32.9453 48 35.1859 45.3545 35.4566 45.0349C35.4678 45.0216 35.4756 45.0124 35.4802 45.0075C35.6137 44.831 35.6941 44.6153 35.711 44.3888C36.2012 38.4965 36.0674 32.5637 35.3122 26.7038ZM33.0246 23.2498C33.0246 23.7474 33.0777 24.2957 33.1352 24.8898C33.1544 25.0881 33.1741 25.2914 33.1925 25.4998H16.7997C16.8732 24.6673 16.9361 23.9135 16.9781 23.2498H33.0246ZM27.7452 45.7274C31.4393 45.5699 33.1919 44.2761 33.7482 43.7586C33.9358 41.398 34.0093 39.0286 33.9685 36.6599C31.8696 36.2661 29.0255 34.5899 29.0255 29.9999H29.7182C30.4585 29.9755 31.1105 30.5186 31.2714 31.2936C31.5191 32.7834 32.565 33.9752 33.9371 34.3311C33.833 32.1215 33.6438 30.2041 33.4616 28.3568C33.4415 28.1537 33.4216 27.9515 33.4018 27.7499H16.6102C16.5815 28.0494 16.5524 28.3482 16.5232 28.6477C16.3496 30.4289 16.1738 32.2316 16.075 34.3311C17.4511 33.9791 18.5019 32.7865 18.7512 31.2936C18.9097 30.5313 19.5443 29.9918 20.2729 29.9999H20.9341C21.1885 33.2763 19.0251 36.2011 15.991 36.6824C15.9701 38.7299 16.0225 41.0474 16.2429 43.7924C16.7886 44.2874 18.5413 45.5924 22.2459 45.7499L24.0195 37.5486C24.1159 37.0531 24.5233 36.698 24.9955 36.698C25.4677 36.698 25.8752 37.0531 25.9715 37.5486L27.7452 45.7274Z"
                          fill="black"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M28.8737 7.11556C25.0615 1.81663 19.9707 0.665755 19.6512 0.59351L19.6422 0.591482C16.291 -0.197161 12.7588 -0.197161 9.4076 0.591482L9.3987 0.593511C9.0791 0.665757 3.98832 1.81663 0.176201 7.11556C-0.0212185 7.3852 -0.0548784 7.72158 0.0860216 8.01679L2.53196 13.0519C2.65969 13.3189 2.91667 13.5233 3.23406 13.6102C3.55145 13.6971 3.89681 13.6577 4.1776 13.5025L6.0374 12.4739V22.8968C6.0342 23.2333 6.23 23.5477 6.5559 23.7294C7.9695 24.4911 9.4989 25.0651 11.0934 25.4373C12.0897 25.5704 12.6535 25.4941 13.0202 25.2441C13.329 25.0336 13.5798 24.6425 13.7828 23.9028C11.8503 23.7175 9.9802 23.1858 8.292 22.3387V7.87013H7.7285C6.7947 7.87013 6.0377 8.52799 6.0377 9.33951V10.1428L4.0201 11.2595L2.32938 7.77217C3.90335 5.69322 6.1071 4.03222 8.6978 2.97217C9.4832 5.18015 11.8322 6.68584 14.4914 6.68584C17.1506 6.68584 19.4996 5.18015 20.285 2.97217C22.8829 4.04563 25.0874 5.72414 26.6535 7.82115L24.9627 11.2203L22.9451 10.1428V9.33951C22.9451 8.52799 22.1881 7.87013 21.2544 7.87013H20.6908V22.3387C20.1704 22.5998 19.6327 22.831 19.0812 23.0313L19.8346 23.0008L19.919 23.001L22.8248 23.129C22.8452 23.0538 22.8554 22.9759 22.8546 22.8968V12.4739L24.7821 13.5417C25.0629 13.6969 25.4082 13.7363 25.7256 13.6494C26.043 13.5625 26.3 13.3581 26.4277 13.0911L28.8737 8.05597C29.0421 7.7734 29.0421 7.43732 28.8737 7.15475V7.11556ZM18.1215 2.29618L18.1082 2.33279C15.7236 1.87181 13.2532 1.85931 10.8626 2.29618C11.3541 3.67978 12.8258 4.62346 14.492 4.62346C16.1435 4.62346 17.6038 3.6964 18.1082 2.33279L18.1215 2.33537V2.29618Z"
                          fill="black"></path>
                </svg>
            </div>
            <div className='move-to-right' style={{


            }}>
                <div className='text'>Outfit Inspiration</div>
                <div className='arrow-to-right'>
                    <svg height="16" width="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
                         className="icon-3hx2f" focusable="false" role="img" aria-hidden="true">
                        <path
                            d="m10.53 2.47 5 5a.75.75 0 0 1 .01 1.04l-5 5-.35-.35a1 1 0 0 1 0-1.42l3-3H5a1 1 0 0 1-1-1v-.5h9.18l-3-3a1 1 0 0 1 0-1.42l.35-.35ZM2 7.25a1 1 0 0 1 1 1v.5H1a1 1 0 0 1-1-1v-.5Z"
                            fill="currentColor" fill-rule="evenodd"></path>
                    </svg>
                </div>
            </div>

        </div>
        <div className='detail'>
            <h3>Details</h3>
            {featureTitles.map((item, index) =>
                <div key={index}
                     className='details-line'
                     style={{
                         position: 'relative',
                         display: 'flex',
                         flexDirection: "row",
                     }}>
                    <img style={{width: '24px', height: '24px', margin: '0 5px'}} src={item.iconPath} alt=""/>
                    <div key={index}
                         className='hover-underline'
                    >{item.title}</div>
                </div>)}
        </div>
        <div className='question'>

        </div>
    </div>
}
export default ProductInfo
