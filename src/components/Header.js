import {useRef} from "react";

export const Header = ()=> {

    const menubarWapper = useRef();
    const navAnimation = (obj)=> {
        // console.log(obj, obj.className)
        obj.className = obj.className.replace('fixed', '');

        let topDistance;
        // Check fixed nav contains any element before get the topDistance
        if (obj.childNodes) {

            //console.log('has child');
            topDistance = window.scrollY + obj.getBoundingClientRect().top;
            // console.log('topDistance', topDistance)
            //console.log(topDistance);

        }
        let scrollTop = window.scrollY;
        //console.log(scrollTop);
        if ( (topDistance) > scrollTop ) {
            obj.className = obj.className.replace('fixed', '');
            // document.body.classList.remove('sticky-page-nav');
            //console.log('not sticky');
        }

        if ( (topDistance) < scrollTop ) {
            obj.className = obj.className + ' fixed'
            // document.body.classList.add('sticky-page-nav');
            // console.log('sticky');
        }
    }
    window.onload = ()=> {
        // console.log(menubarWapper)
        navAnimation(menubarWapper.current);
    };

    window.onresize = ()=> {
        navAnimation(menubarWapper.current);
        // console.log(menubarWapper)
    };

    window.onscroll = ()=> {
        navAnimation(menubarWapper.current);
    };



    return (
        <header>
            <div className='header-topbar'></div>
            <div className="header-menubar-holder">
                <div ref={menubarWapper} className="header-menubar-wrapper">
                    {/*<h2>Menu bar</h2>*/}
                </div>
            </div>

        </header>
    )

}