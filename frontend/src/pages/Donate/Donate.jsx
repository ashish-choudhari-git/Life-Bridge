import React, { Fragment, useState } from "react";
import axios from "axios";
import "./Donate.css";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "../../config/api";

export default function BloodDonationForm() {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Show "Submitting..." message 
    const loadingToastId = toast.info("Submitting...", {
      position: "top-center",
      autoClose: false, // Manually close when done
      closeOnClick: false,
      closeButton: false,
    });

    try {
      const response = await axios.post(
        API_ENDPOINTS.DONATE,
        formData
      );

      toast.dismiss(loadingToastId);

      toast.success("Form submitted successfully!", {
        position: "top-center",
        autoClose: 2000,
      });

      console.log("Server response:", response.data);
    } catch (error) {
      toast.dismiss(loadingToastId);

      toast.error("Something went wrong while submitting the form.", {
        position: "top-center",
        autoClose: 3000,
      });

      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="donorPage">
      <div className="form-container">
        <h2>Blood Donation Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="form-group">
              <label>Full Name</label>
              <input
                name="fullName"
                type="text"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Age</label>
              <input
                name="age"
                type="number"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label>Date of Birth</label>
              <input name="dob" type="date" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select name="gender" onChange={handleChange} required>
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label>Blood Group</label>
              <select name="bloodGroup" onChange={handleChange} required>
                <option value="">Select</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
                <option>O+</option>
                <option>O-</option>
              </select>
            </div>
            <div className="form-group">
              <label>Weight (kg)</label>
              <input
                name="weight"
                type="number"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label>Phone Number</label>
              <input name="phone" type="tel" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Alternate Phone Number</label>
              <input name="altPhone" type="tel" onChange={handleChange} />
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label>Email</label>
              <input name="email" type="email" onChange={handleChange} />
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label>City / District</label>
              <input name="city" type="text" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>State</label>
              <input
                name="state"
                type="text"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label>PIN Code</label>
              <input
                name="pincode"
                type="text"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Full Address</label>
              <input name="fullAddress" type="text" onChange={handleChange} />
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label>Preferred Donation Location</label>
              <select name="donationLocation" onChange={handleChange} required>
                <option value="">Select</option>
                <option>Home</option>
                <option>Camp</option>
                <option>Hospital</option>
              </select>
            </div>
          </div>

          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="ageAbove18"
                onChange={handleChange}
              />{" "}
              I am above 18 years
            </label>
            <label>
              <input
                type="checkbox"
                name="weightAbove50"
                onChange={handleChange}
              />{" "}
              I weigh more than 50 kg
            </label>
            <label>
              <input
                type="checkbox"
                name="notDonatedRecently"
                onChange={handleChange}
              />{" "}
              I have not donated blood in last 3 months
            </label>
            <label>
              <input type="checkbox" name="noDisease" onChange={handleChange} />{" "}
              I am not suffering from any communicable disease
            </label>
            <label>
              <input
                type="checkbox"
                name="consent"
                onChange={handleChange}
                required
              />{" "}
              I give consent to use my information
            </label>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
