import React, { useState, useMemo, useEffect } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import {
    SiJavascript, SiReact, SiNodedotjs, SiGit, SiDocker, SiTypescript,
    SiNextdotjs, SiTailwindcss, SiFramer, SiExpress, SiPostgresql,
    SiMongodb, SiVite, SiGithub
} from 'react-icons/si';

const TechGlobe = () => {
    // Determine screen size for optimization
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Generate globe lines only once
    const { latitudes, longitudes } = useMemo(() => {
        // Reduce detail on mobile for performance
        const latStep = isMobile ? 20 : 10;
        const longStep = isMobile ? 30 : 15;

        const lats = [];
        for (let deg = -80; deg <= 80; deg += latStep) {
            if (deg === 0) continue; // Equator handled separately
            lats.push(deg);
        }

        const longs = [];
        for (let deg = 0; deg < 180; deg += longStep) {
            longs.push(deg);
        }
        return { latitudes: lats, longitudes: longs };
    }, [isMobile]);

    // Motion Values
    const rotateY = useMotionValue(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Optimized animation loop
    useAnimationFrame((time, delta) => {
        if (isDragging) return;
        // Reduce expensive updates when tab invisible or unnecessary
        const speed = isHovered ? 0.002 : 0.018;
        rotateY.set(rotateY.get() + speed * delta);
    });

    const handlePan = (event, info) => {
        rotateY.set(rotateY.get() + info.delta.x * 0.3);
    };

    return (
        <div className="flex items-center justify-center perspective-1000 w-full h-[300px] sm:h-[400px] lg:h-[600px] overflow-visible relative group cursor-grab active:cursor-grabbing will-change-transform">
            <motion.div
                style={{
                    rotateY,
                    rotateZ: 12,
                    rotateX: 10,
                    transformStyle: "preserve-3d",
                }}
                onPan={handlePan}
                onPanStart={() => setIsDragging(true)}
                onPanEnd={() => setIsDragging(false)}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 preserve-3d"
            >
                {/* Core Volume - Simplified for mobile */}
                <div className="absolute inset-4 rounded-full bg-indigo-900/10 blur-xl transform-gpu" />

                {/* Longitude Lines */}
                {longitudes.map((deg) => (
                    <div
                        key={`long-${deg}`}
                        className="absolute inset-0 rounded-full border border-indigo-500/15"
                        style={{
                            transform: `rotateY(${deg}deg)`,
                            transformStyle: "preserve-3d",
                        }}
                    />
                ))}

                {/* Latitude Lines */}
                <div
                    className="absolute inset-0 rounded-full border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                    style={{ transform: 'rotateX(90deg)', transformStyle: "preserve-3d" }}
                />

                {latitudes.map((deg) => {
                    const rad = (deg * Math.PI) / 180;
                    const scale = Math.cos(rad);
                    const translateY = Math.sin(rad) * 50;

                    return (
                        <div
                            key={`lat-${deg}`}
                            className="absolute inset-0 rounded-full border border-indigo-500/15"
                            style={{
                                transform: `translateY(${translateY}%) rotateX(90deg) scale(${scale})`,
                                transformStyle: "preserve-3d"
                            }}
                        />
                    );
                })}

                {/* Icons - Memoized list */}
                <IconsLayer />

            </motion.div>

            {/* Fog - CSS-only gradient */}
            <div className="absolute -bottom-20 left-0 right-0 h-40 bg-gradient-to-t from-white dark:from-black via-white/80 dark:via-black/80 to-transparent z-10 pointer-events-none" />
        </div>
    );
};

// Extracted and Memoized Icons Layer to prevent re-renders of static icons during rotation
const IconsLayer = React.memo(() => (
    <>
        <OrbitIcon Icon={SiReact} color="#61DAFB" rotateY={0} rotateX={-20} />
        <OrbitIcon Icon={SiNextdotjs} color="#000000" rotateY={25} rotateX={10} />
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
    </>
));

const OrbitIcon = ({ Icon, color, rotateY, rotateX }) => {
    return (
        <div
            className="absolute top-1/2 left-1/2 w-0 h-0 flex items-center justify-center transform-style-3d"
            style={{
                transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(160px)`,
            }}
        >
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg transform-style-3d hover:scale-125 transition-transform duration-200 cursor-pointer">
                <Icon style={{ color }} className="w-8 h-8 sm:w-10 sm:h-10 opacity-90" />
            </div>
        </div>
    );
};

export default TechGlobe;
