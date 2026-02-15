import { useNavigate } from "react-router-dom";
import "../index.css";
import "./Complaint.css"; // Reusing the same styles

const POST_OP_TYPES = [
    {
        name: "Post op instructions after brackets",
        image: "images/instrucion_brackets.jpeg",
        images: [
            "images/Post op instructions after brackets/IMG-20260211-WA0017.jpg",
            "images/Post op instructions after brackets/IMG_20260211_121334.jpg"
        ],
        videos: [
            "images/Post op instructions after brackets/VID-20260211-WA0022.mp4",
            "Chief complain/Irregularly placed teeth/Tt/Brackets/Copy of VIDEO-2025-12-28-19-15-08.mp4",
            "Chief complain/Spacing/Tt/Brackets/Copy of VIDEO-2025-12-28-19-15-08.mp4"
        ]
    },
    {
        name: "Post op instructions after extraction",
        image: "images/instruction_extraction.jpeg",
        images: [
            "images/Post op instructions after extraction/1.png",
            "images/Post op instructions after extraction/2.jpg",
            "images/Post op instructions after extraction/3.jpg",
            "images/Post op instructions after extraction/4.jpg",
            "images/Post op instructions after extraction/5.webp"
        ],
        videos: []
    },
    {
        name: "Post op instructions after RCT",
        image: "images/instruction_RCT.jpeg",
        images: [
            "images/Post op instructions after RCT/IMG-20260211-WA0019.jpg"
        ],
        videos: []
    }
];

export default function PostOp() {
    const navigate = useNavigate();

    const handleSelect = (type: typeof POST_OP_TYPES[0]) => {
        // Navigate to viewer with the images
        navigate(`/postop-viewer`, { state: { type } });
    };

    return (
        <div className="complaint-container">
            <div className="complaint-header">
                <h1 className="page-title">Post Operation Care</h1>
                <p className="page-subtitle">Select the type of post-operative care instructions</p>
            </div>

            <div className="complaints-grid">
                {POST_OP_TYPES.map((item) => (
                    <div
                        key={item.name}
                        className="complaint-card glass-panel-sm"
                        onClick={() => handleSelect(item)}
                        title={item.name}
                    >
                        <div className="icon-container">
                            <img src={item.image} alt={item.name} className="complaint-icon-img" />
                        </div>
                        <p className="complaint-label">{item.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
