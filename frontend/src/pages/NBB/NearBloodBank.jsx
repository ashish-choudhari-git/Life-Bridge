import React, { useState, useEffect } from "react";
import axios from "axios";
import "./NearBloodBank.css";
import { ERAKTKOSH_API } from "../../config/api";

export default function NearBloodBank() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  // Function to fetch nearby blood banks 
  const fetchNearbyBloodBanks = async (lat, lng) => {
    try {
      const response = await axios.get(ERAKTKOSH_API.NEARBY_BLOOD_BANKS, {
        params: {
          hmode: "GETNEARBYBLOODBANK",
          latitude: lat,
          longitude: lng,
          lang: 0
        },
        timeout: 30000
      });

      const data = response.data;

      // Normalize data
      if (Array.isArray(data)) return data;
      if (data?.nearByBloodBankList) return data.nearByBloodBankList;

      for (const key in data) {
        if (Array.isArray(data[key])) {
          return data[key];
        }
      }

      return [];
    } catch (error) {
      console.error("Error in fetchNearbyBloodBanks:", error.message);
      throw new Error("eRaktkosh API fetch failed");
    }
  };

  useEffect(() => {
    let isMounted = true;

    const getLocationAndFetch = () => {
      if (navigator.geolocation) {
        setLoading(true);
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const lat = position.coords.latitude.toFixed(6);
            const lng = position.coords.longitude.toFixed(6);
            if (!isMounted) return;

            setLatitude(lat);
            setLongitude(lng);

            try {
              const data = await fetchNearbyBloodBanks(lat, lng);

              if (Array.isArray(data)) {
                setResults(data);
                setFilteredResults(data);
              } else {
                setError("Invalid data format from server.");
              }
            } catch (err) {
              setError("Failed to fetch nearby blood banks.");
            } finally {
              setLoading(false);
            }
          },
          (err) => {
            if (isMounted) {
              setError("Permission denied or failed to fetch location.");
              setLoading(false);
            }
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    getLocationAndFetch();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleFilterSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchTerm(keyword);

    if (!keyword.trim()) {
      setFilteredResults(results);
    } else {
      const filtered = results.filter((bank) =>
        bank[1]?.toLowerCase().includes(keyword)
      );
      setFilteredResults(filtered);
    }
  };

  const toggleCard = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="nnb-main">
      <h2 className="nnb-heading">Nearby Blood Banks</h2>

      <div className="find-form">
        <input
          className="nnb-select"
          type="text"
          placeholder="Search blood bank by name"
          value={searchTerm}
          onChange={handleFilterSearch}
        />
        <button
          className="nnb-Find-btn"
          onClick={() => setFilteredResults(results)}
        >
          Search
        </button>
      </div>

      {loading && (
        <div className="nbb-loading" style={{ textAlign: "center", marginTop: "1.5rem" }}>
          Searching nearby blood banks...
        </div>
      )}

      {error && <div className="nbb-error">{error}</div>}

      {!loading && filteredResults.length > 0 && (
        <div className="nnb-results-wrapper">
          <div className="nnb-results-grid">
            {filteredResults.map((bank, index) => (
              <div
                key={index}
                className={`nnb-result-card nnb-available-card ${openIndex === index ? "open" : ""}`}
                onClick={() => toggleCard(index)}
              >
                <h4>{bank[1] || "N/A"}</h4>

                <div className="nnb-details">
                  <p className="nnb-address">Address: {bank[2] || "N/A"}</p>
                  <p>Phone: {bank[3] || "N/A"}</p>
                  <p>Email: {bank[4] || "N/A"}</p>
                  <p>Category: {bank[5] || "N/A"}</p>
                  <div className="nnb-availability-info">
                    <span>Distance</span>
                    <p className="nnb-units">{bank[6] || "N/A"} km away</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && !error && filteredResults.length === 0 && (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          No results found.
        </div>
      )}
    </div>
  );
}
