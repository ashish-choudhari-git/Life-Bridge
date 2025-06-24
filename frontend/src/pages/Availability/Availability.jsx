import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Availability.css";
import { API_ENDPOINTS, ERAKTKOSH_API } from "../../config/api";

export default function Availability() {
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [bloodGroup, setBloodGroup] = useState("all");
  const [bloodComponent, setBloodComponent] = useState("11");
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINTS.STATE_DISTRICT}/states`);
        setStates(response.data);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };
    fetchStates();
  }, []);

  const handleStateChange = async (e) => {
    const stateCode = e.target.value;
    setSelectedState(stateCode);
    setSelectedDistrict("");
    setDistricts([]);
    if (stateCode) {
      try {
        const response = await axios.get(`${API_ENDPOINTS.STATE_DISTRICT}/districts/${stateCode}`);
        setDistricts(response.data);
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    }
  };

  const handleSearch = async () => {
    if (!selectedState || !selectedDistrict) {
      alert("Please select both state and district.");
      return;
    }

    setLoading(true);
    setResults([]);
    try {
      console.log("Searching with params:", {
        stateCode: selectedState,
        districtCode: selectedDistrict,
        bloodGroup: bloodGroup,
        bloodComponent: bloodComponent,
      });

      const response = await axios.get(ERAKTKOSH_API.BLOOD_STOCK, {
        params: {
          hmode: "GETNEARBYSTOCKDETAILS",
          stateCode: selectedState,
          districtCode: selectedDistrict,
          bloodGroup: bloodGroup || "all",
          bloodComponent: bloodComponent || "all",
          lang: 0,
        },
      });

      console.log("API Response:", response.data);

      if (response.data && response.data.data) {
        const parsedData = response.data.data.map(item => {
            const [id, details, category, availabilityHtml, lastUpdatedDate] = item;

            const detailsParts = details.split('<br/>');
            const bloodBankName = detailsParts[0] || 'N/A';
            const address = detailsParts[1] || 'N/A';
            
            let phone = 'N/A';
            let email = 'N/A';
            if (detailsParts[2]) {
                const contactString = detailsParts[2];
                const phoneMatch = contactString.match(/Phone: (.*?)(?=(,Fax:|, Email:|$))/);
                const emailMatch = contactString.match(/Email: ([\w.@-]+)/);
                if (phoneMatch) phone = phoneMatch[1].trim();
                if (emailMatch) email = emailMatch[1].trim();
            }

            const available_units = [];
            if (availabilityHtml.includes('text-success')) {
                const cleanText = availabilityHtml.replace(/<[^>]+>/g, '').replace('Available,', '').trim();
                if (cleanText) {
                    const units = cleanText.split(',').map(part => {
                        const [group, count] = part.trim().split(':');
                        return { group, units: count };
                    });
                    available_units.push(...units);
                }
            }

            return {
                bloodBankName,
                address,
                phone,
                email,
                category,
                lastUpdatedDate,
                available_units
            };
        });
        setResults(parsedData);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Error fetching stock:", error);
      console.error("Error details:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message
      });
      alert(`Error: ${error.response?.data?.error || error.message}`);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const available = results.filter((item) => item.available_units.length > 0);
  const unavailable = results.filter(
    (item) => item.available_units.length === 0
  );

  return (
    <div className="availability-main">
      <h2 className="availability-heading">
        Blood Stock Availability
      </h2>
      <div className="availability-content">
        <div className="availability-card">
          <div className="availability-card-header">
            Search Blood Stock
          </div>
          <form className="search-form">
            <div>
              <select
                className="availability-select"
                value={selectedState}
                onChange={handleStateChange}
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.stateCode} value={state.stateCode}>
                    {state.stateName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                className="availability-select"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
              >
                <option value="">Select District</option>
                {districts.map((dist, index) => (
                  <option key={`${dist.code}-${index}`} value={dist.code}>
                    {dist.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                className="availability-select"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
              >
                <option value="all">All Blood Groups</option>
                <option value="18">AB-Ve</option>
                <option value="17">AB+Ve</option>
                <option value="12">A-Ve</option>
                <option value="11">A+Ve</option>
                <option value="14">B-Ve</option>
                <option value="13">B+Ve</option>
                <option value="23">Oh-VE</option>
                <option value="22">Oh+VE</option>
                <option value="16">O-Ve</option>
                <option value="15">O+Ve</option>
              </select>
            </div>

            <div>
              <select
                className="availability-select"
                value={bloodComponent}
                onChange={(e) => setBloodComponent(e.target.value)}
              >
                <option value="-1">Select Blood Components</option>
                <option value="11">Whole Blood</option>
                <option value="14">Single Donor Platelet</option>
                <option value="18">Single Donor Plasma</option>
                <option value="28">Sagm Packed Red Blood Cells</option>
                <option value="23">Random Donor Platelets</option>
                <option value="16">Platelet Rich Plasma</option>
                <option value="20">Platelet Concentrate</option>
                <option value="19">Plasma</option>
                <option value="12">Packed Red Blood Cells</option>
                <option value="30">Leukoreduced Rbc</option>
                <option value="29">Irradiated RBC</option>
                <option value="13">Fresh Frozen Plasma</option>
                <option value="17">Cryoprecipitate</option>
                <option value="21">Cryo Poor Plasma</option>
              </select>
            </div>
          </form>
        </div>

        <div className="availability-search-btn-wrapper">
          <button
            onClick={handleSearch}
            disabled={loading}
            className="availability-search-btn"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {results.length > 0 && (
          <div className="availability-results-wrapper">
            <h3 className="availability-available-heading">Available</h3>
            <div className="results-grid">
              {available.map((item, idx) => (
                <div key={`${item.bloodBankName}-${idx}`} className="result-card available-card">
                  <h4>{item.bloodBankName}</h4>
                  <p className="address">Address:{item.address}</p>
                  <p>Phone: {item.phone || "N/A"}</p>
                  <p>Email: {item.email || "N/A"}</p>
                  <p>Category: {item.category || "N/A"}</p>
                  <div className="availability-info">
                    <span>Available</span>
                    <p className="units">
                      {item.available_units
                        .map((u) => `${u.group}:${u.units}`)
                        .join(", ")}
                    </p>
                  </div>
                  <p className="timestamp">
                    Last Updated: {item.lastUpdatedDate}
                  </p>
                </div>
              ))}
            </div>

            <h3 className="availability-unavailable-heading">Unavailable</h3>
            <div className="results-grid">
              {unavailable.map((item, idx) => (
                <div key={`${item.bloodBankName}-${idx}`} className="result-card unavailable-card">
                  <h4>{item.bloodBankName}</h4>
                  <p className="address">Address:{item.address}</p>
                  <p>Phone: {item.phone || "N/A"}</p>
                  <p>Email: {item.email || "N/A"}</p>
                  <p>Category: {item.category || "N/A"}</p>
                  <div className="availability-info unavailable">
                    <span>Not Available</span>
                  </div>
                   <p className="timestamp">
                    Last Updated: {item.lastUpdatedDate}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
