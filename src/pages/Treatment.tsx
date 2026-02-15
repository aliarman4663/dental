
import { useSearchParams, useNavigate } from "react-router-dom";
import { treatmentPlans } from "../constants/treatmentPlans";
import { getTreatmentVideo } from "../utils/mediaUtils";
import "./Treatment.css";
import { ArrowLeft, Printer, Share2 } from "lucide-react";

export default function Treatment() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const complaint = searchParams.get("complaint");
    const plan = complaint ? treatmentPlans[complaint] : null;

    if (!plan) {
        return (
            <div className="treatment-container error-state">
                <div className="glass-panel error-card">
                    <h2 className="title">Treatment Plan Not Found</h2>
                    <p>We couldn't find a treatment plan for "{complaint}".</p>
                    <button onClick={() => navigate("/complaint")} className="back-btn">
                        <ArrowLeft size={16} /> Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="treatment-container">
            <header className="treatment-header">
                <div className="header-title">
                    <h1 className="complaint-title">{complaint}</h1>
                    <span className="department-tag">{plan.department}</span>
                </div>
                <div className="header-actions">
                    <button className="icon-btn" title="Print"><Printer size={20} /></button>
                    <button className="icon-btn" title="Share"><Share2 size={20} /></button>
                </div>
            </header>

            <div className="treatment-content">
                {plan.referralNotes && (
                    <div className="referral-banner">
                        <strong>Referral Notes:</strong> {plan.referralNotes}
                    </div>
                )}

                <div className="plans-grid">
                    {plan.mainTreatments.map((tx, idx) => {
                        const media = complaint ? getTreatmentVideo(complaint, tx.name) : null;
                        // Debug: log when media is found
                        if (media) {
                            console.log(`Found media for ${tx.name}:`, media);
                        }
                        return (
                            <div key={idx} className="plan-card-wrapper">
                                <div className="plan-card glass-panel">
                                    <div className="plan-header">
                                        <h3 className="plan-name">{tx.name}</h3>
                                        <span className="cost-badge">{tx.costRange}</span>
                                    </div>
                                    <ul className="methods-list">
                                        {tx.subMethods.map((method, mIdx) => (
                                            <li key={mIdx}>{method}</li>
                                        ))}
                                    </ul>
                                </div>
                                
                                {/* Display video or GIF/image below treatment plan if available */}
                                {media && (
                                    <div className="treatment-video-container">
                                        {media.type === 'video' ? (
                                            <video 
                                                className="treatment-video"
                                                controls
                                                playsInline
                                                autoPlay
                                                muted
                                                loop
                                                preload="auto"
                                                onError={(e) => {
                                                    console.error('Video failed to load:', media.path);
                                                    const target = e.target as HTMLVideoElement;
                                                    target.style.display = 'none';
                                                }}
                                            >
                                                <source src={media.path} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        ) : media.type === 'gif' ? (
                                            <img 
                                                src={media.path} 
                                                alt={`${tx.name} demonstration`}
                                                className="treatment-image treatment-gif"
                                                onError={(e) => {
                                                    console.error('Image/GIF failed to load:', media.path);
                                                    const target = e.target as HTMLImageElement;
                                                    target.style.display = 'none';
                                                }}
                                            />
                                        ) : (
                                            <img 
                                                src={media.path} 
                                                alt={`${tx.name} demonstration`}
                                                className="treatment-image"
                                                onError={(e) => {
                                                    console.error('Image failed to load:', media.path);
                                                    const target = e.target as HTMLImageElement;
                                                    target.style.display = 'none';
                                                }}
                                            />
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {plan.generalCostNote && (
                    <div className="cost-note">
                        <p><strong>Note:</strong> {plan.generalCostNote}</p>
                    </div>
                )}

                <footer className="disclaimer">
                    <p>* Final treatment, number of sittings, and exact cost depend on clinical
                        examination, X-rays, and dentist's decision. Prices are approximate
                        (college OPD rates) and subject to change.</p>
                </footer>
            </div>
        </div>
    );
}
