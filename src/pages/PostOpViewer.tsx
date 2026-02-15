import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./PostOpViewer.css";

export default function PostOpViewer() {
    const location = useLocation();
    const navigate = useNavigate();
    const { type } = location.state || {};

    // Redirect if no data
    useEffect(() => {
        if (!type || ((!type.images || type.images.length === 0) && (!type.videos || type.videos.length === 0))) {
            navigate("/postop");
        }
    }, [type, navigate]);

    if (!type || (!type.images && !type.videos)) {
        return null;
    }

    const images = type.images || [];
    const videos = type.videos || [];

    const handleClose = () => {
        navigate("/postop");
    };

    return (
        <div className="postop-viewer-container">
            {/* Header with title and close button */}
            <div className="viewer-header">
                <h2 className="viewer-title">{type.name}</h2>
                <button className="close-btn" onClick={handleClose}>
                    ✕
                </button>
            </div>

            {/* Main media display - Scrollable column */}
            <div className="image-display column-layout">
                {/* Display images first */}
                {images.map((imgSrc: string, index: number) => (
                    <img
                        key={`img-${index}`}
                        src={imgSrc}
                        alt={`${type.name} - Page ${index + 1}`}
                        className="instruction-image-list"
                        onError={(e) => {
                            console.error('Image failed to load:', imgSrc);
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                        }}
                    />
                ))}
                
                {/* Display videos after images */}
                {videos.map((videoSrc: string, index: number) => (
                    <video
                        key={`video-${index}`}
                        className="instruction-video-list"
                        controls
                        playsInline
                        autoPlay
                        muted
                        loop
                        preload="auto"
                        onError={(e) => {
                            console.error('Video failed to load:', videoSrc);
                            const target = e.target as HTMLVideoElement;
                            target.style.display = 'none';
                        }}
                    >
                        <source src={videoSrc} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ))}
            </div>
        </div>
    );
}
