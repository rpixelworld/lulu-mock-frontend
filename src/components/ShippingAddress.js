import '../assets/css/ShippingAddress.scss'
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../IndexedDBHelper";
import * as IndexedDBHelper from "../IndexedDBHelper";

export const ShippingAddress = () => {

    const refRadios = useRef([])
    const [selectedRadio, setSelectedRadio] = useState(0)

    const dispatch = useDispatch();
    const cookieAuth = useSelector(state => state.userReducer.cookieAuth)
    const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn)
    const userInfo = useSelector(state => state.userReducer.userInfo)


    const formatPhoneNumber = (phoneNumber)=> {
        // Remove all non-digit characters from the input
        let cleaned = ('' + phoneNumber).replace(/\D/g, '');

        // Check if the input is of correct length
        if (cleaned.length !== 10) {
            throw new Error("Invalid phone number length");
        }

        // Capture the parts of the phone number
        let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

        // Format and return the phone number
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }

        return null;
    }

    const toggleRadioSelection = (i)=> {
        console.log('toggleRadioSelection', i)
        setSelectedRadio(i)
    }

    useEffect(()=> {
        // if(isLoggedIn) {
        //     const email = cookieAuth._email;
        //     IndexedDBHelper.getUser(email, dispatch())
        // }
    }, [])

    return (
        <div className="shipping-address-container">
            <h2>Shipping address</h2>

            {isLoggedIn && userInfo && userInfo.addresses && userInfo.addresses.map((address, index) =>
                <>{index>0 && <hr/>}
                <div className="saved-shipping">
                    <div className='address-detail-wrapper'>
                        <input className='radio-button' type="radio"/>
                        <label htmlFor="">
                        <span className={selectedRadio === index ? 'radio-icon selected' : 'radio-icon'}
                              onClick={() => {
                                  toggleRadioSelection(index)
                              }}></span>
                            <div className='full-address'>
                                <p className='name'>{address.recipient}</p>
                                <p className="address-line">{address.line1} {address.line2}</p>
                                <p className="address-line">{address.city}, {address.state} {address.postal_code}, {address.country_code}</p>
                                <p className='tel'>{formatPhoneNumber(address.phone)}</p>
                            </div>
                        </label>
                    </div>
                    <div className="operation"><span>Edit</span></div>
                </div></>
            )}

        </div>
    )
}