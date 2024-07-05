import '../assets/css/GiftOptions.scss'
import React, {forwardRef, useImperativeHandle, useRef, useState} from "react";
import {Checkbox, FormControlLabel} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {dispatchShippingFee} from "../redux/actions/shoppingAction";

export const GiftOptions = forwardRef((props, ref) => {

    const dispatch = useDispatch();

    const [selectedRadio, setSelectedRadio] = useState(0)
    const [isGift, setIsGift] = useState(false)
    const fieldRefs = useRef([])
    const [giftInfo, setGiftInfo] = useState({
        to: '', from: '', message: ''
    })
    const [touched, setTouched] = useState({})
    const [errors, setErrors] = useState({})

    useImperativeHandle(ref, ()=> ({
        getDeliveryOption: ()=>{
            switch (selectedRadio){
                case 0: return '2-7 business days (FREE)'
                case 1: return '2-4 business days ($20.00)'
                case 2: return '2-3 business days ($30.00)'
                default: return ''
            }
        },
        getGiftOption: ()=>{
            return {
                isGift: isGift,
                giftInfo: isGift ? giftInfo : null
            }
        },
        isValid: () => {
            if(!isGift) {
                return true
            }
            else {
                const errorMsgs = validate()
                // console.log(errors)
                if(errorMsgs.to || errorMsgs.from || errorMsgs.message) {
                    return false
                }
                else {
                    return true
                }
            }
        }
    }))

    const toggleRadioSelection = (i)=> {
        console.log('toggleRadioSelection', i)
        setSelectedRadio(i)
        let fee = 0;
        switch (i){
            case 0:
                fee=0;
                break
            case 1:
                fee=20
                break
            case 2:
                fee=30
                break
            default:
                fee=0
                break
        }
        dispatch(dispatchShippingFee(fee))
    }

    const toggleIsGift = ()=> {
        setIsGift(prev => !prev)
    }

    const handleFieldChange = (e)=> {
        const {name, value} = e.target
        setGiftInfo(prev => {return {...prev, [name]:value}})
        validate()
    }

    const handleFieldFocus = (e) => {
        const {name, value} = e.target
        setTouched(prev => {return {...prev, [name]:true}})
    }

    const validate = ()=> {
        const to = fieldRefs.current[0].value
        const from = fieldRefs.current[1].value
        const message = fieldRefs.current[2].value

        let errorMsgs = {}
        setErrors({})

        if(to.trim()==='') {
            errorMsgs.to='Please enter a recipient name.'
        }

        if(from.trim()==='') {
            errorMsgs.from='Please enter your name.'
        }

        if(message.trim()==='') {
            errorMsgs.message='Please enter your name.'
        }
        setErrors(errorMsgs)
        return errorMsgs;
    }

    return (
        <div className="gift-options-container">
            <h2>Shipping & gift options</h2>
            <div className='gift-option-wrapper'>
                <input className='radio-button' type="radio"/>
                <label htmlFor="">
                    <span className={selectedRadio === 0 ? 'radio-icon selected' : 'radio-icon'}
                          onClick={() => {
                              toggleRadioSelection(0)
                          }}></span>
                    <div className='gift-option'>
                        <p className='name'>2-7 business days</p>
                        <p className='desc'>Standard Shipping <span className='highlight'>(FREE)</span></p>
                    </div>
                </label>
            </div>
            <div className='gift-option-wrapper'>
                <input className='radio-button' type="radio"/>
                <label htmlFor="">
                    <span className={selectedRadio === 1 ? 'radio-icon selected' : 'radio-icon'}
                          onClick={() => {
                              toggleRadioSelection(1)
                          }}></span>
                    <div className='gift-option'>
                        <p className='name'>2-4 business days</p>
                        <p className='desc'>Express Shipping <span className='highlight'>($20.00)</span></p>
                    </div>
                </label>
            </div>
            <div className='gift-option-wrapper'>
                <input className='radio-button' type="radio"/>
                <label htmlFor="">
                    <span className={selectedRadio === 2 ? 'radio-icon selected' : 'radio-icon'}
                          onClick={() => {
                              toggleRadioSelection(2)
                          }}></span>
                    <div className='gift-option'>
                        <p className='name'>2-3 business days</p>
                        <p className='desc'>Priority Shipping <span className='highlight'>($30.00)</span></p>
                    </div>
                </label>
            </div>

            <div className="gift-to">
                <FormControlLabel onClick={toggleIsGift}
                    control={<Checkbox color="default"/>} label="This is a gift, add a message." />
                {isGift && <div className="gift-info">
                    <div className="row-2">
                        <div className='col'>
                            <label className='label' htmlFor="">To</label>
                            <input type="text" name='to' className={errors.to?'invalid':''}
                                   value={giftInfo.to} ref={(ele)=>{fieldRefs.current.push(ele)}}
                                   onChange={handleFieldChange} onFocus={handleFieldFocus} onBlur={validate}/>
                            {errors.to && <div className="icons"><div className='error-icon'></div></div>}
                            {errors.to && <div className="errr-hint">{errors.to}</div>}
                        </div>
                        <div className='col'>
                            <label className='label' htmlFor="">From</label>
                            <input type="text" name='from' className={errors.from?'invalid':''}
                                   value={giftInfo.from} ref={(ele)=>{fieldRefs.current.push(ele)}}
                                   onChange={handleFieldChange} onFocus={handleFieldFocus} onBlur={validate}/>
                            {errors.from && <div className="icons"><div className='error-icon'></div></div>}
                            {errors.from && <div className="errr-hint">{errors.from}</div>}
                        </div>
                    </div>
                    <div className="row-1">
                        <label className='label' htmlFor="">Message</label>
                        <input type="text" name='message' className={errors.message?'invalid':''}
                               value={giftInfo.message} ref={(ele)=>{fieldRefs.current.push(ele)}}
                               onChange={handleFieldChange} onFocus={handleFieldFocus} onBlur={validate}/>
                        {errors.message && <div className="icons"><div className='error-icon'></div></div>}
                        {errors.message && <div className="errr-hint">{errors.message}</div>}
                        <p className='notice'>Your message will be printed on a receipt with prices hidden.</p>
                    </div>
                </div>}
            </div>
        </div>
    )
})