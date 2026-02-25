'use client';

import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import { particlesConfig } from '@/config/particles.config';

const ParticlesBackground = () => {
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    return (
        <div
            className="fixed inset-0 w-full h-full"
            style={{
                zIndex: -1,
                pointerEvents: 'none'
            }}
        >
            <Particles
                id="tsparticles"
                init={particlesInit}
                options={particlesConfig}
                className="w-full h-full"
            />
        </div>
    );
};

export default ParticlesBackground;
