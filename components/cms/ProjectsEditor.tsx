"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Save, Trash2, Edit, X, ExternalLink, Upload, Image as ImageIcon } from "lucide-react";
import type { Project, ProjectCategory } from "@/lib/portfolio-data";

interface ProjectsEditorProps {
  projects: Project[];
  onSave: (projects: Project[]) => void;
}

export function ProjectsEditor({ projects, onSave }: ProjectsEditorProps) {
  const [localProjects, setLocalProjects] = useState<Project[]>(projects);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState(false);

  // Sync localProjects with projects prop when it changes
  useEffect(() => {
    setLocalProjects(projects);
  }, [projects]);

  const handleSaveAll = () => {
    onSave(localProjects);
  };

  const handleAddProject = () => {
    const newProject: Project = {
      id: Date.now(),
      title: "",
      description: "",
      technologies: [],
      image: "/placeholder-project.jpg",
      github: "",
      live: "",
      type: "",
      period: "",
      team: "1",
      achievement: null,
      category: "web",
      details: "",
      featured: false,
    };
    setLocalProjects([...localProjects, newProject]);
    setEditingProject(newProject);
    setNewProject(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setNewProject(false);
  };

  const handleDeleteProject = (id: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
      setLocalProjects(localProjects.filter((p) => p.id !== id));
    }
  };

  const handleSaveProject = () => {
    if (!editingProject) return;

    if (newProject) {
      setLocalProjects([...localProjects.filter((p) => p.id !== editingProject.id), editingProject]);
    } else {
      setLocalProjects(localProjects.map((p) => (p.id === editingProject.id ? editingProject : p)));
    }

    setEditingProject(null);
    setNewProject(false);
  };

  const handleCancelEdit = () => {
    setEditingProject(null);
    setNewProject(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Projects</CardTitle>
            <CardDescription>Manage your portfolio projects</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAddProject}>
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
            <Button onClick={handleSaveAll}>
              <Save className="mr-2 h-4 w-4" />
              Save All
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {editingProject ? (
          <ProjectForm
            project={editingProject}
            setProject={setEditingProject}
            onSave={handleSaveProject}
            onCancel={handleCancelEdit}
          />
        ) : (
          <div className="space-y-4">
            {localProjects.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No projects yet. Click &quot;Add Project&quot; to get started.
              </p>
            ) : (
              localProjects.map((project) => (
                <div key={project.id} className="border rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold">{project.title || "Untitled Project"}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="secondary">{project.category}</Badge>
                        {project.featured && <Badge>Featured</Badge>}
                        {project.category === "web" && project.live && (
                          <Badge variant="outline" className="gap-1">
                            <ExternalLink className="h-3 w-3" />
                            <a
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="hover:underline"
                            >
                              Live Preview
                            </a>
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditProject(project)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ProjectForm({
  project,
  setProject,
  onSave,
  onCancel,
}: {
  project: Project;
  setProject: (project: Project) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  const [techInput, setTechInput] = useState(project.technologies.join(", "));
  const [imagePreview, setImagePreview] = useState<string | null>(project.image && project.image.startsWith("data:") ? project.image : null);

  const handleTechChange = (value: string) => {
    setTechInput(value);
    setProject({
      ...project,
      technologies: value.split(",").map((t) => t.trim()).filter((t) => t),
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file");
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        setProject({
          ...project,
          image: base64String,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setProject({
      ...project,
      image: "/placeholder-project.jpg",
    });
  };

  return (
    <div className="space-y-4 border rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Edit Project</h3>
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="project-title">Title *</Label>
          <Input
            id="project-title"
            value={project.title}
            onChange={(e) => setProject({ ...project, title: e.target.value })}
            placeholder="Project title"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="project-category">Category *</Label>
          <select
            id="project-category"
            value={project.category}
            onChange={(e) => setProject({ ...project, category: e.target.value as ProjectCategory })}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="web">Web</option>
            <option value="mobile">Mobile</option>
            <option value="data">Data Analytics</option>
            <option value="freelance">Freelance</option>
          </select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="project-description">Description *</Label>
          <Textarea
            id="project-description"
            value={project.description}
            onChange={(e) => setProject({ ...project, description: e.target.value })}
            placeholder="Brief description"
            rows={3}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="project-details">Details</Label>
          <Textarea
            id="project-details"
            value={project.details}
            onChange={(e) => setProject({ ...project, details: e.target.value })}
            placeholder="Detailed description"
            rows={5}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="project-technologies">Technologies (comma-separated)</Label>
          <Input
            id="project-technologies"
            value={techInput}
            onChange={(e) => handleTechChange(e.target.value)}
            placeholder="Next.js, TypeScript, Tailwind"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="project-type">Type</Label>
          <Input
            id="project-type"
            value={project.type}
            onChange={(e) => setProject({ ...project, type: e.target.value })}
            placeholder="e.g., Freelance Project"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="project-period">Period</Label>
          <Input
            id="project-period"
            value={project.period}
            onChange={(e) => setProject({ ...project, period: e.target.value })}
            placeholder="e.g., June 2025"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="project-team">Team Size</Label>
          <Input
            id="project-team"
            value={project.team}
            onChange={(e) => setProject({ ...project, team: e.target.value })}
            placeholder="e.g., 1"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="project-github">GitHub URL</Label>
          <Input
            id="project-github"
            value={project.github}
            onChange={(e) => setProject({ ...project, github: e.target.value })}
            placeholder="https://github.com/..."
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="project-image">Project Preview Image</Label>
          <div className="space-y-2">
            {imagePreview || (project.image && project.image.startsWith("data:")) ? (
              <div className="relative border rounded-lg p-2">
                <img
                  src={imagePreview || project.image}
                  alt="Preview"
                  className="w-full h-48 object-contain rounded-md"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={handleRemoveImage}
                  className="absolute top-4 right-4"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <ImageIcon className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">No image uploaded</p>
              </div>
            )}
            <div className="flex gap-2">
              <Input
                id="project-image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("project-image")?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Image
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Upload an image to show in the mockup. If both image and live URL are provided, image will be prioritized.
            </p>
          </div>
        </div>

        <div className={`space-y-2 ${project.category === "web" ? "md:col-span-2" : ""}`}>
          <Label htmlFor="project-live" className="flex items-center gap-2">
            Live Preview URL
            {project.category === "web" && (
              <Badge variant="outline" className="text-xs">Web Projects</Badge>
            )}
          </Label>
          <div className="flex gap-2">
            <Input
              id="project-live"
              value={project.live}
              onChange={(e) => setProject({ ...project, live: e.target.value })}
              placeholder="https://tuvo.in"
              className={project.category === "web" ? "flex-1" : ""}
            />
            {project.live && (
              <Button
                variant="outline"
                size="icon"
                asChild
                className="flex-shrink-0"
              >
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open in new tab"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
          {project.category === "web" && project.live && (
            <p className="text-xs text-muted-foreground">
              This URL will be displayed in the project mockup preview if no image is uploaded. Make sure the website allows iframe embedding or a screenshot will be shown instead.
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="project-appstore">App Store URL</Label>
          <Input
            id="project-appstore"
            value={project.appStore || ""}
            onChange={(e) => setProject({ ...project, appStore: e.target.value })}
            placeholder="https://apps.apple.com/..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="project-playstore">Play Store URL</Label>
          <Input
            id="project-playstore"
            value={project.playStore || ""}
            onChange={(e) => setProject({ ...project, playStore: e.target.value })}
            placeholder="https://play.google.com/..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="project-achievement">Achievement</Label>
          <Input
            id="project-achievement"
            value={project.achievement || ""}
            onChange={(e) => setProject({ ...project, achievement: e.target.value || null })}
            placeholder="e.g., Won First Prize"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="project-featured"
              checked={project.featured}
              onChange={(e) => setProject({ ...project, featured: e.target.checked })}
              className="h-4 w-4"
            />
            <Label htmlFor="project-featured">Featured Project</Label>
          </div>
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <Button onClick={onSave} className="flex-1">
          <Save className="mr-2 h-4 w-4" />
          Save Project
        </Button>
        <Button variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
      </div>
    </div>
  );
}

