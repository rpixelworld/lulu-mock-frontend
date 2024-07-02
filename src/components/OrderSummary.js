import {useSelector} from "react-redux";
import '../assets/css/OrderSummary.scss'
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useState} from "react";

const OrderSummary=()=> {
    const summary=useSelector(state=>state.shoppingReducer.shoppingCart);
    console.log('this is summary',summary);
    const [isOPen,setOpen]=useState(true);
    return <div className='order-summary'>
        <div className='summary-title'>
            <h2>Order summary</h2>
            <div className='summary-accordion'>
                {/*bag logo*/}
                <img
                    src="data:image/png;base64,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"
                    alt=""/>
                {summary.total}{' '}items
                {isOPen
                    ?<ExpandLessIcon onClick={()=>setOpen(false)}/>
                    : <ExpandMoreIcon onClick={()=>setOpen(true)}/>}
                <span className='summary-price title-price'>{summary.totalCost}.00</span>
            </div>
        </div>
        <hr/>
        {isOPen && <><div className='summary-container'>
            {summary?.items?.map((item, index) =>
                <div key={index}
                     className='summary-item'>
                    <img src={item.imageUrl} alt=""/>
                    <div className='summary-infor'>
                        <strong>{item.productName}</strong>
                        <span>{item.colorAlt}</span>
                        <span>Size{' '}{item.size}</span>
                        <span>Quantity{' '}{item.amount}</span>
                    </div>
                    <div className='summary-item-total-price'><span className='summary-price'>{item.price}.00</span>
                    </div>
                </div>
            ) || []}
        </div>
            <hr/>
            </>
        }
        <div className='summary-final'>
            <div className='final-list'>
                <span>Subtotal</span>
                <span className='summary-price'>{summary.totalCost}.00</span>
            </div>
            <div className='final-list'>
                <span>Shipping</span>
                <span>Free</span>
            </div>
            <div className='final-list'>
                <span>Tax</span>
                <span>Calculated at next step</span>
            </div>

        </div>
        <hr/>
        <div className='totalPrice'>
            <div>Order total</div>
            <div>USD{' '}<span>$</span>{summary.totalCost}.00</div>
        </div>


    </div>
}

export default OrderSummary;