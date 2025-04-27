import { motion } from "framer-motion";

interface ProfileImageProps {
  src: string;
  alt: string;
  onOpenPreview: () => void;
}

export function ProfileImage({ src, alt, onOpenPreview }: ProfileImageProps) {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [-5, 5, -5] }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="relative"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 via-primary to-primary/50 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient" />
      <div className="relative rounded-full border border-border/20 bg-background p-1">
        <button
          onClick={onOpenPreview}
          className="group relative block overflow-hidden rounded-full transition-transform hover:scale-[1.01] active:scale-100"
        >
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-black/60 to-black/40 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
            <span className="text-sm font-medium text-white">View photo</span>
          </div>
          <motion.img
            src={src}
            alt={alt}
            className="h-40 w-40 rounded-full object-cover sm:h-48 sm:w-48 md:h-52 md:w-52 lg:h-64 lg:w-64"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
        </button>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -z-10 animate-pulse">
        <div className="absolute -left-4 -top-4 h-8 w-8 rounded-full bg-primary/10 blur-xl sm:-left-6 sm:-top-6 sm:h-12 sm:w-12 md:-left-8 md:-top-8 md:h-16 md:w-16" />
        <div className="absolute -right-4 -bottom-4 h-8 w-8 rounded-full bg-primary/10 blur-xl sm:-right-6 sm:-bottom-6 sm:h-12 sm:w-12 md:-right-8 md:-bottom-8 md:h-16 md:w-16" />
      </div>
    </motion.div>
  );
} 