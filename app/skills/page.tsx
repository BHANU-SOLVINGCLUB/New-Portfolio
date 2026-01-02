import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Palette, Server, Database, Wrench, Sparkles, Code } from "lucide-react";

const frontendSkills = [
  { name: "React", level: 90 },
  { name: "Next.js", level: 85 },
  { name: "TypeScript", level: 88 },
  { name: "JavaScript", level: 92 },
  { name: "HTML/CSS", level: 95 },
  { name: "Tailwind CSS", level: 90 },
];

const backendSkills = [
  { name: "Node.js", level: 85 },
  { name: "Python", level: 80 },
  { name: "Express.js", level: 88 },
  { name: "Django", level: 75 },
  { name: "REST APIs", level: 90 },
  { name: "GraphQL", level: 70 },
];

const databaseSkills = [
  { name: "PostgreSQL", level: 85 },
  { name: "MongoDB", level: 80 },
  { name: "MySQL", level: 75 },
  { name: "Redis", level: 70 },
  { name: "Prisma", level: 82 },
];

const toolsSkills = [
  { name: "Git", level: 90 },
  { name: "Docker", level: 75 },
  { name: "AWS", level: 70 },
  { name: "CI/CD", level: 80 },
  { name: "Linux", level: 85 },
];

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

        <Tabs defaultValue="frontend" className="mb-6 sm:mb-8">
          <TabsList className="grid w-full grid-cols-4 h-auto">
            <TabsTrigger value="frontend" className="text-xs sm:text-sm">
              <Palette className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Frontend</span>
              <span className="sm:hidden">FE</span>
            </TabsTrigger>
            <TabsTrigger value="backend" className="text-xs sm:text-sm">
              <Server className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Backend</span>
              <span className="sm:hidden">BE</span>
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

          <TabsContent value="frontend" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Frontend Technologies</CardTitle>
                <CardDescription>
                  Modern frontend frameworks and libraries
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {frontendSkills.map((skill) => (
                  <SkillCard key={skill.name} name={skill.name} level={skill.level} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="backend" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Backend Technologies</CardTitle>
                <CardDescription>
                  Server-side development and APIs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {backendSkills.map((skill) => (
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
                {databaseSkills.map((skill) => (
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
                {toolsSkills.map((skill) => (
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
              <Badge>UI/UX Design</Badge>
              <Badge>Responsive Design</Badge>
              <Badge>Performance Optimization</Badge>
              <Badge>SEO</Badge>
              <Badge>Testing</Badge>
              <Badge>Agile/Scrum</Badge>
              <Badge>Code Review</Badge>
              <Badge>Technical Writing</Badge>
              <Badge>Mentoring</Badge>
              <Badge>Project Management</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

