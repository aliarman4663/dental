import "./Home.css";

export default function Home() {
    return (
        <div className="home-container">
            <div className="home-header">
                <div className="branding-container">
                    <img src="images/rungta_logo.jpeg" alt="Rungta Group Logo" className="rungta-group-logo" />
                    <h1 className="college-name">Rungta College of Dental Sciences and Research</h1>
                </div>
                <div className="logo-container">
                    <img src="images/logo.jpeg" alt="College Logo" className="college-logo" />
                </div>
            </div>
        </div>
    );
}
