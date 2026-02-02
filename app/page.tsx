"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, Code, Briefcase, Mail, FolderOpen, Users, Award, TrendingUp, ExternalLink, Github } from "lucide-react";
import { getTechLogo } from "@/lib/tech-logos";
import { subscribeToHomeContent, subscribeToProjects, type Project } from "@/lib/firebase-data";
import { defaultHomeContent } from "@/lib/firebase-data";
import { dataPreloader } from "@/lib/data-preloader";
import { HomeSkeleton } from "@/components/loading/HomeSkeleton";
import { ProjectCard } from "@/components/ProjectCard";
import type { HomeStatIcon } from "@/lib/portfolio-data";

const STAT_ICON_MAP: Record<HomeStatIcon, React.ComponentType<{ className?: string }>> = {
  folder: FolderOpen,
  "trending-up": TrendingUp,
  users: Users,
  award: Award,
};

export default function Home() {
  const [homeContent, setHomeContent] = useState<typeof defaultHomeContent>(defaultHomeContent);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);
    
    // Set page title
    document.title = "Home | Bhanu Prakash Chintal";
    
    // Try to get preloaded data first
    const preloadedData = dataPreloader.getData();
    if (preloadedData.loaded) {
      setHomeContent(preloadedData.homeContent);
      setFeaturedProjects(preloadedData.projects.filter(p => p.featured).slice(0, 3));
      setLoading(false);
    } else {
      // Wait for preloader if not ready
      dataPreloader.preloadAll().then((data) => {
        setHomeContent(data.homeContent);
        setFeaturedProjects(data.projects.filter(p => p.featured).slice(0, 3));
        setLoading(false);
      });
    }
    
    // Subscribe to real-time updates from Firestore
    const unsubscribeHome = subscribeToHomeContent((data) => {
      setHomeContent(data);
    });
    
    const unsubscribeProjects = subscribeToProjects((projects) => {
      setFeaturedProjects(projects.filter(p => p.featured).slice(0, 3));
    });
    
    return () => {
      unsubscribeHome();
      unsubscribeProjects();
    };
  }, []);

  if (!isClient || loading) {
    return <HomeSkeleton />;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16 md:py-20">
        <div
          className="relative rounded-[2rem] border border-[#3f3f3f] px-6 py-8 sm:px-10 sm:py-10 md:px-14 md:py-12"
          style={{
            background: "linear-gradient(0deg, #141414, #242424)",
          }}
        >
          <div
            className="pointer-events-none absolute rounded-[2.5rem] -z-10"
            style={{
              inset: "-6px",
              background: "linear-gradient(180deg, #3f3f3f, #212121)",
            }}
          />

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
          <Card
            className="group hover:border-primary/50 transition-colors rounded-2xl border-[#3f3f3f]"
            style={{ background: "linear-gradient(0deg, #141414, #242424)" }}
          >
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

          <Card
            className="group hover:border-primary/50 transition-colors rounded-2xl border-[#3f3f3f]"
            style={{ background: "linear-gradient(0deg, #141414, #242424)" }}
          >
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

          <Card
            className="group hover:border-primary/50 transition-colors rounded-2xl border-[#3f3f3f]"
            style={{ background: "linear-gradient(0deg, #141414, #242424)" }}
          >
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
        <div className="space-y-4 sm:space-y-6 md:space-y-8">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
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
          {[
            { name: "Flutter", description: "Cross-platform app development" },
            { name: "Python", description: "Backend and data processing" },
            { name: "Dart", description: "Flutter app development" },
            { name: "Firebase", description: "Backend-as-a-Service" },
            { name: "Supabase", description: "Open source Firebase alternative" },
            { name: "Figma", description: "UI/UX design and prototyping" },
          ].map(({ name, description }) => {
            const logoUrl = getTechLogo(name);
            return (
              <Card
                key={name}
                className="group hover:border-primary/50 transition-colors text-center rounded-2xl border-[#3f3f3f]"
                style={{ background: "linear-gradient(0deg, #141414, #242424)" }}
              >
                <CardHeader className="pb-3">
                  <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/10 transition-colors p-2">
                    {logoUrl ? (
                      <img
                        src={logoUrl}
                        alt={name}
                        className="h-full w-full object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <Code className="h-8 w-8 text-primary" />
                    )}
                  </div>
                  <CardTitle className="text-base">{name}</CardTitle>
                  <CardDescription className="text-xs">{description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="container mx-auto px-4 py-12 sm:py-16 md:py-20 border-t border-border">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {(homeContent.stats && homeContent.stats.length > 0 ? homeContent.stats : defaultHomeContent.stats).map((stat, index) => {
            const IconComponent = STAT_ICON_MAP[stat.icon as HomeStatIcon] ?? FolderOpen;
            return (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center mb-4">
                  <IconComponent className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            );
          })}
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

