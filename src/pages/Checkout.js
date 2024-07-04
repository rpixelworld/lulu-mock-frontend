import '../assets/css/Checkout.scss'
import shippingNotLogin from '../assets/images/screenshots/shipping-address.png'
import shippingAfterLogin from '../assets/images/screenshots/shipping-address-after-login.png';
import {NewShippingAddress} from "../components/NewShippingAddress";
import OrderSummary from "../components/OrderSummary";
import {ContactInformation} from "../components/ContactInformation";
import {AskForLogin} from "../components/AskForLogin";
import {useSelector} from "react-redux";
import {ShippingAddress} from "../components/ShippingAddress";
import {GiftOptions} from "../components/GiftOptions";
import {useEffect, useRef, useState} from "react";
import {Alert} from "@mui/material";

export const Checkout = ()=> {

    const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn)
    const contactRef = useRef();
    const shippingRef = useRef();
    const giftOptionRef = useRef();
    const [validCheckout, setValidCheckout] = useState(true)

    const handlePlaceOrder = () => {
        console.log('contact information got from contactInformation: ', contactRef.current.getContact())
        console.log('shipping: ', shippingRef.current.getShippingAddress())
        console.log('delivery==>', giftOptionRef.current.getDeliveryOption())
        console.log('gift==>', giftOptionRef.current.getGiftOption())
        console.log('contact infomation valid=', contactRef.current.isValid(), 'shipping valid=', shippingRef.current.isValid(), 'gift valid=', giftOptionRef.current.isValid())

        if(!contactRef.current.isValid() || !shippingRef.current.isValid() || !giftOptionRef.current.isValid()){
            setValidCheckout(false)
        }
        else {
            setValidCheckout(true)
        }
    }

    const navigate = useNavigate()

    return (
        <div className="checkout-fluid-container">
            <div className="header">
                <h1>Checkout</h1>
            </div>
            <div className="main">
                <div className="col-1">

                    <ContactInformation ref={contactRef}/>
                    {!isLoggedIn && <AskForLogin />}
                    {isLoggedIn && <ShippingAddress ref={shippingRef}/>}
                    {isLoggedIn && <GiftOptions ref={giftOptionRef}/>}
                    {!validCheckout && <Alert className='alert' severity="error">Please correct the information you provided.</Alert>}
                    <div className="next-step">
                        <button className='next-step-button'
                                onClick={handlePlaceOrder} disabled={!isLoggedIn}
                                >go to next step</button>
                    </div>
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