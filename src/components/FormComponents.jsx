import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";

const emailValidator = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

function FormComponent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    passwordConfirmation: "",
    phoneNo: "",
    aadharNo: "",
    age: "",
    panNo: "",
    country: "",
    city: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [countryCode, setCountryCode] = useState("");

  const validateField = (name, value) => {
    let error = "";
    if (name === "firstName" && value.trim() === "") error = "First Name is required";
    if (name === "lastName" && value.trim() === "") error = "Last Name is required";
    if (name === "emailAddress") {
      if (value.trim() === "") error = "Email Address is required";
      else if (!emailValidator.test(value)) error = "Email is not valid";
    }
    if (name === "password") {
      if (value.trim() === "") error = "Password is required";
      else if (!passwordValidator.test(value))
        error = "Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase!";
    }
    if (name === "passwordConfirmation") {
      if (value !== formData.password) error = "Password does not match Confirmation";
    }
    if (name === "phoneNo" && value.trim() === "") error = "Phone number is required";
    if (name === "aadharNo" && value.trim() === "") error = "Aadhar number is required";
    if (name === "age" && value.trim() === "") error = "Age number is required";
    if (name === "panNo" && value.trim() === "") error = "PAN number is required";
    if (name === "country" && value.trim() === "") error = "Country is required";
    if (name === "city" && value.trim() === "") error = "City is required";
    return error;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: validateField(name, value) }));

    if (name === "country") {
      setCountryCode(countryCodes[value] || "");
      setFormData((prevData) => ({ ...prevData, city: "" }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((name) => {
      const error = validateField(name, formData[name]);
      if (error) newErrors[name] = error;
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      navigate("/success", { state: formData });
    }
  };

  const isFormValidCheck = useCallback(() => {
    return (
      formData.firstName &&
      formData.lastName &&
      emailValidator.test(formData.emailAddress) &&
      passwordValidator.test(formData.password) &&
      formData.password === formData.passwordConfirmation &&
      formData.phoneNo &&
      formData.aadharNo &&
      formData.age &&
      formData.panNo &&
      formData.country &&
      formData.city &&
      Object.values(errors).every((error) => error === "")
    );
  }, [formData, errors]);

  useEffect(() => {
    setIsFormValid(isFormValidCheck());
  }, [formData, errors, isFormValidCheck]);

  const countries = ["India", "USA"];
  const cities = {
    India: ["Mumbai", "Delhi", "Bangalore"],
    USA: ["New York", "San Francisco", "Los Angeles"],
  };

  const countryCodes = {
    India: "+91",
    USA: "+1",
  };

  return (
    <div className="box">
      <div className="form-div">
        <h1>SIGNUP <span>FORM</span></h1>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                autoComplete="off"
              />
              {errors.firstName && <div className="errorMsg">{errors.firstName}</div>}
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                autoComplete="off"
              />
              {errors.lastName && <div className="errorMsg">{errors.lastName}</div>}
            </div>
              <input style={{"width":"40vmax"}}
                type="email"
                placeholder="Email Address"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleChange}
                autoComplete="off"
              />
              {errors.emailAddress && <div className="errorMsg">{errors.emailAddress}</div>}
            <div className="d-flex" style={{"width":"42vmax"}}>
              <div className="password">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <BsFillEyeSlashFill style={{ color: "rgb(0, 172, 158)" , "background-color":"rgba(255, 255, 255, 0.715)"}} /> : <BsFillEyeFill style={{ color: "rgb(0, 172, 158)" }} />}
                </button>
              </div>
              {errors.password && <div className="errorMsg">{errors.password}</div>}
              <input
                type="password"
                placeholder="Confirm Password"
                name="passwordConfirmation"
                value={formData.passwordConfirmation}
                onChange={handleChange}
                autoComplete="off"
              />
              {errors.passwordConfirmation && <div className="errorMsg">{errors.passwordConfirmation}</div>}
            </div>
            <div className="d-flex">
              <div className="phone-input">
                <span>{countryCode}</span>
                <input
                  type="text"
                  placeholder="Phone Number"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
              {errors.phoneNo && <div className="errorMsg">{errors.phoneNo}</div>}
              <input
                type="text"
                placeholder="Age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                autoComplete="off"
              />
              {errors.age && <div className="errorMsg">{errors.age}</div>}
            </div>
            <div>
              <input
                type="text"
                placeholder="Aadhar Number"
                name="aadharNo"
                value={formData.aadharNo}
                onChange={handleChange}
                autoComplete="off"
              />
              {errors.aadharNo && <div className="errorMsg">{errors.aadharNo}</div>}
              <input
                type="text"
                placeholder="PAN Number"
                name="panNo"
                value={formData.panNo}
                onChange={handleChange}
                autoComplete="off"
              />
              {errors.panNo && <div className="errorMsg">{errors.panNo}</div>}
            </div>
            <div className="select-div">
              <select name="country" value={formData.country} onChange={handleChange}>
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              {errors.country && <div className="errorMsg">{errors.country}</div>}
              <select name="city" value={formData.city} onChange={handleChange}>
                <option value="">Select City</option>
                {formData.country && cities[formData.country].map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              {errors.city && <div className="errorMsg">{errors.city}</div>}
            </div>
            <div>
              <button type="submit" disabled={!isFormValid} className="signup">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormComponent;
