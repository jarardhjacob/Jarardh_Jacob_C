import React from 'react';
import { motion } from 'framer-motion';
import { 
  SiReact, 
  SiJavascript, 
  SiTypescript, 
  SiNextdotjs,
  SiTailwindcss, 
  SiFramer, 
  SiNodedotjs, 
  SiExpress, 
  SiPostgresql, 
  SiMongodb, 
  SiGithub,
  SiVite, 
  SiDocker 
} from 'react-icons/si';

const skills = [
  { name: 'React', icon: SiReact, color: 'text-[#61DAFB]' },
  { name: 'Next.js', icon: SiNextdotjs, color: 'text-black dark:text-white' },
  { name: 'JavaScript', icon: SiJavascript, color: 'text-[#F7DF1E]' },
  { name: 'TypeScript', icon: SiTypescript, color: 'text-[#3178C6]' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-[#06B6D4]' },
  { name: 'Framer Motion', icon: SiFramer, color: 'text-black dark:text-white' },
  { name: 'Node.js', icon: SiNodedotjs, color: 'text-[#339933]' },
  { name: 'Express', icon: SiExpress, color: 'text-gray-900 dark:text-white' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: 'text-[#336791]' },
  { name: 'MongoDB', icon: SiMongodb, color: 'text-[#47A248]' },
  { name: 'Git & GitHub', icon: SiGithub, color: 'text-[#F05032]' },
  { name: 'Vite', icon: SiVite, color: 'text-[#646CFF]' },
  { name: 'Docker', icon: SiDocker, color: 'text-[#2496ED]' },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
          >
            Technical Skills
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-20 h-1 bg-indigo-600 dark:bg-indigo-400 rounded-full mx-auto mt-4"
          />
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-8 justify-items-center">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center gap-3 group"
              >
                <div className="relative flex items-center justify-center p-4 rounded-full bg-white dark:bg-gray-800 shadow-md group-hover:shadow-lg transition-all dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700">
                  <Icon className={`w-8 h-8 ${skill.color} transition-transform duration-300 group-hover:scale-110`} />
                  
                  {/* Subtle Glow Effect on Hover */}
                  <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity bg-current ${skill.color}`} />
                </div>
                
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {skill.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
