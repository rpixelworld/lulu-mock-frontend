import '../assets/css/WhatsNew.scss'
import {Filter} from "../components/Filter";
import {Banner} from "../components/Banner";

export const WhatsNew = ()=> {

    return <div className="fluid-container" style={{height:'1000px'}}>
        <Filter />
        <div className="main-container">
            <Banner />
        </div>
    </div>
}