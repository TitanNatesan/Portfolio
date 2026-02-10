'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [errors, setErrors] = useState({
        email: '',
        phone: ''
    });
    const [touched, setTouched] = useState({
        email: false,
        phone: false
    });

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) return '';
        return emailRegex.test(email) ? '' : 'Please enter a valid email address';
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        if (!phone) return ''; // Optional field
        return phoneRegex.test(phone) ? '' : 'Please enter a valid phone number';
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Real-time validation
        if (name === 'email') {
            setErrors(prev => ({ ...prev, email: validateEmail(value) }));
        }
        if (name === 'phone') {
            setErrors(prev => ({ ...prev, phone: validatePhone(value) }));
        }
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const emailError = validateEmail(formData.email);
        const phoneError = validatePhone(formData.phone);

        setErrors({ email: emailError, phone: phoneError });
        setTouched({ email: true, phone: true });

        if (!emailError && !phoneError && formData.name && formData.message) {
            // Form is valid - handle submission
            console.log('Form submitted:', formData);
            // Reset form
            setFormData({ name: '', email: '', phone: '', message: '' });
            setTouched({ email: false, phone: false });
        }
    };

    return (
        <section id="contact" className="section contact-section">
            <span className="section-tag floating-tag">
                <Send className="w-4 h-4" />
                Contact
            </span>
            <div className="section-content">
                <h2 className="section-title">
                    Let's work <b>Together!</b>
                </h2>
                <div className="contact-card">
                    <div className="contact-info">
                        <h3>Get in Touch</h3>
                        <p>Have a project in mind? Let's collaborate and build something amazing together.</p>
                    </div>
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder=" "
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                                <label htmlFor="name">What's your name?</label>
                            </div>
                            <div className={`form-group ${touched.email && errors.email ? 'error' : ''} ${touched.email && !errors.email && formData.email ? 'valid' : ''}`}>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder=" "
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    required
                                />
                                <label htmlFor="email">Your email address</label>
                                {touched.email && errors.email && (
                                    <span className="error-message">{errors.email}</span>
                                )}
                            </div>
                        </div>
                        <div className={`form-group ${touched.phone && errors.phone ? 'error' : ''} ${touched.phone && !errors.phone && formData.phone ? 'valid' : ''}`}>
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                placeholder=" "
                                value={formData.phone}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                            />
                            <label htmlFor="phone">Phone number (optional)</label>
                            {touched.phone && errors.phone && (
                                <span className="error-message">{errors.phone}</span>
                            )}
                        </div>
                        <div className="form-group">
                            <textarea
                                name="message"
                                id="message"
                                placeholder=" "
                                rows={4}
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                            />
                            <label htmlFor="message">Tell me about your project...</label>
                        </div>
                        <button type="submit" className="cta-button starry-btn">
                            <span>Send Message</span>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
