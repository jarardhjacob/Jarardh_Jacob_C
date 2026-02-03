import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

// Lazy load heavy components for performance
const MatrixRain = lazy(() => import('./MatrixRain'));
const TechGlobe = lazy(() => import('./TechGlobe'));

const Hero = () => {
  return (
    <section className="min-h-[100svh] flex items-center justify-center bg-gradient-to-br from-white to-white dark:from-gray-950 dark:to-gray-950 overflow-hidden relative py-20 lg:py-0">

      {/* Background Layer - Reduced opacity on mobile for performance/readability */}
      <Suspense fallback={null}>
        <div className="absolute inset-0 z-0 opacity-30 md:opacity-100 transition-opacity duration-700 pointer-events-none">
          <MatrixRain />
        </div>
      </Suspense>

      {/* Gradient Overlay for Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 dark:via-black/60 to-white dark:to-black pointer-events-none z-[1]" />

      {/* Animated Rotating Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: 360
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
          rotate: -360
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-gradient-to-l from-blue-500/20 to-cyan-500/20 rounded-full blur-[120px] pointer-events-none"
      />

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col md:flex-row items-center gap-12 lg:gap-20">

        {/* Left Column: Text Content */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1 pt-10 lg:pt-0">

          {/* Subtle backdrop for text readability on busy backgrounds */}
          <div className="relative md:p-8 md:-m-8 rounded-3xl md:bg-white/30 md:dark:bg-black/10 md:backdrop-blur-[2px] transition-all duration-300">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="
                inline-flex items-center justify-center
                px-4 py-2
                text-xs sm:text-base
                font-bold
                tracking-wide
                text-indigo-600 dark:text-indigo-300
                uppercase
                bg-indigo-50/80 dark:bg-indigo-900/40
                backdrop-blur-md
                rounded-full
                border border-indigo-200 dark:border-indigo-500/30
                whitespace-nowrap
                mb-2  
                shadow-lg shadow-indigo-500/10
                leading-none
              "
            >
              Full Stack Developer & Trainer
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="font-extrabold tracking-tight text-gray-900 dark:text-white mb-3 leading-[1.15]"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            >
              Building digital <br className="hidden sm:block" />
              {/* Slower Animated Gradient Text */}
              <motion.span
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 10,
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
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-2xl text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-5 leading-relaxed"
            >
              I craft accessible, pixel-perfect, and performant web applications.
              Passionate about turning complex problems into simple, beautiful solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-5 items-center sm:items-start justify-center lg:justify-start"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center gap-3 px-8 py-4 text-base font-bold text-white transition-all duration-300 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:from-indigo-500 hover:to-purple-500 shadow-xl hover:shadow-[0_0_30px_rgba(79,70,229,0.4)]"
              >
                View My Work
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-gray-800 dark:text-gray-200 transition-all bg-white/60 dark:bg-white/5 backdrop-blur-md border border-gray-200/50 dark:border-white/10 rounded-xl hover:bg-white dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20 shadow-lg"
              >
                Contact Me
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-8 flex gap-6 justify-center lg:justify-start items-center"
            >
              <SocialLink href="https://github.com/jarardhjacob" icon={<Github className="w-6 h-6" />} label="GitHub" />
              <SocialLink href="https://www.linkedin.com/in/jarardh-jacob-c" icon={<Linkedin className="w-6 h-6" />} label="LinkedIn" />
              <SocialLink href="mailto:jarardh@example.com" icon={<Mail className="w-6 h-6" />} label="Email Me" />
            </motion.div>
          </div>
        </div>

        {/* Right Column: Code-Based Tech Globe */}
        <div className="flex-1 hidden md:flex justify-center lg:justify-end order-1 lg:order-2 relative perspective-1000">
          {/* Subtle Neon Glow behind Globe */}
          <div className="absolute inset-0 hidden md:block pointer-events-none z-0">
            <div className="mx-auto w-[500px] h-[500px] bg-indigo-500/20 blur-[100px] rounded-full" />
          </div>

          <Suspense fallback={<div className="w-96 h-96 rounded-full bg-indigo-900/20 animate-pulse" />}>
            <motion.div
              whileHover={{ rotate: 5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="cursor-grab active:cursor-grabbing"
            >
              <TechGlobe />
            </motion.div>
          </Suspense>

          {/* Floating snippet decoration (Optional subtle dev vibe) */}
          <div className="absolute -top-10 -right-10 p-4 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 text-xs font-mono text-indigo-300 hidden xl:block opacity-60 hover:opacity-100 transition-opacity select-none">
            &lt;Globe /&gt;
          </div>
        </div>

      </div>
    </section>
  );
};

const SocialLink = ({ href, icon, label }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1, rotate: 10, skewX: -5 }}
    whileTap={{ scale: 0.9 }}
    className="group relative p-3 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-700/50 hover:border-indigo-500/50 shadow-md hover:shadow-indigo-500/20"
    aria-label={label}
  >
    {icon}
    {/* Tooltip */}
    <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
      {label}
    </span>
  </motion.a>
);

export default Hero;
