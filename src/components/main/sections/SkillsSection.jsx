import { Sparkles } from 'lucide-react';
import { fullStackSkills, devToolsSkills, aiMlSkills } from '../data/portfolioData';

export default function SkillsSection() {
    return (
        <section id="skills" className="section skills-section">
            <span className="section-tag floating-tag">
                <Sparkles className="w-4 h-4" />
                Skills
            </span>
            <div className="section-content">
                <h2 className="section-title">
                    <b>Tech</b> Stack
                </h2>

                {/* Full Stack Development */}
                <div className="skills-category-wrapper">
                    <h3 className="skills-category">
                        <span className="category-line"></span>
                        Full Stack
                    </h3>
                    <div className="skills-grid">
                        {fullStackSkills.map((skill) => (
                            <div key={skill.name} className="skill-card">
                                <div className="skill-img-wrapper">
                                    <img src={skill.img} alt={skill.name} className="skill-img" />
                                </div>
                                <span className="skill-name">{skill.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dev Tools */}
                <div className="skills-category-wrapper">
                    <h3 className="skills-category">
                        <span className="category-line"></span>
                        Dev Tools
                    </h3>
                    <div className="skills-grid">
                        {devToolsSkills.map((skill) => (
                            <div key={skill.name} className="skill-card">
                                <div className="skill-img-wrapper">
                                    <img src={skill.img} alt={skill.name} className="skill-img" />
                                </div>
                                <span className="skill-name">{skill.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* AI & Machine Learning */}
                <div className="skills-category-wrapper">
                    <h3 className="skills-category">
                        <span className="category-line"></span>
                        AI & ML
                    </h3>
                    <div className="skills-grid">
                        {aiMlSkills.map((skill) => (
                            <div key={skill.name} className="skill-card">
                                <div className="skill-img-wrapper">
                                    <img src={skill.img} alt={skill.name} className="skill-img" />
                                </div>
                                <span className="skill-name">{skill.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
