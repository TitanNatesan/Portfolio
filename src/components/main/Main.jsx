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
import useLoadAnime from '@/hooks/useLoadAnime';

export default function Main() {
    const [scrollProgress, setScrollProgress] = useState(0);

    // Page load entrance animation
    useLoadAnime(true);

    // GSAP ScrollTrigger scroll animations
    useScrollAnime([
        // ── Section titles: slide-up + fade ──
        {
            selector: '.section-title',
            from: { y: 35, opacity: 0 },
            to: { y: 0, opacity: 1 },
        },
        // ── Hero description: parallax slide-up ──
        {
            selector: '.hero-desc',
            from: { y: 40, opacity: 0 },
            to: { y: 0, opacity: 1 },
        },
        // ── Section descriptions: staggered blur-in slide-up ──
        {
            selector: '.section-desc',
            from: { y: 20, opacity: 0, filter: 'blur(6px)' },
            to: { y: 0, opacity: 1, filter: 'blur(0px)' },
            staggerDelay: 150,
        },
        // ── Skill cards: staggered scale-pop with rotation ──
        {
            selector: '.skill-card',
            from: { scale: 0.6, rotation: -8, opacity: 0 },
            to: { scale: 1, rotation: 0, opacity: 1 },
            staggerDelay: 40,
            start: 'top 95%',
            end: 'top 40%',
        },
        // ── Project cards: staggered slide-up with scale ──
        {
            selector: '.project-card',
            from: { y: 60, scale: 0.92, opacity: 0 },
            to: { y: 0, scale: 1, opacity: 1 },
            staggerDelay: 150,
            start: 'top 95%',
            end: 'top 30%',
        },
        // ── Timeline items: slide from sides ──
        {
            selector: '.timeline-item.left',
            from: { x: -50, opacity: 0 },
            to: { x: 0, opacity: 1 },
            staggerDelay: 100,
        },
        {
            selector: '.timeline-item.right',
            from: { x: 50, opacity: 0 },
            to: { x: 0, opacity: 1 },
            staggerDelay: 100,
        },
        // ── CTA buttons: pop-in (no scrub/opacity reveal to ensure 100% visibility) ──
        {
            selector: '.section .cta-button',
            from: { scale: 0.85 },
            to: { scale: 1 },
            scrub: false,
            start: 'top 95%',
        },
        // ── Contact card: slide-up with perspective feel ──
        {
            selector: '.contact-card',
            from: { y: 50, scale: 0.93, opacity: 0 },
            to: { y: 0, scale: 1, opacity: 1 },
            start: 'top 95%',
            end: 'top 35%',
        },
        // ── Floating tags: drop-in ──
        {
            selector: '.floating-tag',
            from: { y: -20, opacity: 0 },
            to: { y: 0, opacity: 1 },
            staggerDelay: 80,
        },
        // ── Skills category headings: slide from left ──
        {
            selector: '.skills-category',
            from: { x: -25, opacity: 0 },
            to: { x: 0, opacity: 1 },
            staggerDelay: 100,
        },
        // ── Skills category wrappers: staggered fade-up ──
        {
            selector: '.skills-category-wrapper',
            from: { y: 30, opacity: 0 },
            to: { y: 0, opacity: 1 },
            staggerDelay: 180,
        },
        // ── Contact form groups: staggered slide-up ──
        {
            selector: '.form-group',
            from: { y: 25, opacity: 0 },
            to: { y: 0, opacity: 1 },
            staggerDelay: 80,
        },
        // ── Contact info: slide from left ──
        {
            selector: '.contact-info',
            from: { x: -30, opacity: 0 },
            to: { x: 0, opacity: 1 },
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

        window.addEventListener('scroll', handleScroll, { passive: true });
        // We also need to attach to container for desktop
        const container = document.querySelector('.main-container');
        if (container) {
            container.addEventListener('scroll', handleScroll, { passive: true });
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
            <div className="scroll-progress-container" aria-hidden="true">
                <div
                    className="scroll-progress-bar"
                    style={{ width: `${scrollProgress}%` }}
                    role="progressbar"
                    aria-valuenow={Math.round(scrollProgress)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                />
            </div>
            <div className="main-container" role="main">
                <HeroSection />
                <AboutSection />
                <ResumeSection />
                <SkillsSection />
                <ProjectsSection />
                <ContactSection />
            </div>
        </>
    );
}
