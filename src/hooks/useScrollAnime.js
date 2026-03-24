'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook: triggers GSAP ScrollTrigger animations when elements scroll into view,
 * with smooth scrub-based reverse when scrolling back.
 * Skips elements already animated by useLoadAnime (tracked in window.__loadAnimatedEls).
 *
 * @param {Array} animations - Array of animation configs:
 *   { selector, from, to, staggerDelay, scrub, start, end }
 * @param {Array} deps - Optional dependency array
 */
export default function useScrollAnime(animations = [], deps = []) {
    const triggersRef = useRef([]);

    useEffect(() => {
        // Clean up previous triggers
        triggersRef.current.forEach(trigger => trigger.kill());
        triggersRef.current = [];

        // Detect mobile vs desktop
        const isMobile = window.innerWidth <= 1024;
        const scroller = isMobile ? undefined : '.main-container';

        // Small delay to let DOM render
        const timeout = setTimeout(() => {
            const loadAnimatedEls = window.__loadAnimatedEls || new Set();

            // Refresh ScrollTrigger for the custom scroller
            if (!isMobile) {
                ScrollTrigger.scrollerProxy('.main-container', {
                    scrollTop(value) {
                        const el = document.querySelector('.main-container');
                        if (arguments.length) {
                            el.scrollTop = value;
                        }
                        return el ? el.scrollTop : 0;
                    },
                    getBoundingClientRect() {
                        const el = document.querySelector('.main-container');
                        if (!el) return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
                        return el.getBoundingClientRect();
                    },
                });

                // Listen to scroll on the container to update ScrollTrigger
                const container = document.querySelector('.main-container');
                if (container) {
                    container.addEventListener('scroll', () => ScrollTrigger.update(), { passive: true });
                }
            }

            animations.forEach(({ selector, from, to, staggerDelay = 0, scrub = 0.8, start = 'top 90%', end = 'top 20%' }) => {
                const allElements = document.querySelectorAll(selector);
                if (!allElements.length) return;

                // Filter out elements already animated by the load hook
                const elements = Array.from(allElements).filter(el => !loadAnimatedEls.has(el));
                if (!elements.length) return;

                // Set initial state
                gsap.set(elements, { ...from, immediateRender: true });

                if (staggerDelay > 0) {
                    // Staggered animation — animate as a batch
                    const tween = gsap.to(elements, {
                        ...to,
                        stagger: staggerDelay / 1000, // convert ms to seconds
                        scrollTrigger: {
                            trigger: elements[0].closest('.section') || elements[0],
                            scroller,
                            start,
                            end,
                            scrub,
                            toggleActions: 'play reverse play reverse',
                        },
                    });

                    if (tween.scrollTrigger) {
                        triggersRef.current.push(tween.scrollTrigger);
                    }
                } else {
                    // Individual element animations
                    elements.forEach(el => {
                        const tween = gsap.to(el, {
                            ...to,
                            scrollTrigger: {
                                trigger: el,
                                scroller,
                                start,
                                end,
                                scrub,
                                toggleActions: 'play none none reverse',
                            },
                        });

                        if (tween.scrollTrigger) {
                            triggersRef.current.push(tween.scrollTrigger);
                        }
                    });
                }
            });

            // Refresh after all triggers are set up
            ScrollTrigger.refresh();
        }, 200);

        return () => {
            clearTimeout(timeout);
            triggersRef.current.forEach(trigger => trigger.kill());
            triggersRef.current = [];
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}
