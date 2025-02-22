"use client";

import { Header } from "../components/header";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Project Name 1",
    description:
      "A brief description of your project. What problems does it solve? What technologies did you use?",
    image: "/project1.jpg",
    tags: ["Next.js", "React", "TypeScript", "TailwindCSS"],
    links: {
      github: "https://github.com/yourusername/project1",
      live: "https://project1.com",
    },
  },
  {
    title: "Project Name 2",
    description:
      "Another amazing project you've built. Highlight the key features and your role in development.",
    image: "/project2.jpg",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    links: {
      github: "https://github.com/yourusername/project2",
      live: "https://project2.com",
    },
  },
  // Add more projects as needed
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
              A collection of projects I&apos;ve worked on. Each project represents a unique challenge
              and solution.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {projects.map((project) => (
              <motion.div
                key={project.title}
                variants={fadeInUp}
                className="group relative overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg"
              >
                <div className="aspect-video w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
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
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </a>
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