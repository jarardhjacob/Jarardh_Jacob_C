import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { SiGmail, SiGooglemaps } from 'react-icons/si';
import { FaPhone, FaPaperPlane } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();
  const formCardRef = useRef(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSending, setIsSending] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // 3D Tilt Effect Handler
  const handleMouseMove = (e) => {
    if (!formCardRef.current) return;
    
    const rect = formCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg tilt
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setMousePosition({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formState.name || !formState.email || !formState.message) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsSending(true);

    const SERVICE_ID = 'service_n5940q2';
    const TEMPLATE_ID = 'template_4ghruad';
    const PUBLIC_KEY = '9oSm1FavV0l__rCUV';

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
          console.log(result.text);
          alert('Message sent successfully!');
          setFormState({ name: '', email: '', message: '' });
      }, (error) => {
          console.log(error.text);
          alert('Failed to send message. Please try again.');
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  // Floating animation variants for icons
  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden">
      {/* Animated background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
          >
            Get in Touch
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-20 h-1 bg-indigo-600 dark:bg-indigo-400 rounded-full mx-auto mt-4"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Let's talk about your project
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              I'm currently interested in new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>

            <div className="space-y-6">
              {/* Floating Icon Tiles */}
              <motion.div
                variants={floatingVariants}
                animate="animate"
                className="flex items-center gap-4 text-gray-600 dark:text-gray-300"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700"
                >
                  <SiGmail className="w-6 h-6 text-gray-900 dark:text-white" />
                </motion.div>
                <span>jerardhjcob@gmail.com</span>
              </motion.div>

              <motion.div
                variants={floatingVariants}
                animate="animate"
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4 text-gray-600 dark:text-gray-300"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700"
                >
                  <FaPhone className="w-6 h-6 text-gray-900 dark:text-white" />
                </motion.div>
                <span>+91 623568712</span>
              </motion.div>

              <motion.div
                variants={floatingVariants}
                animate="animate"
                transition={{ delay: 0.4 }}
                className="flex items-center gap-4 text-gray-600 dark:text-gray-300"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700"
                >
                  <SiGooglemaps className="w-6 h-6 text-gray-900 dark:text-white" />
                </motion.div>
                <span>Kochi, Kerala</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form with 3D Tilt and Gradient Glow */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Gradient Glow Behind Form */}
            <motion.div
              animate={{
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -inset-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-50"
            />

            {/* 3D Tilt Form Card */}
            <motion.form
              ref={formCardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              animate={{
                rotateX: mousePosition.x,
                rotateY: mousePosition.y,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
              }}
              onSubmit={handleSubmit}
              className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700"
            >
              <div className="space-y-6" style={{ transform: "translateZ(20px)" }}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-gray-900 dark:text-white"
                    placeholder="Jarardh Jacob"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-gray-900 dark:text-white"
                    placeholder="jerardhjcob@gmail.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-gray-900 dark:text-white resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSending}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white transition-all bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 hover:shadow-lg hover:shadow-indigo-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSending ? 'Sending...' : 'Send Message'}
                  <FaPaperPlane className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
