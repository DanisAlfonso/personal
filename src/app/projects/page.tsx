"use client";

import { Header } from "../components/header";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

type Project = {
  title: string;
  description: string;
  tags: string[];
  links: {
    github: string;
    live: string;
  };
} & (
  | {
      image: string;
      images?: never;
    }
  | {
      images: string[];
      image?: never;
    }
);

const projects: Project[] = [
  {
    title: "Selvas Coffee E-Commerce",
    description:
      "Modern coffee e-commerce platform targeting European markets. Features multi-language support, European VAT-compliant pricing, secure authentication, real-time inventory management, and GDPR-compliant data handling.",
    image: "/coffee.png",
    tags: ["Next.js", "Supabase", "TypeScript", "TailwindCSS", "Stripe", "PostgreSQL"],
    links: {
      github: "https://github.com/DanisAlfonso/supabase-coffee-traders",
      live: "#",
    },
  },
  {
    title: "LinguaFlow",
    description:
      "A mobile application built with Expo and TypeScript, designed to provide an intuitive language learning experience. Features file-based routing and a modern development workflow.",
    images: ["/3.jpeg", "/4.jpeg", "/6.jpeg"],
    tags: ["React Native", "Expo", "TypeScript", "Mobile Development"],
    links: {
      github: "https://github.com/DanisAlfonso/linguaflow",
      live: "#",
    },
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Projects() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h1 className="h1 mb-4">My Projects</h1>
            <p className="text-lg text-muted-foreground">
              Here are some of my recent projects. For more details on past work, feel free to check out my GitHub profile.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid gap-6 md:grid-cols-2"
          >
            {projects.map((project) => (
              <motion.div
                key={project.title}
                variants={fadeInUp}
                className="group relative overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg"
              >
                <div className="aspect-video w-full overflow-hidden bg-black/20">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />
                  {'images' in project && project.images ? (
                    <div className="relative flex h-full items-center justify-center gap-2 px-4">
                      {project.images.map((img, index) => (
                        <div
                          key={img}
                          className="relative h-[90%] overflow-hidden rounded-lg shadow-lg"
                          style={{
                            width: 'auto',
                            transform: `rotate(${index === 1 ? '0' : index === 0 ? '-5' : '5'}deg)`,
                          }}
                        >
                          <img
                            src={img}
                            alt={`${project.title} screenshot ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="h3 mb-2">{project.title}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{project.description}</p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                    >
                      <Github className="h-4 w-4" />
                      Source
                    </a>
                    {project.links.live !== "#" && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  );
} 