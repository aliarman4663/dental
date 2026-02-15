import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "./ELibraryViewer.css";

const E_LIBRARY_CONTENT: Record<string, { type: string; items: Array<{ name: string; path: string }> }> = {
    "Habit": {
        type: "video",
        items: [
            {
                name: "Bruxism",
                path: "E library/Habit/Bruxism_.mp4"
            },
            {
                name: "Thumb sucking",
                path: "E library/Habit/Thumb sucking_.mp4"
            },
            {
                name: "Tongue thrusting",
                path: "E library/Habit/Tongue thrusting_.mp4"
            }
        ]
    },
    "Precancerous lesion": {
        type: "image",
        items: [
            {
                name: "Image 1",
                path: "E library/Precancerous lesion/1_20260213_220131_0000.png"
            },
            {
                name: "Image 2",
                path: "E library/Precancerous lesion/2_20260213_220131_0001.png"
            },
            {
                name: "Image 3",
                path: "E library/Precancerous lesion/3_20260213_220132_0002.png"
            },
            {
                name: "Image 4",
                path: "E library/Precancerous lesion/4_20260213_220132_0003.png"
            },
            {
                name: "Image 5",
                path: "E library/Precancerous lesion/5_20260213_220132_0004.png"
            }
        ]
    }
};

export default function ELibraryViewer() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const category = searchParams.get("category");
    const content = category ? E_LIBRARY_CONTENT[category] : null;

    if (!content) {
        return (
            <div className="elibrary-viewer-container error-state">
                <div className="glass-panel error-card">
                    <h2 className="title">Category Not Found</h2>
                    <p>We couldn't find content for "{category}".</p>
                    <button onClick={() => navigate("/elibrary")} className="back-btn">
                        <ArrowLeft size={16} /> Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="elibrary-viewer-container">
            <header className="viewer-header">
                <button onClick={() => navigate("/elibrary")} className="back-button">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="viewer-title">{category}</h1>
                <div className="header-spacer"></div>
            </header>

            <div className="media-content">
                {content.items.map((item, idx) => (
                    <div key={idx} className="media-section">
                        <div className="media-display">
                            {content.type === "video" ? (
                                <video
                                    className="elibrary-viewer-video"
                                    controls
                                    playsInline
                                    autoPlay
                                    muted
                                    loop
                                    preload="auto"
                                    onError={(e) => {
                                        console.error('Video failed to load:', item.path);
                                        const target = e.target as HTMLVideoElement;
                                        target.style.display = 'none';
                                    }}
                                >
                                    <source src={item.path} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <img
                                    src={item.path}
                                    alt={item.name}
                                    className="elibrary-viewer-image"
                                    onError={(e) => {
                                        console.error('Image failed to load:', item.path);
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                    }}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
