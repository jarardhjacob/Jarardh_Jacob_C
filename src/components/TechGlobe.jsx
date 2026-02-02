import React from 'react';
import { motion } from 'framer-motion';
import {
    SiJavascript,
    SiReact,
    SiNodedotjs,
    SiGit,
    SiDocker,
    SiTypescript,
    SiNextdotjs,
    SiTailwindcss,
    SiFramer,
    SiExpress,
    SiPostgresql,
    SiMongodb,
    SiVite,
    SiGithub
} from 'react-icons/si';

const TechGlobe = () => {
    return (
        <div className="flex items-center justify-center perspective-1000 w-full h-[400px] sm:h-[500px] lg:h-[600px] overflow-visible">
            <motion.div
                style={{
                    transformStyle: "preserve-3d",
                }}
                animate={{
                    rotateY: [0, 360], // Continuous idle rotation
                }}
                transition={{
                    rotateY: { duration: 25, repeat: Infinity, ease: "linear" }, // Slow orbit
                }}
                className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 preserve-3d"
            >
                {/* Core Glow */}
                <div className="absolute inset-0 bg-indigo-500/10 rounded-full blur-3xl transform-gpu" />

                {/* Wireframe Globe Lines - Longitude */}
                {[0, 45, 90, 135].map((deg, i) => (
                    <div
                        key={`long-${i}`}
                        className="absolute inset-0 border border-indigo-500/20 rounded-full"
                        style={{
                            transform: `rotateY(${deg}deg)`,
                            transformStyle: "preserve-3d"
                        }}
                    />
                ))}

                {/* Wireframe Globe Lines - Latitude */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-full border border-indigo-500/20 rounded-full rotate-90 scale-[0.98]" />  {/* Equator-ish */}
                <div className="absolute inset-0 border border-purple-500/20 rounded-full rotate-x-90" /> {/* Prime Meridian-ish */}


                {/* Floating Icons */}
                {/* Floating Icons - Distributed around 360 degrees */}
                <OrbitIcon Icon={SiReact} color="#61DAFB" rotateY={0} rotateX={-20} />
                <OrbitIcon Icon={SiNextdotjs} color="#000000" rotateY={25} rotateX={10} /> {/* White/Black typically, handled via dark mode elsewhere but #000 is fine as base */}
                <OrbitIcon Icon={SiJavascript} color="#F7DF1E" rotateY={50} rotateX={20} />
                <OrbitIcon Icon={SiTypescript} color="#3178C6" rotateY={75} rotateX={-15} />
                <OrbitIcon Icon={SiTailwindcss} color="#06B6D4" rotateY={100} rotateX={25} />
                <OrbitIcon Icon={SiFramer} color="#0055FF" rotateY={125} rotateX={-10} />
                <OrbitIcon Icon={SiNodedotjs} color="#339933" rotateY={150} rotateX={15} />
                <OrbitIcon Icon={SiExpress} color="#000000" rotateY={175} rotateX={-20} />
                <OrbitIcon Icon={SiPostgresql} color="#336791" rotateY={200} rotateX={20} />
                <OrbitIcon Icon={SiMongodb} color="#47A248" rotateY={225} rotateX={-15} />
                <OrbitIcon Icon={SiGit} color="#F05032" rotateY={250} rotateX={25} />
                <OrbitIcon Icon={SiGithub} color="#181717" rotateY={275} rotateX={-10} />
                <OrbitIcon Icon={SiVite} color="#646CFF" rotateY={300} rotateX={15} />
                <OrbitIcon Icon={SiDocker} color="#2496ED" rotateY={325} rotateX={-20} />

            </motion.div>
        </div>
    );
};

// Helper component to place icons on the sphere surface
const OrbitIcon = ({ Icon, color, rotateY, rotateX }) => {
    return (
        <div
            className="absolute top-1/2 left-1/2 w-0 h-0 flex items-center justify-center transform-style-3d"
            style={{
                transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(160px)`, // Push out to sphere surface radius
            }}
        >
            <div
                className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg transform-style-3d"
            // Counter-rotate the icon itself so it faces outward properly? 
            // Actually, let's keep it simple. If we want it to face "forward" to the viewer, we might need a Billboard, 
            // but letting it rotate with the globe is fine for "on surface" effect.
            >
                <Icon
                    style={{ color: color }}
                    className="w-8 h-8 sm:w-10 sm:h-10 opacity-90"
                />
            </div>
        </div>
    );
};

export default TechGlobe;
