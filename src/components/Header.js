import '../assets/css/Header.scss'
import {useEffect, useRef, useState} from "react";
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import {ChildMenus} from "./ChildMenus";

export const Header = ()=> {

    const menubarWapper = useRef();
    const [hoverMenu, setHoverMenu] = useState(0)
    const [menuList, setMenuList] = useState([])

    const navAnimation = (obj)=> {
        // console.log(obj, obj.className)
        obj.className = obj.className.replace('fixed', '');

        let topDistance;
        // Check fixed nav contains any element before get the topDistance
        if (obj.childNodes) {
            topDistance = window.scrollY + obj.getBoundingClientRect().top;
        }
        let scrollTop = window.scrollY;
        if ( (topDistance) > scrollTop ) {
            obj.className = obj.className.replace('fixed', '');
        }

        if ( (topDistance) < scrollTop ) {
            obj.className = obj.className + ' fixed'
        }
    }
    window.onload = ()=> {
        navAnimation(menubarWapper.current);
    };

    window.onresize = ()=> {
        navAnimation(menubarWapper.current);
    };

    window.onscroll = ()=> {
        navAnimation(menubarWapper.current);
    };

    const handleHoverMenu = (parent)=> {
        setHoverMenu(parent)
    }
    const handleUnhoverMenu = ()=> {
        setHoverMenu(0)
    }

    useEffect(() => {
        fetch('./data/menu.json')
            .then(resp => resp.json())
            .then(res => {
                setMenuList(res.menus)
            })
    }, []);


    return (
        <header>
            <div className='header-menu'>
                <div className='menu-item'>
                    <PinDropOutlinedIcon sx={{paddingTop:'4px'}}/>
                    <a href="#">Store Locator</a>
                </div>
                <div className='menu-item'>
                    <CardGiftcardOutlinedIcon sx={{paddingTop:'4px'}}/>
                    <a href="#">Gift Cards</a>
                </div>
                <div className='menu-item'>
                    <HelpOutlineOutlinedIcon sx={{paddingTop:'4px'}}/>
                    <a href="#">Get Help</a>
                </div>
                <div className='menu-item'>
                    <LanguageOutlinedIcon sx={{paddingTop:'4px'}}/>
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
                            {menuList.filter(menu=>menu.parent==0).map(rootMenu=> {
                                return <r key={rootMenu.id}>
                                    <li onMouseEnter={() => {handleHoverMenu(rootMenu.id)}}
                                        onMouseLeave={handleUnhoverMenu}> {rootMenu.name}
                                    </li>
                                    <ChildMenus handleMouseEnter={() => {handleHoverMenu(rootMenu.id) }}
                                        handleMouseLeave={handleUnhoverMenu}
                                        parent={rootMenu.id}
                                        display={hoverMenu === rootMenu.id}
                                        title={rootMenu.name}
                                        submenus={menuList.filter(menu=>menu.rootMenu==rootMenu.id)}
                                        advertisement={rootMenu.adv}
                                        activities={rootMenu.activity}/>
                                </r>
                            })}
                            {/*<li*/}
                            {/*    onMouseEnter={() => {*/}
                            {/*        handleHoverMenu(1000)*/}
                            {/*    }}*/}
                            {/*    onMouseLeave={handleUnhoverMenu}>women*/}
                            {/*</li>*/}
                            {/*<ChildMenus*/}
                            {/*    handleMouseEnter={() => {*/}
                            {/*        handleHoverMenu(1000)*/}
                            {/*    }}*/}
                            {/*    handleMouseLeave={handleUnhoverMenu}*/}
                            {/*    parent={1000}*/}
                            {/*    display={hoverMenu === 1000}*/}
                            {/*    title='women'/>*/}

                            {/*<li onMouseEnter={() => {*/}
                            {/*    handleHoverMenu(1001)*/}
                            {/*}}*/}
                            {/*    onMouseLeave={handleUnhoverMenu}>men*/}
                            {/*</li>*/}
                            {/*<ChildMenus*/}
                            {/*    handleMouseEnter={() => {*/}
                            {/*        handleHoverMenu(10001)*/}
                            {/*    }}*/}
                            {/*    handleMouseLeave={handleUnhoverMenu}*/}
                            {/*    parent={1001} display={hoverMenu === 1001} title='MEN'/>*/}

                            {/*<li onMouseEnter={() => {*/}
                            {/*    handleHoverMenu(1002)*/}
                            {/*}}*/}
                            {/*    onMouseLeave={handleUnhoverMenu}>accessories*/}
                            {/*</li>*/}
                            {/*<ChildMenus*/}
                            {/*    handleMouseEnter={() => {*/}
                            {/*        handleHoverMenu(1002)*/}
                            {/*    }}*/}
                            {/*    handleMouseLeave={handleUnhoverMenu}*/}
                            {/*    parent={1002} display={hoverMenu === 1002} title='accessories'/>*/}

                            {/*<li onMouseEnter={() => {*/}
                            {/*    handleHoverMenu(1003)*/}
                            {/*}}*/}
                            {/*    onMouseLeave={handleUnhoverMenu}>shoes*/}
                            {/*</li>*/}
                            {/*<ChildMenus*/}
                            {/*    handleMouseEnter={() => {*/}
                            {/*        handleHoverMenu(1003)*/}
                            {/*    }}*/}
                            {/*    handleMouseLeave={handleUnhoverMenu}*/}
                            {/*    parent={1003} display={hoverMenu === 1003} title='shoes'/>*/}

                            {/*<li onMouseEnter={() => {*/}
                            {/*    handleHoverMenu(1004)*/}
                            {/*}}*/}
                            {/*    onMouseLeave={handleUnhoverMenu}>father's day*/}
                            {/*</li>*/}
                            {/*<ChildMenus*/}
                            {/*    handleMouseEnter={() => {*/}
                            {/*        handleHoverMenu(1004)*/}
                            {/*    }}*/}
                            {/*    handleMouseLeave={handleUnhoverMenu}*/}
                            {/*    parent={1004} display={hoverMenu === 1004} title="father's day"/>*/}
                        </ul>
                    </div>


                    {/*<div className='header-bar-fetch'>*/}
                    {/*    <div className="header-bar-fetch-item">*/}
                    {/*        <a href="#">women</a>*/}
                    {/*    </div>*/}
                    {/*    <div className="header-bar-fetch-item">*/}
                    {/*        <a href="#">men</a>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>

        </header>
    )

}