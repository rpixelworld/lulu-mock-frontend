import '../assets/css/AddToBag.scss';
import React, {useEffect, useState} from "react";

import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';

export const AddToBag = ({onClose}) => {
    const [currentColor, setCurrentColor] = useState('pink'); // Initial color state
    const [isHovered, setIsHovered] = useState(false);


    const images = {
        pink: {
            front: 'https://images.lululemon.com/is/image/lululemon/LW2AR7S_064631_1?wid=1600&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
            back: 'https://images.lululemon.com/is/image/lululemon/LW2AR7S_064631_2?wid=1600&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72'
        },
        red:{
            front:'https://images.lululemon.com/is/image/lululemon/LW2731S_064717_1?wid=1600&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
            back:'https://images.lululemon.com/is/image/lululemon/LW2731S_064717_2?wid=1600&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72'
        },
        black:{
            front:'https://images.lululemon.com/is/image/lululemon/LW2CM0S_065780_1?wid=1600&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
            back: 'https://images.lululemon.com/is/image/lululemon/LW2CM0S_065780_2?wid=1600&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72'
        },
        blue:{
            front:'https://images.lululemon.com/is/image/lululemon/LW2AR7S_065551_1?wid=1600&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
            back:'https://images.lululemon.com/is/image/lululemon/LW2AR7S_065551_2?wid=1600&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72'
        },
        white:{
            front:'https://images.lululemon.com/is/image/lululemon/LW2731S_0002_1?wid=1600&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
            back:'https://images.lululemon.com/is/image/lululemon/LW2731S_0002_2?wid=1600&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72'
        },
            };
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    const handleColorHover = (color) => {
        setCurrentColor(color);
    };



    return <div className="addtobag-overlay">
        <div className="addtobag-container">
            {/*<p>1.You've Got Great Taste</p>*/}
            {/*<p>2.Nice Pick!</p>*/}
            {/*<p>3.Expect Compliments</p>*/}
            {/*<p>4.We Love It Too</p>*/}
            <div className="first-row">
                <div className="add-to-your-bag">Added To Your Bag</div>
                <ShoppingBagOutlinedIcon className="bag-icon"/>
                <div className="bag-item">5 Items</div>
                <div className="close-icon"><CloseOutlinedIcon onClick={onClose}/>
                </div>
            </div>

            <div className="line"></div>

            <div className="second-row">
                <div><img
                    src="https://images.lululemon.com/is/image/lululemon/LW1CN3S_066320_1?$add_to_bag$&wid=320&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72"
                    alt=""/></div>
                <div className="second-col">
                    <div className="name">Swiftly Tech Racerback Tank Top
                        <br/>2.0 Waist Length
                    </div>
                    <div className="size">Size: 8</div>
                    <div className="money">$58.00 USD</div>
                </div>
                <div className="vertical-line"></div>
                <div className="third-col">
                    <div className="money">
                        <h3>Subtotal</h3>
                        <p>$406.00 USD</p>
                    </div>
                    <div>
                        <button>VIEW BAG & CHECKOUT</button>
                    </div>
                    <div className="continue">
                        <div className="continue-shopping">CONTINUE SHOPPING</div>
                        <div className="continue-icon"><EastOutlinedIcon/></div>
                    </div>
                </div>
            </div>
            <div className="third-row">
                <div className="name">Goes well with</div>
                <div className="carousel">
                    <div>
                        <div className="shirt-image" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <img src={isHovered ? images[currentColor].back : images[currentColor].front}
                                 alt={`${currentColor} ${isHovered ? 'back' : 'front'}`}/>
                            {isHovered && (
                                <div className="color-palette">
                                    <button onMouseEnter={() => handleColorHover('pink')}
                                            style={{backgroundColor: 'pink'}}></button>
                                    <button onMouseEnter={() => handleColorHover('red')}
                                            style={{backgroundColor: 'red'}}></button>
                                    <button onMouseEnter={() => handleColorHover('black')}
                                            style={{backgroundColor: 'black'}}></button>
                                    <button onMouseEnter={() => handleColorHover('blue')}
                                            style={{backgroundColor: 'blue'}}></button>
                                    <button onMouseEnter={() => handleColorHover('white')}
                                            style={{backgroundColor: 'white'}}></button>
                                </div>
                            )}
                        </div>
                        <div className='title'>Free to Be Bra-Wild
                            <br/>Medium Support
                        </div>
                        <div>$52 USD</div>
                    </div>
                    <div>
                        <div className="shirt-image" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <img src={isHovered ? images[currentColor].back : images[currentColor].front}
                                 alt={`${currentColor} ${isHovered ? 'back' : 'front'}`}/>
                            {isHovered && (
                                <div className="color-palette">
                                    <button onMouseEnter={() => handleColorHover('pink')}
                                            style={{backgroundColor: 'pink'}}></button>
                                    <button onMouseEnter={() => handleColorHover('red')}
                                            style={{backgroundColor: 'red'}}></button>
                                    <button onMouseEnter={() => handleColorHover('black')}
                                            style={{backgroundColor: 'black'}}></button>
                                    <button onMouseEnter={() => handleColorHover('blue')}
                                            style={{backgroundColor: 'blue'}}></button>
                                    <button onMouseEnter={() => handleColorHover('white')}
                                            style={{backgroundColor: 'white'}}></button>
                                </div>
                            )}
                        </div>
                        <div className='title'>Free to Be Bra-Wild
                            <br/>Medium Support
                        </div>
                        <div>$52 USD</div>
                    </div>
                    <div>
                        <div className="shirt-image" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <img src={isHovered ? images[currentColor].back : images[currentColor].front}
                                 alt={`${currentColor} ${isHovered ? 'back' : 'front'}`}/>
                            {isHovered && (
                                <div className="color-palette">
                                    <button onMouseEnter={() => handleColorHover('pink')}
                                            style={{backgroundColor: 'pink'}}></button>
                                    <button onMouseEnter={() => handleColorHover('red')}
                                            style={{backgroundColor: 'red'}}></button>
                                    <button onMouseEnter={() => handleColorHover('black')}
                                            style={{backgroundColor: 'black'}}></button>
                                    <button onMouseEnter={() => handleColorHover('blue')}
                                            style={{backgroundColor: 'blue'}}></button>
                                    <button onMouseEnter={() => handleColorHover('white')}
                                            style={{backgroundColor: 'white'}}></button>
                                </div>
                            )}
                        </div>
                        <div className='title'>Free to Be Bra-Wild
                            <br/>Medium Support
                        </div>
                        <div>$52 USD</div>
                    </div>
                    <div>
                        <div className="shirt-image" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <img src={isHovered ? images[currentColor].back : images[currentColor].front}
                                 alt={`${currentColor} ${isHovered ? 'back' : 'front'}`}/>
                            {isHovered && (
                                <div className="color-palette">
                                    <button onMouseEnter={() => handleColorHover('pink')}
                                            style={{backgroundColor: 'pink'}}></button>
                                    <button onMouseEnter={() => handleColorHover('red')}
                                            style={{backgroundColor: 'red'}}></button>
                                    <button onMouseEnter={() => handleColorHover('black')}
                                            style={{backgroundColor: 'black'}}></button>
                                    <button onMouseEnter={() => handleColorHover('blue')}
                                            style={{backgroundColor: 'blue'}}></button>
                                    <button onMouseEnter={() => handleColorHover('white')}
                                            style={{backgroundColor: 'white'}}></button>
                                </div>
                            )}
                        </div>
                        <div className='title'>Free to Be Bra-Wild
                            <br/>Medium Support
                        </div>
                        <div>$52 USD</div>
                    </div>

                </div>
            </div>
        </div>
    </div>
}