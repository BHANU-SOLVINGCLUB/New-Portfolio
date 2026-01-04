"use client";

import { ProjectsEditor } from "@/components/cms/ProjectsEditor";
import { getProjects, saveProjects, type Project } from "@/lib/firebase-data";
import { useState, useEffect } from "react";

export default function CMSProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
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
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground">Loading projects...</p>
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

