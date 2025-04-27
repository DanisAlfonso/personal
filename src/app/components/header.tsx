"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { Home, User, Briefcase, BookOpen, Mail, Menu, X } from "lucide-react";
import { useState } from "react";

const navigation = [
  { name: "About", href: "/about", icon: User },
  { name: "Projects", href: "/projects", icon: Briefcase },
  { name: "Blog", href: "/blog", icon: BookOpen },
  { name: "Contact", href: "/contact", icon: Mail },
];

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex w-full items-center justify-center p-4 md:p-6">
      <div className="flex w-full max-w-3xl items-center justify-between rounded-full border border-border/60 bg-background/75 px-2 py-2 backdrop-blur-md dark:border-border/50 dark:bg-background/30">
        <Link
          href="/"
          className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-accent ${
            pathname === "/" ? "bg-accent" : ""
          }`}
        >
          <Home className="h-5 w-5" />
          <span className="sr-only">Home</span>
        </Link>

        <div className="mx-2 hidden h-6 w-px bg-border/50 md:block" />

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
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

        <div className="flex items-center gap-2">
          <div className="mx-2 hidden h-6 w-px bg-border/50 md:block" />
          
          <ThemeToggle />
          
          {/* Mobile Menu Button */}
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 mx-4 rounded-lg border border-border/60 bg-background/95 p-2 shadow-lg backdrop-blur-md dark:border-border/50 dark:bg-background/90 md:hidden">
          <nav className="flex flex-col items-stretch gap-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex h-12 items-center gap-2 rounded-md px-4 text-sm font-medium transition-colors hover:bg-accent ${
                    pathname === item.href ? "bg-accent" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
} 