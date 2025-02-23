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
            className="h-52 w-52 rounded-full object-cover md:h-64 md:w-64"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
        </button>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -z-10 animate-pulse">
        <div className="absolute -left-8 -top-8 h-16 w-16 rounded-full bg-primary/10 blur-xl" />
        <div className="absolute -right-8 -bottom-8 h-16 w-16 rounded-full bg-primary/10 blur-xl" />
      </div>
    </motion.div>
  );
} 