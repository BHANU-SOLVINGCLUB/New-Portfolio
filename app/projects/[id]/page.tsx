"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, ExternalLink, Github, Calendar, Users, Award, Smartphone } from "lucide-react";
import Link from "next/link";
import { subscribeToProjects, type Project } from "@/lib/firebase-data";
import { dataPreloader } from "@/lib/data-preloader";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const projectId = parseInt(params.id);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);
    
    // Try to get preloaded data first
    const preloadedData = dataPreloader.getData();
    if (preloadedData.loaded) {
      setProjects(preloadedData.projects);
      setLoading(false);
      // Update title with project name
      const project = preloadedData.projects.find(p => p.id === projectId);
      if (project) {
        document.title = `${project.title} | Bhanu Prakash Chintal`;
      }
    } else {
      // Wait for preloader if not ready
      dataPreloader.preloadAll().then((data) => {
        setProjects(data.projects);
        setLoading(false);
        // Update title with project name
        const project = data.projects.find(p => p.id === projectId);
        if (project) {
          document.title = `${project.title} | Bhanu Prakash Chintal`;
        }
      });
    }
    
    // Subscribe to real-time updates from Firestore
    const unsubscribe = subscribeToProjects((data) => {
      setProjects(data);
      setLoading(false);
      // Update title with project name
      const project = data.find(p => p.id === projectId);
      if (project) {
        document.title = `${project.title} | Bhanu Prakash Chintal`;
      }
    });

    return () => {
      unsubscribe();
    };
  }, [projectId]);

  if (!isClient || loading) {
    return (
      <div className="min-h-screen container mx-auto px-4 py-12 sm:py-16 md:py-20">
        <Card className="p-12">
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-5/6 mb-8" />
          <Skeleton className="h-64 w-full rounded-lg mb-6" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </Card>
      </div>
    );
  }

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
                    <div className="bg-muted aspect-[16/10] overflow-hidden relative group">
                      {project.image && project.image !== "/placeholder-project.jpg" && project.image !== "" && (project.image.startsWith("data:") || project.image.startsWith("https://")) ? (
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
                              <div className="text-center p-6">
                                <ExternalLink className="h-10 w-10 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
                                <div className="text-base font-semibold">View Live Site</div>
                                <div className="text-sm text-muted-foreground mt-2">{project.live.replace(/^https?:\/\//, '').replace(/\/$/, '')}</div>
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
                            style={{ transform: "scale(0.7)", transformOrigin: "top left", width: "143%", height: "143%" }}
                            onError={() => {
                              // Fallback handled by overlay
                            }}
                          />
                          {/* Screenshot fallback using screenshot service */}
                          <img
                            src={`https://image.thum.io/get/width/1280/crop/800/${encodeURIComponent(project.live)}`}
                            alt={`${project.title} Preview`}
                            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity"
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
                            <div className="text-center p-6">
                              <ExternalLink className="h-10 w-10 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
                              <div className="text-base font-semibold">View Live Site</div>
                              <div className="text-sm text-muted-foreground mt-2">{project.live.replace(/^https?:\/\//, '').replace(/\/$/, '')}</div>
                            </div>
                          </a>
                        </>
                      ) : (
                        <div className="flex items-center justify-center h-full p-4 sm:p-6 md:p-8">
                          <div className="text-center w-full">
                            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 line-clamp-2">{project.title}</div>
                            <div className="text-xs sm:text-sm md:text-base text-muted-foreground">Project Preview</div>
                          </div>
                        </div>
                      )}
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
                        {project.technologies.map((tech: string) => (
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

