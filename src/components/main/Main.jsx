'use client';

import { useState, useEffect } from 'react';
import './main.css';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import ResumeSection from './sections/ResumeSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import ContactSection from './sections/ContactSection';

export default function Main() {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const isMobile = window.innerWidth <= 1024;
            const container = document.querySelector('.main-container');

            let scrollTop = 0;
            let scrollHeight = 0;
            let clientHeight = 0;

            if (isMobile) {
                scrollTop = window.scrollY;
                scrollHeight = document.documentElement.scrollHeight;
                clientHeight = window.innerHeight;
            } else if (container) {
                scrollTop = container.scrollTop;
                scrollHeight = container.scrollHeight;
                clientHeight = container.clientHeight;
            }

            const totalScroll = scrollHeight - clientHeight;
            const progress = totalScroll > 0 ? (scrollTop / totalScroll) * 100 : 0;
            setScrollProgress(progress);
        };

        const handleScroll = () => requestAnimationFrame(updateProgress);

        // Initial call
        updateProgress();

        window.addEventListener('scroll', handleScroll);
        // We also need to attach to container for desktop
        const container = document.querySelector('.main-container');
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    return (
        <>
            <div className="scroll-progress-container">
                <div
                    className="scroll-progress-bar"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>
            <main className="main-container">
                <HeroSection />
                <AboutSection />
                <ResumeSection />
                <SkillsSection />
                <ProjectsSection />
                <ContactSection />
            </main>
        </>
    );
}
