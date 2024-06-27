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
    const [isOpen, setIsOpen] = useState(false)
    const [quantity, setQuantity] = useState(item.amount)
    const [arrowUp, setArrowUp] = useState(false)


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

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }
    const handleQuantityChange = (value) => {
        setQuantity(value)
        setIsOpen(false)
        console.log(`Selected value: ${value}`)
    }

    const handleArrowRotate = () => {
        setArrowUp(!arrowUp)
    }



    const dropdownArrow = (
        <svg height="8" width="14" fill="currentColor" stroke="currentColor" viewBox="0 0 14 8"
             xmlns="http://www.w3.org/2000/svg"
             focusable="false"
             role="img"
             aria-hidden="true"
             className={`rotate-svg ${arrowUp ? 'rotated' : ''}`}>
            <path
                d="m13 .99-6.47 6.5a.74.74 0 0 1-1.06 0L-1 .99l.35-.35a1 1 0 0 1 1.41 0L6 5.86 11.24.6a1 1 0 0 1 1.41 0z"
                fill-rule="evenodd" stroke="none"></path>
        </svg>
    )

    return (
        <div className="cart-item">
            <div className="product-primary">
                <div className="item-image">
                    <img width='199px'
                         src={item.imageUrl}
                         alt=""/>
                </div>
                <div className='item-detail'>
                    <h3 onClick={openUpdateItemDialog}>{item.productName}</h3>
                    <div className="item-color">
                        <p>{item.colorAlt}</p>
                    </div>
                    <div className='four-cols'>
                        <div className="col-1">
                            <p>Size {item.size}</p>
                            <a href="">Edit</a>
                        </div>
                        <div className="col-2">
                            <div className="item-price">
                                <p>Item Price</p>
                            </div>
                            <div className="price">
                                <p>${item.price}.00</p>
                            </div>
                        </div>
                        <div className="col-3">
                            <label htmlFor="quantity">Quantity</label>
                            <div className="dropdown-container" onClick={toggleDropdown}>
                                <div className="box-content" onClick={handleArrowRotate}>
                                    <button className="custom-dropdown" value={quantity}>{quantity}</button>
                                    <div className="dropdown-arrow">{dropdownArrow}</div>
                                </div>
                                {isOpen && (
                                    <div className="dropdown-options">
                                        <div className="option-container">
                                            <div className="dropdown-option" onClick={() => handleQuantityChange(1)}>1
                                            </div>
                                        </div>
                                        <div className="dropdown-separator"></div>
                                        <div className="option-container">
                                            <div className="dropdown-option" onClick={() => handleQuantityChange(2)}>2
                                            </div>
                                        </div>
                                        <div className="dropdown-separator"></div>
                                        <div className="option-container">
                                            <div className="dropdown-option" onClick={() => handleQuantityChange(3)}>3
                                            </div>
                                        </div>
                                        <div className="dropdown-separator"></div>
                                        <div className="option-container">
                                            <div className="dropdown-option" onClick={() => handleQuantityChange(4)}>4</div>
                                        </div>
                                        <div className="dropdown-separator"></div>
                                        <div className="option-container">
                                            <div className="dropdown-option" onClick={() => handleQuantityChange(5)}>5</div>
                                        </div>

                                    </div>
                                )}
                            </div>

                        </div>
                        <div className="col-4">
                            <div className="total-price">
                                <p>Total Price</p>
                            </div>
                            <div className="price">
                                <p>${item.price * quantity}.00</p>
                            </div>
                        </div>
                    </div>
                    <div className='operation-line'>
                        <div className="product-message">
                            <p>Free Shipping + Free Returns</p>
                        </div>
                        <div className="add-button">
                            <a href="">Save for Later</a>
                        </div>
                        <div className="separator"></div>
                        <div className="remove-button">
                            <span style={{cursor: 'pointer'}} onClick={openRemoveConfirmDialog}>Remove</span>
                        </div>
                    </div>
                    <EditWindow
                        state={openUpdateDialog}
                        closeEdit={closeUpdateItemDialog}
                        item={item}
                        handleUpdate={updateItem}/>
                    <RemoveConfirmDialog
                        isOpen={openRemoveDialog}
                        itemKey={item.itemKey}
                        handleRemove={removeItem}
                        handleClose={closeRemoveConfirmDialog}/>
                </div>
            </div>

        </div>
    )
}