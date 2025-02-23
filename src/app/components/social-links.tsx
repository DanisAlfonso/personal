import { motion } from "framer-motion";
import { Github, Mail, Instagram, Facebook } from "lucide-react";

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/DanisAlfonso",
    color: "#333",
    darkColor: "#fff"
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://instagram.com/danny.ramirez.a",
    color: "#E4405F",
    darkColor: "#E4405F"
  },
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://facebook.com/Danny.Ramirez.A",
    color: "#1877F2",
    darkColor: "#1877F2"
  },
  {
    name: "Email",
    icon: Mail,
    url: "https://mail.google.com/mail/?view=cm&fs=1&to=danis.ramirez.hn@gmail.com",
    color: "#EA4335",
    darkColor: "#EA4335"
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.3 },
  show: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

export function SocialLinks() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex items-center justify-center gap-8 mt-8"
    >
      {socialLinks.map((social) => (
        <motion.a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative p-3"
          variants={item}
          whileHover={{ y: -4, scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle, ${social.color}20 0%, transparent 70%)`,
            }}
            initial={{ scale: 0.5 }}
            whileHover={{ scale: 1 }}
          />
          <motion.div
            className="relative z-10"
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <social.icon 
              className="w-6 h-6 transition-all duration-300 text-muted-foreground group-hover:text-foreground dark:text-muted-foreground dark:group-hover:text-foreground" 
              style={{
                filter: "drop-shadow(0 0 8px transparent)",
              }}
            />
            <motion.div
              className="absolute inset-0"
              style={{
                filter: `drop-shadow(0 0 8px ${social.color}40)`,
              }}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              <social.icon 
                className="w-6 h-6" 
                style={{ 
                  color: `var(--social-color-${social.name.toLowerCase()})` 
                }} 
              />
            </motion.div>
          </motion.div>
          <span className="sr-only">{social.name}</span>
          
          {/* Tooltip */}
          <motion.span
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 pointer-events-none"
            initial={{ y: -4, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {social.name}
          </motion.span>
        </motion.a>
      ))}

      <style jsx global>{`
        :root {
          --social-color-github: ${socialLinks[0].color};
          --social-color-instagram: ${socialLinks[1].color};
          --social-color-facebook: ${socialLinks[2].color};
          --social-color-email: ${socialLinks[3].color};
        }
        
        [data-theme="dark"] {
          --social-color-github: ${socialLinks[0].darkColor};
          --social-color-instagram: ${socialLinks[1].darkColor};
          --social-color-facebook: ${socialLinks[2].darkColor};
          --social-color-email: ${socialLinks[3].darkColor};
        }
      `}</style>
    </motion.div>
  );
} 