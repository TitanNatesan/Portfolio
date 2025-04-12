"use client";
import React, { useEffect } from "react";

export default function ParticlesGB() {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js";
        script.async = true;
        script.onload = () => {
            if (window.particlesJS) {
                window.particlesJS.load("particles-js", "/particles.json", function () {
                    console.log("Particles.js loaded successfully.");
                });
            }
        };
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);
    return (
        <div id="particles-js" className="fixed top-0 left-0 w-full h-screen"></div>
    )
}