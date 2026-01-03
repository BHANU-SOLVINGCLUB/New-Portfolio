"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, ExternalLink, Github, Calendar, Users, Award, Smartphone } from "lucide-react";
import Link from "next/link";

// Import projects data - in a real app, you might fetch this from an API
const projects = [
  {
    id: 1,
    title: "TUVO – Ticket Booking Platform",
    description: "Full-stack Next.js 15 ticket booking platform with secure PayU payments, PDF ticket generation, and role-based admin dashboard.",
    technologies: ["Next.js", "TypeScript", "Tailwind", "Radix UI", "Supabase", "Vercel"],
    image: "/placeholder-project.jpg",
    github: "",
    live: "https://www.tuvo.in/",
    type: "Freelance Project",
    period: "June 2025",
    team: "1",
    achievement: null,
    category: "web" as const,
    details: "Built a full-stack ticket booking platform with secure PayU payments and server verification. Implemented PDF ticket generation with QR codes and automated email receipts. Developed a comprehensive role-based admin dashboard for managing events and bookings.",
    featured: true
  },
  {
    id: 2,
    title: "Heritage Hues",
    description: "A cross-platform travel and tourism app built with Flutter & Dart. Aggregates data on heritage sites and commerce markets.",
    technologies: ["Flutter", "Dart", "FlutterFlow", "MapTiler", "Supabase"],
    image: "/placeholder-project.jpg",
    github: "",
    live: "",
    appStore: "",
    playStore: "",
    type: "University Project",
    period: "Nov 2023 - Dec 2023",
    team: "2",
    achievement: "Won First Prize at the University-Level Project Expo (2024)",
    category: "mobile" as const,
    details: "A cross-platform travel and tourism application built with Flutter and Dart, designed to streamline the process of finding information about various places. The app aggregates data from multiple sources, focusing on hereditary and commerce markets to showcase hidden gems. Utilizing Flutterflow and APIs for automation, HeritageHues offers a user-friendly experience. For mapping, it employs MapTiler, an open-source alternative to Google API, and uses Supabase for its backend.",
    featured: true
  },
  {
    id: 3,
    title: "Travel Together",
    description: "AI-driven travel app offering personalized itineraries. Developed a secure backend using Firebase and designed an interactive admin dashboard.",
    technologies: ["Flutter", "Dart", "Firebase", "Firestore", "AI Integration"],
    image: "/placeholder-project.jpg",
    github: "https://github.com/BhanuPrakashChintal/TravelTogether",
    live: "",
    appStore: "",
    playStore: "",
    type: "Freelancing Project",
    period: "May 2024 – Jun 2024",
    team: "1",
    achievement: null,
    category: "mobile" as const,
    details: "Developed a smart travel application featuring AI-powered itinerary planning and real-time geolocation navigation. Designed an intuitive user interface with a comprehensive admin panel. Utilized Firebase for secure backend and efficient data handling.",
    featured: true
  },
  {
    id: 4,
    title: "Data Analytics & Visualization Studio",
    description: "Streamlit-based analytics platform for CSV/XLSX datasets with automatic schema detection, interactive dashboards, and KPI visualization.",
    technologies: ["Python", "Streamlit", "pandas", "Plotly", "NumPy"],
    image: "/placeholder-project.jpg",
    github: "https://github.com/JadhavMeghana/Data-Analytics---Visualization-Studio",
    live: "https://dav-studio.streamlit.app/",
    appStore: "",
    playStore: "",
    type: "Personal Project",
    period: "Aug 2025",
    team: "1",
    achievement: null,
    category: "data" as const,
    details: "Built a comprehensive Streamlit-based analytics platform that automatically detects schemas and column mappings. Delivers end-to-end data analysis including trends, distributions, and outlier detection. Features interactive dashboards with KPIs and advanced filtering capabilities.",
    featured: false
  },
  {
    id: 5,
    title: "Geek for Geeks Student Club Website",
    description: "Developed a university club website for event updates using HTML, Bootstrap, JavaScript, Cloudflare CMS, GitHub, and Firebase.",
    technologies: ["HTML", "Bootstrap", "JavaScript", "Cloudflare CMS", "Firebase"],
    image: "/placeholder-project.jpg",
    github: "",
    live: "",
    appStore: "",
    playStore: "",
    type: "University Project",
    period: "2024",
    team: "1",
    achievement: null,
    category: "web" as const,
    details: "Developed a university club website for event updates and announcements. Built with HTML, Bootstrap, and JavaScript, integrated with Cloudflare CMS for content management and Firebase for backend services.",
    featured: false
  },
  {
    id: 6,
    title: "SaralEvents",
    description: "A comprehensive event management and booking platform with vendor management, real-time availability tracking, and featured events system.",
    technologies: ["Flutter", "Dart", "TypeScript", "Supabase", "PLpgSQL", "Vercel"],
    image: "/placeholder-project.jpg",
    github: "https://github.com/SOLVING-CLUB/SaralEvents",
    live: "https://saralevents.vercel.app",
    appStore: "",
    playStore: "",
    type: "Freelance Project",
    period: "2024",
    team: "2+",
    achievement: null,
    category: "mobile" as const,
    details: "SaralEvents is a full-stack event management platform built with Flutter and Dart for the mobile application, TypeScript for web components, and Supabase for backend services. The platform features comprehensive event planning capabilities including vendor management, real-time availability tracking, banner system for promotions, featured events showcase, and an integrated booking system. The project includes a vendor app for service providers to manage their events and availability. Built with modern architecture using Supabase for database management, real-time updates, and authentication.",
    featured: true
  },
  {
    id: 7,
    title: "Plattrr",
    description: "A full-stack cross-platform application with web, iOS, and Android support. Provided technical support and managed app store deployments.",
    technologies: ["TypeScript", "React", "Supabase", "Firebase", "Capacitor", "Vercel", "iOS", "Android"],
    image: "/placeholder-project.jpg",
    github: "https://github.com/SOLVING-CLUB/plattr",
    live: "https://plattrr.vercel.app",
    appStore: "https://apps.apple.com/app/plattrr",
    playStore: "https://play.google.com/store/apps/details?id=com.plattrr.app",
    type: "Freelance Project",
    period: "2024",
    team: "4",
    achievement: null,
    category: "mobile" as const,
    details: "Plattrr is a comprehensive cross-platform application built with TypeScript, React, and Capacitor for mobile deployment. The project features a full-stack architecture with client, server, and mobile components. Provided technical support throughout the development process and successfully managed deployments to both Apple App Store and Google Play Store. The application utilizes Supabase for backend services, Firebase for additional integrations, and Vercel for web hosting. Implemented proper build configurations for iOS and Android platforms, ensuring smooth cross-platform functionality.",
    featured: true
  },
];

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const projectId = parseInt(params.id);
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen container mx-auto px-4 py-12 sm:py-16 md:py-20">
        <Card className="p-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-6">The project you&apos;re looking for doesn&apos;t exist.</p>
          <Button asChild>
            <Link href="/projects">Back to Projects</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className={`relative py-8 sm:py-12 md:py-16 ${
        project.category === "mobile" 
          ? "bg-gradient-to-br from-green-500/20 to-green-600/10" 
          : "bg-gradient-to-br from-blue-500/20 to-blue-600/10"
      }`}>
        <div className="container mx-auto px-4">
          <div className="relative z-50" style={{ pointerEvents: 'auto' }}>
            <Link 
              href="/projects"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mb-6 sm:mb-8 cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
            {/* Visual Section */}
            <div className="flex justify-center md:justify-start order-2 md:order-1">
              {project.category === "mobile" ? (
                // Mobile Phone Mockup
                <div className="relative w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px]">
                  <div className="absolute inset-0 bg-green-400/20 rounded-full blur-3xl scale-150 pointer-events-none"></div>
                  <div className="relative bg-card border-2 border-border rounded-[2rem] p-2 sm:p-3 shadow-2xl">
                    <div className="bg-muted rounded-[1.5rem] aspect-[9/19] flex items-center justify-center">
                      <div className="text-center p-4 sm:p-6">
                        <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 line-clamp-2">{project.title}</div>
                        <div className="text-sm sm:text-base text-muted-foreground">Project Preview</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Laptop Mockup for Web Projects
                <div className="relative w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px]">
                  <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-3xl scale-150 pointer-events-none"></div>
                  <div className="relative bg-card border-2 border-border rounded-lg shadow-2xl">
                    {/* Laptop Top Bar */}
                    <div className="bg-muted/50 h-6 sm:h-8 rounded-t-lg flex items-center justify-center border-b border-border">
                      <div className="flex gap-1.5 sm:gap-2">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500/50"></div>
                        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500/50"></div>
                        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500/50"></div>
                      </div>
                    </div>
                    {/* Laptop Screen */}
                    <div className="bg-muted aspect-[16/10] flex items-center justify-center p-4 sm:p-6 md:p-8">
                      <div className="text-center w-full">
                        <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 line-clamp-2">{project.title}</div>
                        <div className="text-xs sm:text-sm md:text-base text-muted-foreground">Project Preview</div>
                      </div>
                    </div>
                    {/* Laptop Base */}
                    <div className="bg-card h-2 sm:h-3 rounded-b-lg border-t border-border"></div>
                    <div className="absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2 w-24 sm:w-32 h-1 sm:h-2 bg-muted rounded-full"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Title and Meta Section */}
            <div className="order-1 md:order-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
                {project.title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8">
                {project.description}
              </p>

              {/* Meta Information */}
              <div className="flex flex-wrap gap-3 sm:gap-4 mb-4 sm:mb-6">
                {project.team && (
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                    <span className="text-sm sm:text-base text-muted-foreground">Team: {project.team}</span>
                  </div>
                )}
                {project.period && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                    <span className="text-sm sm:text-base text-muted-foreground">{project.period}</span>
                  </div>
                )}
                {project.type && (
                  <Badge variant="outline" className="text-xs sm:text-sm">
                    {project.type}
                  </Badge>
                )}
                {(project.type?.toLowerCase().includes("freelance")) && (
                  <Badge className="text-xs sm:text-sm md:text-base font-medium bg-orange-600/20 text-orange-400 border-orange-600/50 hover:bg-orange-600/30 rounded-full px-3 sm:px-4 md:px-5 py-1.5 sm:py-2">
                    Freelance
                  </Badge>
                )}
              </div>

              {/* Achievement Badge */}
              {project.achievement && (
                <div className="mb-6 sm:mb-8">
                  <Badge className="text-xs sm:text-sm md:text-base font-medium bg-green-600/20 text-green-400 border-green-600/50 hover:bg-green-600/30 rounded-full px-3 sm:px-4 md:px-5 py-1.5 sm:py-2">
                    <Award className="h-3 w-3 sm:h-4 sm:w-4 mr-2 inline" />
                    {project.achievement}
                  </Badge>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {project.github && (
                  <Button variant="outline" asChild className="w-full sm:w-auto">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <Github className="h-4 w-4 sm:h-5 sm:w-5" />
                      View on GitHub
                    </a>
                  </Button>
                )}
                {project.category === "mobile" && (project.appStore || project.playStore) ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full sm:w-auto">
                        <Smartphone className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                        Download App
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-xl sm:text-2xl">{project.title}</DialogTitle>
                        <DialogDescription>
                          Download the app from your preferred app store
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex flex-col gap-4 py-4">
                        {project.appStore && (
                          <a
                            href={project.appStore}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:bg-accent transition-colors group"
                          >
                            <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-black flex items-center justify-center">
                              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                              </svg>
                            </div>
                            <div className="flex-1">
                              <div className="text-xs sm:text-sm text-muted-foreground mb-1">Download on the</div>
                              <div className="text-xl sm:text-2xl font-semibold group-hover:text-primary transition-colors">App Store</div>
                            </div>
                            <ExternalLink className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                          </a>
                        )}
                        {project.playStore && (
                          <a
                            href={project.playStore}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:bg-accent transition-colors group"
                          >
                            <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-black flex items-center justify-center">
                              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.05L14.18,12L3.84,21.95C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                              </svg>
                            </div>
                            <div className="flex-1">
                              <div className="text-xs sm:text-sm text-muted-foreground mb-1">Get it on</div>
                              <div className="text-xl sm:text-2xl font-semibold group-hover:text-primary transition-colors">Google Play</div>
                            </div>
                            <ExternalLink className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                          </a>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                ) : project.live ? (
                  <Button asChild className="w-full sm:w-auto">
                    <a 
                      href={project.live} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
                      Visit Live Site
                    </a>
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Project Details */}
          <Card className="mb-6 sm:mb-8">
            <CardHeader>
              <CardTitle className="text-2xl sm:text-3xl">Project Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground">
                {project.details}
              </p>
            </CardContent>
          </Card>

          {/* Technologies Used */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl sm:text-3xl">Technologies Used</CardTitle>
              <CardDescription>Tools and technologies powering this project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {project.technologies.map((tech) => (
                  <Badge 
                    key={tech} 
                    variant="outline" 
                    className="text-sm sm:text-base font-medium rounded-full px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600/20 text-blue-400 border-blue-600/50 hover:bg-blue-600/30"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

