import React, {useState, useEffect, useRef} from 'react';
import '../assets/css/EditAddressDialog.scss';
import {fetchTaxRate} from "../redux/actions/shoppingAction";
import {useDispatch} from "react-redux";

export const EditAddressDialog = ({ isOpen, addressData, handleClose, handleSave }) => {
    const fieldRefs = useRef(new Array(7));
    const [address, setAddress] = useState({
        firstName: '',
        lastName: '',
        addressLine: '',
        city: '',
        province: '',
        postalCode: '',
        phoneNumber: '',
    });

    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        if (isOpen) {
            if (addressData) {
                setAddress(addressData);
                console.log('Loaded address data:', addressData);
            } else {
                setAddress({
                    firstName: '',
                    lastName: '',
                    addressLine: '',
                    city: '',
                    province: '',
                    postalCode: '',
                    phoneNumber: '',
                });
            }
        }
    }, [isOpen, addressData]);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAKxFKjjiSJ2J2EnViKkWHh3UlNp1XS70s&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
            if (window.google) {
                const autocomplete = new window.google.maps.places.Autocomplete(fieldRefs.current[2], {
                    componentRestrictions: { country: 'ca' },
                    types: ['geocode'], // You can restrict the types as per your needs
                });
                autocomplete.setFields(['address_component']);
                autocomplete.addListener('place_changed', () => {
                    const place = autocomplete.getPlace();
                    const addressComponents = place.address_components;
                    const updatedAddress = {
                        addressLine: '',
                        city: '',
                        province: '',
                        postalCode: '',
                        countryCode: '',
                    };
                    addressComponents.forEach(component => {
                        const types = component.types;
                        if (types.includes('street_number')) {
                            updatedAddress.addressLine = component.long_name + ' ' + updatedAddress.addressLine;
                        }
                        if (types.includes('route')) {
                            updatedAddress.addressLine += component.long_name;
                        }
                        if (types.includes('locality')) {
                            updatedAddress.city = component.long_name;
                        }
                        if (types.includes('administrative_area_level_1')) {
                            updatedAddress.province = component.short_name;
                            dispatch(fetchTaxRate(component.short_name));
                        }
                        if (types.includes('postal_code')) {
                            updatedAddress.postalCode = component.long_name;
                        }
                        if (types.includes('country')) {
                            updatedAddress.countryCode = component.long_name;
                        }
                    });
                    setAddress(updatedAddress);
                    setErrors(prev => ({ ...prev, addressLine: '', city: '', province: '', postalCode: '' }));
                });
            }
        };
        document.head.appendChild(script);
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`Changing ${name} to ${value}`);
        setAddress(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async () => {
        console.log('Submitting address:', address);
        const validationErrors = {};
        if (!address.firstName || !address.lastName) {
            console.error('first name or last name is missing');}
        if (!address.addressLine) validationErrors.addressLine = 'Address Line is required';
        if (!address.city) validationErrors.city = 'City is required';
        if (!address.province) validationErrors.province = 'Province is required';
        if (!address.postalCode) validationErrors.postalCode = 'Postal Code is required';

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            console.log('Submitting address:', address);  // 调试信息
            await handleSave(address);
            handleClose();
        } catch (error) {
            console.error('Failed to save address', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="edit-address-dialog-overlay">
            <div className="edit-address-dialog">
                <div className="dialog-header">
                    <h2>Edit Address</h2>
                    <button className="close-button" onClick={handleClose}>×</button>
                </div>
                <div className="dialog-body">
                    <div className="form-group">
                        <label>firstName</label>
                        <input
                            name="firstName"
                            value={address.firstName}
                            onChange={(e) => {
                                console.log('first Name input change:', e.target.value);
                                handleChange(e);
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label>lastName</label>
                        <input
                            name="lastName"
                            value={address.lastName}
                            onChange={(e) => {
                                console.log('lastName input change:', e.target.value);
                                handleChange(e);
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Address Line</label>
                        <input name="addressLine" value={address.addressLine} onChange={handleChange}
                               ref={ele => {
                                   fieldRefs.current[2] = ele;
                               }}
                        />
                    </div>
                    <div className="form-group">
                        <label>City</label>
                        <input name="city" value={address.city} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Province</label>
                        <input name="province" value={address.province} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Postal Code</label>
                        <input name="postalCode" value={address.postalCode} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input name="phoneNumber" value={address.phoneNumber} onChange={handleChange} />
                    </div>
                </div>
                <div className="dialog-footer">
                    <button className="save-button" onClick={handleSubmit}>Save</button>
                    <button className="cancel-button" onClick={handleClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};