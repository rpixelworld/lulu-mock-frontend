import '../assets/css/Checkout.scss'
import shippingNotLogin from '../assets/images/screenshots/shipping-address.png'
import shippingAfterLogin from '../assets/images/screenshots/shipping-address-after-login.png';
import {NewShippingAddress} from "../components/NewShippingAddress";
import OrderSummary from "../components/OrderSummary";
import {ContactInformation} from "../components/ContactInformation";
import {AskForLogin} from "../components/AskForLogin";
import {useDispatch, useSelector} from "react-redux";
import {ShippingAddress} from "../components/ShippingAddress";
import {GiftOptions} from "../components/GiftOptions";
import {useEffect, useRef, useState} from "react";
import {Alert, Snackbar} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {dispatchOrderInfo} from "../redux/actions/shoppingAction";

export const Checkout = ()=> {

    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn)

    const navigate = useNavigate()
    const timeoutRef = useRef(null)
    const contactRef = useRef();
    const shippingRef = useRef();
    const giftOptionRef = useRef();
    const [validCheckout, setValidCheckout] = useState(true)
    const [openAlert, setOpenAlert] = useState(false)

    const handlePlaceOrder = () => {
        // console.log('contact information got from contactInformation: ', contactRef.current.getContact())
        // console.log('shipping: ', shippingRef.current.getShippingAddress())
        // console.log('delivery==>', giftOptionRef.current.getDeliveryOption())
        // console.log('gift==>', giftOptionRef.current.getGiftOption())
        console.log('contact infomation valid=', contactRef.current.isValid(), 'shipping valid=', shippingRef.current.isValid(), 'gift valid=', giftOptionRef.current.isValid())

        if(!contactRef.current.isValid() || !shippingRef.current.isValid() || !giftOptionRef.current.isValid()){
            setValidCheckout(false)
            setOpenAlert(true)
        }
        else {
            setValidCheckout(true)
            const orderInfo = {
                notification: contactRef.current.getContact(),
                shipping: shippingRef.current.getShippingAddress(),
                deliveryOption: giftOptionRef.current.getDeliveryOption(),
                giftOption: giftOptionRef.current.getGiftOption()
            }
            dispatch(dispatchOrderInfo(orderInfo))
            console.log(orderInfo)
            setOpenAlert(true)
            timeoutRef.current = setTimeout(()=>{
                console.log('navigate to payment')
                navigate('/shop/checkout/payment')
            }, 3000)
        }
    }

    useEffect(()=>{
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
    },[navigate])

    return (
        <div className="checkout-fluid-container">
            <div className="header">
                <h1>Checkout</h1>
            </div>
            <div className="main">
                <div className="col-1">
                    <Snackbar open={openAlert}
                              autoHideDuration={3000}
                              anchorOrigin={{vertical: 'top', horizontal:'center'}}
                              onClose={()=>{setOpenAlert(false)}}>
                        <Alert
                            onClose={()=>{setOpenAlert(false)}}
                            severity={validCheckout?'success':'error'}
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            {!validCheckout?'Please correct the information you provided.':'Order placed successfully.  You will be directed to the payment.'}
                        </Alert>

                    </Snackbar>
                    <ContactInformation ref={contactRef}/>
                    {!isLoggedIn && <AskForLogin />}
                    {isLoggedIn && <ShippingAddress ref={shippingRef}/>}
                    {isLoggedIn && <GiftOptions ref={giftOptionRef}/>}
                    {/*{!validCheckout && <Alert className='alert' severity="error">Please correct the information you provided.</Alert>}*/}
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