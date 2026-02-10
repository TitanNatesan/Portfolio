'use client';

import { useState, useEffect } from 'react';
import './main.css';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import ResumeSection from './sections/ResumeSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import ContactSection from './sections/ContactSection';
import useScrollAnime from '@/hooks/useScrollAnime';

export default function Main() {
    const [scrollProgress, setScrollProgress] = useState(0);

    // Anime.js scroll animations
    useScrollAnime([
        // Section titles: fade-in + slide-up
        {
            selector: '.section-title',
            animationProps: {
                translateY: [30, 0],
                opacity: [0, 1],
                duration: 900,
            },
        },
        // Hero description: subtle parallax slide-up
        {
            selector: '.hero-desc',
            animationProps: {
                translateY: [40, 0],
                opacity: [0, 1],
                duration: 1100,
                easing: 'outQuart',
            },
        },
        // Section descriptions: staggered fade-in
        {
            selector: '.section-desc',
            animationProps: {
                translateY: [25, 0],
                opacity: [0, 1],
                duration: 800,
            },
            stagger: 120,
        },
        // Skill cards: staggered scale-in
        {
            selector: '.skill-card',
            animationProps: {
                scale: [0.8, 1],
                opacity: [0, 1],
                duration: 600,
            },
            stagger: 60,
        },
        // Project cards: staggered slide-up
        {
            selector: '.project-card',
            animationProps: {
                translateY: [50, 0],
                opacity: [0, 1],
                duration: 800,
            },
            stagger: 150,
        },
        // Timeline items: slide from sides
        {
            selector: '.timeline-item',
            animationProps: {
                translateX: ['-30px', '0px'],
                opacity: [0, 1],
                duration: 700,
            },
            stagger: 100,
        },
        // CTA buttons: fade + scale
        {
            selector: '.cta-button',
            animationProps: {
                scale: [0.9, 1],
                opacity: [0, 1],
                duration: 600,
            },
        },
        // Contact card: fade + scale
        {
            selector: '.contact-card',
            animationProps: {
                translateY: [40, 0],
                scale: [0.95, 1],
                opacity: [0, 1],
                duration: 900,
            },
        },
        // Floating tags: slide-down fade
        {
            selector: '.floating-tag',
            animationProps: {
                translateY: [-15, 0],
                opacity: [0, 1],
                duration: 600,
            },
        },
        // Skills category headings
        {
            selector: '.skills-category',
            animationProps: {
                translateX: [-20, 0],
                opacity: [0, 1],
                duration: 700,
            },
            stagger: 100,
        },
    ]);

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
