import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { openAdViewer } from "./AdViewer";
import "./Sidebar.css";

const SIDEBAR_APPS = [
    {
        id: 1,
        title: "Registration",
        route: "/registration",
        icon: "images/registration.jpg"
    },
    {
        id: 2,
        title: "E-Library",
        route: "/elibrary",
        icon: "images/E-library.jpg"
    },
    {
        id: 3,
        title: "Post Operation Care",
        route: "/postop",
        icon: "images/postopimg.jpeg"
    },
    {
        id: 4,
        title: "Advertisement",
        route: null,
        icon: "images/ads.jpg",
        isAd: true
    }
];

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    // Default to closed on all pages, including home
    const [isOpen, setIsOpen] = useState(false);

    // Close sidebar on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    const handleIconClick = (item: typeof SIDEBAR_APPS[0]) => {
        if (item.isAd) {
            // Open advertisement viewer
            openAdViewer();
        } else if (item.route) {
            navigate(item.route);
            // Sidebar will close via useEffect
        }
    };

    return (
        <>
            {!isOpen && (
                <button
                    className="sidebar-toggle-btn"
                    onClick={() => setIsOpen(true)}
                    aria-label="Open Sidebar"
                >
                    <ChevronRight size={24} color="#11181C" />
                </button>
            )}

            {/* Backdrop for when sidebar is open */}
            {isOpen && (
                <div className="sidebar-backdrop" onClick={() => setIsOpen(false)} />
            )}

            <div className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                <button
                    className="sidebar-close-btn"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close Sidebar"
                >
                    <ChevronLeft size={20} color="#11181C" />
                </button>

                {SIDEBAR_APPS.map((item) => {
                    const isActive = !item.isAd && (
                        location.pathname === item.route ||
                        (item.route === "/elibrary" && location.pathname.startsWith("/elibrary")) ||
                        (item.route === "/postop" && location.pathname.startsWith("/postop"))
                    );

                    return (
                        <div
                            key={item.id}
                            className={`sidebar-icon ${isActive ? 'active' : ''} ${item.isAd ? 'ad-icon' : ''}`}
                            onClick={() => handleIconClick(item)}
                            title={item.title}
                        >
                            <div className="sidebar-icon-wrapper">
                                <img
                                    src={item.icon}
                                    alt={item.title}
                                    className="sidebar-icon-img"
                                    onError={(e) => {
                                        console.error(`Failed to load image for ${item.title}:`, item.icon);
                                        const target = e.target as HTMLImageElement;
                                        // Fallback to a default image if the specified one fails
                                        if (target.src !== 'images/cleaning.jpg') {
                                            target.src = 'images/cleaning.jpg';
                                        }
                                    }}
                                />
                            </div>
                            <span className="sidebar-icon-label">{item.title}</span>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
