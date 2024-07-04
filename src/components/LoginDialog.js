import '../assets/css/LoginDialog.scss'
import {Alert, Dialog, DialogContent} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {useEffect, useRef, useState} from "react";
import {loginUser} from "../UserHelper";
import {useDispatch} from "react-redux";
import {dispatchCookieAuth, dispatchUserInfo} from "../redux/actions/userAction";
import * as UserHelper from "../UserHelper";
import * as IndexedDBHelper from "../IndexedDBHelper";

export const LoginDialog = ({isOpen, handleClose})=>{

    const dispatch = useDispatch();

    const [user, setUser] = useState({
        email:'',
        password:''
    })
    const inputRefs = useRef([])
    const [success, setSuccess] = useState(false)
    const [failed, setFailed] = useState(false)
    const [alertMsg, setAlertMsg] = useState('')
    const timeoutRef = useRef(null)
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({})
    const [touched, setTouched] = useState({
        email: false,
        password: false
    })
    const [validForm, setValidForm] = useState(false)

    const handleFieldChange = (e)=> {
        const {name, value} = e.target;
        // setTouched(prev => {return {...prev, [name]: true}})
        setUser(prev => {return {...prev, [name]:value}})
        validate()
        setSuccess(false)
        setFailed(false)
    }

    const touchField = (e)=> {
        const {name, value} = e.target;
        setTouched(prev => {return {...prev, [name]: true}})
    }

    const toggleShowPassword = ()=> {
        setShowPassword(prev => !prev)
    }

    const validate = ()=> {
        let valid = true;
        setErrors({})
        if(touched.email) {
            const email = inputRefs.current[0].value
            if(email === '') {
                valid = false
                setErrors(prev => {return {...prev, email: 'Please enter an email address'}})
            }
            else {
                const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if(!re.test(String(email).toLowerCase())){
                    valid = false
                    setErrors(prev => {return {...prev, email: 'Email address is not in the correct format (xxx@yyy.zzz). Please correct the email address'}})
                }
            }
        }
        if(touched.password) {
            const password = inputRefs.current[1].value
            if(password.trim() === '') {
                valid = false
                setErrors(prev => {return {...prev, password: 'Please enter your password'}})
            }
        }

        setValidForm(valid)
    }

    const login = ()=> {
        loginUser(user, loginSuccess, loginFailed)
    }

    const loginSuccess = (authData)=> {
        let cookies = {
            _email: authData.user.email,
            _firstname: authData.user.firstName,
            _token: authData.token
        }
        setSuccess(true)
        setFailed(false)
        setAlertMsg('Login Successfully.')

        timeoutRef.current = setTimeout(()=>{
            UserHelper.setCookies(cookies)
            dispatch(dispatchCookieAuth(cookies))
            IndexedDBHelper.getUser(authData.user.email, (userInfo)=>{dispatch(dispatchUserInfo(userInfo))})
            handleClose()
        }, 1500)
    }

    const loginFailed = (result) => {
        setFailed(true)
        setSuccess(false)
        setAlertMsg(result.message.substring(0, result.message.indexOf('/')))
    }

    useEffect(()=>{
        console.log('isOpen change')
        setUser({
            email: '',
            password: ''
        })
        setSuccess(false)
        setFailed(false)
        setAlertMsg('')
        clearTimeout(timeoutRef.current)
        setShowPassword(false)
        setTouched({
            email: false,
            password: false
        })
        setErrors({})
        setValidForm(false)


    },[isOpen])

    return (
        <Dialog open={isOpen} fullScreen={false} scroll='body'>
            <DialogContent className='login-dialog'>
                <div>
                    <CloseIcon onClick={handleClose}
                        style={{position:'absolute',right:'10px', top: '10px', cursor:'pointer'}} />
                    <h1>Make shopping even easier.</h1>
                    <p>Speedy checkout, easy returns & more await.</p>
                    {success && <Alert className='alert' severity="success">{alertMsg}</Alert>}
                    {failed && <Alert className='alert' severity="error">{alertMsg}</Alert>}

                    <h2>Sign in to your member account</h2>
                    <form action="" onSubmit={(e)=>{e.preventDefault()}}>
                        <div className="field-container">
                            <section className="email">
                                <div>
                                    <label htmlFor="email">Email address</label>
                                    <input type="email" name='email'
                                           value={user.email}
                                           ref={(ele)=>{inputRefs.current.push(ele)}}
                                           onChange={handleFieldChange}
                                           onFocus={touchField}
                                           onBlur={validate} className={errors.email && 'invalid'}/>
                                    <div className="email-icons">
                                        {errors.email && <div className='error-icon'></div>}
                                    </div>
                                </div>
                                {errors.email && <div className="errr-hint">{errors.email}</div>}
                            </section>
                            <section className='password'>
                                <div>
                                    <label htmlFor="password">Password</label>
                                    <input type={showPassword?'text':'password'} name='password'
                                           value={user.password}
                                           ref={(ele)=>{inputRefs.current.push(ele)}}
                                           onChange={handleFieldChange}
                                           onFocus={touchField}
                                           onBlur={validate}
                                           className={errors.password && 'invalid'}/>
                                    <div className="password-icons">
                                        <div className={showPassword?'hide-password':'show-password'} onClick={toggleShowPassword}></div>
                                        {errors.password && <div className='error-icon'></div>}
                                    </div>
                                </div>
                                {errors.password && <div className="errr-hint">{errors.password}</div>}
                            </section>
                        </div>
                        <div className="forgot-password"><a href="">Forgot your password</a></div>
                        {validForm && touched.email && touched.password && <button className='sign-in' onClick={login}>sign in</button>}
                        {(!validForm || !touched.email || !touched.password) && <button disabled className='sign-in disabled'>sign in</button>}
                    </form>

                    <p className='term'>By signing in, you agree to the <a href="">Terms of Use</a> and acknowledge the <a
                        href="">Privacy Policy</a>. California consumers, see our <a href="">Notice of Financial</a> <a
                        href="">Incentives</a>.</p>
                </div>

            </DialogContent>
        </Dialog>
    )
}