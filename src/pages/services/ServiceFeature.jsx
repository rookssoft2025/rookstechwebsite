import React from "react";
import { motion } from "framer-motion";
import FloatingElement from "../../uiComponents/FloatImg";
import AnimatedButton from "../../uiComponents/AnimatedButton";

export default function ServiceFeature() {

    const features = [
        {
            title: "Expert Team",
            description: "Certified professionals with years of industry experience"
        },
        {
            title: "24/7 Support",
            description: "Round-the-clock monitoring and assistance for your business"
        },
        {
            title: "Cutting-edge Solutions",
            description: "Stay ahead with the latest technology implementations"
        },
        {
            title: "Customized Approach",
            description: "Tailored solutions that fit your specific business needs"
        }
    ];

    const testimonials = [
        {
            name: "Mr. Mari Selvam",
            company: "Founder – GR Furniture",
            comment: "Partnering with this IT team has transformed the way we manage our business operations. From inventory tracking to seamless customer communication, their solutions have made our processes faster and smarter. Their support is always reliable, and I truly value their commitment to innovation.",
         
        },
        {
            name: "Mr. Vijaya Kumar",
            company: "Vijay Hardwares",
            comment: "We wanted a trusted partner who could modernize our systems without disrupting our workflow, and that’s exactly what we got. The IT services provided have helped us streamline billing, manage data securely, and improve efficiency across departments. It has been a game-changer for our growth.",
          
        },
        {
            name: "Mr. Benet Jayasingh",
            company: "Quality Marbles",
            comment: "Technology was always a challenge for us until we started working with this IT service provider. They built customized solutions that perfectly fit our requirements, from secure data handling to cloud integration. Their expertise has not only saved us time but also boosted our productivity and customer satisfaction.",
        }
    ];

    return (
        <div>
            <section className="py-16 px-4 sm:px-6 mt-10">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        Why Choose Our <span className="text-blue-300">IT Services</span>
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="relative group"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg blur opacity-30 group-hover:opacity-70 transition duration-300"></div>
                                <div className="relative bg-[#0a1f3a] p-6 rounded-lg border border-blue-500/20 h-full flex flex-col">
                                    <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                                    <p className="text-blue-100 flex-grow">{feature.description}</p>
                                    <div className="mt-4 pt-4 border-t border-blue-800">
                                        <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center">
                                            <span className="text-blue-300 font-bold">{index + 1}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="py-16 px-4 sm:px-6 ">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        What Our <span className="text-blue-300">Clients Say</span>
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                className="relative group"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-400 rounded-lg blur opacity-30 group-hover:opacity-70 transition duration-300"></div>
                                <div className="relative bg-[#0a1f3a] p-6 rounded-lg border border-purple-500/20 h-full flex flex-col">
                                    <div className="flex items-center mb-4">
                                        {/* <img
                                            src={testimonial.avatar}
                                            alt={testimonial.name}
                                            className="w-12 h-12 rounded-full mr-4 object-cover"
                                        /> */}
                                        <div>
                                            <h3 className="text-white font-semibold">{testimonial.name}</h3>
                                            <p className="text-blue-200 text-sm">{testimonial.company}</p>
                                        </div>
                                    </div>
                                    <p className="text-blue-100 italic">"{testimonial.comment}"</p>
                                    <div className="mt-auto pt-4">
                                        <div className="flex text-yellow-300">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="py-16 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg blur opacity-30 group-hover:opacity-70 transition duration-300"></div>
                    <motion.div
                        className="relative bg-[#0a1f3a] p-8 md:p-12 rounded-lg border border-blue-500/30 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Transform Your <span className="text-blue-300">IT Infrastructure</span>?</h2>
                        <p className="text-lg md:text-xl text-blue-200 max-w-2xl mx-auto mb-10">
                            Schedule a free consultation with our experts to discuss your IT needs and develop a customized solution for your business.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            
                            <AnimatedButton label="Get Started Today" onClick={() => {
                                window.scrollTo({
                                    top: document.body.scrollHeight,
                                    behavior: "smooth",
                                });
                            }} />
                            <a
                                href="https://wa.me/917598707071"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative bg-transparent hover:bg-blue-800/30 border border-blue-500 text-white px-8 py-3 rounded-lg font-medium transition"
                            >
                                Call Us: +91 7598707071
                            </a>

                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}