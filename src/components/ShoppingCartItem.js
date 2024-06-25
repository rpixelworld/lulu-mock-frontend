import '../assets/css/ShoppingCartItem.scss'
import {RemoveConfirmDialog} from "./RemoveConfirmDialog";
import {useState} from "react";
import * as CartIndexedDBHelper from "../CartIndexedDBHelper";
import {useDispatch} from "react-redux";
import {dispatchShoppingCart} from "../redux/actions/shoppingAction";
import EditWindow from "./EditWindow";

export const ShoppingCartItem = ({item})=> {

    const dispatch = useDispatch();
    const [openRemoveDialog, setOpenRemoveDialog] = useState(false)
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false)

    const openRemoveConfirmDialog = ()=> {
        setOpenRemoveDialog(true)
    }

    const closeRemoveConfirmDialog = () => {
        setOpenRemoveDialog(false)
    }

    const openUpdateItemDialog = () => {
        setOpenUpdateDialog(true)
    }

    const closeUpdateItemDialog = () => {
        setOpenUpdateDialog(false)
    }

    const refreshShoppingCart = ()=>{
        CartIndexedDBHelper.getAllItems((shoppingCart)=>{dispatch(dispatchShoppingCart(shoppingCart))})
        closeUpdateItemDialog()
        closeRemoveConfirmDialog()
    }
    const removeItem = (itemKey)=> {
        CartIndexedDBHelper.deleteItem(itemKey, refreshShoppingCart)
    }

    const updateItem = (itemKey, newItem) => {
        CartIndexedDBHelper.deleteItem(itemKey, ()=>{
            CartIndexedDBHelper.insertOrUpdateItem(newItem.itemKey, newItem, refreshShoppingCart)
        })
    }

    return (
        <div className="cart-item">
            <img width='199px'
                 src={item.imageUrl}
                 alt=""/>
            <div className='item-detail'>
                <h3 onClick={openUpdateItemDialog}>{item.productName}</h3>
                <p>{item.colorAlt}</p>
                <div className='four-cols'>
                    <div className="col-1">
                        <p>Size {item.size}</p>
                        <a href="">Edit</a>
                    </div>
                    <div className="col-2">
                        <p>Item Price</p>
                        <p>${item.price}.00</p>
                    </div>
                    <div className="col-3">
                        <p>Quantity</p>
                        <p>{item.amount}</p>
                    </div>
                    <div className="col-4">
                        <p>Total Price</p>
                        <p>${item.price * item.amount}.00</p>
                    </div>
                </div>
                <div className='operation-line'>
                    <p>Free Shipping + Free Returns</p>
                    <a href="">Save for Later</a>
                    <span style={{cursor: 'pointer'}} onClick={openRemoveConfirmDialog}>Remove</span>
                </div>
                <EditWindow
                    state={openUpdateDialog}
                    closeEdit={closeUpdateItemDialog}
                    item={item}
                    handleUpdate={updateItem} />
                <RemoveConfirmDialog
                    isOpen={openRemoveDialog}
                    itemKey={item.itemKey}
                    handleRemove={removeItem}
                    handleClose={closeRemoveConfirmDialog}/>
            </div>
        </div>
    )
}