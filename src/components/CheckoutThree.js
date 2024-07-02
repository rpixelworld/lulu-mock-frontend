import '../assets/css/CheckoutThree.scss'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

export const CheckoutThree = () => {
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
        <>
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
                        <label htmlFor="First name">First name</label>
                        <input type="text"/>
                    </form>
                    <form className="last-name">
                        <label htmlFor="Last name">Last name</label>
                        <input type="text"/>
                    </form>
                </div>
                <form className="phone">
                    <label htmlFor="Phone number">Phone number</label>
                    <input type="number"/>
                    <p>This will be only used for delivery related issues.</p>
                </form>
                <form className="address">
                    <label htmlFor="Address">Address</label>
                    <input type="text"
                           placeholder="Include apt,suite, or floor number here "/>
                </form>
                <div className="note">
                    <AddOutlinedIcon className="icon"/>
                    <p>Add delivery note(e.g.company name)</p>
                </div>
                <form className="delivery-note">
                    <label htmlFor="Delivery note (Optional)">Delivery note (Optional)</label>
                    <input type="text"/>
                </form>
                <div className="city-detail">
                    <form className="city">
                        <label htmlFor="City">City</label>
                        <input type="text"/>
                    </form>
                    <form className="state">
                        <label htmlFor="State">State</label>
                        <select name="State" id="State">
                            <option>Select...</option>
                            {states.map((state, index) => (
                                <option key={index} value={state}>
                                    {state}
                                </option>
                            ))}
                        </select>
                    </form>
                    <form className="zip-code">
                        <label htmlFor="Zip code">Zip code</label>
                        <input type="text"
                        />
                    </form>
                </div>
            </div>
            <div className="gift-options">
                <div>
                    <h2>Shipping & gift options</h2>
                    <p>Change</p>
                </div>
                <div>
                    <p>2-7 business days
                        <br/>Standard Shipping (FREE)</p>
                    <p>2-4 business days
                        <br/>Express Shipping ($20.00)</p>
                    <p>2-3 business days
                        <br/>
                        Priority Shipping ($30.00)</p>
                </div>
                <div>
                    <input type="checkbox"/>
                    <p>This is a gift, add a message.</p>
                </div>


            </div>
        </>

    )

}