import React, { useState, useMemo, useEffect } from 'react';
import { motion, useMotionValue, useAnimationFrame, useAnimation, useReducedMotion, useTransform } from 'framer-motion';
import {
    SiJavascript, SiReact, SiNodedotjs, SiGit, SiDocker, SiTypescript,
    SiNextdotjs, SiTailwindcss, SiFramer, SiExpress, SiPostgresql,
    SiMongodb, SiVite, SiGithub, SiSupabase, SiVercel, SiRender
} from 'react-icons/si';

// --- Constants ---
const GLOBE_CONFIG = {
    RADIUS: 160,                // Distance of icons from center (px)
    SPEED_DEFAULT: 0.018,       // Rotation speed
    SPEED_HOVER: 0.002,         // Slower rotation on hover
    DRAG_SENSITIVITY: 0.3,      // Drag multiplier
    FLOAT_DURATION: 6,          // Seconds for floating loop
    ENTRANCE_DURATION: 1.5,     // Seconds for entrance
    DEBOUNCE_MS: 200,           // Resize debounce
    LAT_STEP_DESKTOP: 10,       // Wireframe density
    LAT_STEP_MOBILE: 20,
    LONG_STEP_DESKTOP: 15,
    LONG_STEP_MOBILE: 30,
};

// Define icons data outside component to avoid recreation
// Define exact icons data
const ICONS_DATA = [
    { Icon: SiReact, color: "#61DAFB" },
    { Icon: SiNextdotjs, color: "#000000" },
    { Icon: SiJavascript, color: "#F7DF1E" },
    { Icon: SiTypescript, color: "#3178C6" },
    { Icon: SiTailwindcss, color: "#06B6D4" },
    { Icon: SiFramer, color: "#0055FF" },
    { Icon: SiNodedotjs, color: "#339933" },
    { Icon: SiExpress, color: "#000000" },
    { Icon: SiPostgresql, color: "#336791" },
    { Icon: SiMongodb, color: "#47A248" },
    { Icon: SiGit, color: "#F05032" },
    { Icon: SiGithub, color: "#181717" },
    { Icon: SiVite, color: "#646CFF" },
    { Icon: SiDocker, color: "#2496ED" },
    { Icon: SiSupabase, color: "#3ECF8E" },
    { Icon: SiVercel, color: "#000000" },
    { Icon: SiRender, color: "#46E3B7" },
];

// Fibonacci Sphere Distribution
// Calculates evenly distributed points on a sphere
const ALL_ICONS = ICONS_DATA.map((item, i) => {
    const phi = Math.acos(-1 + (2 * i) / ICONS_DATA.length);
    const theta = Math.sqrt(ICONS_DATA.length * Math.PI) * phi;

    return {
        ...item,
        // Convert spherical coordinates to CSS rotateX/rotateY
        // rotateY is longitude (around Y axis)
        // rotateX is latitude (tilt up/down)
        rotateX: (phi * 180 / Math.PI) - 90,
        rotateY: (theta * 180 / Math.PI),
    };
});

