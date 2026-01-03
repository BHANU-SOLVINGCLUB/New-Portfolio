"use client";

import { useState } from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ExternalLink, Github, FolderOpen } from "lucide-react";

type ProjectCategory = "all" | "mobile" | "web" | "data";

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
    category: "web" as ProjectCategory,
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
    type: "University Project",
    period: "Nov 2023 - Dec 2023",
    team: "2",
    achievement: "Won First Prize at the University-Level Project Expo (2024)",
    category: "mobile" as ProjectCategory,
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
    type: "Freelancing Project",
    period: "May 2024 – Jun 2024",
    team: "1",
    achievement: null,
    category: "mobile" as ProjectCategory,
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
    type: "Personal Project",
    period: "Aug 2025",
    team: "1",
    achievement: null,
    category: "data" as ProjectCategory,
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
    type: "University Project",
    period: "2024",
    team: "1",
    achievement: null,
    category: "web" as ProjectCategory,
    details: "Developed a university club website for event updates and announcements. Built with HTML, Bootstrap, and JavaScript, integrated with Cloudflare CMS for content management and Firebase for backend services.",
    featured: false
  },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const filterButtons = [
    { id: "all" as ProjectCategory, label: "All Projects" },
    { id: "mobile" as ProjectCategory, label: "Mobile App" },
    { id: "web" as ProjectCategory, label: "Web Development" },
    { id: "data" as ProjectCategory, label: "Data Analytics" },
  ];

  return (
    <div className="min-h-screen container mx-auto px-4 py-12 sm:py-16 md:py-20">
      <div className="text-center mb-8 sm:mb-12">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
          <FolderOpen className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
          <h1 className="text-3xl sm:text-4xl font-bold">My Projects</h1>
        </div>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
          A collection of projects I&apos;ve built and contributed to
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-8 sm:mb-12">
        {filterButtons.map((filter) => (
          <Button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            variant={activeFilter === filter.id ? "default" : "outline"}
            className={`rounded-full px-4 sm:px-6 py-2 font-medium transition-all ${
              activeFilter === filter.id
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-transparent border-border hover:bg-muted"
            }`}
          >
            {filter.label}
          </Button>
        ))}
      </div>

      <div className="space-y-6 sm:space-y-8">
        {filteredProjects.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">No projects found in this category.</p>
          </Card>
        ) : (
          filteredProjects.map((project) => (
          <Card key={project.id} className="group hover:border-primary/50 transition-colors overflow-hidden max-h-[calc(100vh-180px)] sm:max-h-[calc(100vh-200px)] flex flex-col">
            <div className="grid md:grid-cols-2 gap-0 flex-1 min-h-0">
              {/* Left Section - Visual/Image */}
              <div className="relative bg-gradient-to-br from-green-500/20 to-green-600/10 p-4 sm:p-8 md:p-12 flex items-center justify-center min-h-[250px] sm:min-h-[300px] md:min-h-0 md:max-h-full">
                <div className="relative w-full max-w-[150px] sm:max-w-[200px] md:max-w-[250px]">
                  {/* Phone Mockup Background Circle */}
                  <div className="absolute inset-0 bg-green-400/20 rounded-full blur-3xl scale-150"></div>
                  {/* Placeholder for phone mockup - you can replace with actual image */}
                  <div className="relative bg-card border-2 border-border rounded-[2rem] p-2 shadow-2xl">
                    <div className="bg-muted rounded-[1.5rem] aspect-[9/19] flex items-center justify-center">
                      <div className="text-center p-2 sm:p-4">
                        <div className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 line-clamp-2">{project.title}</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">Project Preview</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section - Project Details */}
              <div className="p-4 sm:p-6 md:p-8 flex flex-col min-h-0 flex-1">
                <div className="flex-1 mb-4 min-h-0">
                  {/* Title */}
                  <div className="mb-2 sm:mb-3">
                    <CardTitle className="text-xl sm:text-2xl md:text-3xl group-hover:text-primary transition-colors line-clamp-2">
                      {project.title}
                    </CardTitle>
                  </div>

                  {/* Meta Badges - Top Row */}
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.team && (
                      <Badge variant="secondary" className="text-xs sm:text-sm font-medium rounded-full px-2 sm:px-3 py-0.5 sm:py-1">
                        Team: {project.team}
                      </Badge>
                    )}
                    {project.period && (
                      <Badge variant="secondary" className="text-xs sm:text-sm font-medium rounded-full px-2 sm:px-3 py-0.5 sm:py-1">
                        {project.period}
                      </Badge>
                    )}
                  </div>

                  {/* Achievement Badge */}
                  {project.achievement && (
                    <Badge className="text-xs sm:text-sm font-medium bg-green-600/20 text-green-400 border-green-600/50 hover:bg-green-600/30 rounded-full px-2 sm:px-3 py-0.5 sm:py-1 mb-2 sm:mb-3">
                      {project.achievement}
                    </Badge>
                  )}

                  {/* Description - Truncated Summary */}
                  <CardDescription className="text-xs sm:text-sm md:text-base leading-relaxed mb-3 sm:mb-4 text-muted-foreground line-clamp-4 sm:line-clamp-5">
                    {project.details || project.description}
                  </CardDescription>

                  {/* Technology Badges */}
                  <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs sm:text-sm font-medium rounded-full px-2 sm:px-3 py-0.5 sm:py-1 bg-blue-600/20 text-blue-400 border-blue-600/50 hover:bg-blue-600/30">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-auto pt-3 sm:pt-4 border-t border-border flex-shrink-0">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full sm:w-auto text-xs sm:text-sm">
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[90vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-xl sm:text-2xl">{project.title}</DialogTitle>
                        <DialogDescription className="text-sm sm:text-base">{project.description}</DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.team && (
                            <Badge variant="secondary" className="text-xs sm:text-sm font-medium rounded-full">
                              Team: {project.team}
                            </Badge>
                          )}
                          {project.period && (
                            <Badge variant="secondary" className="text-xs sm:text-sm font-medium rounded-full">
                              {project.period}
                            </Badge>
                          )}
                          {project.type && (
                            <Badge variant="outline" className="text-xs sm:text-sm font-medium rounded-full">
                              {project.type}
                            </Badge>
                          )}
                        </div>
                        {project.achievement && (
                          <Badge className="text-xs sm:text-sm font-medium bg-green-600/20 text-green-400 border-green-600/50 mb-4 rounded-full">
                            {project.achievement}
                          </Badge>
                        )}
                        <h4 className="font-semibold mb-3 text-base sm:text-lg">Technologies Used:</h4>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.technologies.map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs sm:text-sm font-medium rounded-full bg-blue-600/20 text-blue-400 border-blue-600/50 hover:bg-blue-600/30">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                          {project.details || project.description}
                        </p>
                        <div className="flex flex-wrap gap-3">
                          {project.github && (
                            <Button variant="outline" asChild>
                              <a 
                                href={project.github} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-2"
                              >
                                <Github className="h-4 w-4" />
                                View on GitHub
                              </a>
                            </Button>
                          )}
                          {project.live && (
                            <Button variant="outline" asChild>
                              <a 
                                href={project.live} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-2"
                              >
                                <ExternalLink className="h-4 w-4" />
                                Visit Live Site
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  {project.github ? (
                    <Button 
                      variant="outline" 
                      asChild
                      className="w-full sm:w-auto text-xs sm:text-sm"
                    >
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Github className="h-3 w-3 sm:h-4 sm:w-4" />
                        GitHub
                      </a>
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      disabled
                      className="w-full sm:w-auto text-xs sm:text-sm opacity-50 cursor-not-allowed"
                    >
                      <Github className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                      GitHub
                    </Button>
                  )}
                  {project.live ? (
                    <Button 
                      variant="outline" 
                      asChild
                      className="w-full sm:w-auto text-xs sm:text-sm"
                    >
                      <a 
                        href={project.live} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                        View Live Project
                      </a>
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      disabled
                      className="w-full sm:w-auto text-xs sm:text-sm opacity-50 cursor-not-allowed"
                    >
                      <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                      View Live Project
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
          ))
        )}
      </div>
    </div>
  );
}

