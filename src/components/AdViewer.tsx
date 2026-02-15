import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdViewer.css";

// Global state for ad viewer
let adViewerState: {
    setIsVisible: ((visible: boolean) => void) | null;
} = {
    setIsVisible: null
};

export function openAdViewer() {
    if (adViewerState.setIsVisible) {
        adViewerState.setIsVisible(true);
    }
}

export default function AdViewer() {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        // Register the setState function
        adViewerState.setIsVisible = setIsVisible;
        return () => {
            adViewerState.setIsVisible = null;
        };
    }, []);

    useEffect(() => {
        if (isVisible) {
            // Prevent body scroll when ad is visible
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            
            // Play video when visible
            setTimeout(() => {
                if (videoRef.current) {
                    videoRef.current.play().catch((err) => {
                        console.error("Error playing advertisement:", err);
                    });
                }
            }, 100);
        } else {
            // Restore body scroll when ad is hidden
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            
            // Reset video when hidden
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
        }
        
        // Cleanup on unmount
        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, [isVisible]);

    const closeAd = () => {
        setIsVisible(false);
        // Navigate to home
        navigate("/");
    };

    // Handle click anywhere on the overlay or video
    const handleClick = () => {
        closeAd();
    };

    // Handle touch events
    const handleTouchStart = () => {
        closeAd();
    };

    return (
        <>
            {isVisible && (
                <div 
                    className="ad-viewer-overlay" 
                    onClick={handleClick}
                    onTouchStart={handleTouchStart}
                >
                    <div className="ad-viewer-container">
                        <video
                            ref={videoRef}
                            className="ad-viewer-video"
                            src="advertisement.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            onClick={handleClick}
                            onTouchStart={handleTouchStart}
                            onError={(e) => {
                                console.error("Advertisement video failed to load");
                                const target = e.target as HTMLVideoElement;
                                target.style.display = "none";
                            }}
                        >
                            Your browser does not support the video tag.
                        </video>
                        <div className="ad-viewer-close-hint">
                            <p>Click anywhere to return to home</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
