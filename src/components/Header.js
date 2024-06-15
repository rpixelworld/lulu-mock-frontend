import '../assets/css/Header.scss'
import {useEffect, useRef, useState} from "react";
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import {ChildMenus} from "./ChildMenus";
import Constants from "../Constants";

export const Header = () => {

    const menubarWapper = useRef();
    const [hoverMenu, setHoverMenu] = useState(0)
    const [menuList, setMenuList] = useState([])
    const timeoutRef = useRef(null);

    const navAnimation = (obj) => {
        // console.log(obj, obj.className)
        obj.className = obj.className.replace('fixed', '');

        let topDistance;
        // Check fixed nav contains any element before get the topDistance
        if (obj.childNodes) {
            topDistance = window.scrollY + obj.getBoundingClientRect().top;
        }
        let scrollTop = window.scrollY;
        if ((topDistance) > scrollTop) {
            obj.className = obj.className.replace('fixed', '');
        }

        if ((topDistance) < scrollTop) {
            obj.className = obj.className + ' fixed'
        }
    }
    window.onload = () => {
        navAnimation(menubarWapper.current);
    };

    window.onresize = () => {
        navAnimation(menubarWapper.current);
    };

    window.onscroll = () => {
        navAnimation(menubarWapper.current);
    };

    const handleHoverMenu = (parent) => {
        if (timeoutRef.current) {clearTimeout(timeoutRef.current);}
        setHoverMenu(parent)
    }
    const handleUnhoverMenu = () => {timeoutRef.current = setTimeout(()=>{
        setHoverMenu(0)} ,300)}

    useEffect(() => {
        // fetch('http://'+ location.host + `/data/menu.json`)
        fetch(Constants.LOCAL_BASE_URL+ `/data/menu.json`)
            .then(resp => resp.json())
            .then(res => {
                setMenuList(res.menus)
            })
    }, []);


    return (
        <header>
            <div className='header-menu'>
                <div className='menu-item'>
                    <PinDropOutlinedIcon sx={{paddingTop: '4px'}}/>
                    <a href="#">Store Locator</a>
                </div>
                <div className='menu-item'>
                    <CardGiftcardOutlinedIcon sx={{paddingTop: '4px'}}/>
                    <a href="#">Gift Cards</a>
                </div>
                <div className='menu-item'>
                    <HelpOutlineOutlinedIcon sx={{paddingTop: '4px'}}/>
                    <a href="#">Get Help</a>
                </div>
                <div className='menu-item'>
                    <LanguageOutlinedIcon sx={{paddingTop: '4px'}}/>
                    <a href="#">USA</a>
                </div>
            </div>
            <div className="header-menubar-holder">
                <div ref={menubarWapper} className="header-menubar-wrapper">
                    <div className="header-menubar">
                        <div>
                            <img className='logo'
                                 src="https://upload.wikimedia.org/wikipedia/commons/2/22/Lululemon_Athletica_logo.svg"
                                 alt="logo"/>
                        </div>

                        <ul>
                            {menuList.filter(menu => menu.parent == 0).map(rootMenu => {
                                return <r key={rootMenu.id}>
                                    <li onMouseEnter={() => {
                                        handleHoverMenu(rootMenu.id)
                                    }}
                                        onMouseLeave={handleUnhoverMenu} className={rootMenu.isSpecial?'special':''}> {rootMenu.name}
                                    </li>
                                    <ChildMenus handleMouseEnter={() => {
                                        handleHoverMenu(rootMenu.id)
                                    }}
                                                handleMouseLeave={handleUnhoverMenu}
                                                parent={rootMenu.id}
                                                display={hoverMenu === rootMenu.id}
                                                title={rootMenu.name}
                                                submenus={menuList.filter(menu => menu.rootMenu == rootMenu.id)}
                                                advertisement={rootMenu.adv}
                                                activities={rootMenu.activity}/>
                                </r>
                            })}
                        </ul>
                    </div>
                    <div className="header-input">
                        <div className="header-input-icon1"><SearchOutlinedIcon/></div>
                        <input type="text" placeholder={'Search'}/>
                        <div className="header-input-icon2"><AccountCircleOutlinedIcon/>
                            <a href="#">Sign In</a></div>
                        <div className="header-input-icon3"><FavoriteBorderOutlinedIcon/></div>
                        <div className="header-input-icon4"><ShoppingBagOutlinedIcon/></div>
                    </div>
                </div>
            </div>
        </header>
    )

}








