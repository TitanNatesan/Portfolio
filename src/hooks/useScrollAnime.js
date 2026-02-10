'use client';

import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

/**
 * Custom hook: triggers anime.js v4 animations when elements scroll into view.
 * Uses IntersectionObserver to detect visibility.
 * 
 * @param {Array} animations - Array of animation configs:
 *   { selector, animationProps, staggerDelay, threshold, rootMargin }
 * @param {Array} deps - Optional dependency array
 */
export default function useScrollAnime(animations = [], deps = []) {
    const observersRef = useRef([]);
    const animatedRef = useRef(new Set());

    useEffect(() => {
        // Clean up previous observers
        observersRef.current.forEach(obs => obs.disconnect());
        observersRef.current = [];
        animatedRef.current.clear();

        // Small delay to let DOM render
        const timeout = setTimeout(() => {
            animations.forEach(({ selector, animationProps, staggerDelay = 0, threshold = 0.15, rootMargin = '0px' }) => {
                const elements = document.querySelectorAll(selector);
                if (!elements.length) return;

                // Set initial hidden state
                elements.forEach(el => {
                    el.style.opacity = '0';
                    el.style.willChange = 'transform, opacity';
                });

                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (!entry.isIntersecting) return;
                        const el = entry.target;
                        if (animatedRef.current.has(el)) return;

                        if (staggerDelay > 0) {
                            // For staggered animations, animate all visible siblings at once
                            const siblings = Array.from(elements).filter(sibling => {
                                if (animatedRef.current.has(sibling)) return false;
                                const rect = sibling.getBoundingClientRect();
                                return rect.top < window.innerHeight * 1.1;
                            });

                            if (siblings.length > 0) {
                                siblings.forEach(s => animatedRef.current.add(s));
                                animate(siblings, {
                                    ...animationProps,
                                    delay: stagger(staggerDelay),
                                    ease: animationProps.ease || 'outExpo',
                                    duration: animationProps.duration || 800,
                                });
                                siblings.forEach(s => observer.unobserve(s));
                            }
                        } else {
                            animatedRef.current.add(el);
                            animate(el, {
                                ...animationProps,
                                ease: animationProps.ease || 'outExpo',
                                duration: animationProps.duration || 800,
                            });
                            observer.unobserve(el);
                        }
                    });
                }, { threshold, rootMargin });

                elements.forEach(el => observer.observe(el));
                observersRef.current.push(observer);
            });
        }, 100);

        return () => {
            clearTimeout(timeout);
            observersRef.current.forEach(obs => obs.disconnect());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}
