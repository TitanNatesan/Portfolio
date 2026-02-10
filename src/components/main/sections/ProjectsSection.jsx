import { FolderGit2 } from 'lucide-react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projects } from '../data/portfolioData';

export default function ProjectsSection() {
    return (
        <section id="projects" className="section projects-section">
            <span className="section-tag floating-tag">
                <FolderGit2 className="w-4 h-4" />
                Projects
            </span>
            <div className="section-content">
                <h2 className="section-title">
                    <b>Featured</b> Work
                </h2>
                <div className="projects-grid">
                    {projects.map((project) => (
                        <div
                            key={project.name}
                            className="project-card"
                        >
                            <img
                                src={project.image}
                                alt={project.name}
                                className="project-card-img"
                                loading="lazy"
                            />
                            <div className="project-overlay">
                                <h3 className="project-name">{project.name}</h3>
                                <p className="project-desc">{project.desc}</p>
                                <div className="project-tech">
                                    {project.techStack.map((tech) => (
                                        <span key={tech} className="tech-tag">{tech}</span>
                                    ))}
                                </div>
                                <div className="project-links">
                                    {project.github && (
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link starry-btn">
                                            <FaGithub /> Code
                                        </a>
                                    )}
                                    {project.live && (
                                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link live starry-btn">
                                            <FaExternalLinkAlt /> Live
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
