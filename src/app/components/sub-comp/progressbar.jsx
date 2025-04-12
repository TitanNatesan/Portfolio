"use client"
import { useEffect, useState } from 'react';

export default function Progress() {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const mainElement = document.querySelector('main');
        if (!mainElement) return;

        const handleScroll = () => {
            // Calculate scroll percentage
            const scrollTop = mainElement.scrollTop;
            const scrollHeight = mainElement.scrollHeight;
            const clientHeight = mainElement.clientHeight;
            const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;

            setScrollProgress(Math.min(100, Math.max(0, scrollPercentage)));
        };

        // Add scroll listener
        mainElement.addEventListener('scroll', handleScroll);

        // Initial calculation
        handleScroll();

        // Cleanup
        return () => mainElement.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="absolute w-full progress">
            <div
                id="bar"
                style={{
                    width: `${scrollProgress}%`,
                }}
            ></div>
        </div>
    );
}