import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="py-20 bg-white dark:bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row items-center gap-12"
                >
                    {/* Text Content */}
                    <div className="flex-1 space-y-6">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            About Me
                        </h2>
                        
                        <div className="w-20 h-1 bg-indigo-600 dark:bg-indigo-400 rounded-full" />
                        
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            I'm a Full Stack Developer with a passion for creating beautiful, functional, and user-centered digital experiences. 
                            With a strong foundation in both front-end and back-end web development, I bridge the gap between graphical design 
                            and technical implementation.
                        </p>
                        
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            My journey began with a curiosity for how things work on the web, which led me to dive deep into modern frameworks 
                            like React, Node.js, and the broader JavaScript ecosystem. I believe in writing clean, maintainable code and building 
                            scalable applications.
                        </p>

                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 text-center">
                                <h3 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">1+</h3>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">Years Experience</p>
                            </div>
                            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 text-center">
                                <h3 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">2+</h3>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">Projects Completed</p>
                            </div>
                        </div>
                    </div>

                   {/* Image / Visual */}
                    <div className="flex-1 w-full flex justify-center">
                         <div className="relative w-80 h-80 sm:w-96 sm:h-96">
                            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl transform rotate-6 opacity-50 blur-lg" />
                            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl transform -rotate-3 transition-transform hover:rotate-0 duration-300">
                                {/* Placeholder for profile image - using a nice gradient/pattern for now or generic avatar */}
                                <img
                                    src="/ProfileImage.png"
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                         </div>
                    </div>

                </motion.div>
            </div>
        </section>
    );
};

export default About;
