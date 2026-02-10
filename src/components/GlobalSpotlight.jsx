'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import theme from '@/lib/theme';

const GlobalSpotlight = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const targetPos = useRef({ x: -1000, y: -1000 });
    const currentPos = useRef({ x: -1000, y: -1000 });
    const velocity = useRef({ x: 0, y: 0 });
    const animationRef = useRef(null);
    const [renderPos, setRenderPos] = useState({ x: -1000, y: -1000 });
    const [dynamicRadius, setDynamicRadius] = useState(200);

    const { spotlight } = theme;
    const smoothing = spotlight?.smoothing || 0.15;
    const baseRadius = spotlight?.radius || 200;
    const softness = spotlight?.softness || 80;
    const expandOnHover = spotlight?.expandOnHover ?? true;
    const pulseEnabled = spotlight?.pulse ?? false;

    // Check for mobile devices
    useEffect(() => {
        const checkMobile = () => {
            const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            setIsMobile(window.innerWidth < 1024 || isTouchDevice);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Smooth animation loop using lerp with velocity-based easing
    const animate = useCallback(() => {
        const dx = targetPos.current.x - currentPos.current.x;
        const dy = targetPos.current.y - currentPos.current.y;

        // Calculate velocity for dynamic effects
        velocity.current.x = dx * smoothing;
        velocity.current.y = dy * smoothing;
        const speed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2);

        // Lerp towards target position with easing
        currentPos.current.x += velocity.current.x;
        currentPos.current.y += velocity.current.y;

        // Dynamic radius based on movement speed
        const targetRadius = baseRadius + Math.min(speed * 2, 50);
        setDynamicRadius(prev => prev + (targetRadius - prev) * 0.1);

        // Only update render state when there's significant movement
        if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05) {
            setRenderPos({ x: currentPos.current.x, y: currentPos.current.y });
        }

        animationRef.current = requestAnimationFrame(animate);
    }, [smoothing, baseRadius]);

    // Main effect for mouse tracking
    useEffect(() => {
        if (isMobile) return;

        const handleMouseMove = (e) => {
            targetPos.current = { x: e.clientX, y: e.clientY };
            if (!isVisible) {
                // Instantly set position on first appearance
                currentPos.current = { x: e.clientX, y: e.clientY };
                setRenderPos({ x: e.clientX, y: e.clientY });
                setIsVisible(true);
            }
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
            setIsHovering(false);
        };

        const handleMouseOver = (e) => {
            // Expand spotlight when hovering over interactive elements
            const target = e.target;
            const isInteractive = target.closest('a, button, [role="button"], input, textarea, [tabindex]');
            setIsHovering(!!isInteractive && expandOnHover);
        };

        document.addEventListener('mousemove', handleMouseMove, { passive: true });
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseover', handleMouseOver, { passive: true });

        // Start animation loop
        animationRef.current = requestAnimationFrame(animate);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseover', handleMouseOver);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isVisible, animate, isMobile, expandOnHover]);

    // Memoized gradient calculations for performance
    const maskGradient = useMemo(() => {
        const effectiveRadius = isHovering ? dynamicRadius * 1.3 : dynamicRadius;
        const effectiveSoftness = isHovering ? softness * 1.2 : softness;

        return `radial-gradient(circle ${effectiveRadius}px at ${renderPos.x}px ${renderPos.y}px, 
            transparent 0%, 
            transparent ${Math.max(0, effectiveRadius - effectiveSoftness)}px, 
            rgba(0,0,0,0.85) ${effectiveRadius}px, 
            rgba(0,0,0,0.85) 100%)`;
    }, [renderPos.x, renderPos.y, dynamicRadius, softness, isHovering]);

    // Don't render on mobile or if disabled
    if (isMobile || !spotlight?.enabled) return null;

    return (
        <div
            className="fixed inset-0 pointer-events-none"
            style={{
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                zIndex: 9999,
            }}
        >
            {/* Dimming overlay with spotlight hole */}
            <div
                className="absolute inset-0"
                style={{
                    background: theme.background.primary,
                    maskImage: maskGradient,
                    WebkitMaskImage: maskGradient,
                    transition: isHovering ? 'mask-size 0.3s ease-out' : undefined,
                }}
            />

            {/* Optional subtle glow effect around spotlight edge */}
            {spotlight?.glow && (
                <div
                    className="absolute inset-0"
                    style={{
                        background: `radial-gradient(circle ${dynamicRadius + 20}px at ${renderPos.x}px ${renderPos.y}px, 
                            ${spotlight.glowColor || 'rgba(255,255,255,0.03)'} 0%, 
                            transparent ${dynamicRadius}px)`,
                        mixBlendMode: 'screen',
                    }}
                />
            )}

            {/* Pulse animation overlay */}
            {pulseEnabled && isVisible && (
                <div
                    className="absolute inset-0 animate-pulse"
                    style={{
                        background: `radial-gradient(circle ${dynamicRadius * 1.1}px at ${renderPos.x}px ${renderPos.y}px, 
                            rgba(255,255,255,0.02) 0%, 
                            transparent ${dynamicRadius}px)`,
                        animationDuration: '2s',
                    }}
                />
            )}
        </div>
    );
};

export default GlobalSpotlight;
