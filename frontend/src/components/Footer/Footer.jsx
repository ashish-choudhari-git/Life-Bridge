import react from "react";
import "./Footer.css";


export default function Footer(){
    return (
         <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-logo">
              <img src="/Life-Bridge-Logo.png" alt="LifeBridge Logo" />
            </div>

            <div className="footer-links">
              <div className="footer-section">
                <h4>Services</h4>
                <ul>
                  <li>
                    <a href="/NearestBloodBank">Nearest Blood Bank</a>
                  </li>
                  <li>
                    <a href="/Availability">Blood Availability</a>
                  </li>
                  <li>
                    <a href="/Donate">Blood Donation</a>
                  </li>
                </ul>
              </div>

              <div className="footer-section">
                <h4>Contact</h4>
                <ul>
                  <li>
                    <a href="mailto:contact.ashishchoudhari@gmail.com">
                      contact.ashishchoudhari@gmail.com
                    </a>
                  </li>
                  <li>
                    <a href="mailto:yachinverma@gmail.com">
                      yachinverma@gmail.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-bottom ">
            <p>
              © 2025 LifeBridge. Developed by Ashish Choudhari and Yachin Verma.
              For educational purposes only.
            </p>
          </div>
        </div>
      </footer>
    )
}