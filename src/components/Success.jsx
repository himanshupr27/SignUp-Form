import React from 'react'
import { useLocation } from "react-router-dom"
const Success = () => {
    const location = useLocation();
    const formData = location.state;
    console.log(formData);
    return (
        <div className="box">
            <div className="details form-div">
                <h3>Thanks for signing up, find your details below:</h3>
                <div className='text'>
                    <div>First Name: {formData.firstName}</div>
                    <div>Last Name: {formData.lastName}</div>
                    <div>Email Address: {formData.emailAddress}</div>
                    <div>Phone Number: {formData.phoneNo}</div>
                    <div>Aadhar Number: {formData.aadharNo}</div>
                    <div>Age: {formData.age}</div>
                    <div>PAN Number: {formData.panNo}</div>
                    <div>Country: {formData.country}</div>
                    <div>City: {formData.city}</div>
                </div>
            </div>
        </div>
    )
}

export default Success
