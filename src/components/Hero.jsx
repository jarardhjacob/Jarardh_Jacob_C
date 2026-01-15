import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import MatrixRain from './MatrixRain';

const Hero = () => {
  return (
    <section className="h-[100svh] flex items-center justify-center bg-gradient-to-br from-white to-white dark:from-black dark:to-black overflow-hidden relative">
      {/* Matrix Rain Background */}
      <MatrixRain />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 dark:via-black/50 to-white dark:to-black pointer-events-none z-[1]" />
      
      {/* Animated Gradient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 -left-1/4 w-96 h-96 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-gradient-to-l from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl pointer-events-none"
      />

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col items-center text-center">
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="
    inline-flex items-center justify-center
    px-3 py-1
    text-xs sm:text-sm
    font-semibold
    tracking-wide
    text-indigo-600 dark:text-indigo-400
    uppercase
    bg-indigo-50/80 dark:bg-indigo-900/20
    backdrop-blur-sm
    rounded-full
    border border-indigo-200/50 dark:border-indigo-800/50
    whitespace-nowrap
  "
>
  Full Stack Developer
</motion.div>


          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6"
          >
            Building digital <br className="hidden sm:block" />
            {/* Animated Gradient Text */}
            <motion.span
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400"
              style={{
                backgroundSize: '200% 200%',
              }}
            >
              experiences that matter
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl text-xl text-gray-700 dark:text-gray-300 mb-10"
          >
            I craft accessible, pixel-perfect, and performant web applications. 
            Passionate about turning complex problems into simple, beautiful solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 items-center"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white transition-all bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 shadow-lg hover:shadow-indigo-500/50"
            >
              View My Work
              <ArrowRight className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-gray-700 dark:text-gray-200 transition-all bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-white dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 shadow-lg"
            >
              Contact Me
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-16 flex gap-6"
          >
            <SocialLink href="#" icon={<Github className="w-6 h-6" />} label="GitHub" />
            <SocialLink href="#" icon={<Linkedin className="w-6 h-6" />} label="LinkedIn" />
            <SocialLink href="#" icon={<Mail className="w-6 h-6" />} label="Email" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const SocialLink = ({ href, icon, label }) => (
  <motion.a
    href={href}
    whileHover={{ scale: 1.2, y: -5 }}
    whileTap={{ scale: 0.9 }}
    className="p-3 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-700/50 hover:border-indigo-500/50 shadow-lg"
    aria-label={label}
  >
    {icon}
  </motion.a>
);

export default Hero;
