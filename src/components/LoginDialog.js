import '../assets/css/LoginDialog.scss'
import {Dialog, DialogContent} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {useState} from "react";
import {loginUser} from "../UserHelper";
import {useDispatch} from "react-redux";
import {dispatchCookieAuth} from "../redux/actions/userAction";
import * as UserHelper from "../UserHelper";

export const LoginDialog = ({isOpen, handleClose})=>{

    const dispatch = useDispatch();

    const [user, setUser] = useState({
        email:'',
        password:''
    })

    const setValue = (e)=> {
        const {name, value} = e.target;
        setUser(prev => {return {...prev, [name]:value}})
    }

    const login = ()=> {
        loginUser(user, loginSuccess)
    }
    const loginSuccess = (authData)=> {
        let cookies = {
            _firstname: authData.user.firstName + ' ' + authData.user.lastName,
            _token: authData.token
        }
        dispatch(dispatchCookieAuth(cookies))
        UserHelper.setCookies(cookies)
        handleClose()
    }
    return (
        <Dialog open={isOpen} fullScreen={false} scroll='body'>
            <DialogContent className='login-dialog'>
                <div>
                    <CloseIcon onClick={handleClose}
                        style={{position:'absolute',right:'10px', top: '10px', cursor:'pointer'}} />
                    <h1>Make shopping even easier.</h1>
                    <p>Speedy checkout, easy returns & more await.</p>
                    <h2>Sign in to your member account</h2>
                    <form action="">
                        <div className="field-container">
                            <section className="email">
                                <div>
                                    <label htmlFor="email">Email address</label>
                                    <input type="text" name='email' value={user.email} onChange={setValue}/>
                                    <div className="email-icons">
                                        <div className='error-icon'></div>
                                    </div>
                                </div>
                                <div className="errr-hint">Email address is not in the correct format (xxx@yyy.zzz).
                                    Please correct the email address
                                </div>
                            </section>
                            <section className='password'>
                                <div>
                                    <label htmlFor="password">Password</label>
                                    <input type="password" name='password' onChange={setValue}/>
                                    <div className="password-icons">
                                        <div className="hide-password"></div>
                                        <div className='error-icon'></div>
                                    </div>
                                </div>
                                <div className="errr-hint">Please enter your password</div>
                            </section>
                        </div>
                    </form>
                    <div className="forgot-password"><a href="">Forgot your password?</a></div>
                    <button className='sign-in' onClick={login}>sign in</button>
                    <p className='term'>By signing in, you agree to the <a href="">Terms of Use</a> and acknowledge the <a
                        href="">Privacy Policy</a>. California consumers, see our <a href="">Notice of Financial</a> <a
                        href="">Incentives</a>.</p>
                </div>
            </DialogContent>
        </Dialog>
    )
}