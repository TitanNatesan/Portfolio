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

    // Enhanced anime.js scroll animations
    useScrollAnime([
        // ── Section titles: slide-up + fade ──
        {
            selector: '.section-title',
            animationProps: {
                translateY: ['35px', '0px'],
                opacity: [0, 1],
                duration: 1000,
                ease: 'outExpo',
            },
        },
        // ── Hero description: parallax slide-up ──
        {
            selector: '.hero-desc',
            animationProps: {
                translateY: ['40px', '0px'],
                opacity: [0, 1],
                duration: 1100,
                ease: 'outQuart',
            },
        },
        // ── Section descriptions: staggered blur-in slide-up ──
        {
            selector: '.section-desc',
            animationProps: {
                translateY: ['20px', '0px'],
                opacity: [0, 1],
                filter: ['blur(6px)', 'blur(0px)'],
                duration: 900,
                ease: 'outQuart',
            },
            staggerDelay: 150,
        },
        // ── Skill cards: staggered scale-pop with rotation ──
        {
            selector: '.skill-card',
            animationProps: {
                scale: [0.6, 1],
                rotate: ['-8deg', '0deg'],
                opacity: [0, 1],
                duration: 600,
                ease: 'outBack',
            },
            staggerDelay: 50,
        },
        // ── Project cards: staggered slide-up with scale ──
        {
            selector: '.project-card',
            animationProps: {
                translateY: ['60px', '0px'],
                scale: [0.92, 1],
                opacity: [0, 1],
                duration: 900,
                ease: 'outQuart',
            },
            staggerDelay: 180,
        },
        // ── Timeline items: slide from sides ──
        {
            selector: '.timeline-item.left',
            animationProps: {
                translateX: ['-50px', '0px'],
                opacity: [0, 1],
                duration: 800,
                ease: 'outExpo',
            },
            staggerDelay: 120,
        },
        {
            selector: '.timeline-item.right',
            animationProps: {
                translateX: ['50px', '0px'],
                opacity: [0, 1],
                duration: 800,
                ease: 'outExpo',
            },
            staggerDelay: 120,
        },
        // ── CTA buttons: scale-pop ──
        {
            selector: '.cta-button',
            animationProps: {
                scale: [0.85, 1],
                opacity: [0, 1],
                duration: 600,
                ease: 'outBack',
            },
        },
        // ── Contact card: slide-up with perspective feel ──
        {
            selector: '.contact-card',
            animationProps: {
                translateY: ['50px', '0px'],
                scale: [0.93, 1],
                opacity: [0, 1],
                duration: 1000,
                ease: 'outExpo',
            },
        },
        // ── Floating tags: drop-in with bounce ──
        {
            selector: '.floating-tag',
            animationProps: {
                translateY: ['-20px', '0px'],
                opacity: [0, 1],
                duration: 600,
                ease: 'outBack',
            },
            staggerDelay: 80,
        },
        // ── Skills category headings: line-expand + text fade ──
        {
            selector: '.skills-category',
            animationProps: {
                translateX: ['-25px', '0px'],
                opacity: [0, 1],
                duration: 700,
                ease: 'outQuart',
            },
            staggerDelay: 100,
        },
        // ── Skills category wrappers: staggered fade-up ──
        {
            selector: '.skills-category-wrapper',
            animationProps: {
                translateY: ['30px', '0px'],
                opacity: [0, 1],
                duration: 800,
                ease: 'outQuart',
            },
            staggerDelay: 200,
        },
        // ── Contact form groups: staggered slide-up ──
        {
            selector: '.form-group',
            animationProps: {
                translateY: ['25px', '0px'],
                opacity: [0, 1],
                duration: 600,
                ease: 'outQuart',
            },
            staggerDelay: 100,
        },
        // ── Contact info: slide from left ──
        {
            selector: '.contact-info',
            animationProps: {
                translateX: ['-30px', '0px'],
                opacity: [0, 1],
                duration: 800,
                ease: 'outExpo',
            },
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
