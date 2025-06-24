import "./Navbar.css"
import { useState } from "react"
import { Link } from "react-router-dom";

export default function Navbar() {
    // menu open/close ke liye state
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLinkClick = () => {
        setMenuOpen(false);
    };

    return (
        <div className="nav">
            <div className="nav-logo">
                <Link to="/" onClick={handleLinkClick}>
                    <img src="./Life-Bridge-Logo.png" alt="logo" />
                </Link>
            </div>

            <div className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div className={`nav-icons ${menuOpen ? 'show' : ''}`}>
                <p><Link to={'/'} className="Link" onClick={handleLinkClick}>Home</Link></p>
                <p><Link to={"/NearestBloodBank"} className="Link" onClick={handleLinkClick}>Nearest Blood Bank</Link></p>
                <p><Link to={"/availability"} className="Link" onClick={handleLinkClick}>Blood Availability</Link></p>
                <p><Link to={"/donate"} className="Link" onClick={handleLinkClick}>Donate</Link></p>
            </div>
        </div>
    )
}
