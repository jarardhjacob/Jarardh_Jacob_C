import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

// Individual Nav Link Component with 3D Tilt
const NavLink = ({ link, index, activeSection, handleScrollClick }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const isActive = activeSection === link.href;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setMousePosition({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.a
      href={link.href}
      onClick={(e) => handleScrollClick(e, link.href)}
      initial={{ opacity: 0, y: -10 }}
      animate={{
        opacity: 1,
        y: 0,
        rotateX: mousePosition.x,
        rotateY: mousePosition.y,
      }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
          ? 'text-indigo-600 dark:text-indigo-400'
          : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
        }`}
    >
      {link.title}

      {/* Glowing Active Underline */}
      {isActive && (
        <>
          <motion.div
            layoutId="activeSection"
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
          {/* Glow effect */}
          <motion.div
            layoutId="activeSectionGlow"
            className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 dark:bg-indigo-400 blur-md opacity-50"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        </>
      )}

      {/* Hover underline glow */}
      {isHovered && !isActive && (
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.3 }}
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 blur-sm"
        />
      )}
    </motion.a>
  );
};

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [logoHover, setLogoHover] = useState({ x: 0, y: 0 });
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  const navLinks = [
    { title: 'About', href: '#about' },
    { title: 'Skills', href: '#skills' },
    { title: 'Projects', href: '#projects' },
    { title: 'Contact', href: '#contact' },
  ];

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.href.replace('#', ''));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(`#${sections[i]}`);
          return;
        }
      }
      setActiveSection('');
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);

    setTimeout(() => {
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);

      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        window.history.pushState({}, '', href);
      }
    }, 100);
  };

  // 3D Logo Hover Handler
  const handleLogoMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    setLogoHover({ x: rotateX, y: rotateY });
  };

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 3D Logo with Hover Effect */}
          {/* Minimal 3D Animated Logo */}
          <motion.div
            onMouseMove={handleLogoMouseMove}
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => {
              setLogoHover({ x: 0, y: 0 });
              setIsLogoHovered(false);
            }}
            animate={{
              rotateX: logoHover.x,
              rotateY: logoHover.y,
              scale: isLogoHovered ? 1.05 : 1,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            style={{
              transformStyle: "preserve-3d",
              perspective: "1000px",
            }}
            className="relative flex items-center gap-1 cursor-pointer z-50 group select-none"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {/* 2. The "Jarardh" Text */}
            <div className="relative" style={{ transformStyle: "preserve-3d" }}>
              <motion.div
                initial={{ opacity: 0, x: -20, filter: 'blur(8px)', backgroundPosition: '0% 50%' }}
                animate={{
                  opacity: 1,
                  x: 0,
                  filter: 'blur(0px)',
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  opacity: { delay: 0.5, duration: 0.7, ease: "easeOut" },
                  x: { delay: 0.5, duration: 0.7, ease: "easeOut" },
                  filter: { delay: 0.5, duration: 0.7, ease: "easeOut" },
                  backgroundPosition: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop"
                  }
                }}
                className="font-bold text-2xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-indigo-500 to-gray-900 dark:from-white dark:via-indigo-400 dark:to-white bg-[length:200%_auto]"
                style={{ transform: "translateZ(20px)" }}
              >
                Jarardh
              </motion.div>

              {/* Layered Shadow for Depth */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="absolute inset-0 text-indigo-500/20 dark:text-indigo-400/20 blur-[2px]"
                style={{ transform: "translateZ(5px)", pointerEvents: 'none' }}
              >
                Jarardh
              </motion.div>
            </div>

            {/* 1. The Glowing Dot */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.1
              }}
              className="relative flex items-center justify-center p-1"
              style={{ transform: "translateZ(30px)" }}
            >
              {/* Core Dot with Indigo Glow */}
              <div className="w-3 h-3 bg-indigo-600 dark:bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.8)] ring-2 ring-indigo-400/20" />

              {/* Soft Pulse Ring */}
              <motion.div
                animate={{
                  opacity: [0.4, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
                className="absolute inset-0 bg-indigo-500 rounded-full -z-10"
              />
            </motion.div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link, index) => (
                <NavLink
                  key={link.title}
                  link={link}
                  index={index}
                  activeSection={activeSection}
                  handleScrollClick={handleScrollClick}
                />
              ))}
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-indigo-500/50"
              >
                Resume
              </motion.a>

              {/* Floating Theme Toggle */}
              <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -3, 0],
                }}
                transition={{
                  y: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="relative p-2 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 hover:from-indigo-100 hover:to-purple-100 dark:hover:from-indigo-900 dark:hover:to-purple-900 transition-all shadow-lg"
                aria-label="Toggle Theme"
              >
                {/* Floating glow */}
                <motion.div
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 dark:from-blue-400 dark:to-purple-400 blur-md -z-10"
                />
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-indigo-600" />
                )}
              </motion.button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <motion.button
              animate={{
                y: [0, -3, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="relative p-2 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 shadow-lg"
            >
              <motion.div
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 dark:from-blue-400 dark:to-purple-400 blur-md -z-10"
              />
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-600" />
              )}
            </motion.button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Glass Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden bg-white/70 dark:bg-black/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 overflow-hidden shadow-2xl"
            style={{
              background: theme === 'dark'
                ? 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(17,24,39,0.9) 100%)'
                : 'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(249,250,251,0.9) 100%)',
            }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.title}
                  href={link.href}
                  onClick={(e) => handleScrollClick(e, link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-all backdrop-blur-sm ${activeSection === link.href
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-900/30 shadow-lg'
                      : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50/50 dark:hover:bg-gray-800/50'
                    }`}
                >
                  {link.title}
                </motion.a>
              ))}
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="block px-3 py-2 rounded-md text-base font-semibold text-center text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
              >
                Resume
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
