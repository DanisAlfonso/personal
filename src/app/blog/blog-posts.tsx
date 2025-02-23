"use client";

import { Calendar, Clock, Tag, ArrowUpDown, ChevronDown, Filter, BookOpen, Globe2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  category: "tech" | "philosophy" | "other";
  language: "en" | "de";
  tags: string[];
};

const getLanguageName = (code: "en" | "de") => {
  const names = {
    en: "English",
    de: "German"
  };
  return names[code];
};

interface BlogPostsProps {
  initialPosts: Post[];
}

export function BlogPosts({ initialPosts }: BlogPostsProps) {
  const [posts] = useState<Post[]>(initialPosts);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(initialPosts);
  const [selectedCategory, setSelectedCategory] = useState<"tech" | "philosophy" | "other" | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<"en" | "de" | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isTagMenuOpen, setIsTagMenuOpen] = useState(false);
  const tagMenuRef = useRef<HTMLDivElement>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: 'date' | 'readingTime';
    direction: 'asc' | 'desc';
  } | null>(null);

  // Close tag menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (tagMenuRef.current && !tagMenuRef.current.contains(event.target as Node)) {
        setIsTagMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get unique categories, languages, and tags
  const categories = Array.from(new Set(posts.map((post) => post.category))).filter((category): category is "tech" | "philosophy" | "other" => category !== undefined);
  const languages = Array.from(new Set(posts.map((post) => post.language))).filter((language): language is "en" | "de" => language !== undefined);
  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags)));
  
  console.log('Categories:', categories);
  console.log('Languages:', languages);
  
  // Sort tags by frequency and get top tags
  const tagFrequency = allTags.reduce((acc, tag) => {
    const count = posts.filter(post => post.tags.includes(tag)).length;
    return [...acc, { tag, count }];
  }, [] as { tag: string; count: number }[])
    .sort((a, b) => b.count - a.count);

  const topTags = tagFrequency.slice(0, 3);
  const otherTags = tagFrequency.slice(3);

  // Filter and sort posts
  const updateFilteredPosts = () => {
    let result = [...posts];

    // Apply filters
    if (selectedCategory) {
      result = result.filter((post) => post.category === selectedCategory);
    }
    if (selectedLanguage) {
      result = result.filter((post) => post.language === selectedLanguage);
    }
    if (selectedTag) {
      result = result.filter((post) => post.tags.includes(selectedTag));
    }

    // Apply sorting
    if (sortConfig) {
      result.sort((a, b) => {
        if (sortConfig.key === 'date') {
          const comparison = new Date(b.date).getTime() - new Date(a.date).getTime();
          return sortConfig.direction === 'asc' ? -comparison : comparison;
        } else {
          // Convert "X min read" to minutes number for sorting
          const getMinutes = (time: string) => parseInt(time.split(' ')[0]);
          const comparison = getMinutes(b.readingTime) - getMinutes(a.readingTime);
          return sortConfig.direction === 'asc' ? -comparison : comparison;
        }
      });
    }

    setFilteredPosts(result);
  };

  // Update filtered posts when filters or sort change
  useEffect(() => {
    updateFilteredPosts();
  }, [selectedCategory, selectedLanguage, selectedTag, sortConfig]);

  const toggleSort = (key: 'date' | 'readingTime') => {
    if (sortConfig && sortConfig.key === key) {
      if (sortConfig.direction === 'asc') {
        setSortConfig({ key, direction: 'desc' });
      } else {
        setSortConfig(null);
      }
    } else {
      setSortConfig({ key, direction: 'asc' });
    }
  };

  return (
    <>
      <div className="mb-8">
        {/* Single row of essential filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Date sort - Always visible */}
          <button
            onClick={() => toggleSort('date')}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all hover:scale-[1.01] motion-safe:transform motion-safe:duration-300 ${
              sortConfig?.key === 'date'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
            }`}
          >
            <Calendar className="h-4 w-4" />
            Latest
            {sortConfig?.key === 'date' && (
              <ArrowUpDown className={`h-4 w-4 transition-transform duration-200 ${sortConfig.direction === 'desc' ? 'rotate-180' : ''}`} />
            )}
          </button>

          {/* Top 3 most used tags */}
          {topTags.map(({ tag }) => (
            <button
              key={`tag-${tag}`}
              onClick={() => {
                setSelectedTag(tag === selectedTag ? null : tag);
                setIsTagMenuOpen(false);
              }}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all hover:scale-[1.01] motion-safe:transform motion-safe:duration-300 ${
                tag === selectedTag
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
              }`}
            >
              <Tag className="h-4 w-4" />
              {tag}
            </button>
          ))}

          {/* Filters dropdown */}
          <div className="relative" ref={tagMenuRef}>
            <button
              onClick={() => setIsTagMenuOpen(!isTagMenuOpen)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all hover:scale-[1.01] motion-safe:transform motion-safe:duration-300 ${
                (selectedTag && !topTags.find(t => t.tag === selectedTag)) ||
                selectedCategory ||
                selectedLanguage ||
                sortConfig?.key === 'readingTime'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
              }`}
            >
              <Filter className="h-4 w-4" />
              Filters
              <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isTagMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Filters dropdown menu */}
            {isTagMenuOpen && (
              <div className="absolute right-0 z-10 mt-2 w-64 origin-top-right rounded-md border bg-card shadow-lg ring-1 ring-black ring-opacity-5 transition-all motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-95">
                <div className="p-4 space-y-4">
                  {/* Categories Section */}
                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-2">Categories</h3>
                    <div className="space-y-1">
                      {selectedCategory && (
                        <button
                          key="clear-category"
                          onClick={() => setSelectedCategory(null)}
                          className="text-sm text-primary hover:text-primary/80 transition-colors"
                        >
                          Clear category
                        </button>
                      )}
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => {
                            setSelectedCategory(category);
                            setIsTagMenuOpen(false);
                          }}
                          className={`flex w-full items-center gap-2 px-2 py-1.5 text-sm rounded-md transition-all hover:scale-[1.005] motion-safe:transform motion-safe:duration-300 ${
                            selectedCategory === category
                              ? "bg-primary/10 text-primary"
                              : "hover:bg-primary/5"
                          }`}
                        >
                          <BookOpen className="h-4 w-4" />
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Languages Section */}
                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-2">Languages</h3>
                    <div className="space-y-1">
                      {selectedLanguage && (
                        <button
                          key="clear-language"
                          onClick={() => setSelectedLanguage(null)}
                          className="text-sm text-primary hover:text-primary/80 transition-colors"
                        >
                          Clear language
                        </button>
                      )}
                      {languages.map((language) => (
                        <button
                          key={language}
                          onClick={() => {
                            setSelectedLanguage(language);
                            setIsTagMenuOpen(false);
                          }}
                          className={`flex w-full items-center gap-2 px-2 py-1.5 text-sm rounded-md transition-all hover:scale-[1.005] motion-safe:transform motion-safe:duration-300 ${
                            selectedLanguage === language
                              ? "bg-primary/10 text-primary"
                              : "hover:bg-primary/5"
                          }`}
                        >
                          <Globe2 className="h-4 w-4" />
                          {getLanguageName(language)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Other tags section */}
                  {otherTags.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-muted-foreground">More Topics</h3>
                        {selectedTag && !topTags.find(t => t.tag === selectedTag) && (
                          <button
                            onClick={() => setSelectedTag(null)}
                            className="text-xs text-primary hover:text-primary/80 transition-colors"
                          >
                            Clear
                          </button>
                        )}
                      </div>
                      <div className="space-y-1">
                        {otherTags.map(({ tag, count }) => (
                          <button
                            key={`tag-${tag}`}
                            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                            className={`flex w-full items-center justify-between px-2 py-1.5 text-sm rounded-md transition-all hover:scale-[1.005] motion-safe:transform motion-safe:duration-300 ${
                              tag === selectedTag ? 'bg-primary/10 text-primary' : 'hover:bg-primary/5'
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <Tag className="h-4 w-4" />
                              {tag}
                            </span>
                            <span className="text-xs text-muted-foreground transition-colors group-hover:text-muted-foreground/80">
                              {count}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Reading time sort option */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Sort By</h3>
                    <button
                      onClick={() => toggleSort('readingTime')}
                      className={`flex w-full items-center px-2 py-1.5 text-sm rounded-md transition-all hover:scale-[1.005] motion-safe:transform motion-safe:duration-300 ${
                        sortConfig?.key === 'readingTime' ? 'bg-primary/10 text-primary' : 'hover:bg-primary/5'
                      }`}
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      Reading Time
                      {sortConfig?.key === 'readingTime' && (
                        <ArrowUpDown className={`ml-auto h-4 w-4 transition-transform duration-200 ${sortConfig.direction === 'desc' ? 'rotate-180' : ''}`} />
                      )}
                    </button>
                  </div>

                  {/* Clear filters button */}
                  {(selectedCategory || selectedLanguage || selectedTag || sortConfig) && (
                    <button
                      onClick={() => {
                        setSelectedCategory(null);
                        setSelectedLanguage(null);
                        setSelectedTag(null);
                        setSortConfig(null);
                        setIsTagMenuOpen(false);
                      }}
                      className="flex w-full items-center justify-center px-2 py-1.5 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-md transition-all hover:scale-[1.005] motion-safe:transform motion-safe:duration-300"
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <article
            key={post.slug}
            className="group relative overflow-hidden rounded-lg border bg-card transition-all hover:shadow-sm hover:scale-[1.005] motion-safe:transform motion-safe:duration-300"
          >
            <Link href={`/blog/${post.slug}`} className="block p-6">
              {/* Post metadata */}
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1 transition-colors group-hover:text-primary/80">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1 transition-colors group-hover:text-primary/80">
                  <Clock className="h-4 w-4" />
                  {post.readingTime}
                </div>
              </div>

              {/* Post title and description */}
              <h2 className="mt-4 text-xl font-semibold tracking-tight transition-colors group-hover:text-primary">
                {post.title}
              </h2>
              <p className="mt-2 line-clamp-3 text-muted-foreground transition-colors group-hover:text-muted-foreground/80">
                {post.description}
              </p>

              {/* Post tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <div
                    key={`${post.slug}-${tag}`}
                    className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground transition-colors group-hover:bg-secondary/80"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </div>
                ))}
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* Empty state when no posts match filters */}
      {filteredPosts.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-8 text-center">
          <p className="text-lg font-medium">No posts found</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try adjusting your filters or search criteria
          </p>
          <button
            onClick={() => {
              setSelectedCategory(null);
              setSelectedLanguage(null);
              setSelectedTag(null);
              setSortConfig(null);
              setIsTagMenuOpen(false);
            }}
            className="mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </>
  );
} 