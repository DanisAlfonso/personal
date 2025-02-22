"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { Home, User, Briefcase, BookOpen, Mail } from "lucide-react";

const navigation = [
  { name: "About", href: "/about", icon: User },
  { name: "Projects", href: "/projects", icon: Briefcase },
  { name: "Blog", href: "/blog", icon: BookOpen },
  { name: "Contact", href: "/contact", icon: Mail },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 flex w-full items-center justify-center p-6">
      <div className="flex items-center gap-2 rounded-full border border-border/60 bg-background/75 px-2 py-2 backdrop-blur-md dark:border-border/50 dark:bg-background/30">
        <Link
          href="/"
          className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-accent ${
            pathname === "/" ? "bg-accent" : ""
          }`}
        >
          <Home className="h-5 w-5" />
          <span className="sr-only">Home</span>
        </Link>

        <div className="mx-2 h-6 w-px bg-border/50" />

        <nav className="flex items-center gap-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors hover:bg-accent ${
                  pathname === item.href ? "bg-accent" : ""
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="mx-2 h-6 w-px bg-border/50" />
        
        <ThemeToggle />
      </div>
    </header>
  );
} 