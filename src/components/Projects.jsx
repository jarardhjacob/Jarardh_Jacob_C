import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Linkedin, X } from 'lucide-react';

const projects = [
  {
    title: 'DRM Controlled E-Book Platform',
    shortDescription: 'A secure academic ecosystem featuring a custom DRM reader with anti-piracy protection, an interactive mock test engine, and integrated academic service portals.',
    tags: ['React', 'Node.js', 'Express', 'Supabase', 'PostgreSQL'],
    image: 'E-book Image/img3.png',
    liveUrl: 'https://e-book-gray-one.vercel.app/',
    LinkedIN: 'https://www.linkedin.com/posts/jarardh-jacob-c_fullstackdeveloper-pernstack-postgresql-ugcPost-7425405669618442240-UhdM?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD68TEIBHN3tj4uRifzDC9XuPjhCdvIfdps',
    details: {
      overview: "I’m excited to share the final production build of a comprehensive academic ecosystem I developed, transforming this project from a design concept into a live, deployed application using a high-performance, modern stack.",
      images: [
        "E-book Image/img3.png",
        "E-book Image/img4.png",
        "E-book Image/img5.png",
        "E-book Image/img6.png",
        "E-book Image/img7.png"

      ],
      architecture: [
        { label: "Design", value: "Figma" },
        { label: "Front-end", value: "React & Tailwind CSS" },
        { label: "Back-end", value: "Node.js & Express" },
        { label: "Database & Storage", value: "PostgreSQL & Storage (powered by Supabase)" },
        { label: "Dev Tools", value: "VS Code, GitHub Copilot" },
        { label: "Deployment", value: "Vercel (Frontend) and Render (Backend)" }
      ],
      features: [
        { title: "Secure DRM Reader", desc: "Developed a custom-built online reader for e-books and notes that strictly disables downloads, printing, and copy-paste functionality to protect intellectual property." },
        { title: "Advanced Anti-Piracy", desc: "Integrated high-level security including screenshot detection/blocking, dynamic watermarks featuring the user's ID, and encrypted page-by-page content streaming." },
        { title: "Mock Test Engine", desc: "Built an interactive module for subject-wise exam preparation featuring time-bound quizzes, automated evaluation, and a performance analytics dashboard." },
        { title: "Academic & Career Services", desc: "Included integrated portals for academic writing service requests and subject-specific job postings with real-time status tracking." },
        { title: "Comprehensive Management", desc: "Designed personalized user dashboards for tracking reading progress and test scores, alongside a powerful admin panel for total content and user control." }
      ],
      conclusion: "Integrating PostgreSQL via Supabase gave us the relational power needed for complex user data, while optimizing our deployment pipeline allowed us to ensure high performance for both the client and server sides independently."
    }
  },
  {
    title: 'Task Management App',
    shortDescription: 'Collaborative task management tool with drag-and-drop Kanban boards, team assignments, and progress tracking.',
    tags: ['Next.js', 'Typescript', 'Prisma', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    liveUrl: '#',
    githubUrl: '#',
    details: {
      overview: "A streamlined task management solution built for remote teams to collaborate effectively.",
      features: [
        { title: "Kanban Boards", desc: "Drag-and-drop interface for managing task states." },
        { title: "Team Collaboration", desc: "Real-time updates and assignment tracking." },
      ]
    }
  },
  {
    title: 'AI Content Generator',
    shortDescription: 'SaaS application leveraging OpenAI API to help marketers generate blog posts, social media captions, and ad copy.',
    tags: ['React', 'OpenAI API', 'Stripe', 'Express'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    liveUrl: '#',
    githubUrl: '#',
    details: {
      overview: "An AI-powered content creation assistant that helps scale marketing efforts.",
      features: [
        { title: "Multi-Format Generation", desc: "Create blog posts, tweets, and emails in seconds." },
        { title: "Tone Customization", desc: "Adjust the voice and style of generated content." },
      ]
    }
  },
];

const ProjectModal = ({ project, onClose }) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        layoutId={`card-${project.title}`}
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image */}
        <div className="relative h-64 sm:h-80 flex-shrink-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-6 left-6 right-6">
            <h2 className="text-3xl font-bold text-white mb-2 shadow-sm">{project.title}</h2>
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="px-3 py-1 text-xs font-medium text-white bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-8 text-gray-700 dark:text-gray-300 overflow-y-auto custom-scrollbar">

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            {project.liveUrl && project.liveUrl !== '#' && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium">
                <ExternalLink className="w-4 h-4" /> Live Demo
              </a>
            )}
            {project.githubUrl && project.githubUrl !== '#' && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200">
                <Github className="w-4 h-4" /> Source Code
              </a>
            )}
            {project.LinkedIN && (
              <a href={project.LinkedIN} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium">
                <Linkedin className="w-4 h-4" /> LinkedIn Post
              </a>
            )}
          </div>

          <div className="space-y-6">
            {/* Project Image Gallery (Marquee) */}
            {project.details?.images && (
              <div className="py-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Project Gallery</h3>
                <div className="relative flex overflow-hidden group mask-gradient" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
                  <motion.div
                    className="flex gap-4 flex-nowrap"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                      repeat: Infinity,
                      ease: "linear",
                      duration: 20, // Adjust speed as needed
                    }}
                    whileHover={{ animationPlayState: "paused" }} // Note: Framer motion doesn't support playState directly on animate prop, but we can't easily pause. Let's use standard CSS or just slow it down.
                  // Actually, for simple marquee, standard CSS or Framer's useAnimation is better. But let's stick to simple implementation:
                  // To pause on hover using Framer Motion is specific. Let's just keep it simple auto-scroll.
                  >
                    {[...project.details.images, ...project.details.images].map((img, i) => (
                      <div key={i} className="flex-shrink-0 w-80 sm:w-96 aspect-video rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 shadow-md">
                        <img
                          src={img}
                          alt={`Screenshot ${i + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            )}

            {/* Tech Stack Grid */}
            {project.details?.architecture && (
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Tech Stack & Architecture</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.details.architecture.map((item, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{item.label}</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Features */}
            {project.details?.features && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Features</h3>
                <ul className="space-y-4">
                  {project.details.features.map((feature, i) => (
                    <li key={i} className="flex gap-3">
                      <div className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-indigo-500" />
                      <div>
                        <strong className="block text-gray-900 dark:text-white mb-1">{feature.title}</strong>
                        <span className="opacity-90">{feature.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.details?.conclusion && (
              <p className="text-lg italic border-l-4 border-indigo-500 pl-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-r-lg">
                {project.details.conclusion}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Individual Project Card Component with 3D Tilt
const ProjectCard = ({ project, index, onClick }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
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
    setIsHovered(false);
  };

  return (
    <motion.div
      layoutId={`card-${project.title}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: mousePosition.x,
        rotateY: mousePosition.y,
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className="relative bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl transition-shadow duration-300 cursor-pointer group"
    >
      {/* Glass Reflection Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isHovered ? {
          opacity: [0, 0.3, 0],
          x: ['-100%', '100%']
        } : { opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/20 to-transparent pointer-events-none z-20"
        style={{ transform: 'skewX(-20deg)' }}
      />

      {/* Image Container with Smooth Zoom */}
      <div className="relative overflow-hidden aspect-video">
        <motion.img
          src={project.image}
          alt={project.title}
          animate={isHovered ? { scale: 1.15 } : { scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full h-full object-cover"
        />

        {/* Overlay with Text "Click for details" */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]"
        >
          <span className="px-4 py-2 bg-white/20 border border-white/30 rounded-full text-white font-medium text-sm backdrop-blur-md">
            View Details
          </span>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="p-6" style={{ transform: "translateZ(20px)" }}>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {project.shortDescription || project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <motion.span
              key={tag}
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 rounded-full"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="py-20 bg-white dark:bg-black relative overflow-hidden">
      {/* Background Animated Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            x: [-50, 50, -50],
            y: [-20, 20, -20],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 left-0 w-[600px] h-[600px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: [50, -50, 50],
            y: [20, -20, 20],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[150px]"
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
            Featured Projects
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-20 h-1 bg-indigo-600 dark:bg-indigo-400 rounded-full mx-auto mt-4"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
