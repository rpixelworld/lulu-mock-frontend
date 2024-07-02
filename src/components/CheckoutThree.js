import '../assets/css/CheckoutThree.scss'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {useState} from "react";

export const CheckoutThree = () => {


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [cityError, setCityError] = useState('');
    const [state, setState] = useState('');
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [showOptions, setShowOptions] = useState(false);

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const handleClick = () => {
        setShowForm(true);
    };


    const handleFirstNameChange = (e) => {
        const value = e.target.value;
        setFirstName(value);
        validateFirstName(value);
    };

    const handleLastNameChange = (e) => {
        const value = e.target.value;
        setLastName(value);
        validateLastName(value);
    };

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value;
        const formattedValue = value.replace(/\D/g, '');
        setPhoneNumber(formattedValue);
        validatePhoneNumber(formattedValue);
    };
    const handleAddressChange = (e) => {
        const value = e.target.value;
        setAddress(value);
        validateAddress(value);
    };
    const handleCityChange = (e) => {
        const value = e.target.value;
        setCity(value);
        validateCity(value);
    };


    const handleFirstNameBlur = () => {
        validateFirstName(firstName);
    };

    const handleLastNameBlur = () => {
        validateLastName(lastName);
    };

    const handlePhoneNumberBlur = () => {
        validatePhoneNumber(phoneNumber);
    };
    const handleAddressBlur = () => {
        validateAddress(address);
    };
    const handleCityBlur = () => {
        validateCity(city);
    };
    const handleBlur = () => {
        if (state === '') {
            setError('Please select your state.');
        } else {
            setError('');
        }
    };


    const validateFirstName = (value) => {
        if (!value) {
            setFirstNameError('Please enter your first name.');
        } else {
            setFirstNameError('');
        }
    };

    const validateLastName = (value) => {
        if (!value) {
            setLastNameError('Please enter your last name.');
        } else {
            setLastNameError('');
        }
    };

    const validatePhoneNumber = (value) => {
        const phoneRegex = /^\d{10}$/; // Regex for 10-digit phone number
        if (!value) {
            setPhoneNumberError('Please enter your phone number.');
        } else if (!phoneRegex.test(value)) {
            setPhoneNumberError('Please enter a valid 10-digit phone number.');
        } else {
            setPhoneNumberError('');
        }
    };
    const validateAddress = (value) => {
        if (!value) {
            setAddressError('Please enter your street address.');
        } else {
            setAddressError('');
        }
    };
    const validateCity = (value) => {
        if (!value) {
            setCityError('Please enter your city.');
        } else {
            setCityError('');
        }
    };


    const formatPhoneNumber = (phoneNumber) => {
        // Format phone number as (XXX) XXX-XXXX
        const match = phoneNumber.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }
        return phoneNumber;
    };

    const [to, setTo] = useState('');
    const [from, setFrom] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [showGiftNote, setShowGiftNote] = useState(false);
    const handleCheckboxChange = (event) => {
        setShowGiftNote(event.target.checked);
    };

    const handleParagraphClick = () => {
        setShowGiftNote(true);
    };

    const handleToChange = (event) => {
        setTo(event.target.value);
        validateField(event.target.id, event.target.value);
    };

    const handleFromChange = (event) => {
        setFrom(event.target.value);
        validateField(event.target.id, event.target.value);
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
        validateField(event.target.id, event.target.value);
    };

    const validateField = (fieldName, value) => {
        if (value.trim() === '') {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [fieldName]: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} field is required`,
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [fieldName]: null,
            }));
        }
    };


    const states = [
        'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
        'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia',
        'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
        'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
        'Mississippi', 'Minnesota', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
        'New Jersey', 'New Hampshire', 'New Mexico', 'New York', 'North Carolina',
        'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
        'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
        'Virginia', 'Washington', 'Wisconsin', 'West Virginia', 'Wyoming',
        'Armed Forces America', 'Armed Forces Europe', 'Armed Forces Pacific'
    ];

    return (
        <div className="bigContainer">
            <div className="shopping-address">
                <h2>Shipping address</h2>
                <form className="location">
                    <label htmlFor="Location">Location</label>
                    <select id="location" name="location">
                        <option value="united-states">United States</option>
                        <option value="american-samoa">American Samoa</option>
                        <option value="argentina">Argentina</option>
                        <option value="aruba">Aruba</option>
                        <option value="bahamas">Bahamas</option>
                        <option value="bahrain">Bahrain</option>
                        <option value="barbados">Barbados</option>
                        <option value="bermuda">Bermuda</option>
                        <option value="bolivia">Bolivia</option>
                        <option value="brazil">Brazil</option>
                        <option value="cayman-islands">Cayman Islands</option>
                        <option value="chile">Chile</option>
                        <option value="colombia">Colombia</option>
                        <option value="dominican-republic">Dominican Republic</option>
                        <option value="ecuador">Ecuador</option>
                        <option value="greenland">Greenland</option>
                        <option value="grenada">Grenada</option>
                        <option value="guam">Guam</option>
                        <option value="guatemala">Guatemala</option>
                        <option value="honduras">Honduras</option>
                        <option value="israel">Israel</option>
                        <option value="jamaica">Jamaica</option>
                        <option value="mexico">Mexico</option>
                        <option value="montserrat">Montserrat</option>
                        <option value="panama">Panama</option>
                        <option value="peru">Peru</option>
                        <option value="puerto-rico">Puerto Rico</option>
                        <option value="south-africa">South Africa</option>
                        <option value="tanzania">Tanzania</option>
                        <option value="trinidad-and-tobago">Trinidad and Tobago</option>
                        <option value="turkey">Turkey</option>
                        <option value="turks-and-caicos-islands">Turks and Caicos Islands</option>
                        <option value="virgin-islands">Virgin Islands</option>
                    </select>
                </form>
                <div className="name">
                    <form className="first-name">
                        <label htmlFor="firstName">First Name:</label>
                        <div className="input-container">
                            <input
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={handleFirstNameChange}
                                onBlur={handleFirstNameBlur}
                                className={firstNameError ? 'input-error' : ''}
                                required
                            />
                            {firstNameError && <CloseOutlinedIcon className="close-icon"/>}
                        </div>
                        {firstNameError && <p>{firstNameError}</p>}
                    </form>
                    <form className="last-name">
                        <label htmlFor="Last name">Last name</label>
                        <div className="input-container">
                            <input
                                type="text"
                                id="firstName"
                                value={lastName}
                                onChange={handleLastNameChange}
                                onBlur={handleLastNameBlur}
                                className={lastNameError ? 'input-error' : ''}
                                required
                            />
                            {lastNameError && <CloseOutlinedIcon className="close-icon"/>}
                        </div>
                        {lastNameError && <p>{lastNameError}</p>}
                    </form>
                </div>
                <form className="phone">
                    <label htmlFor="Phone number">Phone number</label>
                    <div className="input-container">
                        <input
                            type="tel"
                            id="phoneNumber"
                            value={formatPhoneNumber(phoneNumber)}
                            onChange={handlePhoneNumberChange}
                            onBlur={handlePhoneNumberBlur}
                            className={phoneNumberError ? 'input-error' : ''}
                            pattern="[0-9]{10}"
                            maxLength="10" // Limit input to 10 characters
                            required
                        />
                        {phoneNumberError && <CloseOutlinedIcon className="close-icon"/>}
                    </div>
                    {phoneNumberError && <p>{phoneNumberError}</p>}
                    <h3>This will be only used for delivery related issues.</h3>
                </form>
                <form className="address">
                    <label htmlFor="Address">Address</label>
                    <div className="input-container">
                        <input
                            id="address"
                            value={address}
                            onChange={handleAddressChange}
                            onBlur={handleAddressBlur}
                            className={addressError ? 'input-error' : ''}
                            required
                            type="text"
                            placeholder="Include apt,suite, or floor number here "/>
                        {addressError && <CloseOutlinedIcon className="close-icon"/>}
                    </div>
                    {addressError && <p className="error-message">{addressError}</p>}

                </form>
                <div>
                    {!showForm && (
                        <div className="note" onClick={handleClick} style={{cursor: 'pointer'}}>
                            <AddOutlinedIcon className="plus-icon"/>
                            <p>Add delivery note (e.g., company name)</p>
                        </div>
                    )}
                    {showForm && (
                        <form className="delivery-note">
                            <label htmlFor="delivery-note">Delivery note (Optional)</label>
                            <input type="text" id="delivery-note"/>
                        </form>
                    )}
                </div>
                <div className="city-detail">
                    <form className="city">
                        <label htmlFor="City">City</label>
                        <div className="input-container">
                            <input type="text"
                                   id="city"
                                   value={city}
                                   onChange={handleCityChange}
                                   onBlur={handleCityBlur}
                                   className={cityError ? 'input-error' : ''}
                                   required/>
                            {cityError && <CloseOutlinedIcon className="close-icon"/>}
                        </div>
                        {cityError && <p>{cityError}</p>}

                    </form>
                    <form className="state">
                        <label htmlFor="State">State</label>
                        <div className="select-container">
                            <select id="state"
                                    value={state}
                                    className={error ? 'select-error' : ''}
                                    onChange={(e) => setState(e.target.value)}
                                    onBlur={handleBlur}>
                                <option>Select...</option>
                                {states.map((state, index) => (
                                    <option key={index} value={state}>
                                        {state}
                                    </option>
                                ))}
                            </select>
                            {error && <CloseOutlinedIcon className="close-icon"/>}
                        </div>
                        {error && <p>{error}</p>}
                    </form>
                    <form className="zip-code">
                        <label htmlFor="Zip code">Zip code</label>
                        <input type="text"
                        />
                    </form>
                </div>
            </div>
            <div className="gift-options">
                <h2>Shipping & gift options</h2>
                <div className="change" style={{display: showOptions ? 'none' : 'block', cursor: 'pointer'}}
                     onClick={toggleOptions}>
                    <p>Change</p>
                </div>
                <div className="options">
                    <div className="option-1">
                        <input type="radio" name="option" value="1"/>
                        <p>2-7 business days<br/><span>Standard Shipping</span> (FREE)</p>
                    </div>
                    {showOptions && (
                        <>
                            <div className="option-2">
                                <input type="radio" name="option" value="2"/>
                                <p>2-4 business days<br/><span>Express Shipping</span> ($20.00)</p>
                            </div>
                            <div className="option-3">
                                <input type="radio" name="option" value="3"/>
                                <p>2-3 business days<br/><span>Priority Shipping</span> ($30.00)</p>
                            </div>
                        </>
                    )}
                </div>
                <div className="gift-message">
                    <input type="checkbox" onChange={handleCheckboxChange}/>
                    <p onClick={handleParagraphClick}>This is a gift, add a message.</p>
                </div>
                {showGiftNote && (
                    <div>
                        <div className="gift-note">
                            <form className="to">
                                <label htmlFor="To">To</label>
                                <div className="input-container">
                                    <input
                                        type="text"
                                        id="to"
                                        value={to}
                                        onChange={handleToChange}
                                        onBlur={() => validateField('to', to)}
                                        className={errors.to ? 'input-error' : ''}
                                    />
                                    {errors.to && <CloseOutlinedIcon className="close-icon1"/>}
                                </div>
                                {errors.to && <p className="error">Please enter a recipient name.</p>}
                            </form>
                            <form className="from">
                                <label htmlFor="From">From</label>
                                <div className="input-container">
                                    <input
                                        type="text"
                                        id="from"
                                        value={from}
                                        onChange={handleFromChange}
                                        onBlur={() => validateField('from', from)}
                                        className={errors.from ? 'input-error' : ''}
                                    />
                                    {errors.from && <CloseOutlinedIcon className="close-icon2"/>}
                                </div>
                                {errors.from && <p className="error">Please enter your name.</p>}
                            </form>

                        </div>
                        <form className="message">
                            <label htmlFor="Message">Message</label>
                            <div className="input-container">
                                <input
                                    type="text"
                                    id="message"
                                    value={message}
                                    onChange={handleMessageChange}
                                    onBlur={() => validateField('message', message)}
                                    className={errors.message ? 'input-error' : ''}
                                />
                                {errors.message && <CloseOutlinedIcon className="close-icon3"/>}
                            </div>
                            {errors.message && <p className="error">Please enter a gift message.</p>}
                        </form>
                        <h3>Your message will be printed on a receipt with prices hidden.</h3>
                    </div>
                )}
            </div>
            <button>GO TO NEXT STEP</button>
        </div>

    )

}