import '../assets/css/Checkout.scss'
import shippingNotLogin from '../assets/images/screenshots/shipping-address.png'
import shippingAfterLogin from '../assets/images/screenshots/shipping-address-after-login.png';
import {NewShippingAddress} from "../components/NewShippingAddress";
import OrderSummary from "../components/OrderSummary";
import {ContactInformation} from "../components/ContactInformation";
import {AskForLogin} from "../components/AskForLogin";
import {useSelector} from "react-redux";
import {ShippingAddress} from "../components/ShippingAddress";

export const Checkout = ()=> {

    const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn)

    const navigate = useNavigate()

    return (
        <div className="checkout-fluid-container">
            <div className="header">
                <h1>Checkout</h1>
            </div>
            <div className="main">
                <div className="col-1">
                    <ContactInformation/>
                    {!isLoggedIn && <AskForLogin />}

                    {isLoggedIn && <ShippingAddress />}
                    {/*<div className="shipping-block">*/}
                    {/*    <div className="shipping-no-login">*/}
                    {/*        <font color='red'>Display when user not logged in</font>*/}
                    {/*        <img src={shippingNotLogin} width='500px' alt=""/>*/}
                    {/*    </div>*/}
                    {/*    <div className="shipping-login">*/}
                    {/*        <font color='red'>Display when user logged in</font>*/}
                    {/*        <img src={shippingAfterLogin} width='500px' alt=""/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>

                <div className='col-2'>
                    <div className="order-summary">
                        <OrderSummary />
                    </div>
                </div>
            </div>
        </div>
    )
}