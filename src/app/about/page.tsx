"use client";

import { Header } from "../components/header";
import { motion } from "framer-motion";

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

export default function About() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-12">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid gap-8 md:grid-cols-[1fr_2fr]"
          >
            {/* Profile Section */}
            <motion.div
              variants={fadeInUp}
              className="space-y-4 rounded-lg border bg-card p-6 shadow-sm"
            >
              <div className="relative mx-auto w-48">
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-primary to-secondary opacity-75 blur-md" />
                <div className="relative rounded-full border-2 border-border/50 bg-background p-1">
                  <img
                    src="/placeholder-avatar.jpg"
                    alt="Danis Ramírez"
                    className="h-48 w-48 rounded-full object-cover"
                  />
                </div>
              </div>
              <div className="text-center">
                <h1 className="h3">Danis Alfonso Ramírez</h1>
                <p className="text-muted-foreground">Software Developer</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Contact</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>📍 Spain</li>
                  <li>📧 danis.ramirez.hn@gmail.com</li>
                  <li>🔗 <a href="https://github.com/DanisAlfonso" target="_blank" rel="noopener noreferrer" className="hover:text-primary">github.com/DanisAlfonso</a></li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {["C++", "Python", "JavaScript", "TypeScript", "React", "Next.js", "React Native", "Expo", "TailwindCSS"].map(
                    (skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div variants={fadeInUp} className="space-y-8">
              <section className="space-y-4">
                <h2 className="h2">About Me</h2>
                <p className="text-muted-foreground">
                  I was born in Honduras in 1989. From 2014 to 2019, I taught physics at various institutions in my home country, 
                  primarily at the Universidad Nacional Autónoma de Honduras (UNAH). My journey into programming began with C++ 
                  during my physics studies, followed by Python for teaching and personal projects. Currently based in Spain, 
                  I&apos;m focused on building modern web applications and exploring various programming languages and technologies.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="h2">Experience</h2>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Software Developer</h3>
                    <p className="text-sm text-muted-foreground">Freelance • 2020 - Present</p>
                    <p className="text-muted-foreground">
                      Developing modern web and mobile applications using React, Next.js, and React Native.
                      Focused on creating responsive, user-friendly interfaces and implementing robust backend solutions.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Physics Professor</h3>
                    <p className="text-sm text-muted-foreground">Universidad Nacional Autónoma de Honduras • 2014 - 2019</p>
                    <p className="text-muted-foreground">
                      Taught physics at the university level, combining theoretical concepts with practical applications
                      and occasionally incorporating programming for problem-solving and demonstrations.
                    </p>
                  </div>
                </div>
              </section>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
} 