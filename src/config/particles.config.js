const isMobileDevice = () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= 1024 || 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

export const particlesConfig = {
    autoPlay: true,
    fpsLimit: 120,
    smooth: true,
    detectRetina: true,
    background: {
        color: { value: "#000000" },
        opacity: 0 // Transparent background to overlay on existing site
    },
    interactivity: {
        events: {
            onClick: {
                enable: !isMobileDevice(),
                mode: ["attract"]
            },
            onHover: {
                enable: !isMobileDevice(),
                mode: ["connect", "grab"],
                parallax: { enable: true, force: 30, smooth: 10 },
            },
            resize: true
        },
        modes: {
            push: {
                quantity: 4
            },
            repulse: {
                distance: 100,
                duration: 1
            },
            grab: {
                distance: 150,
                duration: 1,
                links: {
                    opacity: 1,
                    color: "#000",
                    width: 1,
                }
            },
            bubble: {
                distance: 200,
                size: 0.1,
                duration: 2,
                opacity: 0,
                speed: 3
            },
            connect: {
                distance: 100,
                links: { opacity: 0.1 },
                radius: 250
            },
        },
    },
    particles: {
        number: {
            density: {
                enable: false,
                area: 800
            },
            value: isMobileDevice() ? 50 : 150 // Reduced count for mobile devices
        },
        color: { value: '#000' },
        links: {
            color: "#000",
            distance: 60,
            enable: false,
            opacity: 0.6,
            width: .4,
            triangles: {
                enable: false,
                color: "#000",
                opacity: .5,
            }
        },
        collisions: {
            enable: false,
            mode: "bounce",
            overlap: {
                enable: true,
                retries: 1
            },
        },
        move: {
            enable: true,
            direction: "right",
            outModes: "out",
            gravity: {
                enable: true,
                acceleration: 9.81,
                maxSpeed: .5
            },
            speed: 2,
            bounce: true,
            attract: {
                enable: false,
                easing: "ease",
                rotateX: -100,
                rotateY: -100,
            },
            warp: true,
            angle: { offset: false, value: 90, }
        },
        opacity: {
            value: 1,
            random: true,
            animation: {
                enable: true,
                speed: 5,
                opacity_min: .5,
                sync: false
            }
        },
        shape: {
            type: "circle",
        },
        rotate: {
            value: { min: 0, max: 360 },
            direction: "random",
            animation: {
                enable: true,
                speed: 5
            }
        },
        size: {
            value: 2,
            random: true,
            anim: {
                enable: true,
                speed: 5,
                size_min: .1,
                sync: false
            }
        },
        tilt: {
            enable: false,
            direction: "clockwise",
            value: 180,
            animation: {
                enable: true,
                speed: 5,
                sync: false
            }
        },
        shadow: {
            enable: true,
            blur: 5,
            color: "#000",
            offset: { x: 0, y: 0 },
        },
    },
};
