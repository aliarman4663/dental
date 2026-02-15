import type { ReactNode } from "react";
// import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import IdleHandler from "./IdleHandler";
import AdViewer from "./AdViewer";


export default function Layout({ children }: { children: ReactNode }) {
    // Determine layout based on pages if needed, but for now everything is unified
    // const location = useLocation();

    return (
        <div className="app-shell layout-subpage">
            <IdleHandler />
            <AdViewer />
            <Sidebar />
            <Navbar />
            {children}
        </div>
    );
}

