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
} from "react-icons/si";

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
];

// Double the array to create a seamless loop
const extendedTechnologies = [...technologies, ...technologies];

export function TechStack() {
  return (
    <div className="my-12 w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-xl font-semibold text-muted-foreground">Tech Stack</h2>
      </motion.div>
      
      <div className="relative mx-auto max-w-6xl">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-background via-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-background via-background to-transparent z-10" />
        
        {/* Scrolling container */}
        <div className="flex gap-16 whitespace-nowrap py-8 animate-scroll px-20">
          {extendedTechnologies.map((tech, index) => (
            <motion.div
              key={index}
              className="group relative flex items-center justify-center"
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.95 }}
              style={{ transformOrigin: "center center" }}
            >
              <tech.icon 
                className="w-12 h-12 md:w-16 md:h-16 transition-all duration-300 dark:text-opacity-90" 
                style={{ 
                  color: `var(--icon-color-${tech.name.toLowerCase().replace(/[^a-z0-9]/g, '')})`,
                }}
              />
              <motion.span 
                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-sm whitespace-nowrap text-muted-foreground pointer-events-none"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 0, y: -5 }}
                whileInView={{ opacity: 0, y: -5 }}
                whileHover={{ opacity: 1, y: 0 }}
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
          animation: scroll 25s linear infinite;
          will-change: transform;
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