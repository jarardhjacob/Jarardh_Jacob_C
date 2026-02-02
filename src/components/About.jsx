import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const About = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    
    setMousePosition({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <section id="about" className="py-20 bg-white dark:bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row items-center gap-16"
        >
          {/* Text Content */}
          <div className="flex-[1.2] space-y-8">
            <div className="space-y-4">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl"
              >
                About Me
              </motion.h2>
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                className="w-24 h-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full origin-left"
              />
            </div>
            
            <div className="space-y-6">
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                I am a <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Full Stack Developer and Trainer</span> with a strong passion for creating scalable, functional, and user-centered digital experiences.
              </p>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                With solid experience across front-end and back-end web development, I effectively bridge the gap between design and technical execution. My journey into web development began with a curiosity about how digital products are built, which led me to develop deep expertise in modern frameworks such as <span className="font-medium text-gray-900 dark:text-white">React</span>, <span className="font-medium text-gray-900 dark:text-white">Node.js</span>, and the broader JavaScript ecosystem.
              </p>
            </div>

            {/* Hover Lift Stats */}
            <div className="grid grid-cols-2 gap-6 mt-10">
              {[
                { label: 'Years Experience', value: '1+', delay: 0 },
                { label: 'Projects Completed', value: '2+', delay: 0.1 }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: stat.delay }}
                  whileHover={{ 
                    y: -10, 
                    scale: 1.02,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  className="p-6 bg-gray-50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-800/50 text-center transition-shadow"
                >
                  <h3 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {stat.value}
                  </h3>
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mt-2 uppercase tracking-widest">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Image Visual with 3D Tilt & Floating Idle */}
          <div className="flex-1 w-full flex justify-center relative">
            <motion.div 
              animate={{ 
                y: [0, -15, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative w-80 h-80 sm:w-96 sm:h-96"
            >
              {/* Animated Glow Background */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -inset-4 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl -z-10"
              />
              
              <motion.div
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                animate={{
                  rotateX: mousePosition.x,
                  rotateY: mousePosition.y,
                  scale: isHovered ? 1.05 : 1,
                }}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                }}
                className="relative w-full h-full bg-gray-200 dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
              >
                {/* Hover Glow Overlay */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 mix-blend-overlay"
                    />
                  )}
                </AnimatePresence>

                <img
                  src="/ProfileImage.png"
                  alt="Profile"
                  className="w-full h-full object-cover"
                  style={{ transform: "translateZ(30px)" }}
                />
                
                {/* Inner Border Reflection */}
                <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none z-20" />
              </motion.div>

              {/* Decorative elements that follow tilt */}
              <motion.div
                animate={{
                  rotateX: mousePosition.x * 0.5,
                  rotateY: mousePosition.y * 0.5,
                }}
                className="absolute -bottom-6 -right-6 w-24 h-24 bg-indigo-600/10 backdrop-blur-md border border-indigo-500/20 rounded-2xl -z-20"
              />
              <motion.div
                animate={{
                  rotateX: mousePosition.x * 0.8,
                  rotateY: mousePosition.y * 0.8,
                }}
                className="absolute -top-6 -left-6 w-32 h-32 bg-purple-600/10 backdrop-blur-md border border-purple-500/20 rounded-full -z-20"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
