import React, { useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [selectedBloodGroup, setSelectedBloodGroup] = useState(null);
  const [selectedDonationType, setSelectedDonationType] = useState(null);

  const handleCardClick = (route) => {
    navigate(route);
     window.scrollTo(0, 0);
  };

  const handleBloodGroupClick = (bloodGroup) => {
    setSelectedBloodGroup(bloodGroup);
  };
  const handleDonationTypeClick = (type) => {
    setSelectedDonationType((prevType) => (prevType === type ? null : type));
  };

  const bloodCompatibility = {
    "A+": {
      canReceive: ["A+", "A-", "O+", "O-"],
      canDonate: ["A+", "AB+"],
    },
    "A-": {
      canReceive: ["A-", "O-"],
      canDonate: ["A+", "A-", "AB+", "AB-"],
    },
    "B+": {
      canReceive: ["B+", "B-", "O+", "O-"],
      canDonate: ["B+", "AB+"],
    },
    "B-": {
      canReceive: ["B-", "O-"],
      canDonate: ["B+", "B-", "AB+", "AB-"],
    },
    "AB+": {
      canReceive: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      canDonate: ["AB+"],
    },
    "AB-": {
      canReceive: ["A-", "B-", "AB-", "O-"],
      canDonate: ["AB+", "AB-"],
    },
    "O+": {
      canReceive: ["O+", "O-"],
      canDonate: ["A+", "B+", "AB+", "O+"],
    },
    "O-": {
      canReceive: ["O-"],
      canDonate: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
  };

  const donationTypes = {
    "red-cells": {
      title: "Packed Red Blood Cells",
      whatIsIt:
        "Blood Collected straight from the donor into a blood bag and mixed with an anticoagulant is called as whole blood. This collected whole blood is then centrifuged and red cell, platelets and plasma are separated. The separated Red cells are mixed with a preservative to be called as packed red blood cells.",
      whoCanDonate:
        "You need to be 18-65 years old, weight 45kg or more and be fit and healthy.",
      usedFor:
        "Correction of severe anemia in a number of conditions and blood loss in case of child birth, surgery or trauma settings.",
      lastsFor: "Red cells can be stored for 42 days at 2-6 degree celsius.",
      howLong: "15-30 minutes to donate including the pre-donation check-up.",
      howOften:
        "Male donors can donate again after 90 days and female donors can donate again after 120 days.",
      image: "/RBC.jpeg",
    },
    plasma: {
      title: "Plasma",
      whatIsIt:
        "The straw-coloured liquid in which red blood cells, white blood cells, and platelets float in is called plasma. Contains special nutrients which can be used to create 18 different type of medical products to treat many different medical conditions. Plasma can be obtained from the collected whole blood after red blood cells and platelets have been separated. Additionally, it can also be collected using an apheresis equipment where other components are returned to the donor. The former is a common method of plasma preparation in our country.",
      whoCanDonate:
        "The donation criteria is similar to that of red blood cell. However, for apheresis plasma collection minimum weight is 50 kgs.",
      usedFor:
        "Used for bleeding patients with coagulation factor deficiency such as hemophilia A and B, von willibrand disease etc. also used in cases of blood loss due to trauma.",
      lastsFor:
        "Plasma after separation if frozen below -30 degrees can be stored up to one year.",
      howLong: "15-30 minutes to donate including the pre-donation check-up.",
      howOften: "Similar to the red cell donation.",
      image: "/plasma.png",
    },
    platelets: {
      title: "Platelets",
      whatIsIt:
        "These are cellular elements in blood which wedge together to help to clot and reduce bleeding. Always in high demand, Vital for people with low platelet count, like hematology and cancer patients.",
      whoCanDonate:
        "One can donate whole blood from which the blood centre will separate platelets from other components. Criteria similar to whole blood donation apply. Alternatively, one can donate using apheresis equipment where only platelets are collected and rest components are returned back to donate. One need to satisfy whole blood criteria and pre-donation screening which include negative infectious markers and platelet count >1,50,000 per microlitre of blood. Weight should be >50kgs.",
      usedFor:
        "Conditions with very low platelet count such as Cancer, blood diseases, trauma, dengue etc.",
      lastsFor: "Can be stored for 5 days at 20-24 degree celsius.",
      howLong: "45-60 minutes to donate. 2-3 hours for pre-donation screening.",
      howOften:
        "You can typically donate platelets every 2-7 days, with a maximum of 24 times per year.",
      howItWorks:
        "We collect your blood, keep platelet and return rest to you by apheresis donation.",
      howLongDetailed:
        "45-60 minutes to donate. 2-3 hours for pre-donation screening.",
      image: "/platelets.jpg",
    },
  };

  return (
    <>
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-heading">Find Blood Banks Instantly</h1>
            <p className="hero-subheading">
              Connect with verified blood Banks in your area during emergencies.
              LifeBridge helps you find the right blood type quickly when every
              minute counts.
            </p>
            <button className="hero-button" onClick={() => navigate("/availability")}>Search Blood Bank</button>
          </div>

          <div className="hero-image">
            <img src="/BB-g.svg" alt="LifeBridge Blood Donation" />
          </div>
        </div>
      </div>

      <hr
        className="hr-section"
        style={{
          visibility: "hidden",
          margin: "2rem",
        }}
      />
<div className="section card-Main">
        <h2 className="section-heading service">
          Our Services
        </h2>
        <div className="cardSection">
          <div
            className="card"
            onClick={() => handleCardClick("/Availability")}
            style={{ cursor: "pointer" }}
          >
            <img src="/BBA.png" alt="Blood Bank" className="card-1" />
            <h3>Find Blood Banks</h3>
          </div>

          <div
            className="card"
            onClick={() => handleCardClick("/NearestBloodBank")}
            style={{ cursor: "pointer" }}
          >
            <img src="/BBD.png" alt="Donate Blood" />
            <h3>Nearest Blood Bank </h3>
          </div>

          <div
            className="card"
            onClick={() => handleCardClick("/Donate")}
            style={{ cursor: "pointer" }}
          >
            <img src="/BBDF.png" alt="Blood Availability" />
            <h3>Donate Blood</h3>
          </div>
        </div>
      </div>

      <div className="aboutBox">
        <div className="section-container about-container">
          <div className="section-content about-content">
            <div className="about-text">
              <h2 className="about-heading">About LifeBridge</h2>
              <p className="about-description">
                <strong>LifeBridge</strong> is a digital platform designed to
                connect people with verified blood banks, check real-time blood
                availability, and encourage voluntary blood donations. With a
                mission to make blood accessibility faster and easier.
              </p>
              <p className="about-description">
                LifeBridge provides features such as locating the nearest blood
                centers, checking the availability of specific blood types.
              </p>
            </div>

            <div className="about-divider"></div>

            <div className="about-logo">
              <img src="/Life-Bridge-Logo.png" alt="LifeBridge Logo" />
            </div>
          </div>
        </div>
      </div>

      {/* Blood Group Section */}
      <div className="blood-group-section">
        <div className="blood-container">
          <h2 className="blood-heading">
            Blood Group Compatibility
          </h2>

          <div className="blood-content">
            {/* Blood Group Buttons */}
            <div className="blood-buttons">
              <h3 className="blood-subheading">Select Your Blood Group</h3>
              <div className="button-grid">
                <button
                  className={`blood-btn ${selectedBloodGroup === "A+" ? "active" : ""}`}
                  onClick={() => handleBloodGroupClick("A+")}
                >
                  A+
                </button>
                <button
                  className={`blood-btn ${selectedBloodGroup === "A-" ? "active" : ""}`}
                  onClick={() => handleBloodGroupClick("A-")}
                >
                  A-
                </button>
                <button
                  className={`blood-btn ${selectedBloodGroup === "B+" ? "active" : ""}`}
                  onClick={() => handleBloodGroupClick("B+")}
                >
                  B+
                </button>
                <button
                  className={`blood-btn ${selectedBloodGroup === "B-" ? "active" : ""}`}
                  onClick={() => handleBloodGroupClick("B-")}
                >
                  B-
                </button>
                <button
                  className={`blood-btn ${selectedBloodGroup === "AB+" ? "active" : ""}`}
                  onClick={() => handleBloodGroupClick("AB+")}
                >
                  AB+
                </button>
                <button
                  className={`blood-btn ${selectedBloodGroup === "AB-" ? "active" : ""}`}
                  onClick={() => handleBloodGroupClick("AB-")}
                >
                  AB-
                </button>
                <button
                  className={`blood-btn ${selectedBloodGroup === "O+" ? "active" : ""}`}
                  onClick={() => handleBloodGroupClick("O+")}
                >
                  O+
                </button>
                <button
                  className={`blood-btn ${selectedBloodGroup === "O-" ? "active" : ""}`}
                  onClick={() => handleBloodGroupClick("O-")}
                >
                  O-
                </button>
              </div>
            </div>

            {/* Compatibility Info Box */}
            <div className="compatibility-box">
              <div className="compatibility-header">
                <h3>Compatibility Information</h3>
              </div>

              <div className="compatibility-content">
                <div className="compatibility-section">
                  <h4>Can Receive From:</h4>
                  <p className="receiver-info">
                    {selectedBloodGroup
                      ? bloodCompatibility[selectedBloodGroup].canReceive.join(
                          ","
                        )
                      : "Select a blood group"}
                  </p>
                </div>

                <div className="compatibility-section">
                  <h4>Can Donate To:</h4>
                  <p className="donor-info">
                    {selectedBloodGroup
                      ? bloodCompatibility[selectedBloodGroup].canDonate.join(
                          ", "
                        )
                      : "Select a blood group"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blood Donation Flow Chart Section */}
      <div className="flow-chart-section">
        <div className="flow-container">
          <h2 className="flow-heading">
            Blood Donation Process
          </h2>
          <p className="flow-subtitle">
            Understanding why blood banks charge and how your donation helps
            save lives
          </p>

          <div className="flow-chart">
            <div className="flow-step">
              <div className="step-icon">&#x1FA78;</div>
              <h3>Blood Donation</h3>
              <p>Volunteer donates blood at collection center</p>
            </div>

            <div className="flow-arrow">&#x2192;</div>

            <div className="flow-step">
              <div className="step-icon">&#x1F9EA;</div>
              <h3>Testing & Screening</h3>
              <p>Blood tested for diseases, blood type, and compatibility</p>
            </div>

            <div className="flow-arrow">&#x2192;</div>

            <div className="flow-step">
              <div className="step-icon">&#x1F52C;</div>
              <h3>Processing</h3>
              <p>Blood components (RBC, Plasma, Platelets)</p>
            </div>

            <div className="flow-arrow">&#x2192;</div>

            <div className="flow-step">
              <div className="step-icon">&#x2744;</div>
              <h3>Storage</h3>
              <p>Proper storage at controlled temperatures</p>
            </div>

            <div className="flow-arrow">&#x2192;</div>

            <div className="flow-step">
              <div className="step-icon">&#x1F3E5;</div>
              <h3>Distribution</h3>
              <p>Blood sent to hospitals and medical centers</p>
            </div>

            <div className="flow-arrow">&#x2192;</div>

            <div className="flow-step">
              <div className="step-icon heart">&#10084;</div>
              <h3>Recipient</h3>
              <p>Blood transfused to patient in need</p>
            </div>
          </div>
        </div>
      </div>

      {/* Donation Types Section */}
      <div className="donation-types-section">
        <div className="donation-container no-scrollbar">
          <h2 className="donation-heading">
            Types of Donation
          </h2>
          <p className="donation-subtitle">
            The average human body contains about five litres of blood, which is
            made of several cellular and non-cellular components such as Red
            blood cell, Platelet, and Plasma.
          </p>

          <div className="donation-options">
            <button
              className={`donation-option ${selectedDonationType === "red-cells" ? "active" : ""}`}
              onClick={() => handleDonationTypeClick("red-cells")}
            >
              <div className="option-icon">&#x1FA78;</div>
              <h3>Red Blood Cells</h3>
            </button>

            <button
              className={`donation-option ${selectedDonationType === "plasma" ? "active" : ""}`}
              onClick={() => handleDonationTypeClick("plasma")}
            >
              <div className="option-icon">&#x1F4A7;</div>
              <h3>Plasma</h3>
            </button>

            <button
              className={`donation-option ${selectedDonationType === "platelets" ? "active" : ""}`}
              onClick={() => handleDonationTypeClick("platelets")}
            >
              <div className="option-icon"> &#x1FA79;</div>
              <h3>Platelets</h3>
            </button>
          </div>

          {selectedDonationType && (
            <div className="donation-details">
              <h3 className="details-title">{donationTypes[selectedDonationType].title}</h3>
              <div className="details-content">
                <div className="details-text">
                  <div className="detail-section">
                    <h4>What is it?</h4>
                    <p>{donationTypes[selectedDonationType].whatIsIt}</p>
                  </div>

                  <div className="detail-section">
                    <h4>Who can donate?</h4>
                    <p>{donationTypes[selectedDonationType].whoCanDonate}</p>
                  </div>

                  <div className="detail-section">
                    <h4>Used For?</h4>
                    <p>{donationTypes[selectedDonationType].usedFor}</p>
                  </div>

                  <div className="detail-section">
                    <h4>Lasts For?</h4>
                    <p>{donationTypes[selectedDonationType].lastsFor}</p>
                  </div>

                  <div className="detail-section">
                    <h4>How long does it take to donate?</h4>
                    <p>{donationTypes[selectedDonationType].howLong}</p>
                  </div>

                  <div className="detail-section">
                    <h4>How often can I donate?</h4>
                    <p>{donationTypes[selectedDonationType].howOften}</p>
                  </div>

                  {selectedDonationType === "platelets" && (
                    <>
                      <div className="detail-section">
                        <h4>How does it work?</h4>
                        <p>{donationTypes[selectedDonationType].howItWorks}</p>
                      </div>
                      <div className="detail-section">
                        <h4>How long does it take?</h4>
                        <p>
                          {donationTypes[selectedDonationType].howLongDetailed}
                        </p>
                      </div>
                    </>
                  )}
                </div>

                <div className="details-image no-scrollbar">
                  <img
                    src={donationTypes[selectedDonationType].image}
                    alt={donationTypes[selectedDonationType].title}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;