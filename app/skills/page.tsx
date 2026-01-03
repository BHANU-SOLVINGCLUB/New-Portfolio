"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Palette, Server, Database, Wrench, Sparkles, Code } from "lucide-react";
import { getSkills } from "@/lib/portfolio-data";

const SkillCard = ({ name, level }: { name: string; level: number }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <span className="text-sm font-medium">{name}</span>
      <span className="text-sm text-muted-foreground">{level}%</span>
    </div>
    <Progress value={level} />
  </div>
);

export default function Skills() {
  const [skills, setSkills] = useState({
    dataAnalytics: [],
    visualization: [],
    appDev: [],
    database: [],
    tools: [],
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark as client-side rendered
    setIsClient(true);
    
    const loadData = () => {
      setSkills(getSkills());
    };

    // Load data on mount
    loadData();

    // Listen for CMS updates
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.type === "skills") {
        loadData();
      }
    };
    
    // Also listen for storage events (works across tabs)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "cms_skills") {
        loadData();
      }
    };
    
    window.addEventListener("cms-data-updated", handleUpdate);
    window.addEventListener("storage", handleStorage);
    
    return () => {
      window.removeEventListener("cms-data-updated", handleUpdate);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);
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
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
            <Code className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            <h1 className="text-3xl sm:text-4xl font-bold">Skills & Expertise</h1>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
            Technologies and tools I work with
          </p>
        </div>

        <Tabs defaultValue="data" className="mb-6 sm:mb-8">
          <TabsList className="grid w-full grid-cols-5 h-auto">
            <TabsTrigger value="data" className="text-xs sm:text-sm">
              <Database className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Data</span>
              <span className="sm:hidden">Data</span>
            </TabsTrigger>
            <TabsTrigger value="visualization" className="text-xs sm:text-sm">
              <Palette className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Viz</span>
              <span className="sm:hidden">Viz</span>
            </TabsTrigger>
            <TabsTrigger value="appdev" className="text-xs sm:text-sm">
              <Code className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">App Dev</span>
              <span className="sm:hidden">App</span>
            </TabsTrigger>
            <TabsTrigger value="database" className="text-xs sm:text-sm">
              <Database className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Database</span>
              <span className="sm:hidden">DB</span>
            </TabsTrigger>
            <TabsTrigger value="tools" className="text-xs sm:text-sm">
              <Wrench className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Tools</span>
              <span className="sm:hidden">Tools</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="data" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Data & Analytics</CardTitle>
                <CardDescription>
                  Python-based data analysis and processing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {skills.dataAnalytics.map((skill) => (
                  <SkillCard key={skill.name} name={skill.name} level={skill.level} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="visualization" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Visualization Tools</CardTitle>
                <CardDescription>
                  Interactive dashboards and data visualization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {skills.visualization.map((skill) => (
                  <SkillCard key={skill.name} name={skill.name} level={skill.level} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appdev" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>App & Backend Development</CardTitle>
                <CardDescription>
                  Mobile and web application development
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {skills.appDev.map((skill) => (
                  <SkillCard key={skill.name} name={skill.name} level={skill.level} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="database" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Database & ORM</CardTitle>
                <CardDescription>
                  Database management and query optimization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {skills.database.map((skill) => (
                  <SkillCard key={skill.name} name={skill.name} level={skill.level} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tools" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Tools & DevOps</CardTitle>
                <CardDescription>
                  Development tools and deployment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {skills.tools.map((skill) => (
                  <SkillCard key={skill.name} name={skill.name} level={skill.level} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Separator className="my-8" />

        {/* Additional Skills */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Additional Skills
            </CardTitle>
            <CardDescription>Other technologies and competencies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge>Modular Architecture</Badge>
              <Badge>Clean Code</Badge>
              <Badge>Performance Optimization</Badge>
              <Badge>Debugging</Badge>
              <Badge>Automation</Badge>
              <Badge>API Documentation</Badge>
              <Badge>End-to-end Development</Badge>
              <Badge>Cross-team Collaboration</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

