"use client";
import {
    House,
    Sparkles,
    Send,
    Menu,
    X,
    Heart,
    ListCollapse,
    FolderGit2
} from "lucide-react";
import { useEffect, useState, useRef } from "react";

export default function NavBar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const collapseTimerRef = useRef(null);

    const navItems = [
        { name: "Home", icon: <House /> },
        { name: "About", icon: <Heart /> },
        { name: "Resume", icon: <ListCollapse /> },
        { name: "Menu", icon: <Menu /> },
        { name: "Skills", icon: <Sparkles /> },
        { name: "Projects", icon: <FolderGit2 /> },
        { name: "Contact", icon: <Send /> },
    ];

    useEffect(() => {
        const mainElement = document.querySelector("main");
        if (!mainElement) return;
        const handleScroll = () => {
            if (mainElement.scrollTop > 100) {
                if (collapseTimerRef.current) clearTimeout(collapseTimerRef.current);
                collapseTimerRef.current = setTimeout(() => {
                    setIsCollapsed(true);
                }, 1000);
            } else {
                if (collapseTimerRef.current) clearTimeout(collapseTimerRef.current);
                setIsCollapsed(false);
            }
        };

        mainElement.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => {
            mainElement.removeEventListener("scroll", handleScroll);
            if (collapseTimerRef.current) clearTimeout(collapseTimerRef.current);
        };
    }, []);

    return (
        <nav className={` rounded-full ${isCollapsed && "act"} border shadow-lg flex justify-center items-center bg-[#0001] hover:backdrop-blur hover:bg-[#fff1] ${isCollapsed ? "h-[8%]" : "h-[80%]"}`}>
            <ul className={`flex flex-col justify-evenly  h-[90%]`}>
                {navItems.map((item, index) => (
                    <li key={index} title={item.name} className={` transition-all cursor-pointer ease-[cubic-bezier(0.75,_-1,_0.25,_2)] ${isCollapsed && item.name !== "Menu" ? "h-0 scale-0 " : !isCollapsed && item.name === "Menu" ? "" : "h-5 scale-100"}`}>
                        {!isCollapsed && item.name === "Menu" ? <X className="scale-90 hover:scale-110 ease-[cubic-bezier(0.75,_-1,_0.25,_2)]" onClick={() => setIsCollapsed(!isCollapsed)} /> : !isCollapsed && item.name !== "Menu" ? item.icon : <Menu onClick={() => setIsCollapsed(!isCollapsed)} />}
                    </li>
                ))}
            </ul >
        </nav>
    );
}