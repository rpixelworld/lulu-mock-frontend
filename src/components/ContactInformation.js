import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import "../assets/css/ContactInformation.scss";
import { useSelector } from "react-redux";

export const ContactInformation = forwardRef((props, ref) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [changed, setChanged] = useState(false);

  const userInfo = useSelector((state) => state.userReducer.userInfo);

  useImperativeHandle(ref, () => ({
    getContact: () => {
      return email;
    },
    isValid: () => {
      validateEmail(email);
      if (error.trim() != "") {
        return false;
      } else {
        return true;
      }
    },
  }));

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
      setError("Please enter your email address.");
    } else if (!emailRegex.test(email)) {
      setError("Please enter an email address in the format xxx@yyy.zzz");
    } else {
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateEmail(email);
    if (!error && email) {
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.email) {
      setEmail(userInfo.email);
    }
  }, [userInfo]);
  return (
    <div className="contact-information">
      <h2> Contact information</h2>
      <form onSubmit={handleSubmit}>
        <div className="contact">
          <label htmlFor="email">Email address (for order notification)</label>
          <input
            type="email"
            id="email"
            name="email"
            className={changed && error ? "error-input" : ""}
            value={email}
            onChange={handleEmailChange}
            onBlur={handleBlur}
          />
          {changed && error && <div className="error-icon"></div>}
          {changed && error && <p className="error-message">{error}</p>}
        </div>
        <p>
          <input type="checkbox" id="signup" name="signup" className="signup" />
          <label htmlFor="signup">
            Sign me up for lululemon emails (you can unsubscribe at any time).
            See our <a href="#">privacy policy</a> for details.
          </label>
        </p>
      </form>
    </div>
  );
});
