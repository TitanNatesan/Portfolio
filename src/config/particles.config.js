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
        opacity: 0 
    },
    interactivity: {
        events: {
            onClick: {
                enable: !isMobileDevice(),
                mode: ["push"]
            },
            onHover: {
                enable: !isMobileDevice(),
                mode: ["","","grab"],
                parallax: { enable: false, force: 10, smooth: 100 },
            },
            resize: true
        },
        modes: {
            push: {quantity: 2},
            repulse: {
                distance: 150,
                duration: 1
            },
            grab: {
                distance: 180,
                duration: 1,
                links: {
                    opacity: 1,
                    color: "#000",
                    width: 1,
                }
            },
            bubble: {
                distance: 200,
                size: 20,
                duration: 2,
                opacity: 0,
                speed: 3
            },
            connect: {
                distance: 100,
                links: { opacity: .4 },
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
            value: isMobileDevice() ? 100 : 250 // Reduced count for mobile devices
        },
        color: { value: '#000' },
        links: {
            color: "#000",
            distance: 60,
            enable: false,
            opacity: .1,
            width: 1,
            triangles: {
                enable: true,
                color: "#000",
                opacity: .1,
            }
        },
        collisions: {
            enable: true,
            mode: "bounce",
            overlap: {
                enable: true,
                retries: 1
            },
        },
        move: {
            enable: true,
            direction: "top",
            outModes: "out",
            gravity: {
                enable: false,
                acceleration: 9.81,
                maxSpeed: .5
            },
            speed: 1,
            bounce: true,
            attract: {
                enable: false,
                easing: "ease",
                rotateX: 10000,
                rotateY: 10000,
            },
            warp: false,
            angle: { offset: false, value: 90, }
        },
        opacity: {
            value: 1,
            random: true,
            animation: {
                enable: true,
                speed: 20,
                opacity_min: 0,
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
                enable: false,
                speed: 5
            }
        },
        size: {
            value: 2,
            random: true,
            anim: {
                enable: true,
                speed: 2,
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
