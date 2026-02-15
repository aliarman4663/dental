
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "../index.css";
import "./Complaint.css";

const COMPLAINTS = [
    { name: "Pain", hindi: "दर्द", image: "images/pain.jpg" },
    { name: "Decay", hindi: "सड़न / दाँतों की सड़न", image: "images/decay.jpg" },
    { name: "Attrition", hindi: "दाँतों का घिसाव", image: "images/Attrition/attrition.jpg" },
    { name: "Extraction", hindi: "दाँत निकालना / निष्कर्षण", image: "images/extraction.jpg" },
    { name: "Spacing", hindi: "दाँतों में गैप", image: "images/Spacing/spacing.jpg" },
    { name: "Discoloration", hindi: "दांतो में पिलापन", image: "images/Discoloration/discoloration.jpg" },
    { name: "Sensitivity", hindi: "झंझनाहट", image: "Chief complain/Sensitivity/sensitivity.jpg" },
    { name: "Food lodgement / Pockets", hindi: "भोजन फँसना", image: "images/Food_lodgement/food.jpg" },
    { name: "Irregularly placed teeth", hindi: "आधे टेढ़े दांत", image: "images/Irregular_teeth/irregular.jpg" },
    { name: "Trauma", hindi: "Trauma", image: "images/Others/trauma/trauma.jpg" },
    { name: "Ulcer", hindi: "Ulcer", image: "images/Others/Ulcer/ulcer.jpg" },
    { name: "Gingival Problem", hindi: "मसूड़ों की समस्या", image: "images/gingiva.jpg" },
    { name: "Deposits / Cleaning", hindi: "सफाई", image: "images/cleaning.jpg" },
    { name: "Swelling", hindi: "सूजन", image: "images/swelling.jpg" },
    { name: "Prosthesis", hindi: "नक्ली दांत", image: "images/prosthesis.jpg" }
];

export default function Complaint() {
    const navigate = useNavigate();

    const handleSelect = (complaint: string) => {
        navigate(`/treatment?complaint=${encodeURIComponent(complaint)}`);
    };

    return (
        <div className="complaint-container">
            <div className="complaint-header">
                <button onClick={() => navigate("/")} className="back-button">
                    <ArrowLeft size={20} />
                </button>
                <div className="header-content">
                    <h1 className="page-title">Chief Complaint</h1>
                    <p className="page-subtitle">Select the issue you are experiencing</p>
                </div>
                <div className="header-spacer"></div>
            </div>

            <div className="complaints-grid">
                {COMPLAINTS.map((item) => (
                    <div
                        key={item.name}
                        className="complaint-card glass-panel-sm"
                        onClick={() => handleSelect(item.name)}
                        title={item.name}
                    >
                        <div className="icon-container">
                            <img 
                                src={item.image} 
                                alt={item.name} 
                                className="complaint-icon-img"
                                onError={(e) => {
                                    console.error(`Failed to load image for ${item.name}:`, item.image);
                                    // Fallback to a default image if the specified one fails
                                    const target = e.target as HTMLImageElement;
                                    if (target.src !== 'images/cleaning.jpg') {
                                        target.src = 'images/cleaning.jpg';
                                    }
                                }}
                            />
                        </div>
                        <p className="complaint-label">{item.name}</p>
                        {item.hindi && <p className="complaint-label-hindi">{item.hindi}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
}
