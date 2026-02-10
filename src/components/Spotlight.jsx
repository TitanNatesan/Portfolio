'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import theme from '@/lib/theme';

const Spotlight = ({
    radius = 200,
    softness = 80,
    highlightColor = 'rgba(255, 255, 255, 0.1)',
    highlightBorderWidth = 2,
    highlightBorderColor = 'rgba(0, 0, 0, 0.3)',
    outerOpacity = 0.8,
    smoothing = 0.15, // Lower = smoother, Higher = faster (0.1-0.3 recommended)
    className = '',
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(null);
    const targetPos = useRef({ x: -1000, y: -1000 });
    const currentPos = useRef({ x: -1000, y: -1000 });
    const animationRef = useRef(null);
    const [renderPos, setRenderPos] = useState({ x: -1000, y: -1000 });

    // Smooth animation loop using lerp
    const animate = useCallback(() => {
        const dx = targetPos.current.x - currentPos.current.x;
        const dy = targetPos.current.y - currentPos.current.y;

        // Lerp towards target position
        currentPos.current.x += dx * smoothing;
        currentPos.current.y += dy * smoothing;

        // Only update render state when there's significant movement
        if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
            setRenderPos({ x: currentPos.current.x, y: currentPos.current.y });
        }

        animationRef.current = requestAnimationFrame(animate);
    }, [smoothing]);

    useEffect(() => {
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
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        // Start animation loop
        animationRef.current = requestAnimationFrame(animate);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isVisible, animate]);

    // Create the mask gradient for spotlight effect
    const maskGradient = `radial-gradient(circle ${radius}px at ${renderPos.x}px ${renderPos.y}px, 
    transparent 0%, 
    transparent ${radius - softness}px, 
    rgba(255, 255, 255, ${outerOpacity}) ${radius}px, 
    rgba(255, 255, 255, ${outerOpacity}) 100%)`;

    return (
        <div
            ref={containerRef}
            className={`fixed inset-0 pointer-events-none transition-opacity duration-300 ${className}`}
            style={{
                opacity: isVisible ? 1 : 0,
                zIndex: 1,
            }}
        >
            {/* Outer dimming layer */}
            <div
                className="absolute inset-0"
                style={{
                    background: theme.background.primary,
                    maskImage: maskGradient,
                    WebkitMaskImage: maskGradient,
                }}
            />

            {/* Spotlight highlight ring */}
            <div
                className="absolute rounded-full pointer-events-none"
                style={{
                    width: radius * 2,
                    height: radius * 2,
                    left: renderPos.x - radius,
                    top: renderPos.y - radius,
                    background: highlightColor,
                    boxShadow: `0 0 ${softness}px ${softness / 2}px ${highlightColor}, inset 0 0 ${softness / 2}px ${highlightColor}`,
                }}
            />
        </div>
    );
};

export default Spotlight;