const TechGlobe = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const controls = useAnimation();
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        // Debounce resize handler
        let timeoutId;
        const checkMobile = () => setIsMobile(window.innerWidth < 768);

        const debouncedResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(checkMobile, GLOBE_CONFIG.DEBOUNCE_MS);
        };

        // Visibility handler to pause animations
        const handleVisibilityChange = () => {
            setIsVisible(!document.hidden);
        };

        checkMobile();
        window.addEventListener('resize', debouncedResize);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Entrance Animation Sequence
        const animateEntrance = async () => {
            if (shouldReduceMotion) {
                // Simplified entrance for reduced motion
                await controls.start({
                    y: 0,
                    opacity: 1,
                    transition: { duration: 0.5 }
                });
                return; // Skip floating loop
            }

            // Standard entrance
            await controls.start({
                y: 0,
                opacity: 1,
                transition: { duration: GLOBE_CONFIG.ENTRANCE_DURATION, ease: "easeOut" }
            });

            // Floating Loop
            controls.start({
                y: [-15, 0, -15],
                transition: {
                    repeat: Infinity,
                    duration: GLOBE_CONFIG.FLOAT_DURATION,
                    ease: "easeInOut"
                }
            });
        };
        animateEntrance();

        return () => {
            window.removeEventListener('resize', debouncedResize);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            clearTimeout(timeoutId);
        };
    }, [controls, shouldReduceMotion]);

    // Generate globe lines only once
    const { latitudes, longitudes } = useMemo(() => {
        // Reduce detail on mobile for performance
        const latStep = isMobile ? GLOBE_CONFIG.LAT_STEP_MOBILE : GLOBE_CONFIG.LAT_STEP_DESKTOP;
        const longStep = isMobile ? GLOBE_CONFIG.LONG_STEP_MOBILE : GLOBE_CONFIG.LONG_STEP_DESKTOP;

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

    // Filter icons for mobile to reduce draw calls
    const displayedIcons = useMemo(() => {
        if (!isMobile) return ALL_ICONS;
        // On mobile, take every 2nd icon to reduce clutter and DOM load
        return ALL_ICONS.filter((_, i) => i % 2 === 0);
    }, [isMobile]);

    // Motion Values
    const rotateY = useMotionValue(0);
    const rotateX = useMotionValue(10); // Initial tilt
    const [isDragging, setIsDragging] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Optimized animation loop
    useAnimationFrame((time, delta) => {
        // Skip updates if reduced motion, hidden tab, or manual drag
        if (shouldReduceMotion || isDragging || !isVisible) return;

        // Reduce expensive updates when tab invisible or unnecessary
        const speed = isHovered ? GLOBE_CONFIG.SPEED_HOVER : GLOBE_CONFIG.SPEED_DEFAULT;
        rotateY.set(rotateY.get() + speed * delta);
    });

    const handlePan = (event, info) => {
        rotateY.set(rotateY.get() + info.delta.x * GLOBE_CONFIG.DRAG_SENSITIVITY);
        rotateX.set(rotateX.get() - info.delta.y * GLOBE_CONFIG.DRAG_SENSITIVITY);
    };

    return (
        <div className="flex items-center justify-center perspective-1000 w-full h-[300px] sm:h-[400px] lg:h-[600px] overflow-visible relative group cursor-grab active:cursor-grabbing will-change-transform">
            <motion.div
                initial={{ y: 200, opacity: 0 }}
                animate={controls}
                style={{
                    rotateY,
                    rotateX,
                    rotateZ: 0,
                    transformStyle: "preserve-3d",
                }}
                onPan={handlePan}
                onPanStart={() => setIsDragging(true)}
                onPanEnd={() => setIsDragging(false)}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 preserve-3d"
            >
                {/* Core Volume */}
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

                {/* Icons - Dynamic list */}
                <IconsLayer icons={displayedIcons} globeRotate={rotateY} globeRotateX={rotateX} />

            </motion.div>


        </div>
    );
};

// Memoized Icons Layer
const IconsLayer = React.memo(({ icons, globeRotate, globeRotateX }) => (
    <>
        {icons.map((icon, index) => (
            <OrbitIcon key={index} {...icon} globeRotate={globeRotate} globeRotateX={globeRotateX} />
        ))}
    </>
));

// Memoized Helper component
// Using motion value for opacity prevents re-renders even with changing values
const OrbitIcon = React.memo(({ Icon, color, rotateY, rotateX, globeRotate, globeRotateX }) => {
    // Calculate dynamic opacity based on facing direction (3D Dot Product)
    const opacity = useTransform([globeRotate, globeRotateX], ([ry, rx]) => {
        const d_to_r = Math.PI / 180;

        // Icon position angles
        const phi = rotateX * d_to_r;   // Latitude
        const theta = rotateY * d_to_r; // Longitude

        // Globe rotation angles
        const alpha = rx * d_to_r;
        const beta = ry * d_to_r;

        // Normal vector Z-component after rotation (Projection towards viewer)
        // Nz' = sin(alpha)sin(phi) + cos(alpha)cos(phi)cos(theta + beta)
        const nz = Math.sin(alpha) * Math.sin(phi) + Math.cos(alpha) * Math.cos(phi) * Math.cos(theta + beta);

        // Map [-1, 1] to opacity [0.1, 1]
        // If nz > 0, it's facing front.
        return 0.1 + (0.9 * (nz + 1) / 2);
    });

    return (
        <div
            className="absolute top-1/2 left-1/2 w-0 h-0 flex items-center justify-center transform-style-3d"
            style={{
                transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(${GLOBE_CONFIG.RADIUS}px)`,
            }}
        >
            <motion.div
                className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg transform-style-3d hover:scale-[1.15] transition-transform duration-200 cursor-pointer"
                style={{
                    opacity,
                    // Billboard effect: Counter-rotate to face viewer
                    rotateX: useTransform(globeRotateX, v => -v - rotateX),
                    rotateY: useTransform(globeRotate, v => -v - rotateY),
                }}
            >
                <Icon style={{ color }} className="w-8 h-8 sm:w-10 sm:h-10 opacity-90" />
            </motion.div>
        </div>
    );
});

export default TechGlobe;
