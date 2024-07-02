import '../assets/css/Checkout.scss'
import contact from '../assets/images/screenshots/contact-information.png'
import notLogin from '../assets/images/screenshots/login.png'
import shippingNotLogin from '../assets/images/screenshots/shipping-address.png'
import shippingAfterLogin from '../assets/images/screenshots/shipping-address-after-login.png'
import {ContactInformation} from "../components/ContactInformation";

export const Checkout = ()=> {
    return (
        <div className="checkout-fluid-container">
            <div className="header">
                <h1>Checkout</h1>
            </div>
            <div className="main">
                <div className="col-1">
                    <ContactInformation/>
                    <div className="no-login-block">
                        <font color='red'> Only display when user not logged in</font>
                        <img src={notLogin} width='500px' alt=""/>
                    </div>
                    <div className="shipping-block">
                        <div className="shipping-no-login">
                            <font color='red'>Display when user not logged in</font>
                            <img src={shippingNotLogin} width='500px' alt=""/>
                        </div>
                        <div className="shipping-login">
                            <font color='red'>Display when user logged in</font>
                            <img src={shippingAfterLogin} width='500px' alt=""/>
                        </div>
                    </div>
                </div>

                <div className='col-2'>
                    <div className="order-summary">
                        &lt;OrderSummaryComponent/&gt;
                    </div>
                </div>
            </div>
        </div>
    )
}