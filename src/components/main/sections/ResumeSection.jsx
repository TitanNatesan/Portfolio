import { ListCollapse } from 'lucide-react';
import { timeline } from '../data/portfolioData';

export default function ResumeSection() {
    return (
        <section id="resume" className="section resume-section">
            <span className="section-tag floating-tag">
                <ListCollapse className="w-4 h-4" />
                Resume
            </span>
            <div className="section-content">
                <h2 className="section-title">
                    <b>E</b>ducation & E<b>xperience</b>
                </h2>
                <div className="timeline">
                    {timeline.map((item, index) => (
                        <div
                            key={index}
                            className={`timeline-item ${item.side}`}
                        >
                            <div className="timeline-marker" />
                            <div className="timeline-content">
                                <span className="timeline-period">{item.period}</span>
                                <h3 className="timeline-title">{item.title}</h3>
                                <p className="timeline-subtitle">{item.subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
