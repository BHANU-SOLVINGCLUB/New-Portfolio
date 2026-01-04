"use client";

import { ProjectsEditor } from "@/components/cms/ProjectsEditor";
import { getProjects, saveProjects, type Project } from "@/lib/firebase-data";
import { dataPreloader } from "@/lib/data-preloader";
import { useState, useEffect } from "react";

export default function CMSProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set page title
    document.title = "CMS - Projects | Bhanu Prakash Chintal";
    
    const loadProjects = async () => {
      try {
        // Try to get preloaded data first
        const preloadedData = dataPreloader.getData();
        if (preloadedData.loaded) {
          setProjects(preloadedData.projects);
          setLoading(false);
        } else {
          // Wait for preloader or fetch directly
          const data = await Promise.race([
            dataPreloader.preloadAll().then(d => d.projects),
            getProjects()
          ]);
          setProjects(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error loading projects:", error);
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  const handleSaveProjects = async (updatedProjects: Project[]) => {
    try {
      await saveProjects(updatedProjects);
      setProjects(updatedProjects);
      alert("Projects saved successfully to Firebase! Changes will reflect on portfolio pages.");
    } catch (error) {
      console.error("Error saving projects:", error);
      alert("Error saving projects. Please check your Firebase configuration.");
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Projects Management</h1>
          <p className="text-muted-foreground">Manage your portfolio projects (Firebase)</p>
        </div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border rounded-lg p-6 animate-pulse">
              <div className="h-6 bg-muted w-1/3 mb-4 rounded"></div>
              <div className="h-4 bg-muted w-full mb-2 rounded"></div>
              <div className="h-4 bg-muted w-5/6 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Projects Management</h1>
        <p className="text-muted-foreground">Manage your portfolio projects (Firebase)</p>
      </div>
      <ProjectsEditor projects={projects} onSave={handleSaveProjects} />
    </div>
  );
}

