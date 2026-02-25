import { FolderGit2 } from 'lucide-react';
import Image from 'next/image';
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
                <p className="section-desc">
                    A selection of projects showcasing my expertise in <b>full-stack development</b>, <b>AI/ML</b>, and <b>creative problem solving</b>.
                </p>
                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <article
                            key={project.name}
                            className={`project-card ${index === 0 ? 'project-card-featured' : ''}`}
                        >
                            <Image
                                src={project.image}
                                alt={`${project.name} - ${project.desc}`}
                                className="project-card-img"
                                fill
                                sizes={index === 0 ? "(max-width: 768px) 100vw, 100vw" : "(max-width: 768px) 100vw, 50vw"}
                                priority={index === 0}
                                loading={index === 0 ? "eager" : "lazy"}
                            />
                            <div className="project-overlay">
                                <div className="project-number">
                                    {String(index + 1).padStart(2, '0')}
                                </div>
                                <h3 className="project-name">{project.name}</h3>
                                <p className="project-desc">{project.desc}</p>
                                <div className="project-tech">
                                    {project.techStack.map((tech) => (
                                        <span key={tech} className="tech-tag">{tech}</span>
                                    ))}
                                </div>
                                <div className="project-links">
                                    {project.github && (
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link starry-btn" aria-label={`View ${project.name} source code on GitHub`}>
                                            <FaGithub /> Code
                                        </a>
                                    )}
                                    {project.live && (
                                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link live starry-btn" aria-label={`View ${project.name} live demo`}>
                                            <FaExternalLinkAlt /> Live
                                        </a>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
