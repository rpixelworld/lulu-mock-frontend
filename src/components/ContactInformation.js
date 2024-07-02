import React, { useState } from 'react';
import '../assets/css/ContactInformation.scss';

export const ContactInformation = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [changed, setChanged] = useState(false);

    const handleEmailChange = (e) => {
        const emailValue = e.target.value;
        setEmail(emailValue);
        if (!changed) {
            setChanged(true);
        }
        validateEmail(emailValue);
    };

    const handleBlur = () => {
        setChanged(true);
        validateEmail(email);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setError('Please enter your email address.');
        } else if (!emailRegex.test(email)) {
            setError('Please enter an email address in the format xxx@yyy.zzz');
        } else {
            setError('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        validateEmail(email);
        if (!error && email) {
        }
    };

    return (
        <div className="contact-information">
            <div>
                <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                     className="checkout-block_onChangeSummaryIcon__TFV9M" focusable="false" role="img"
                     aria-hidden="true"
                     data-testid="icon">
                    <g fill="none" fill-rule="evenodd" stroke="currentColor">
                        <circle cx="12" cy="12" r="11" stroke-width="2"></circle>
                        <path
                            d="M9.837 17.6a.623.623 0 0 1-.4-.153L6 14.393l.264-.298a.8.8 0 0 1 1.138-.073l2.403 2.112 6.761-7.857a.798.798 0 0 1 1.13-.08l.304.266-7.666 8.928a.591.591 0 0 1-.417.2l-.08.009z"
                            fill="currentColor" fill-rule="nonzero"></path>
                    </g>
                </svg>
                <h2>Contact information</h2>
            </div>

            <form onSubmit={handleSubmit}>
                <div className='contact'>
                    <label htmlFor="email">Email address (for order notification)</label>
                    <input
                        type="email"
                        id='email'
                        name='email'
                        className={changed && error ? 'error-input' : ''}
                        value={email}
                        onChange={handleEmailChange}
                        onBlur={handleBlur}
                    />
                    {changed && error && <span className="error-icon">X</span>}
                    {changed && error && <p className='error-message'>{error}</p>}
                </div>
                <p>
                    <input type="checkbox" id="signup" name="signup" className='signup'/>
                    <label htmlFor="signup">Sign me up for lululemon emails (you can unsubscribe at any time). See
                        our <a href="#">privacy policy</a> for details.</label>
                </p>
            </form>
        </div>
    );
};