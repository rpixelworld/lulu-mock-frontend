import '../assets/css/WhatsNew.scss'
import {Filter} from "../components/Filter";

export const WhatsNew = ()=> {
    return <div className="fluid-container" style={{height:'1000px'}}>
        <Filter />
        <div className="main-container">
            <div className="banner-container">
                <p className="banner-text">
                    Goes so easy together.
                </p>

            </div>
        </div>
    </div>
}