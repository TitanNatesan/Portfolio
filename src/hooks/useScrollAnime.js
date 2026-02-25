'use client';

import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

/**
 * Custom hook: triggers anime.js v4 animations when elements scroll into view,
 * and REVERSES them when elements scroll out of view.
 * Uses IntersectionObserver to detect visibility in both directions.
 * Skips elements already animated by useLoadAnime (tracked in window.__loadAnimatedEls).
 *
 * @param {Array} animations - Array of animation configs:
 *   { selector, animationProps, staggerDelay, threshold, rootMargin }
 * @param {Array} deps - Optional dependency array
 */
export default function useScrollAnime(animations = [], deps = []) {
    const observersRef = useRef([]);
    const stateRef = useRef(new Map()); // tracks 'visible' | 'hidden' per element

    useEffect(() => {
        // Clean up previous observers
        observersRef.current.forEach(obs => obs.disconnect());
        observersRef.current = [];
        stateRef.current.clear();

        // Small delay to let DOM render
        const timeout = setTimeout(() => {
            const loadAnimatedEls = window.__loadAnimatedEls || new Set();

            animations.forEach(({ selector, animationProps, staggerDelay = 0, threshold = 0.15, rootMargin = '0px' }) => {
                const allElements = document.querySelectorAll(selector);
                if (!allElements.length) return;

                // Filter out elements already animated by the load hook
                const elements = Array.from(allElements).filter(el => !loadAnimatedEls.has(el));
                if (!elements.length) return;

                // Extract the "from" and "to" values from animationProps for reverse
                const fromTo = {};
                const reverseFromTo = {};
                for (const [key, value] of Object.entries(animationProps)) {
                    if (Array.isArray(value) && value.length === 2) {
                        fromTo[key] = value;
                        reverseFromTo[key] = [value[1], value[0]]; // reverse direction
                    }
                }

                // Set initial hidden state
                elements.forEach(el => {
                    el.style.opacity = '0';
                    el.style.willChange = 'transform, opacity';
                    stateRef.current.set(el, 'hidden');
                });

                const ease = animationProps.ease || 'outExpo';
                const duration = animationProps.duration || 800;
                const reverseEase = 'inQuart';
                const reverseDuration = Math.round(duration * 0.5);

                const animateIn = (targets) => {
                    animate(targets, {
                        ...fromTo,
                        ease,
                        duration,
                        ...(Array.isArray(targets) && staggerDelay > 0
                            ? { delay: stagger(staggerDelay) }
                            : {}),
                    });
                };

                const animateOut = (targets) => {
                    animate(targets, {
                        ...reverseFromTo,
                        ease: reverseEase,
                        duration: reverseDuration,
                        ...(Array.isArray(targets) && staggerDelay > 0
                            ? { delay: stagger(Math.round(staggerDelay * 0.5)) }
                            : {}),
                    });
                };

                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        const el = entry.target;
                        const currentState = stateRef.current.get(el) || 'hidden';

                        if (entry.isIntersecting && currentState === 'hidden') {
                            // ── Animate IN ──
                            if (staggerDelay > 0) {
                                // For staggered animations, gather all hidden siblings in view
                                const siblings = elements.filter(sibling => {
                                    if (stateRef.current.get(sibling) !== 'hidden') return false;
                                    const rect = sibling.getBoundingClientRect();
                                    return rect.top < window.innerHeight * 1.1;
                                });
                                if (siblings.length > 0) {
                                    siblings.forEach(s => stateRef.current.set(s, 'visible'));
                                    animateIn(siblings);
                                }
                            } else {
                                stateRef.current.set(el, 'visible');
                                animateIn(el);
                            }
                        } else if (!entry.isIntersecting && currentState === 'visible') {
                            // ── Animate OUT (reverse) ──
                            if (staggerDelay > 0) {
                                // Reverse all visible siblings that are now out of view
                                const siblings = elements.filter(sibling => {
                                    if (stateRef.current.get(sibling) !== 'visible') return false;
                                    const rect = sibling.getBoundingClientRect();
                                    return rect.bottom < 0 || rect.top > window.innerHeight;
                                });
                                if (siblings.length > 0) {
                                    siblings.forEach(s => stateRef.current.set(s, 'hidden'));
                                    animateOut(siblings);
                                }
                            } else {
                                stateRef.current.set(el, 'hidden');
                                animateOut(el);
                            }
                        }
                    });
                }, { threshold, rootMargin });

                elements.forEach(el => observer.observe(el));
                observersRef.current.push(observer);
            });
        }, 150);

        return () => {
            clearTimeout(timeout);
            observersRef.current.forEach(obs => obs.disconnect());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}
