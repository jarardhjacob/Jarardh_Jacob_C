import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

// --- Custom Loader Component ---
const CustomLoader = () => {
  return (
    <motion.div
      key="loader"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Name Text */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-wider"
      >
        Jarardh
      </motion.h1>

      {/* 3 Colored Squares */}
      <div className="flex gap-4">
        {[
          { color: "bg-red-500", delay: 0 },
          { color: "bg-yellow-500", delay: 0.2 },
          { color: "bg-green-500", delay: 0.4 },
        ].map((box, index) => (
          <motion.div
            key={index}
            className={`w-4 h-4 rounded-sm ${box.color}`}
            initial={{ y: 0, opacity: 0.5 }}
            animate={{
              y: [-10, 0, -10],
              opacity: [1, 0.5, 1],
              scale: [1.2, 1, 1.2],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: box.delay,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white dark:bg-black min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300">

      {/* Full Screen Loader */}
      <AnimatePresence mode="wait">
        {isLoading && <CustomLoader />}
      </AnimatePresence>

      {/* Main Content Fade-In */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </main>

          <footer className="py-4 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800">
            <p>© {new Date().getFullYear()} Jarardh Jacob C. All rights reserved.</p>
          </footer>
        </motion.div>
      )}
    </div>
  );
}

export default App;
