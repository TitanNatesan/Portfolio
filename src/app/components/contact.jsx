"use client";
import { useState, useEffect } from 'react';
import { init, sendForm } from '@emailjs/browser';
import { Hair } from './sub-comp/hair';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    useEffect(() => {
        init({
            publicKey: "J7R_C7yEHOyxkoVmf",
        });
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        let errors = {};
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^\+?[0-9\s]*$/;

        if (!formData.name.trim()) errors.name = "Name is required";
        if (!formData.email.trim()) errors.email = "Email is required";
        else if (!emailPattern.test(formData.email)) errors.email = "Invalid email format";
        if (formData.phone && !phonePattern.test(formData.phone)) errors.phone = "Invalid phone format";
        if (!formData.message.trim()) errors.message = "Message is required";

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            setIsSubmitting(true);

            sendForm('service_pn1qt8f', 'template_lxrqb1w', e.target)
                .then(() => {
                    setSubmitStatus({ success: true, message: "Message sent successfully!" });
                    setFormData({ name: '', phone: '', email: '', message: '' });
                })
                .catch((error) => {
                    setSubmitStatus({ success: false, message: "Failed to send message. Please try again." });
                    console.error(error);
                })
                .finally(() => {
                    setIsSubmitting(false);
                    setTimeout(() => setSubmitStatus(null), 5000);
                });
        }
    };

    return (
        <section id="contact" className="contact">
            <Hair name={"Contact"} />
            <h1 className="text-7xl">
                Let's work<b> Together!</b>
            </h1>
            <form
                id="contactForm"
                onSubmit={handleSubmit}
                className="w-[90%] mt-10 border border-[var(--foreground)] rounded-[40px] flex flex-col items-center py-[50px] transition-all duration-800 ease-in-out hover:backdrop-blur hover:bg-[#fff1]"
            >
                <label htmlFor="name" className="relative w-[70%] h-[50px] my-5 mx-auto">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className="absolute w-full h-[50px] text-2xl p-0 border-b border-[var(--foreground)] outline-none bg-transparent transition-all duration-500 ease-in-out focus:border-b-[var(--primary)] focus:placeholder:text-white/60 placeholder:text-transparent"
                    />
                    <p className={`absolute transition-all duration-300 ease-in-out ${formData.name ? 'top-[-25px] text-[1.4rem]' : 'top-[20px]'}`}>Name</p>
                    {formErrors.name && <span className="text-red-500 absolute bottom-[-20px] text-sm">{formErrors.name}</span>}
                </label>

                <label htmlFor="phone" className="relative w-[70%] h-[50px] my-5 mx-auto">
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 000 000 0000"
                        className="absolute w-full h-[50px] text-2xl p-0 border-b border-[var(--foreground)] outline-none bg-transparent transition-all duration-500 ease-in-out focus:border-b-[var(--primary)] focus:placeholder:text-white/60 placeholder:text-transparent"
                    />
                    <p className={`absolute transition-all duration-300 ease-in-out ${formData.phone ? 'top-[-25px] text-[1.4rem]' : 'top-[20px]'}`}>Phone no.</p>
                    {formErrors.phone && <span className="text-red-500 absolute bottom-[-20px] text-sm">{formErrors.phone}</span>}
                </label>

                <label htmlFor="from_mail" className="relative w-[70%] h-[50px] my-5 mx-auto">
                    <input
                        type="email"
                        id="from_mail"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@domain.any"
                        className="absolute w-full h-[50px] text-2xl p-0 border-b border-[var(--foreground)] outline-none bg-transparent transition-all duration-500 ease-in-out focus:border-b-[var(--primary)] focus:placeholder:text-white/60 placeholder:text-transparent"
                    />
                    <p className={`absolute transition-all duration-300 ease-in-out ${formData.email ? 'top-[-25px] text-[1.4rem]' : 'top-[20px]'}`}>Email</p>
                    {formErrors.email && <span className="text-red-500 absolute bottom-[-20px] text-sm">{formErrors.email}</span>}
                </label>

                <label htmlFor="message" className="relative w-[70%] h-[150px] my-5 mx-auto">
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Do you Like to Ask me anything?"
                        className="absolute w-full min-h-[100px] text-2xl p-0 border-b border-[var(--foreground)] outline-none bg-transparent transition-all duration-500 ease-in-out focus:placeholder:text-white/60 placeholder:text-transparent resize-none"
                    ></textarea>
                    <p className={`absolute transition-all duration-300 ease-in-out ${formData.message ? 'top-[-25px] text-[1.4rem]' : 'top-[20px]'}`}>Message</p>
                    {formErrors.message && <span className="form-error-message text-red-500 absolute bottom-[-24px] text-sm">{formErrors.message}</span>}
                </label>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="button mt-8 rounded-full flex justify-center items-center w-[60%] py-[10px] text-2xl font-black border-none bg-[var(--primary)] transition-all duration-500 ease-in-out hover:shadow-[0_0_10px_0px_var(--primary)] hover:text-white hover:text-shadow-[0_0_5px_black]"
                >
                    {isSubmitting ? <p className="text-2xl relative ">Sending...</p> : <p className="text-2xl relative ">Send Message</p>}
                </button>

                {submitStatus && (
                    <div className={`mt-4 px-4 py-2 rounded-md ${submitStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {submitStatus.message}
                    </div>
                )}
            </form>
        </section>
    );
}
