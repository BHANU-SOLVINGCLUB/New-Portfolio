"use client";

import { useState, useEffect } from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ExternalLink, Github, FolderOpen, Smartphone } from "lucide-react";
import Link from "next/link";
import { subscribeToProjects, type Project, type ProjectCategory } from "@/lib/firebase-data";

type FilterCategory = "all" | "mobile" | "web" | "data" | "freelance";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark as client-side rendered
    setIsClient(true);
    
    // Subscribe to real-time updates from Firestore
    const unsubscribe = subscribeToProjects((data) => {
      setProjects(data);
    });
    
    return () => {
      unsubscribe();
    };
  }, []);

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : activeFilter === "freelance"
    ? projects.filter(project => project.type?.toLowerCase().includes("freelance"))
    : projects.filter(project => project.category === activeFilter);

  const filterButtons = [
    { id: "all" as FilterCategory, label: "All Projects" },
    { id: "mobile" as FilterCategory, label: "Mobile App" },
    { id: "web" as FilterCategory, label: "Web Development" },
    { id: "data" as FilterCategory, label: "Data Analytics" },
    { id: "freelance" as FilterCategory, label: "Freelance" },
  ];

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
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-12 px-2">
        {filterButtons.map((filter) => (
          <Button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            variant={activeFilter === filter.id ? "default" : "outline"}
            className={`rounded-full px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all ${
              activeFilter === filter.id
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-transparent border-border hover:bg-muted"
            }`}
          >
            {filter.label}
          </Button>
        ))}
      </div>

      <div className="space-y-4 sm:space-y-6 md:space-y-8">
        {filteredProjects.length === 0 ? (
          <Card className="p-8 sm:p-12 text-center">
            <p className="text-sm sm:text-base text-muted-foreground">No projects found in this category.</p>
          </Card>
        ) : (
          filteredProjects.map((project) => (
          <Card key={project.id} className="group hover:border-primary/50 transition-colors overflow-hidden max-h-[calc(100vh-200px)] sm:max-h-[calc(100vh-220px)] md:max-h-[calc(100vh-200px)] flex flex-col">
            <div className="grid md:grid-cols-2 gap-0 flex-1 min-h-0">
              {/* Left Section - Visual/Image */}
              <div className={`relative p-4 sm:p-6 md:p-8 lg:p-12 flex items-center justify-center min-h-[200px] sm:min-h-[250px] md:min-h-0 md:max-h-full order-1 md:order-1 ${
                project.category === "mobile" 
                  ? "bg-gradient-to-br from-green-500/20 to-green-600/10" 
                  : "bg-gradient-to-br from-blue-500/20 to-blue-600/10"
              }`}>
                {project.category === "mobile" ? (
                  // Mobile Phone Mockup
                  <div className="relative w-full max-w-[120px] sm:max-w-[150px] md:max-w-[200px] lg:max-w-[250px]">
                    <div className="absolute inset-0 bg-green-400/20 rounded-full blur-3xl scale-150"></div>
                    <div className="relative bg-card border-2 border-border rounded-[2rem] p-1.5 sm:p-2 shadow-2xl">
                      <div className="bg-muted rounded-[1.5rem] aspect-[9/19] flex items-center justify-center">
                        <div className="text-center p-2 sm:p-3 md:p-4">
                          <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold mb-1 sm:mb-2 line-clamp-2">{project.title}</div>
                          <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">Project Preview</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Laptop Mockup for Web Projects
                  <div className="relative w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px]">
                    <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-3xl scale-150"></div>
                    <div className="relative bg-card border-2 border-border rounded-lg shadow-2xl">
                      {/* Laptop Top Bar */}
                      <div className="bg-muted/50 h-4 sm:h-6 md:h-8 rounded-t-lg flex items-center justify-center border-b border-border">
                        <div className="flex gap-1 sm:gap-1.5 md:gap-2">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full bg-red-500/50"></div>
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full bg-yellow-500/50"></div>
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full bg-green-500/50"></div>
                        </div>
                      </div>
                      {/* Laptop Screen */}
                      <div className="bg-muted aspect-[16/10] overflow-hidden rounded-b-lg relative group">
                        {project.image && project.image !== "/placeholder-project.jpg" && project.image.startsWith("data:") ? (
                          <>
                            <img
                              src={project.image}
                              alt={`${project.title} Preview`}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                            {project.live && (
                              <a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute inset-0 flex items-center justify-center bg-background/90 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity group-hover:opacity-100"
                              >
                                <div className="text-center p-4">
                                  <ExternalLink className="h-8 w-8 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
                                  <div className="text-sm font-semibold">View Live Site</div>
                                  <div className="text-xs text-muted-foreground mt-1">{project.live.replace(/^https?:\/\//, '').replace(/\/$/, '')}</div>
                                </div>
                              </a>
                            )}
                          </>
                        ) : project.live ? (
                          <>
                            <iframe
                              src={project.live}
                              className="w-full h-full border-0"
                              title={`${project.title} Preview`}
                              loading="lazy"
                              sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation-by-user-activation"
                              referrerPolicy="no-referrer-when-downgrade"
                              style={{ transform: "scale(0.8)", transformOrigin: "top left", width: "125%", height: "125%" }}
                              onError={() => {
                                // Fallback handled by overlay
                              }}
                            />
                            {/* Screenshot fallback using screenshot service */}
                            <img
                              src={`https://image.thum.io/get/width/1280/crop/800/${encodeURIComponent(project.live)}`}
                              alt={`${project.title} Preview`}
                              className="absolute inset-0 w-full h-full object-cover"
                              loading="lazy"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                            <a
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="absolute inset-0 flex items-center justify-center bg-background/90 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity group-hover:opacity-100"
                            >
                              <div className="text-center p-4">
                                <ExternalLink className="h-8 w-8 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
                                <div className="text-sm font-semibold">View Live Site</div>
                                <div className="text-xs text-muted-foreground mt-1">{project.live.replace(/^https?:\/\//, '').replace(/\/$/, '')}</div>
                              </div>
                            </a>
                          </>
                        ) : (
                          <div className="flex items-center justify-center h-full p-2 sm:p-3 md:p-4 lg:p-6">
                            <div className="text-center w-full">
                              <div className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold mb-1 sm:mb-2 line-clamp-2">{project.title}</div>
                              <div className="text-[8px] sm:text-[10px] md:text-xs text-muted-foreground">Project Preview</div>
                            </div>
                          </div>
                        )}
                      </div>
                      {/* Laptop Base */}
                      <div className="bg-card h-1 sm:h-2 md:h-3 rounded-b-lg border-t border-border"></div>
                      <div className="absolute -bottom-0.5 sm:-bottom-1 md:-bottom-2 left-1/2 transform -translate-x-1/2 w-16 sm:w-20 md:w-24 lg:w-32 h-0.5 sm:h-1 md:h-2 bg-muted rounded-full"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Section - Project Details */}
              <div className="p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col min-h-0 flex-1 order-2 md:order-2">
                <div className="flex-1 mb-3 sm:mb-4 min-h-0">
                  {/* Title */}
                  <div className="mb-2 sm:mb-3">
                    <CardTitle className="text-lg sm:text-xl md:text-2xl lg:text-3xl group-hover:text-primary transition-colors line-clamp-2">
                      {project.title}
                    </CardTitle>
                  </div>

                  {/* Meta Badges - Top Row */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2">
                    {project.team && (
                      <Badge variant="secondary" className="text-[10px] sm:text-xs md:text-sm font-medium rounded-full px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1">
                        Team: {project.team}
                      </Badge>
                    )}
                    {project.period && (
                      <Badge variant="secondary" className="text-[10px] sm:text-xs md:text-sm font-medium rounded-full px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1">
                        {project.period}
                      </Badge>
                    )}
                    {(project.type?.toLowerCase().includes("freelance")) && (
                      <Badge className="text-[10px] sm:text-xs md:text-sm font-medium rounded-full px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 bg-orange-600/20 text-orange-400 border-orange-600/50 hover:bg-orange-600/30">
                        Freelance
                      </Badge>
                    )}
                  </div>

                  {/* Achievement Badge */}
                  {project.achievement && (
                    <div className="mb-2 sm:mb-3">
                      <Badge className="text-[10px] sm:text-xs md:text-sm font-medium bg-green-600/20 text-green-400 border-green-600/50 hover:bg-green-600/30 rounded-full px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 line-clamp-2 inline-block">
                        {project.achievement}
                      </Badge>
                    </div>
                  )}

                  {/* Description - Truncated Summary */}
                  <CardDescription className="text-xs sm:text-sm md:text-base leading-relaxed mb-2 sm:mb-3 md:mb-4 text-muted-foreground line-clamp-3 sm:line-clamp-4 md:line-clamp-5">
                    {project.details || project.description}
                  </CardDescription>

                  {/* Technology Badges */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2 sm:mb-3 md:mb-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-[10px] sm:text-xs md:text-sm font-medium rounded-full px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 bg-blue-600/20 text-blue-400 border-blue-600/50 hover:bg-blue-600/30">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 md:gap-3 mt-auto pt-2 sm:pt-3 md:pt-4 border-t border-border flex-shrink-0">
                  <Button variant="outline" asChild className="w-full sm:flex-1 md:w-auto text-xs sm:text-sm py-2 sm:py-2">
                    <Link href={`/projects/${project.id}`}>
                      View Details
                    </Link>
                  </Button>
                  {project.github ? (
                    <Button 
                      variant="outline" 
                      asChild
                      className="w-full sm:flex-1 md:w-auto text-xs sm:text-sm py-2 sm:py-2"
                    >
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 sm:gap-2"
                      >
                        <Github className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span>GitHub</span>
                      </a>
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      disabled
                      className="w-full sm:flex-1 md:w-auto text-xs sm:text-sm opacity-50 cursor-not-allowed py-2 sm:py-2"
                    >
                      <Github className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                      <span>GitHub</span>
                    </Button>
                  )}
                  {project.category === "mobile" && (project.appStore || project.playStore) ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="w-full sm:flex-1 md:w-auto text-xs sm:text-sm py-2 sm:py-2"
                        >
                          <Smartphone className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                          <span className="hidden sm:inline">View Live Project</span>
                          <span className="sm:hidden">Live</span>
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
                              <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-black flex items-center justify-center">
                                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                                </svg>
                              </div>
                              <div className="flex-1">
                                <div className="text-xs text-muted-foreground mb-1">Download on the</div>
                                <div className="text-lg sm:text-xl font-semibold group-hover:text-primary transition-colors">App Store</div>
                              </div>
                              <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            </a>
                          )}
                          {project.playStore && (
                            <a
                              href={project.playStore}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:bg-accent transition-colors group"
                            >
                              <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-black flex items-center justify-center">
                                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.05L14.18,12L3.84,21.95C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                                </svg>
                              </div>
                              <div className="flex-1">
                                <div className="text-xs text-muted-foreground mb-1">Get it on</div>
                                <div className="text-lg sm:text-xl font-semibold group-hover:text-primary transition-colors">Google Play</div>
                              </div>
                              <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            </a>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  ) : project.live ? (
                    <Button 
                      variant="outline" 
                      asChild
                      className="w-full sm:flex-1 md:w-auto text-xs sm:text-sm py-2 sm:py-2"
                    >
                      <a 
                        href={project.live} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 sm:gap-2"
                      >
                        <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline">View Live Project</span>
                        <span className="sm:hidden">Live</span>
                      </a>
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      disabled
                      className="w-full sm:flex-1 md:w-auto text-xs sm:text-sm opacity-50 cursor-not-allowed py-2 sm:py-2"
                    >
                      <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                      <span className="hidden sm:inline">View Live Project</span>
                      <span className="sm:hidden">Live</span>
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

