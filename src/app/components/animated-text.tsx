import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const words = [
  "Full Stack Developer",
  "UI/UX Enthusiast",
  "Problem Solver",
  "Tech Innovator"
];

export function AnimatedText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[30px] flex items-center justify-center">
      <div className="relative inline-block min-w-[200px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute left-0 right-0 text-center text-xl text-muted-foreground"
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
} 