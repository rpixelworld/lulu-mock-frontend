import '../assets/css/Payment.scss'
import orderReview from '../assets/images/screenshots/order-review.png'
import OrderSummary from "../components/OrderSummary";
import {OrderReview} from "../components/OrderReview";


export const Payment = ()=> {
    return (
        <div className="payment-fluid-container">
            <div className="header">
                <h1>Checkout</h1>
            </div>
            <div className="main">
                <div className="col-1">
                    <div className="order-review">
                        <OrderReview/>

                    </div>
                </div>
                <div className='col-2'>
                    <div className="order-summary">
                        <OrderSummary/>

                    </div>
                </div>
            </div>
        </div>
    )
}