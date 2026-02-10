'use client';

import { useEffect, useState } from 'react';
import Particles from './Particles';
import theme from '@/lib/theme';

const ParticlesBackground = () => {

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { particles } = theme;

    return (
        <div
            className="fixed inset-0 w-full h-full"
            style={{
                zIndex: -10,
                pointerEvents: 'none'
            }}
        >
            {/* Particles Layer */}
            <Particles
                particleCount={isMobile ? particles.countMobile : particles.count}
                particleSpread={particles.spread}
                speed={particles.speed}
                particleColors={particles.colors}
                particleBaseSize={particles.baseSize}
                sizeRandomness={particles.sizeRandomness}
                cameraDistance={particles.cameraDistance}
                alphaParticles={particles.alphaParticles}
                moveParticlesOnHover={particles.moveOnHover}
                particleHoverFactor={particles.hoverFactor}
                className="w-full h-full"
            />
        </div>
    );
};

export default ParticlesBackground;
