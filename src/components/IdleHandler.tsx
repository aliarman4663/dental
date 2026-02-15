import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./IdleHandler.css";

const IDLE_REDIRECT_TIME = 3 * 60 * 1000; // 3 minutes in milliseconds
const IDLE_AD_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds

export default function IdleHandler() {
    const [showAd, setShowAd] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const lastActivityRef = useRef<number>(Date.now());
    const redirectTimerRef = useRef<number | null>(null);
    const adTimerRef = useRef<number | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const showAdRef = useRef<boolean>(false);

    // Update ref when showAd changes
    useEffect(() => {
        showAdRef.current = showAd;
    }, [showAd]);

    const resetTimers = useCallback(() => {
        const now = Date.now();
        lastActivityRef.current = now;

        // Clear existing timers
        if (redirectTimerRef.current) {
            clearTimeout(redirectTimerRef.current);
        }
        if (adTimerRef.current) {
            clearTimeout(adTimerRef.current);
        }

        // Hide advertisement if showing
        if (showAdRef.current) {
            setShowAd(false);
            if (videoRef.current) {
                videoRef.current.pause();
            }
        }

        // Don't redirect if already on home page
        if (location.pathname === "/") {
            return;
        }

        // Set redirect timer (3 minutes)
        redirectTimerRef.current = setTimeout(() => {
            navigate("/");
        }, IDLE_REDIRECT_TIME);

        // Set advertisement timer (5 minutes)
        adTimerRef.current = setTimeout(() => {
            setShowAd(true);
            // Use setTimeout to ensure video ref is available
            setTimeout(() => {
                if (videoRef.current) {
                    videoRef.current.play().catch((err) => {
                        console.error("Error playing advertisement:", err);
                    });
                }
            }, 100);
        }, IDLE_AD_TIME);
    }, [navigate, location.pathname]);

    useEffect(() => {
        // Reset timers on mount and when location changes
        resetTimers();

        // Event handlers for user activity
        const handleActivity = () => {
            resetTimers();
        };

        // Listen to various user activity events
        const events = [
            "mousedown",
            "mousemove",
            "keypress",
            "scroll",
            "touchstart",
            "touchmove",
            "click",
            "keydown",
            "wheel"
        ];

        events.forEach((event) => {
            document.addEventListener(event, handleActivity, { passive: true });
        });

        // Cleanup
        return () => {
            events.forEach((event) => {
                document.removeEventListener(event, handleActivity);
            });
            if (redirectTimerRef.current) {
                clearTimeout(redirectTimerRef.current);
            }
            if (adTimerRef.current) {
                clearTimeout(adTimerRef.current);
            }
        };
    }, [resetTimers]);

    // Handle advertisement close on interaction
    const handleAdInteraction = () => {
        resetTimers();
    };

    return (
        <>
            {showAd && (
                <div className="advertisement-overlay" onClick={handleAdInteraction} onTouchStart={handleAdInteraction}>
                    <div className="advertisement-container">
                        <video
                            ref={videoRef}
                            className="advertisement-video"
                            src="advertisement.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            onError={(e) => {
                                console.error("Advertisement video failed to load");
                                const target = e.target as HTMLVideoElement;
                                target.style.display = "none";
                            }}
                        >
                            Your browser does not support the video tag.
                        </video>
                        <div className="advertisement-close-hint">
                            <p>Touch anywhere to close</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
