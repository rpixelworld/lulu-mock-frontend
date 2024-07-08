import '../assets/css/Payment.scss'
import orderReview from '../assets/images/screenshots/order-review.png'
import OrderSummary from "../components/OrderSummary";
import {OrderReview} from "../components/OrderReview";
import {Alert, Snackbar} from "@mui/material";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import * as IndexedDBHelper from "../IndexedDBHelper";
import {dispatchClearShoppingCart} from "../redux/actions/shoppingAction";


export const Payment = ()=> {

    const [openAlert, setOpenAlert] = useState(false)
    const [openSuccessPayment, setOpenSuccessPayment] = useState(false)

    const dispatch = useDispatch()
    const orderInfo = useSelector(state=>state.shoppingReducer.orderInfo);

    const navigate = useNavigate()

    const handlePayment = ()=> {
        IndexedDBHelper.clearShoppingCart(()=>{
            setOpenSuccessPayment(true)
        })
    }

    const handleClosePaymentSuccess = ()=>{
        dispatch(dispatchClearShoppingCart())
        navigate('/shop/cart')

    }

    useEffect(()=>{
        if(!orderInfo || !orderInfo.shipping || !orderInfo.deliveryOption || !orderInfo.giftOption) {
            setOpenAlert(true)
        }
    },[])

    return (
        <div className="payment-fluid-container">
            <div className="header">
                <h1>Order Review & Payment</h1>
            </div>
            <Snackbar open={openAlert}
                      autoHideDuration={3000}
                      anchorOrigin={{vertical: 'top', horizontal:'center'}}
                      onClose={handleClosePaymentSuccess}>
                <Alert
                    onClose={handleClosePaymentSuccess}
                    severity='error'
                    variant="filled"
                    sx={{ width: '100%' }}
                >You haven't placed order! You will be directed to your shopping cart to checkout. </Alert>
            </Snackbar>
            <Snackbar open={openSuccessPayment}
                      autoHideDuration={3000}
                      anchorOrigin={{vertical: 'top', horizontal:'center'}}
                      onClose={()=>{navigate('/shop/cart')}}>
                <Alert
                    onClose={()=>{navigate('/shop/cart')}}
                    severity='success'
                    variant="filled"
                    sx={{ width: '100%' }}
                >We received your payment.  Thanks for shopping with us.</Alert>
            </Snackbar>
            {orderInfo && orderInfo.notification && orderInfo.shipping && orderInfo.deliveryOption && orderInfo.giftOption &&
            <div className="main">
                <div className="col-1">
                    <div className="order-review">
                        <OrderReview handlePayment={handlePayment}/>
                        {/*<div className="paypal">*/}
                            {/*<Paypal />*/}
                            {/*<button onClick={handlePayment}></button>*/}
                        {/*</div>*/}
                    </div>
                </div>
                <div className='col-2'>
                    <div className="order-summary">
                    <OrderSummary/>

                    </div>
                </div>
            </div>}
        </div>
    )
}