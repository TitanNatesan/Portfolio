'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import './sidecard.css';
import { FaLinkedinIn, FaInstagram, FaGithub, FaFacebookF, FaWhatsapp, FaDownload } from 'react-icons/fa';

const socialLinks = [
    { icon: FaLinkedinIn, label: 'LinkedIn', href: 'https://linkedin.com/in/titannatesan', color: '#0077b5' },
    { icon: FaInstagram, label: 'Instagram', href: 'https://instagram.com/titan_natesan', color: '#e4405f' },
    { icon: FaGithub, label: 'GitHub', href: 'https://github.com/TitanNatesan', color: '#333' },
    { icon: FaFacebookF, label: 'Facebook', href: 'https://facebook.com/titannatesan', color: '#1877f2' },
    { icon: FaWhatsapp, label: 'WhatsApp', href: 'https://wa.me/916380615171', color: '#25d366' },
];

export default function SideCard() {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const imageRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!imageRef.current) return;
        const rect = imageRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const tiltX = ((y - centerY) / centerY) * -15;
        const tiltY = ((x - centerX) / centerX) * 15;

        setTilt({ x: tiltX, y: tiltY });
    };

    const handleMouseEnter = () => setIsHovering(true);

    const handleMouseLeave = () => {
        setIsHovering(false);
        setTilt({ x: 0, y: 0 });
    };

    return (
        <section className="sidecard relative w-full lg:fixed lg:left-8 lg:top-1/2 lg:-translate-y-1/2 lg:h-[94vh] lg:w-[35%] lg:min-w-80 lg:max-w-125 border-b-2 lg:border-2 border-black lg:rounded-tl-[5rem] lg:rounded-br-[5rem] flex flex-col z-40 lg:pt-0">
            {/* Head Section */}
            <header className="sidecard-head flex justify-between items-center px-8 py-12 border-b border-neutral-200 rounded-tl-[5rem]">
                <h2 className="hero glitch layers text-4xl font-bold tracking-tight" data-text="TitanDev">
                    <span>Titan<b className="text-neutral-500 font-bold">Dev</b></span>
                </h2>
                <div className="role-badge">
                    <span className="role-text">Full Stack Developer</span>
                    <span className="role-separator">•</span>
                    <span className="role-text">AI Enthusiast</span>
                </div>
            </header>

            {/* Content Section - Profile Image */}
            <div className="sidecard-content flex-1 flex items-center justify-center p-8">
                <div
                    ref={imageRef}
                    className="profile-image-container relative w-full max-w-80 aspect-3/4 cursor-pointer"
                    onMouseMove={handleMouseMove}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                        transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
                    }}
                >
                    {/* Dynamic Shadow - Light source from top-left, shadow falls bottom-right */}
                    <div
                        className="absolute -z-10 rounded-xl"
                        style={{
                            inset: '10px',
                            background: 'rgba(0, 0, 0, 0.4)',
                            transform: `translateX(${12 + tilt.y * 0.8}px) translateY(${12 - tilt.x * 0.8}px)`,
                            filter: `blur(${isHovering ? 25 : 15}px)`,
                            opacity: isHovering ? 1 : 0.6,
                            transition: 'filter 0.3s ease-out, opacity 0.3s ease-out, transform 0.1s ease-out',
                        }}
                    />

                    {/* Image Container */}
                    <div className="relative w-full h-full rounded-xl overflow-hidden border-2 border-black bg-black">
                        <Image
                            src="/profile-ghibli.png"
                            alt="Titan - AI Engineer"
                            fill
                            sizes="(max-width: 400px) 280px, 280px"
                            priority
                            className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                        />

                        {/* Shine Effect - Light source from top-left */}
                        <div
                            className="shine-effect absolute inset-0 pointer-events-none"
                            style={{
                                background: isHovering
                                    ? `radial-gradient(
                                        ellipse 80% 80% at ${30 - tilt.y * 2}% ${30 + tilt.x * 2}%,
                                        rgba(255, 255, 255, 0.4) 0%,
                                        rgba(255, 255, 255, 0.15) 30%,
                                        transparent 70%
                                      )`
                                    : 'transparent',
                                transition: 'background 0.15s ease-out',
                            }}
                        />

                        {/* Edge highlight - top-left corner glow */}
                        <div
                            className="absolute inset-0 pointer-events-none rounded-xl"
                            style={{
                                boxShadow: isHovering
                                    ? `inset 8px 8px 30px rgba(255, 255, 255, 0.25),
                                       inset 2px 2px 10px rgba(255, 255, 255, 0.3)`
                                    : 'none',
                                transition: 'box-shadow 0.3s ease-out',
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Foot Section - Social Links */}
            <footer className="sidecard-foot px-8 py-12 border-t border-neutral-200 rounded-br-[5rem] flex flex-col items-center">
                {/* Social Icons */}
                <div className="flex justify-center gap-4 mb-5">
                    {socialLinks.map((social) => (
                        <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative w-16 h-16 flex items-center justify-center rounded-full bg-neutral-100 border border-neutral-300 text-black transition-all duration-300 hover:shadow-lg"
                            style={{ '--hover-color': social.color }}
                            aria-label={social.label}
                        >
                            <social.icon className="w-8 h-8 transition-colors duration-300 group-hover:text-white" />
                            {/* Tooltip */}
                            <span className="tooltip absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 text-xs font-medium text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                                {social.label}
                                <span className="tooltip-arrow absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent" />
                            </span>
                        </a>
                    ))}
                </div>

                {/* Download Resume Button */}
                <a
                    href="/resume.pdf"
                    download
                    className="cta-button starry-btn"
                >
                    <span>Download Resume</span>
                </a>
            </footer>
        </section>
    );
}