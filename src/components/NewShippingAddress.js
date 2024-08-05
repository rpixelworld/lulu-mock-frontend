import "../assets/css/NewShippingAddress.scss";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

export const NewShippingAddress = forwardRef((props, ref) => {
  const fieldRefs = useRef(new Array(7));
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    line1: "",
    city: "",
    state: " ",
    postalCode: "",
  });
  const [saveAddress, setSaveAddress] = useState(false);

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  useImperativeHandle(ref, () => ({
    toSaveAddress: () => {
      return saveAddress;
    },
    getNewAddress: () => {
      return {
        firstName: address.firstName,
        lastName: address.lastName,
        line1: address.line1,
        city: address.city,
        countryCode: "CA",
        postalCode: address.postalCode,
        phone: address.phone.replace(/\D/g, ""),
        state: address.state,
      };
    },
    isValid: () => {
      const errorMsgs = validate();
      if (
        errorMsgs.firstName ||
        errorMsgs.lastName ||
        errorMsgs.line1 ||
        errorMsgs.city ||
        errorMsgs.countryCode ||
        errorMsgs.postalCode ||
        errorMsgs.phone
      ) {
        return false;
      } else {
        return true;
      }
    },
  }));

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setAddress((prev) => {
      return { ...prev, [name]: value };
    });
    validate();
  };

  const handleFieldFocus = (e) => {
    const { name, value } = e.target;
    console.log(e.target, name, value);
    setTouched((prev) => {
      return { ...prev, [name]: true };
    });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    // setTouched(prev => {return {...prev, [name]: true}})
    setAddress((prev) => {
      return { ...prev, [name]: value };
    });
    validateState(value);
    // setErrors(prev => {return {...prev,
    //     state:''
    // }})
    // if(value && value.trim()===''){
    //     setErrors(prev => {return {...prev, state: 'Please select your province.'}})
    // }
  };
  const validateState = (state) => {
    if (state.trim() === "") {
      setErrors((prev) => ({ ...prev, state: "Please select your province." }));
    } else {
      setErrors((prev) => ({ ...prev, state: null }));
    }
  };
  const validate = () => {
    console.log("validating new shipping ", fieldRefs.current);
    const firstName = fieldRefs.current[0].value;
    const lastName = fieldRefs.current[1].value;
    const phone = fieldRefs.current[2].value;
    const phoneRemoveDigit = fieldRefs.current[2].value.replace(/\D/g, "");
    const line1 = fieldRefs.current[3].value;
    const city = fieldRefs.current[4].value;
    const state = fieldRefs.current[5].value;
    const postalCode = fieldRefs.current[6].value;

    console.log("state===", fieldRefs.current[5].value);

    let errorMsgs = { state: errors.state };
    setErrors({});

    if (firstName.trim() === "") {
      errorMsgs.firstName = "Please enter your first name.";
    }

    if (lastName.trim() === "") {
      errorMsgs.lastName = "Please enter your last name.";
    }
    if (true) {
      if (phone.trim() === "") {
        errorMsgs.phone = "Please enter your phone.";
      } else if (
        !isValidPhoneNumber(phone) &&
        !isValidPhoneNumber(phoneRemoveDigit)
      ) {
        errorMsgs.phone = "Please enter a valid 10-digit phone number.";
      } else {
        setAddress((prev) => {
          return { ...prev, phone: formatPhoneNumber(phone) };
        });
      }
    }
    if (line1.trim() === "") {
      errorMsgs.line1 = "Please enter your street address.";
    }
    if (city.trim() === "") {
      errorMsgs.city = "Please enter your city.";
    }

    if (state.trim() === "") {
      errorMsgs.state = "Please select your province.";
    }

    if (postalCode.trim() === "") {
      errorMsgs.postalCode = "Please enter a valid postal code.";
    }

    console.log(errorMsgs);

    setErrors(errorMsgs);
    return errorMsgs;
    // console.log('new shipping', errorMsgs)
  };

  const isValidPhoneNumber = (phoneNumber) => {
    // Regular expression to match exactly 10 digits
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const formatPhoneNumber = (phoneNumber) => {
    // Remove all non-digit characters from the input
    let cleaned = ("" + phoneNumber).replace(/\D/g, "");
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
  };
  return (
    <div className="new-address-form-wrapper">
      <form className="new-address-form" action="">
        <div className="row-2">
          <div className="col">
            <label className="label" htmlFor="">
              First name
            </label>
            <input
              type="text"
              className={errors.firstName ? "invalid" : ""}
              name="firstName"
              value={address.firstName}
              ref={(ele) => {
                fieldRefs.current[0] = ele;
              }}
              onChange={handleFieldChange}
              onFocus={handleFieldFocus}
              onBlur={validate}
            />
            {errors.firstName && (
              <div className="icons">
                <div className="error-icon"></div>
              </div>
            )}
            {errors.firstName && (
              <div className="errr-hint">{errors.firstName}</div>
            )}
          </div>
          <div className="col">
            <label className="label" htmlFor="">
              Last name
            </label>
            <input
              type="text"
              className={errors.lastName ? "invalid" : ""}
              name="lastName"
              value={address.lastName}
              ref={(ele) => {
                fieldRefs.current[1] = ele;
              }}
              onChange={handleFieldChange}
              onFocus={handleFieldFocus}
              onBlur={validate}
            />
            {errors.lastName && (
              <div className="icons">
                <div className="error-icon"></div>
              </div>
            )}
            {errors.lastName && (
              <div className="errr-hint">{errors.lastName}</div>
            )}
          </div>
        </div>
        <div className="row-1">
          <label className="label" htmlFor="">
            Phone number
          </label>
          <input
            type="text"
            className={errors.phone ? "invalid" : ""}
            name="phone"
            value={address.phone}
            ref={(ele) => {
              fieldRefs.current[2] = ele;
            }}
            onChange={handleFieldChange}
            onFocus={handleFieldFocus}
            onBlur={validate}
          />
          {errors.phone && (
            <div className="icons">
              <div className="error-icon"></div>
            </div>
          )}
          {errors.phone && <div className="errr-hint">{errors.phone}</div>}
          <p className="notice">
            This will be only used for delivery related issues.
          </p>
        </div>
        <div className="row-1">
          <label className="label" htmlFor="">
            Address
          </label>
          <input
            type="text"
            className={errors.line1 ? "invalid" : ""}
            name="line1"
            value={address.line1}
            ref={(ele) => {
              fieldRefs.current[3] = ele;
            }}
            onChange={handleFieldChange}
            onFocus={handleFieldFocus}
            onBlur={validate}
          />
          {errors.line1 && (
            <div className="icons">
              <div className="error-icon"></div>
            </div>
          )}
          {errors.line1 && <div className="errr-hint">{errors.line1}</div>}
        </div>
        <div className="row-3">
          <div className="col">
            <label className="label" htmlFor="">
              City
            </label>
            <input
              type="text"
              className={errors.city ? "invalid" : ""}
              name="city"
              value={address.city}
              ref={(ele) => {
                fieldRefs.current[4] = ele;
              }}
              onChange={handleFieldChange}
              onFocus={handleFieldFocus}
              onBlur={validate}
            />
            {errors.city && (
              <div className="icons">
                <div className="error-icon"></div>
              </div>
            )}
            {errors.city && <div className="errr-hint">{errors.city}</div>}
          </div>
          <div className="col">
            <label className="label" htmlFor="">
              Province
            </label>
            <FormControl fullWidth>
              <InputLabel id="select-state"></InputLabel>
              <Select
                labelId="select-state"
                id="state"
                // label=" "
                className={`select ${errors.state ? "invalid" : ""}`}
                name="state"
                value={address.state}
                inputRef={(ele) => {
                  fieldRefs.current[5] = ele;
                }}
                onChange={handleSelectChange}
              >
                <MenuItem value=" ">Select...</MenuItem>
                <MenuItem value="AB">Alberta</MenuItem>
                <MenuItem value="BC">British Columbia</MenuItem>
                <MenuItem value="MB">Manitoba</MenuItem>
                <MenuItem value="NB">New Brunswick</MenuItem>
                <MenuItem value="NL">Newfoundland and Labrador</MenuItem>
                <MenuItem value="NS">Nova Scotia</MenuItem>
                <MenuItem value="ON">Ontario</MenuItem>
                <MenuItem value="PE">Prince Edward Island</MenuItem>
                <MenuItem value="QC">Quebec</MenuItem>
                <MenuItem value="SK">Saskatchewan</MenuItem>
              </Select>
            </FormControl>
            {errors.state && (
              <div className="icons">
                <div className="error-icon-province"></div>
              </div>
            )}
            {errors.state && (
              <div className="errr-hint-province">{errors.state}</div>
            )}
          </div>
          <div className="col">
            <label className="label" htmlFor="">
              Postal code
            </label>
            <input
              type="text"
              className={errors.postalCode ? "invalid" : ""}
              name="postalCode"
              value={address.postalCode}
              ref={(ele) => {
                fieldRefs.current[6] = ele;
              }}
              onChange={handleFieldChange}
              onFocus={handleFieldFocus}
              onBlur={validate}
            />
            {errors.postalCode && (
              <div className="icons">
                <div className="error-icon"></div>
              </div>
            )}
            {errors.postalCode && (
              <div className="errr-hint">{errors.postalCode}</div>
            )}
          </div>
        </div>
      </form>
      <div>
        <FormControlLabel
          className="save-address"
          value={saveAddress}
          onClick={() => {
            setSaveAddress((prev) => !prev);
          }}
          control={<Checkbox color="default" />}
          label="Save address to my account"
        />
      </div>
    </div>
  );
});
