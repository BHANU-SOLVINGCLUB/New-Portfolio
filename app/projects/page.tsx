"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderOpen } from "lucide-react";
import { subscribeToProjects, type Project } from "@/lib/firebase-data";
import { dataPreloader } from "@/lib/data-preloader";
import { ProjectCardListSkeleton } from "@/components/loading/ProjectCardSkeleton";
import { ProjectCard } from "@/components/ProjectCard";

type FilterCategory = "all" | "mobile" | "web" | "data" | "freelance";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);
    
    // Set page title
    document.title = "Projects | Bhanu Prakash Chintal";
    
    // Try to get preloaded data first
    const preloadedData = dataPreloader.getData();
    if (preloadedData.loaded) {
      setProjects(preloadedData.projects);
      setLoading(false);
    } else {
      // Wait for preloader if not ready
      dataPreloader.preloadAll().then((data) => {
        setProjects(data.projects);
        setLoading(false);
      });
    }
    
    // Subscribe to real-time updates from Firestore
    const unsubscribe = subscribeToProjects((data) => {
      setProjects(data);
      setLoading(false);
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

  if (!isClient || loading) {
    return (
      <div className="min-h-screen container mx-auto px-4 py-12 sm:py-16 md:py-20">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
            <FolderOpen className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            <h1 className="text-3xl sm:text-4xl font-bold">My Projects</h1>
          </div>
        </div>
        <ProjectCardListSkeleton count={5} />
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
            <ProjectCard key={project.id} project={project} />
          ))
        )}
      </div>
    </div>
  );
}

