'use client';

import { useCallback, useState, useEffect } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import { particlesConfig } from '@/config/particles.config';

const ParticlesBackground = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 1024);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    // Reduce particle count on mobile for better performance
    const optimizedConfig = {
        ...particlesConfig,
        particles: {
            ...particlesConfig.particles,
            number: {
                ...particlesConfig.particles.number,
                value: isMobile ? 30 : particlesConfig.particles.number.value,
            },
        },
    };

    return (
        <div
            className="fixed inset-0 w-full h-full"
            style={{
                zIndex: -1,
                pointerEvents: 'none',
                willChange: 'transform',
            }}
        >
            <Particles
                id="tsparticles"
                init={particlesInit}
                options={optimizedConfig}
                className="w-full h-full"
            />
        </div>
    );
};

export default ParticlesBackground;
