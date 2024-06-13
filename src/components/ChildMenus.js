import '../assets/css/ChildMenus.scss'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';

export const ChildMenus = ({handleMouseEnter, handleMouseLeave, display, title, submenus, advertisement, activities})=> {
    if(display) {
        let featureMenus =submenus.filter(menu => menu.isSubFeature==true)
        let catagories = submenus.filter(menu => menu.isSubRoot==true)

        return (
            <div className="childmenus-container"
                 onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {/*{title}*/}
                <div className="childmenus-wrapper">
                    <div className='child-menus'>
                        {featureMenus && featureMenus.length > 0 && (
                            <div className="feature-menus">
                                {featureMenus.map(fmenu => <a key={fmenu.id} href={fmenu.url}><span>{fmenu.name}</span></a>)}
                            </div>)}
                        {catagories.map(catagory => {
                            let catagoryMenus = submenus.filter(menu => menu.parent == catagory.id)
                            let menuClass = catagoryMenus.length > 10 ? 'catagory-submenus two-column' : 'catagory-submenus one-column'
                            return <>
                                <div className='catagory-menus'>
                                    <div className='catagory-title'>{catagory.name}&nbsp;&nbsp;
                                        <div className="mui-icon"><ArrowForwardOutlinedIcon/></div>
                                    </div>
                                    <div className={menuClass}>
                                        {catagoryMenus.map(catMenu => <a href={catMenu.url}><span>{catMenu.name}</span></a>)}
                                    </div>
                                </div>
                            </>
                        })}
                    </div>
                    <div className='child-advertisement'>
                        <div className='image-style'><img
                            src={advertisement.picture}/></div>
                        <div className='adv-title'>{advertisement.title}</div>
                        <div className='adv-desc'>{advertisement.description}</div>
                        <div className='link'>{advertisement.link.text} &nbsp;&nbsp;
                            <div className="mui-icon"><ArrowForwardOutlinedIcon/></div>
                        </div>
                    </div>
                </div>
                {activities && activities.length>0 && (
                <div className="activity-container">
                    <div className='activity'>
                        <div className='title'>ACTIVITY</div>
                        <div className='activity-items'>
                            {activities.map((act,i) => <a key={i} href={act.url}><span>{act.text}</span></a>)}
                        </div>
                        <div className='shop-link'>SHOP ALL {title} &nbsp;&nbsp;
                            <div className="mui-icon"><ArrowForwardOutlinedIcon/></div>
                        </div>
                    </div>
                </div>)}


            </div>
        )
    }
    return <></>
}