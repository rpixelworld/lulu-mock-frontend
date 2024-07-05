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
import Constants from "../Constants";
import * as UserHelper from "../UserHelper";
import {dispatchClearCookieAuth, dispatchUserInfo} from "../redux/actions/userAction";
import {insertOrUpdateUser} from "../IndexedDBHelper";
import * as IndexedDBHelper from "../IndexedDBHelper";

export const Checkout = ()=> {

    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn)
    const shoppingCart = useSelector(state => state.shoppingReducer.shoppingCart)
    const userInfo = useSelector(state => state.userReducer.userInfo)

    const navigate = useNavigate()
    const timeoutRef = useRef(null)
    const contactRef = useRef();
    const shippingRef = useRef();
    const giftOptionRef = useRef();
    const [validCheckout, setValidCheckout] = useState(true)
    const [openAlert, setOpenAlert] = useState(false)
    const [openPlaceOrderSuccess, setOpenPlaceOrderSuccess] = useState(false)
    const [openPlaceOrderFailed, setOpenPlaceOrderFailed] = useState(false)

    const handleClosePladeOrderSuccess = ()=>{
        setOpenPlaceOrderSuccess(false)
        navigate('/shop/checkout/payment')
    }
    const handleClosePladeOrderFailed = () => {
        setOpenPlaceOrderFailed(false)
    }

    const handlePlaceOrder = () => {
        // console.log('contact information got from contactInformation: ', contactRef.current.getContact())
        // console.log('shipping: ', shippingRef.current.getShippingAddress())
        // console.log('delivery==>', giftOptionRef.current.getDeliveryOption())
        // console.log('gift==>', giftOptionRef.current.getGiftOption())
        console.log('contact infomation valid=', contactRef.current.isValid(), 'shipping valid=', shippingRef.current.isValid(), 'gift valid=', giftOptionRef.current.isValid())
        console.log('toSaveShippingAddress', shippingRef.current.toSaveShippingAddress())

        if(!contactRef.current.isValid() || !shippingRef.current.isValid() || !giftOptionRef.current.isValid()){
            setValidCheckout(false)
            setOpenAlert(true)
        }
        else {
            setValidCheckout(true)
            if(shippingRef.current.toSaveShippingAddress()) {
                userInfo.addresses.push(shippingRef.current.getShippingAddress())
                IndexedDBHelper.insertOrUpdateUser(userInfo.email, userInfo,
                    ()=>{
                        dispatch(dispatchUserInfo(userInfo))
                    }
                )
            }
            const orderInfo = {
                notification: contactRef.current.getContact(),
                shipping: shippingRef.current.getShippingAddress(),
                deliveryOption: giftOptionRef.current.getDeliveryOption(),
                giftOption: giftOptionRef.current.getGiftOption()
            }

            placeOrder(orderInfo, shoppingCart,
                ()=>{
                    dispatch(dispatchOrderInfo(orderInfo))
                    setOpenPlaceOrderSuccess(true)
                },
                ()=>{
                    setOpenPlaceOrderFailed(true)
                    UserHelper.logoutUser({}, ()=>{
                        UserHelper.clearCookies({_email: '',_firstname: '',_token: ''})
                        dispatch(dispatchClearCookieAuth())
                    })
                })
            // dispatch(dispatchOrderInfo(orderInfo))
            // console.log(orderInfo)
            // setOpenAlert(true)
            // timeoutRef.current = setTimeout(()=>{
            //     console.log('navigate to payment')
            //     navigate('/shop/checkout/payment')
            // }, 3000)
        }
    }

    const placeOrder = (orderInfo, shoppingCart, onSuccess, onError) => {
        let bodyItems = [];
        shoppingCart.items.forEach(item => {
            bodyItems.push({
                productId: item.itemKey.split('_')[0],
                colorId: item.itemKey.split('_')[1],
                size: item.itemKey.split('_')[2],
                quantity: item.amount
            })
        })
        let postBody =  {
            taxRate: 1.2,
            isActive: true,
            isDelete: false,
            orderItems: bodyItems
        }


        let url = `${Constants.BASE_URL}/order?mykey=${Constants.MY_KEY}`
        let options = {
            method: 'POST',
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                authorization: 'bear ' + UserHelper.getCookie('_token')
            },
            body: JSON.stringify(postBody)
        }
        console.log(options)
        fetch(url, options)
            .then(resp => {
                return resp.json()
            })
            .then(res => {
                if(res.status == 'success'){
                    onSuccess && onSuccess()
                }
                else {
                    if(res.status=='Failed' && res.message.substring(0, res.message.indexOf('/'))=='Invalid token. ' ){
                        onError && onError()
                    }
                }
            })
    }


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
                            severity='error'
                            variant="filled"
                            sx={{ width: '100%' }}
                        >Please correct the information you provided.</Alert>
                    </Snackbar>
                    <Snackbar open={openPlaceOrderSuccess}
                              autoHideDuration={3000}
                              anchorOrigin={{vertical: 'top', horizontal:'center'}}
                              onClose={handleClosePladeOrderSuccess}>
                        <Alert
                            onClose={handleClosePladeOrderSuccess}
                            severity='success'
                            variant="filled"
                            sx={{ width: '100%' }}
                        >Order placed successfully.  You will be directed to the payment.</Alert>
                    </Snackbar>
                    <Snackbar open={openPlaceOrderFailed}
                              autoHideDuration={3000}
                              anchorOrigin={{vertical: 'top', horizontal:'center'}}
                              onClose={handleClosePladeOrderFailed}>
                        <Alert
                            onClose={handleClosePladeOrderFailed}
                            severity='error'
                            variant="filled"
                            sx={{ width: '100%' }}
                        >Login expired</Alert>
                    </Snackbar>
                    {isLoggedIn && <ContactInformation ref={contactRef}/>}
                    {!isLoggedIn && <AskForLogin />}
                    {isLoggedIn && <ShippingAddress ref={shippingRef}/>}
                    {isLoggedIn && <GiftOptions ref={giftOptionRef}/>}
                    {/*{!validCheckout && <Alert className='alert' severity="error">Please correct the information you provided.</Alert>}*/}
                    <div className="next-step">
                        <button className='next-step-button'
                                onClick={handlePlaceOrder} disabled={!isLoggedIn}
                                >Place Order</button>
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