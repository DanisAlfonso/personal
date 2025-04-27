"use client";

import { Header } from "./components/header";
import { ImagePreviewModal } from "./components/image-preview-modal";
import { TechStack } from "./components/tech-stack";
import { SocialLinks } from "./components/social-links";
import { AnimatedText } from "./components/animated-text";
import { ProfileImage } from "./components/profile-image";
import { AnimatedBackground } from "./components/animated-background";
import { motion } from "framer-motion";
import { ExternalLink, Send } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <AnimatedBackground />
      <Header />
      <main className="flex-1 overflow-x-hidden">
        <section className="container flex flex-col items-center justify-center gap-4 py-16 md:gap-6 md:py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-4 text-center md:gap-6"
          >
            <ProfileImage
              src="/placeholder-avatar.jpg"
              alt="Danis Ramírez"
              onOpenPreview={() => setIsImagePreviewOpen(true)}
            />
            <div className="space-y-2">
              <h1 className="h1 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-3xl md:text-4xl lg:text-5xl text-transparent">
                Danis Ramírez
              </h1>
              <h2 className="text-xl md:text-2xl font-semibold text-muted-foreground">
                Software Developer
              </h2>
              <AnimatedText />
            </div>
            <SocialLinks />
            <TechStack />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col gap-3 sm:flex-row sm:gap-4"
          >
            <motion.a
              href="/projects"
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 sm:px-8 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:gap-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Projects
              <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
            <motion.a
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-6 sm:px-8 py-3 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground hover:gap-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Contact Me
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
          </motion.div>
        </section>
      </main>

      {isImagePreviewOpen && (
        <ImagePreviewModal
          src="/placeholder-avatar.jpg"
          alt="Danis Ramírez"
          onClose={() => setIsImagePreviewOpen(false)}
        />
      )}
    </div>
  );
}
