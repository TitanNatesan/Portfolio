/**
 * Centralized Theme Configuration
 * Light theme only - no dark mode
 * Monochromatic Cosmos Theme: White background, Black particles
 */

export const theme = {
    // Background colors - Pure white cosmos
    background: {
        primary: '#ffffff',
        secondary: '#fafafa',
        accent: '#f5f5f5',
    },

    // Text colors - Black monochrome
    text: {
        primary: '#000000',
        secondary: '#262626',
        muted: '#737373',
    },

    // Particle colors for the background animation - Black cosmos dust
    particles: {
        colors: ['#000000', '#171717', '#262626'], // Pure black to dark grays
        count: 200,
        countMobile: 200,
        spread: 10,
        speed: 0.1,
        baseSize: 100,
        sizeRandomness: 2.0,
        cameraDistance: 20,
        alphaParticles: true,
        moveOnHover: true,
        hoverFactor: 1.2,
    },

    // Spotlight cursor effect settings (separate layer)
    spotlight: {
        enabled: false, 
        radius: 200, // pixels
        softness: 100, // edge blur in pixels
        highlightColor: 'rgba(0, 0, 0, 0.05)',
        highlightBorderWidth: 1,
        highlightBorderColor: 'rgba(0, 0, 0, 0.2)',
        outerOpacity: 0.5, // opacity of area outside spotlight
    },

    // Brand colors - Monochromatic
    brand: {
        primary: '#000000',
        secondary: '#262626',
        accent: '#525252',
    },

    // Border colors - Subtle grays
    border: {
        light: '#e5e5e5',
        medium: '#d4d4d4',
    },
};

export default theme;
