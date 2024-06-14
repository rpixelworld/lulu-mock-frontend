import '../assets/css/Banner.scss'
import {useRef} from "react";
import {Link} from "react-router-dom";

export const Banner = ()=> {

    const anchorRefs = useRef([])

    const handleSwipeClick = (index) => {
        anchorRefs.current[index].className += ' selected'
        for(let i=0; i<4; i++) {
            if(i!==index){
                anchorRefs.current[i].className = anchorRefs.current[i].className.replace('selected', '')
            }
        }
    }

    return (
        <div className="banner-container">
            <div className="banner">
                <p className="banner-text">
                    Goes so easy together.
                </p>
            </div>
            <div className="swipe-container">
                <ul className="swipe-wrapper">
                    <li onClick={() => {
                        handleSwipeClick(0)
                    }}>
                        <Link to='/' className='selected'
                           ref={(element) => {
                               anchorRefs.current.push(element)
                           }}>All What's New</Link>
                    </li>
                    <li onClick={() => {
                        handleSwipeClick(1)
                    }}>
                        <Link to='/whatsnew/Gender/1' ref={(element) => {
                            anchorRefs.current.push(element)
                        }} >Women's What's New</Link>
                    </li>
                    <li onClick={() => {
                        handleSwipeClick(2)
                    }}>
                        <Link to='/whatsnew/Gender/0' ref={(element) => {
                            anchorRefs.current.push(element)
                        }}>Men's What's New</Link>
                    </li>
                    <li onClick={() => {
                        handleSwipeClick(3)
                    }}>
                        <a ref={(element) => {
                            anchorRefs.current.push(element)
                        }} href="#">Accessories What's New</a></li>
                </ul>
            </div>
        </div>
    )
}