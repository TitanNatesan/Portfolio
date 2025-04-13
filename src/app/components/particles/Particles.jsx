"use client";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { loadFull } from "tsparticles";
import { useCallback } from "react";
import { loadPolygonMaskPlugin } from "tsparticles-plugin-polygon-mask";
import { loadParallaxMover } from "tsparticles-move-parallax";

export default function ParticlesComponent({ options }) {

    const inOptions = options || {
        background: {
            color: { value: "#000000" },
            opacity: 1
        },
        fpsLimit: 120,
        interactivity: {
            events: {
                onClick: {
                    enable: true,
                    mode: ["push",]
                },
                onHover: {
                    enable: true,
                    mode: ["repulse"],
                },
                resize: true
            },
            modes: {
                push: {
                    quantity: 4
                },
                repulse: {
                    distance: 100,
                    duration: 0.4
                },
                grab: {
                    distance: 200,
                    duration: 1,
                    links: {
                        opacity: 1,
                        color: "#fff",
                        width: 1,
                    }
                },
                bubble: {
                    distance: 300,
                    size: 30,
                    duration: 2,
                    opacity: 1,
                    speed: 3
                },
            }
        },
        particles: {
            color: {
                value: '#fff',
                anim: {
                    enable: true,
                    speed: 20,
                    sync: true
                }
            },
            links: {
                color: "#fff",
                distance: 60,
                enable: true,
                opacity: 0.6,
                width: 0,
                triangles: {
                    enable: true,
                    color: "#fff",
                    opacity: 0,
                }
            },
            collisions: {
                enable: false
            },
            move: {
                enable: true,
                direction: "top-left",
                outModes: "out",
                random: true,
                speed: -2,
                straight: false,
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: -10000,
                    rotateY: -10000
                }
            },
            number: {
                density: {
                    enable: false,
                    area: 1000
                },
                value: 300
            },
            opacity: {
                value: 1,
                anim: {
                    enable: true,
                    speed: 4,
                    opacity_min: .1,
                    sync: false
                }
            },
            shape: {
                type: "circle"
            },
            size: {
                value: 3,
                anim: {
                    enable: true,
                    speed: 4,
                    size_min: .1,
                    sync: false
                }
            }
        },
        detectRetina: true
    };

    const particlesInit = useCallback(async (engine) => {
        await loadFull(engine);
        await loadSlim(engine);
        await loadParallaxMover(engine);
        await loadPolygonMaskPlugin(engine);
    }, []);

    return (
        <Particles init={particlesInit} options={inOptions} id="particles" />
    )
}