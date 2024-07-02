import '../assets/css/Checkout.scss'
import shippingNotLogin from '../assets/images/screenshots/shipping-address.png'
import shippingAfterLogin from '../assets/images/screenshots/shipping-address-after-login.png';
import {CheckoutThree} from "../components/CheckoutThree";
import OrderSummary from "../components/OrderSummary";
import {ContactInformation} from "../components/ContactInformation";
import {AskForLogin} from "../components/AskForLogin";
import {useSelector} from "react-redux";

export const Checkout = ()=> {

    const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn)

    return (
        <div className="checkout-fluid-container">
            <div className="header">
                <h1>Checkout</h1>
            </div>
            <div className="main">
                <div className="col-1">
                    <ContactInformation/>
                    {!isLoggedIn && <AskForLogin />}
                    <CheckoutThree/>
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