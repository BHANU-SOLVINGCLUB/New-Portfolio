"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, Code, Briefcase, Mail, FolderOpen, Users, Award, TrendingUp, Sparkles, ExternalLink, Github } from "lucide-react";
import { getHomeContent, getProjects } from "@/lib/portfolio-data";

export default function Home() {
  const [homeContent, setHomeContent] = useState({ name: "", badges: [], description: "" });
  const [featuredProjects, setFeaturedProjects] = useState<ReturnType<typeof getProjects>>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark as client-side rendered
    setIsClient(true);
    
    const loadData = () => {
      setHomeContent(getHomeContent());
      setFeaturedProjects(getProjects().filter(p => p.featured).slice(0, 3));
    };

    // Load data on mount
    loadData();

    // Listen for CMS updates
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.type === "home" || customEvent.detail?.type === "projects") {
        loadData();
      }
    };
    
    // Also listen for storage events (works across tabs)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "cms_home" || e.key === "cms_projects") {
        loadData();
      }
    };
    
    window.addEventListener("cms-data-updated", handleUpdate);
    window.addEventListener("storage", handleStorage);
    
    return () => {
      window.removeEventListener("cms-data-updated", handleUpdate);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  // Show loading state during hydration to prevent mismatch
  if (!isClient) {
    return (
      <div className="min-h-screen container mx-auto px-4 py-12 sm:py-16 md:py-20">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16 md:py-20">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <Avatar className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 ring-2 ring-border">
            <AvatarImage src="/avatar.svg" alt={homeContent.name} />
            <AvatarFallback className="text-lg sm:text-xl md:text-2xl">BPC</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-4">
              {homeContent.badges.map((badge, index) => (
                <Badge key={index}>{badge}</Badge>
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Hi, I&apos;m {homeContent.name}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6">
              {homeContent.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="w-full sm:w-auto">
                <Link href="/projects">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full sm:w-auto">
                <Link href="/contact">
                  Get In Touch
                  <Mail className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16 md:py-20 border-t border-border">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">What I Do</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Specialized in data analytics, mobile development, and full-stack solutions
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="group hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Data Analytics</CardTitle>
              <CardDescription>
                Python-based data analysis, visualization, and automation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Extracting insights from data, building KPI dashboards, and creating 
                interactive visualizations using Python, pandas, and Streamlit.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Mobile Development</CardTitle>
              <CardDescription>
                Building scalable Flutter applications with clean architecture
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Developing cross-platform mobile apps using Flutter, Dart, and 
                implementing modular architecture for scalable solutions.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Full Stack Development</CardTitle>
              <CardDescription>
                End-to-end web applications with modern technologies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Building complete web solutions using Next.js, TypeScript, and 
                integrating with Firebase, Supabase, and REST APIs.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16 md:py-20 border-t border-border">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Featured Projects</h2>
            <p className="text-muted-foreground">Some of my recent work that I&apos;m proud of.</p>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/projects">
              View all projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <Card key={project.id} className="group hover:border-primary/50 transition-colors">
              <CardHeader>
                <CardTitle className="group-hover:text-primary transition-colors">{project.title}</CardTitle>
                <CardDescription>
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">{tech}</Badge>
                  ))}
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/projects#project-${project.id}`}>
                    View project
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16 md:py-20 border-t border-border">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">My Tech Stack</h2>
            <p className="text-muted-foreground">Technologies and tools I use to bring ideas to life.</p>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/skills">
              View my complete stack
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          <Card className="group hover:border-primary/50 transition-colors text-center">
            <CardHeader className="pb-3">
              <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/10 transition-colors">
                <Code className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-base">Flutter</CardTitle>
              <CardDescription className="text-xs">Cross-platform app development</CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:border-primary/50 transition-colors text-center">
            <CardHeader className="pb-3">
              <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/10 transition-colors">
                <Code className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-base">Python</CardTitle>
              <CardDescription className="text-xs">Backend and data processing</CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:border-primary/50 transition-colors text-center">
            <CardHeader className="pb-3">
              <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/10 transition-colors">
                <Code className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-base">Dart</CardTitle>
              <CardDescription className="text-xs">Flutter app development</CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:border-primary/50 transition-colors text-center">
            <CardHeader className="pb-3">
              <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/10 transition-colors">
                <Code className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-base">Firebase</CardTitle>
              <CardDescription className="text-xs">Backend-as-a-Service</CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:border-primary/50 transition-colors text-center">
            <CardHeader className="pb-3">
              <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/10 transition-colors">
                <Code className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-base">Supabase</CardTitle>
              <CardDescription className="text-xs">Open source Firebase alternative</CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:border-primary/50 transition-colors text-center">
            <CardHeader className="pb-3">
              <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/10 transition-colors">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-base">Figma</CardTitle>
              <CardDescription className="text-xs">UI/UX design and prototyping</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="container mx-auto px-4 py-12 sm:py-16 md:py-20 border-t border-border">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center mb-4">
              <FolderOpen className="h-6 w-6 text-primary" />
            </div>
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">3+</div>
            <p className="text-sm text-muted-foreground">Years Experience</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">10+</div>
            <p className="text-sm text-muted-foreground">Projects Completed</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">2</div>
            <p className="text-sm text-muted-foreground">Companies Worked</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center mb-4">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">1</div>
            <p className="text-sm text-muted-foreground">Research Paper</p>
          </div>
        </div>
      </section>

      {/* Let's Work Together Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16 md:py-20 border-t border-border">
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl mb-2">Let&apos;s work together</CardTitle>
            <CardDescription className="text-base">
              Have a project in mind or just want to connect? I&apos;m always open to discussing new opportunities.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/contact">
                Get in touch
                <Mail className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

