import { Heart } from 'lucide-react';

export default function AboutSection() {
    return (
        <section id="about" className="section about-section">
            <span className="section-tag floating-tag">
                <Heart className="w-4 h-4" />
                About
            </span>
            <div className="section-content">
                <h2 className="section-title">
                    Natesan <b>is...</b>
                </h2>
                <p className="section-desc">
                    A driven and <b>innovative individual</b> with a profound passion for computer <b>science and entrepreneurship</b>. He has built a strong foundation in <b>coding</b>, <b>mathematics</b>, and <b>problem solving</b>, which empowers him to transform creative ideas into tangible technological solutions.
                </p>
                <p className="section-desc">
                    Those who know him describe Natesan as a <b>visionary person</b> who consistently seeks out <b>new challenges</b> and <b>opportunities</b> to make a <b>real impact</b> in the tech world. His <b>proactive approach</b> to <b>learning</b> and his ability to adapt to <b>emerging trends</b> make him a <b>standout candidate</b> for any forward-thinking team.
                </p>
                <button className="cta-button secondary starry-btn">
                    <span>Explore Projects</span>
                </button>
            </div>
        </section>
    );
}
