"use client";
import { House, BookMarked, BookHeart, Sparkles, FolderOpenDot, ContactRound, Menu } from "lucide-react";
import { useEffect, useState, useRef } from "react";

export default function NavBar() {
    const navItems = [
        { name: "Home", icon: <House /> },
        { name: "Blog", icon: <BookHeart /> },
        { name: "Projects", icon: <BookMarked /> },
        { name: "Skills", icon: <Sparkles /> },
        { name: "Resume", icon: <FolderOpenDot /> },
        { name: "Contact", icon: <ContactRound /> },
    ]
    const [isCollapsed, setIsCollapsed] = useState(false);
    const collapseTimerRef = useRef(null);

    useEffect(() => {
        const mainElement = document.querySelector('main');
        if (!mainElement) return;

        const handleScroll = () => {
            if (mainElement.scrollTop > 100) {
                // Clear existing timer if any
                if (collapseTimerRef.current) clearTimeout(collapseTimerRef.current);
                
                // Set delay before collapsing
                collapseTimerRef.current = setTimeout(() => {
                    setIsCollapsed(true);
                }, 1000);
            } else {
                // Clear existing timer
                if (collapseTimerRef.current) clearTimeout(collapseTimerRef.current);
                setIsCollapsed(false);
            }
        };

        mainElement.addEventListener('scroll', handleScroll);
        
        // Initial check
        handleScroll();
        
        return () => {
            mainElement.removeEventListener('scroll', handleScroll);
            if (collapseTimerRef.current) clearTimeout(collapseTimerRef.current);
        };
    }, []);

    const handleMouseLeave = () => {
        const mainElement = document.querySelector('main');
        if (mainElement && mainElement.scrollTop > 100) {
            collapseTimerRef.current = setTimeout(() => {
                setIsCollapsed(true);
            }, 1200);
        }
    };

    return (
        isCollapsed ? (
            <nav 
                onMouseEnter={() => {
                    if (collapseTimerRef.current) clearTimeout(collapseTimerRef.current);
                    setIsCollapsed(false);
                }} 
                onMouseLeave={handleMouseLeave}
                className="act rounded-full h-[8%] border flex justify-center items-center bg-[#0001] shadow-lg hover:backdrop-blur hover:bg-[#fff1]"
            >
                <ul className="flex flex-col justify-evenly items-center h-[90%] ">
                    <li><Menu /></li>
                </ul>
            </nav>
        ) : (
            <nav 
                onMouseLeave={handleMouseLeave}
                className="rounded-full border h-[80%] flex justify-center items-center bg-[#0001] shadow-lg hover:backdrop-blur hover:bg-[#fff1]"
            >
                <ul className="flex flex-col justify-center items-center h-[90%]">
                    {navItems.map((item, index) => (
                        <li key={index} className={`transition-all duration-500 ${isCollapsed?"m-0":"m-auto"}`} >
                            {item.icon}
                        </li>
                    ))}
                </ul>
            </nav>
        )
    )
}