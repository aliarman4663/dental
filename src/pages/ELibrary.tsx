import { useNavigate } from "react-router-dom";
import "./Complaint.css"; // Reusing Complaint styles

const E_LIBRARY_CATEGORIES = [
    {
        name: "Habit",
        type: "video",
        image: "images/E-library.jpg" // Using E-library image as placeholder
    },
    {
        name: "Precancerous lesion",
        type: "image",
        image: "images/E-library.jpg" // Using E-library image as placeholder
    }
];

export default function ELibrary() {
    const navigate = useNavigate();

    const handleSelect = (category: typeof E_LIBRARY_CATEGORIES[0]) => {
        navigate(`/elibrary-viewer?category=${encodeURIComponent(category.name)}&type=${encodeURIComponent(category.type)}`);
    };

    return (
        <div className="complaint-container">
            <div className="complaint-header">
                <h1 className="page-title">E-Library</h1>
                <p className="page-subtitle">Select a category to view educational content</p>
            </div>

            <div className="complaints-grid">
                {E_LIBRARY_CATEGORIES.map((category) => (
                    <div
                        key={category.name}
                        className="complaint-card glass-panel-sm"
                        onClick={() => handleSelect(category)}
                        title={category.name}
                    >
                        <div className="icon-container">
                            <img
                                src={category.image}
                                alt={category.name}
                                className="complaint-icon-img"
                                onError={(e) => {
                                    console.error(`Failed to load image for ${category.name}:`, category.image);
                                    const target = e.target as HTMLImageElement;
                                    if (target.src !== 'images/cleaning.jpg') {
                                        target.src = 'images/cleaning.jpg';
                                    }
                                }}
                            />
                        </div>
                        <p className="complaint-label">{category.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
