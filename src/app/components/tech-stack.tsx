import { motion } from "framer-motion";
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiReact,
  SiCplusplus,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiExpo,
  SiFlutter,
  SiSupabase,
} from "react-icons/si";
import { useState } from "react";

const technologies = [
  { 
    icon: SiTypescript, 
    name: "TypeScript", 
    lightColor: "#3178C6",
    darkColor: "#3178C6" 
  },
  { 
    icon: SiNextdotjs, 
    name: "Next.js", 
    lightColor: "#000000",
    darkColor: "#FFFFFF" 
  },
  { 
    icon: SiReact, 
    name: "React", 
    lightColor: "#61DAFB",
    darkColor: "#61DAFB" 
  },
  { 
    icon: SiTailwindcss, 
    name: "Tailwind CSS", 
    lightColor: "#06B6D4",
    darkColor: "#06B6D4" 
  },
  { 
    icon: SiCplusplus, 
    name: "C++", 
    lightColor: "#00599C",
    darkColor: "#00599C" 
  },
  { 
    icon: SiNodedotjs, 
    name: "Node.js", 
    lightColor: "#339933",
    darkColor: "#339933" 
  },
  { 
    icon: SiPostgresql, 
    name: "PostgreSQL", 
    lightColor: "#4169E1",
    darkColor: "#4169E1" 
  },
  { 
    icon: SiPython, 
    name: "Python", 
    lightColor: "#3776AB",
    darkColor: "#3776AB" 
  },
  { 
    icon: SiExpo, 
    name: "Expo", 
    lightColor: "#000000",
    darkColor: "#FFFFFF" 
  },
  { 
    icon: SiFlutter, 
    name: "Flutter", 
    lightColor: "#02569B",
    darkColor: "#02569B" 
  },
  { 
    icon: SiSupabase, 
    name: "Supabase", 
    lightColor: "#3ECF8E",
    darkColor: "#3ECF8E" 
  },
];

// Double the array to create a seamless loop
const extendedTechnologies = [...technologies, ...technologies];

export function TechStack() {
  const [activeTech, setActiveTech] = useState<string | null>(null);

  return (
    <div className="my-6 sm:my-8 md:my-12 w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-4 sm:mb-6 md:mb-8"
      >
        <h2 className="text-lg md:text-xl font-semibold text-muted-foreground">Tech Stack</h2>
      </motion.div>
      
      <div className="relative mx-auto max-w-full rounded-xl bg-accent/30 py-2 backdrop-blur-sm">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-40 bg-gradient-to-r from-accent/30 via-accent/20 to-transparent z-10 rounded-l-xl" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-40 bg-gradient-to-l from-accent/30 via-accent/20 to-transparent z-10 rounded-r-xl" />
        
        {/* Scrolling container */}
        <div className="flex gap-8 sm:gap-12 md:gap-16 whitespace-nowrap py-6 sm:py-8 md:py-10 animate-scroll px-10 sm:px-16 md:px-20 overflow-hidden">
          {extendedTechnologies.map((tech, index) => (
            <motion.div
              key={index}
              className="group relative flex items-center justify-center"
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.95 }}
              style={{ transformOrigin: "center center" }}
              onClick={() => setActiveTech(activeTech === tech.name ? null : tech.name)}
            >
              <tech.icon 
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 transition-all duration-300 dark:text-opacity-90" 
                style={{ 
                  color: `var(--icon-color-${tech.name.toLowerCase().replace(/[^a-z0-9]/g, '')})`,
                  filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))"
                }}
              />
              <motion.span 
                className="absolute -bottom-6 sm:-bottom-7 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm whitespace-nowrap text-muted-foreground font-medium opacity-80 pointer-events-none bg-background/80 dark:bg-background/80 px-2 py-1 rounded-md backdrop-blur-sm"
                initial={{ opacity: 0, y: -5 }}
                animate={{ 
                  opacity: (activeTech === tech.name || activeTech === null) ? 1 : 0,
                  y: 0 
                }}
                transition={{
                  opacity: { duration: 0.2, ease: "easeOut" },
                  y: { duration: 0.2, ease: "easeOut" }
                }}
              >
                {tech.name}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
          will-change: transform;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-scroll {
            animation: none;
            transform: translateX(0);
          }
        }

        :root {
          ${technologies.map(t => `
            --icon-color-${t.name.toLowerCase().replace(/[^a-z0-9]/g, '')}: ${t.lightColor};
          `).join('')}
        }
        [data-theme="dark"] {
          ${technologies.map(t => `
            --icon-color-${t.name.toLowerCase().replace(/[^a-z0-9]/g, '')}: ${t.darkColor};
          `).join('')}
        }
      `}</style>
    </div>
  );
} 