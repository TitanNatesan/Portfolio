'use client';

import { useState, useEffect, useRef } from 'react';
import {
    House,
    Sparkles,
    Send,
    Menu,
    X,
    Heart,
    ListCollapse,
    FolderGit2
} from 'lucide-react';
import './navbar.css';

// Nav items without the menu toggle (it's separate)
const navItems = [
    { name: 'Home', icon: House, href: '#home' },
    { name: 'About', icon: Heart, href: '#about' },
    { name: 'Resume', icon: ListCollapse, href: '#resume' },
    { name: 'Skills', icon: Sparkles, href: '#skills' },
    { name: 'Projects', icon: FolderGit2, href: '#projects' },
    { name: 'Contact', icon: Send, href: '#contact' },
];

export default function Navbar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [lastIndex, setLastIndex] = useState(0);
    const [animDirection, setAnimDirection] = useState('down'); // 'down' | 'up'
    const [isHoveringNavbar, setIsHoveringNavbar] = useState(false);
    const collapseTimerRef = useRef(null);
    const wheelLockRef = useRef(false);
    const isCollapsedRef = useRef(isCollapsed);
    const isHoveringRef = useRef(false);

    // Keep refs in sync
    useEffect(() => {
        isCollapsedRef.current = isCollapsed;
    }, [isCollapsed]);

    useEffect(() => {
        isHoveringRef.current = isHoveringNavbar;
    }, [isHoveringNavbar]);

    useEffect(() => {
        const mainContainer = document.querySelector('.main-container');
        if (!mainContainer) return;

        const handleScroll = () => {
            if (mainContainer.scrollTop > 50) {
                // Should collapse - but only if not hovering
                if (!isCollapsedRef.current && !collapseTimerRef.current && !isHoveringRef.current) {
                    // Start delay only if not already collapsed, no timer running, and not hovering
                    collapseTimerRef.current = setTimeout(() => {
                        // Double-check we're still not hovering before collapsing
                        if (!isHoveringRef.current) {
                            setIsCollapsed(true);
                        }
                        collapseTimerRef.current = null;
                    }, 1000); // 1s delay for scroll collapse
                }
            } else {
                // Should expand (instant)
                if (collapseTimerRef.current) {
                    clearTimeout(collapseTimerRef.current);
                    collapseTimerRef.current = null;
                }
                if (isCollapsedRef.current) {
                    setIsCollapsed(false);
                }
            }
        };

        mainContainer.addEventListener('scroll', handleScroll);
        // Initial check without delay
        if (mainContainer.scrollTop > 50) setIsCollapsed(true);

        return () => {
            mainContainer.removeEventListener('scroll', handleScroll);
            if (collapseTimerRef.current) clearTimeout(collapseTimerRef.current);
        };
    }, []); // Empty dependency array ensures listener is bound once

    // Manual toggle - Instant
    const toggleCollapse = () => {
        if (collapseTimerRef.current) {
            clearTimeout(collapseTimerRef.current);
            collapseTimerRef.current = null;
        }
        setIsCollapsed(!isCollapsed);
    };

    // Handle navbar hover - prevent collapse while hovering
    const handleNavbarMouseEnter = () => {
        setIsHoveringNavbar(true);
        // Cancel any pending collapse timer
        if (collapseTimerRef.current) {
            clearTimeout(collapseTimerRef.current);
            collapseTimerRef.current = null;
        }
    };

    const handleNavbarMouseLeave = () => {
        setIsHoveringNavbar(false);
        // If scrolled down, start collapse timer
        const mainContainer = document.querySelector('.main-container');
        if (mainContainer && mainContainer.scrollTop > 50 && !isCollapsedRef.current) {
            collapseTimerRef.current = setTimeout(() => {
                if (!isHoveringRef.current) {
                    setIsCollapsed(true);
                }
                collapseTimerRef.current = null;
            }, 500); // Shorter delay when mouse leaves
        }
    };

    // Intersection Observer to track which section is in view
    useEffect(() => {
        const sectionIds = navItems.map(item => item.href.slice(1));
        const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

        if (sections.length === 0) return;

        let observer;

        const createObserver = () => {
            if (observer) observer.disconnect();

            const isMobile = window.innerWidth <= 1024;
            const observerOptions = {
                root: isMobile ? null : document.querySelector('.main-container'),
                rootMargin: isMobile ? '-30% 0px -50% 0px' : '-10% 0px -40% 0px',
                threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
            };

            const observerCallback = (entries) => {
                let bestEntry = null;
                let maxRatio = -1;

                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
                        maxRatio = entry.intersectionRatio;
                        bestEntry = entry;
                    }
                });

                if (bestEntry) {
                    const sectionId = bestEntry.target.id;
                    const newIndex = sectionIds.indexOf(sectionId);

                    if (newIndex !== -1) {
                        setActiveIndex(prev => {
                            if (newIndex !== prev) {
                                const dir = newIndex > prev ? 'down' : 'up';
                                setAnimDirection(dir);
                                setLastIndex(prev);
                                return newIndex;
                            }
                            return prev;
                        });
                    }
                }
            };

            observer = new IntersectionObserver(observerCallback, observerOptions);
            sections.forEach(section => observer.observe(section));
        };

        createObserver();

        const handleResize = () => {
            createObserver();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            if (observer) observer.disconnect();
            window.removeEventListener('resize', handleResize);
        };
    }, [activeIndex]); // Re-run to track direction correctly

    const scrollToHref = (href) => {
        if (!href) return;
        const id = href.startsWith('#') ? href.slice(1) : null;
        const el = id ? document.getElementById(id) : null;
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            window.location.hash = href;
        }
    };

    const setActiveWithDir = (newIndex, dir = 'down') => {
        const clamped = (newIndex + navItems.length) % navItems.length;
        setAnimDirection(dir);
        setLastIndex(activeIndex);
        setActiveIndex(clamped);
        scrollToHref(navItems[clamped].href);
        setMobileMenuOpen(false); // Close mobile menu on selection
    };

    const goPrev = () => setActiveWithDir(activeIndex - 1, 'up');
    const goNext = () => setActiveWithDir(activeIndex + 1, 'down');

    const handleWheel = (e) => {
        e.preventDefault();
        if (wheelLockRef.current) return;
        wheelLockRef.current = true;
        setTimeout(() => (wheelLockRef.current = false), 350);
        if (e.deltaY > 0) {
            goNext();
        } else if (e.deltaY < 0) {
            goPrev();
        }
    };

    return (
        <>
            {/* Mobile Navbar - Floating Black Ball with Menu */}
            <nav className="mobile-navbar lg:hidden fixed top-4 right-4 z-[100]">
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="w-14 h-14 flex items-center justify-center rounded-full bg-black text-white shadow-lg transition-all duration-300 hover:scale-110"
                    aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                {/* Mobile Menu Dropdown - positioned below button */}
                <div
                    className={`absolute top-16 right-0 w-[200px] overflow-hidden transition-all duration-300 ease-out bg-white/95 backdrop-blur-md rounded-2xl border-2 border-black shadow-lg ${mobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 border-0'}`}
                >
                    <div className="flex flex-col p-2 gap-1">
                        {navItems.map((item, index) => {
                            const Icon = item.icon;
                            const dir = index < activeIndex ? 'up' : 'down';
                            return (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setActiveWithDir(index, dir);
                                    }}
                                    className={`
                                        flex items-center gap-3 px-4 py-3 rounded-xl
                                        transition-all duration-200 ease-out
                                        ${activeIndex === index
                                            ? 'bg-black text-white'
                                            : 'text-black hover:bg-neutral-100'
                                        }
                                    `}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="font-medium text-sm">{item.name}</span>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </nav>

            {/* Desktop Navbar - Original Vertical Design */}
            <nav className="navbar hidden lg:block fixed right-12 top-1/2 -translate-y-1/2 z-50">
                <div
                    onWheel={handleWheel}
                    onMouseEnter={handleNavbarMouseEnter}
                    onMouseLeave={handleNavbarMouseLeave}
                    className={`
                        relative flex flex-col items-center justify-center rounded-full border-2 border-black 
                        bg-white/5 hover:backdrop-blur-xs hover:bg-white/10
                        transition-all duration-500 ease-out
                        w-[72px] ${isCollapsed ? 'h-[72px] p-4' : 'h-[80vh] px-4 py-12'}
                    `}
                >
                    {/* Top items */}
                    <div
                        className={`
                            flex flex-col items-center overflow-hidden
                            transition-all duration-500 ease-out
                            ${isCollapsed ? 'max-h-0 opacity-0 gap-0 pointer-events-none' : 'max-h-[500px] opacity-100 gap-7 mb-4'}
                        `}
                        aria-hidden={isCollapsed}
                    >
                        {navItems.slice(0, 3).map((item, index) => {
                            const Icon = item.icon;
                            const dir = index < activeIndex ? 'up' : 'down';
                            return (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setActiveWithDir(index, dir)}
                                    title={item.name}
                                    className={`
                                        w-14 h-14 flex items-center justify-center rounded-full 
                                        transition-all duration-300 ease-out
                                        ${isCollapsed ? 'scale-0' : 'scale-100'}
                                        ${activeIndex === index ? 'bg-black text-white starry-btn' : 'text-black hover:bg-neutral-100'}
                                    `}
                                    style={{ transitionDelay: isCollapsed ? '0ms' : `${index * 50}ms` }}
                                    aria-label={item.name}
                                >
                                    <Icon className="w-6 h-6" />
                                </a>
                            );
                        })}
                    </div>

                    {/* Center icon: X when expanded, active icon when collapsed */}
                    <button
                        onClick={toggleCollapse}
                        className="w-14 h-14 flex items-center justify-center rounded-full text-black hover:bg-neutral-100 transition-all duration-300"
                        aria-label={isCollapsed ? 'Expand navbar' : 'Collapse navbar'}
                    >
                        <div className="relative w-6 h-6 overflow-hidden">
                            {isCollapsed ? (
                                (() => {
                                    const LastIcon = navItems[lastIndex]?.icon;
                                    const ActiveIcon = navItems[activeIndex]?.icon;
                                    const outClass = animDirection === 'down' ? 'animate-slide-up-out' : 'animate-slide-down-out';
                                    const inClass = animDirection === 'down' ? 'animate-slide-up-in' : 'animate-slide-down-in';

                                    return (
                                        <>
                                            {/* Last Icon (Exiting) - render only if index changed */}
                                            {LastIcon && lastIndex !== activeIndex && (
                                                <LastIcon
                                                    key={`last-${lastIndex}`}
                                                    className={`absolute inset-0 w-6 h-6 ${outClass}`}
                                                />
                                            )}
                                            {/* Active Icon (Entering) */}
                                            {ActiveIcon && (
                                                <ActiveIcon
                                                    key={`active-${activeIndex}`}
                                                    className={`absolute inset-0 w-6 h-6 ${inClass}`}
                                                />
                                            )}
                                        </>
                                    );
                                })()
                            ) : (
                                <X className="absolute inset-0 w-6 h-6 transition-all duration-300" />
                            )}
                        </div>
                    </button>

                    {/* Bottom items */}
                    <div
                        className={`
                            flex flex-col items-center overflow-hidden
                            transition-all duration-500 ease-out
                            ${isCollapsed ? 'max-h-0 opacity-0 gap-0 pointer-events-none' : 'max-h-[500px] opacity-100 gap-7 mt-4'}
                        `}
                        aria-hidden={isCollapsed}
                    >
                        {navItems.slice(3).map((item, index) => {
                            const Icon = item.icon;
                            const actualIndex = index + 3;
                            const dir = actualIndex < activeIndex ? 'up' : 'down';
                            return (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setActiveWithDir(actualIndex, dir)}
                                    title={item.name}
                                    className={`
                                        w-14 h-14 flex items-center justify-center rounded-full 
                                        transition-all duration-300 ease-out
                                        ${isCollapsed ? 'scale-0' : 'scale-100'}
                                        ${activeIndex === actualIndex ? 'bg-black text-white starry-btn' : 'text-black hover:bg-neutral-100'}
                                    `}
                                    style={{ transitionDelay: isCollapsed ? '0ms' : `${(index + 4) * 50}ms` }}
                                    aria-label={item.name}
                                >
                                    <Icon className="w-6 h-6" />
                                </a>
                            );
                        })}
                    </div>
                </div>
            </nav>
        </>
    );
}
