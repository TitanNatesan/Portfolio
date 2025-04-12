export const particlesConfig = {
    autoPlay: true,
    fpsLimit: 120,
    detectRetina: true,
    background: {
        color: { value: "#000" },
        opacity: 0.2
    },
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: ["attract"]
            },
            onDiv: {
                enable: false,
                selectors: ["#repulseCard"],
                mode: ["bubble"],
                type: "rectangle"
            },
            onHover: {
                enable: true,
                mode: ["connect","grab"],
                // parallax: { enable: true, force: 30, smooth: 10 },
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
                    color: "#fff",
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
            // bounce: {
            //     horizontal: {
            //         value: { min: .1, max: 1 },
            //         // random: true,
            //     },
            //     vertical: {
            //         value: { min: .1, max: 1 },
            //         // random: true,
            //     }
            // },
            connect: {
                distance: 100,
                links: {opacity: 0.1},
                radius: 250
            },
        }
    },
    particles: {
        color: { value: '#fff' },
        links: {
            color: "#fff",
            distance: 60,
            enable: false,
            opacity: 0.6,
            width: .4,
            triangles: {
                enable: false,
                color: "#fff",
                opacity: .1,
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
            outModes: {
                top: "out",
                bottom: "out",
                left: "out",
                right: "out",
            },
            trail: {
                enable: false,
                length: 10,
                fillColor: "#fff"
            },
            gravity: {
                enable: true,
                acceleration: 9.81,
                maxSpeed: .2
            },
            spin: {
                enable: false,
                acceleration: .1,
                position: {
                    x: 50,
                    y: 50
                },
            },
            speed: .8,
            bounce: true,
            attract: {
                enable: true,
                easing: "ease-in-out",
                rotateX: -1000,
                rotateY: -1000,
            },
            vibrate: false,
            warp: true,
            angle: { offset: false, value: 90, }
        },
        number: {
            density: {
                enable: false,
                area: 2000
            },
            value: 200
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
            // polygon: { nb_sides: 6 },
            image: {
                src: "/sf.png",
                width: 10,
                height: 10,
                replaceColor: false
            },
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
            blur: 10,
            color: "#fff",
            offset: { x: 0, y: 0 },
            spread: 1,
        },
    },
    polygon: {
        draw: {
            enable: true,
            lineColor: "#fff",
            lineWidth: .1
        },
        enable: true,
        move: { radius: 10 },
        inline: { arrangement: "equidistant" },
        scale: 1,
        type: "inline",
        url: "https://particles.js.org/images/smalldeer.svg",
    },
};