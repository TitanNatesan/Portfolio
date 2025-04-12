"use client"
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    
    return (
        <footer className="col-span-3 border-t border-primary py-6 px-8 mt-auto">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-center md:text-left">
                    <p className="text-foreground text-sm">
                        © {currentYear} <span className="text-primary">Portfolio</span>. All rights reserved.
                    </p>
                    <p className="text-xs mt-1 text-foreground opacity-70">
                        Designed & Built with passion
                    </p>
                </div>
                
                
                <div className="flex gap-6 items-center">
                    <Link href="https://github.com" target="_blank" rel="noopener noreferrer" 
                        className="text-foreground hover:text-primary transition-colors duration-300">
                        <FaGithub size={20} />
                    </Link>
                    <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                        className="text-foreground hover:text-primary transition-colors duration-300">
                        <FaLinkedin size={20} />
                    </Link>
                    <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                        className="text-foreground hover:text-primary transition-colors duration-300">
                        <FaTwitter size={20} />
                    </Link>
                    <Link href="mailto:contact@example.com"
                        className="text-foreground hover:text-primary transition-colors duration-300">
                        <FaEnvelope size={20} />
                    </Link>
                </div>
                
                <button 
                    onClick={scrollToTop}
                    className="border border-primary px-4 py-1 rounded-md text-sm text-foreground hover:bg-primary hover:text-background transition-all duration-300"
                >
                    Back to top
                </button>
            </div>
        </footer>
    );
}