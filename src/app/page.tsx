"use client";

import { Header } from "./components/header";
import { ImagePreviewModal } from "./components/image-preview-modal";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="container flex flex-col items-center justify-center gap-6 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-6 text-center"
          >
            <div className="relative">
              <div className="relative rounded-full border border-border/20 bg-background p-1">
                <button
                  onClick={() => setIsImagePreviewOpen(true)}
                  className="group relative block overflow-hidden rounded-full transition-transform hover:scale-[1.01] active:scale-100"
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="text-sm font-medium text-white">View photo</span>
                  </div>
                  <img
                    src="/placeholder-avatar.jpg"
                    alt="Danis Ramírez"
                    className="h-52 w-52 rounded-full object-cover md:h-64 md:w-64"
                  />
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="h1 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                Danis Ramírez
              </h1>
              <h2 className="text-2xl font-semibold text-muted-foreground">
                Software Developer
              </h2>
              <p className="text-xl text-muted-foreground">
                Building beautiful, responsive, and user-friendly applications
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="/projects"
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              View Projects
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Contact Me
            </a>
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
