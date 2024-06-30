import '../assets/css/Payment.scss'
import orderReview from '../assets/images/screenshots/order-review.png'


export const Payment = ()=> {
    return (
        <div className="checkout-fluid-container">
            <div className="header">
                <h1>Checkout</h1>
            </div>
            <div className="main">
                <div className="col-1">
                    <div className="order-review"><img src={orderReview} width='500px'/></div>

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