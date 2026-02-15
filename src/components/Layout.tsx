
import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import IdleHandler from "./IdleHandler";
import AdViewer from "./AdViewer";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="app-shell">
            <IdleHandler />
            <AdViewer />
            <Sidebar />
            <Navbar />
            {children}
        </div>
    );
}
