"use client";

import { ProjectsEditor } from "@/components/cms/ProjectsEditor";
import { getProjects, defaultProjects, type Project } from "@/lib/portfolio-data";
import { useState, useEffect } from "react";

export default function CMSProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const handleSaveProjects = (updatedProjects: Project[]) => {
    setProjects(updatedProjects);
    const data = JSON.stringify(updatedProjects);
    localStorage.setItem("cms_projects", data);
    localStorage.setItem("cms_projects_updated", Date.now().toString());
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("cms-data-updated", { detail: { type: "projects" } }));
      localStorage.setItem("cms_trigger", Date.now().toString());
      localStorage.removeItem("cms_trigger");
    }
    alert("Projects saved successfully! Changes will reflect on portfolio pages.");
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Projects Management</h1>
        <p className="text-muted-foreground">Manage your portfolio projects</p>
      </div>
      <ProjectsEditor projects={projects} onSave={handleSaveProjects} />
    </div>
  );
}

