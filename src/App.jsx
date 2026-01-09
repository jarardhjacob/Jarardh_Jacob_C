import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div className="bg-white dark:bg-black min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />
      <main >
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      
      <footer className="py-8 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800">
        <p>© {new Date().getFullYear()} Jarardh Jacob C. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;

