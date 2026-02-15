import { useNavigate, useLocation } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import "./Navbar.css";

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    // Don't show navbar on home page
    if (location.pathname === "/") {
        return null;
    }

    const isRegistration = location.pathname === "/registration";
    const isTreatment = location.pathname.includes("/treatment");

    const handleHome = () => {
        navigate("/");
    };

    const handleBack = () => {
        navigate("/complaint");
    };

    return (
        <nav className="navbar">
            <div className="nav-college-info">
                <img src="images/logo.jpeg" alt="College Logo" className="nav-logo" />
                <span className="nav-college-name">Rungta College of Dental Sciences and Research</span>
            </div>

            {isTreatment && (
                <button onClick={handleBack} className="nav-btn back-btn" title="Back to Complaint">
                    <ArrowLeft size={20} />
                    <span>Back</span>
                </button>
            )}

            <div className="nav-title">
                {isRegistration && "Patient Registration"}
                {isTreatment && "Treatment Plan"}
                {!isRegistration && !isTreatment && location.pathname !== "/complaint" && "E-Library"}
            </div>

            <button onClick={handleHome} className="nav-btn home-btn" title="Go to Home">
                <Home size={20} />
                <span>Home</span>
            </button>
        </nav>
    );
}
