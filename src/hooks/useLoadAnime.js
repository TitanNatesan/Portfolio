'use client';

import { useEffect, useRef } from 'react';
import { createTimeline, stagger } from 'animejs';

/**
 * Custom hook: orchestrates an anime.js v4 entrance timeline on page load.
 * Elements animated here are tracked in window.__loadAnimatedEls so
 * useScrollAnime can skip re-animating them.
 *
 * @param {boolean} enabled - Whether to run the animation
 */
export default function useLoadAnime(enabled = true) {
    const hasRun = useRef(false);

    useEffect(() => {
        if (!enabled || hasRun.current) return;
        hasRun.current = true;

        // Global set so useScrollAnime knows what was already animated
        if (!window.__loadAnimatedEls) {
            window.__loadAnimatedEls = new Set();
        }

        const trackElements = (selector) => {
            document.querySelectorAll(selector).forEach(el => {
                window.__loadAnimatedEls.add(el);
                // Also track all children so child animations don't get reset by useScrollAnime
                el.querySelectorAll('*').forEach(child => {
                    window.__loadAnimatedEls.add(child);
                });
            });
        };

        // Small delay to let initial DOM paint
        const timeout = setTimeout(() => {
            const tl = createTimeline({
                defaults: {
                    ease: 'outExpo',
                    duration: 900,
                },
            });

            // 1. Side card slides in from the left
            const sideCard = document.querySelector('.sidecard');
            if (sideCard) {
                trackElements('.sidecard');
                tl.add('.sidecard', {
                    translateX: ['-60px', '0px'],
                    opacity: [0, 1],
                    duration: 800,
                    ease: 'outQuart',
                });
            }

            // 2. Scroll progress bar fades in
            const scrollProgress = document.querySelector('.scroll-progress-container');
            if (scrollProgress) {
                trackElements('.scroll-progress-container');
                tl.add('.scroll-progress-container', {
                    opacity: [0, 1],
                    duration: 400,
                }, '-=600');
            }

            // 3. Hero floating tag drops in
            const heroTag = document.querySelector('.hero-section .floating-tag');
            if (heroTag) {
                trackElements('.hero-section .floating-tag');
                tl.add('.hero-section .floating-tag', {
                    translateY: ['-20px', '0px'],
                    opacity: [0, 1],
                    duration: 500,
                    ease: 'outBack',
                }, '-=400');
            }

            // 4. Hero title scales up
            const heroTitle = document.querySelector('.hero-title');
            if (heroTitle) {
                trackElements('.hero-title');
                tl.add('.hero-title', {
                    scale: [0.85, 1],
                    opacity: [0, 1],
                    duration: 700,
                    ease: 'outExpo',
                }, '-=300');
            }

            // 5. Typing container fades in
            const typingContainer = document.querySelector('.typing-container');
            if (typingContainer) {
                trackElements('.typing-container');
                tl.add('.typing-container', {
                    translateY: ['15px', '0px'],
                    opacity: [0, 1],
                    duration: 500,
                }, '-=400');
            }

            // 6. Hero description slides up
            const heroDesc = document.querySelector('.hero-desc');
            if (heroDesc) {
                trackElements('.hero-desc');
                tl.add('.hero-desc', {
                    translateY: ['25px', '0px'],
                    opacity: [0, 1],
                    duration: 700,
                    ease: 'outQuart',
                }, '-=300');
            }

            // 7. Hero CTA button pops in
            const heroCta = document.querySelector('.hero-section .cta-button');
            if (heroCta) {
                trackElements('.hero-section .cta-button');
                tl.add('.hero-section .cta-button', {
                    scale: [0.8, 1],
                    opacity: [0, 1],
                    duration: 500,
                    ease: 'outBack',
                }, '-=400');
            }

            // 8. Navbar slides up from bottom
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                trackElements('.navbar');
                tl.add('.navbar', {
                    translateY: ['30px', '0px'],
                    opacity: [0, 1],
                    duration: 600,
                    ease: 'outQuart',
                }, '-=300');
            }

            // Remove the loading class when timeline completes
            tl.add({
                duration: 0,
                onComplete: () => {
                    document.body.classList.remove('page-loading');
                },
            });
        }, 50);

        return () => clearTimeout(timeout);
    }, [enabled]);
}
