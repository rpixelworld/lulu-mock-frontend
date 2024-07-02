import '../assets/css/ShippingAddress.scss'

export const ShippingAddress = () => {
    return (<div className="shipping-address">
        <div className='select-shipping-address'>
            <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                 className="checkout-block_onChangeSummaryIcon__TFV9M" focusable="false" role="img" aria-hidden="true"
                 data-testid="icon">
                <g fill="none" fill-rule="evenodd" stroke="currentColor">
                    <circle cx="12" cy="12" r="11" stroke-width="2"></circle>
                    <path
                        d="M9.837 17.6a.623.623 0 0 1-.4-.153L6 14.393l.264-.298a.8.8 0 0 1 1.138-.073l2.403 2.112 6.761-7.857a.798.798 0 0 1 1.13-.08l.304.266-7.666 8.928a.591.591 0 0 1-.417.2l-.08.009z"
                        fill="currentColor" fill-rule="nonzero"></path>
                </g>
            </svg><h2>Shipping address</h2>
        </div>

        <div className='customer-information'>
            <div className='customer-info'>
                <input type="checkbox" className='select-user'/>
                <div className='user-info'><h3>Heng Zhang</h3>
                    <p>12345 Walnut Grove Ave</p>
                    <p>Rosemead, CA 91770</p>
                    <p>(626)110-1234</p>
                </div>
            </div>
            <button>Edit</button>
        </div>

    </div>)
}