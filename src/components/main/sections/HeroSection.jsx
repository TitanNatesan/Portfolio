import TextType from '@/components/ui/TextType';
import { House } from 'lucide-react';

export default function HeroSection() {
    return (
        <section id="home" className="section hero-section">
            <span className="section-tag floating-tag">
                <House className="w-4 h-4" />
                Hello, I'm
            </span>
            <div className="section-content">
                <h1 className="hero-title">
                    I'm <b>Titan</b>
                </h1>
                <div className="typing-container">
                    <TextType
                        text={[
                            "Full Stack Developer",
                            "AI Enthusiast",
                            "Backend Specialist",
                            "Python Developer"
                        ]}
                        typingSpeed={75}
                        deletingSpeed={50}
                        pauseDuration={2000}
                        showCursor
                        cursorCharacter="_"
                        cursorBlinkDuration={0.5}
                        className="typing-text"
                    />
                </div>
                <p className="hero-desc">
                    Hi, I'm <b>Titan</b> Natesan. I'm a passionate <b>computer science enthusiast</b> with a creative spark and an <b>entrepreneurial</b> mindset. I believe that <b>coding</b>, <b>innovation</b>, and a <b>love</b> for problem solving can transform <b>ideas into reality</b>.
                </p>
                <button className="cta-button starry-btn" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                    <span>Get In Touch</span>
                </button>
            </div>
        </section>
    );
}
