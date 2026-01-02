import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ExternalLink, Github, FolderKanban, Eye } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with payment integration, user authentication, and admin dashboard.",
    technologies: ["Next.js", "TypeScript", "Stripe", "Prisma"],
    image: "/placeholder-project.jpg",
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team collaboration features.",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
    image: "/placeholder-project.jpg",
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    id: 3,
    title: "Social Media Dashboard",
    description: "Analytics dashboard for social media metrics with data visualization and reporting features.",
    technologies: ["Vue.js", "Python", "Django", "Chart.js"],
    image: "/placeholder-project.jpg",
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    id: 4,
    title: "Weather App",
    description: "Beautiful weather application with location-based forecasts and interactive maps.",
    technologies: ["React", "OpenWeather API", "Tailwind CSS"],
    image: "/placeholder-project.jpg",
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    id: 5,
    title: "Blog Platform",
    description: "Modern blog platform with markdown support, syntax highlighting, and SEO optimization.",
    technologies: ["Next.js", "MDX", "Tailwind CSS", "Vercel"],
    image: "/placeholder-project.jpg",
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    id: 6,
    title: "Portfolio Website",
    description: "A responsive portfolio website showcasing projects and skills with smooth animations.",
    technologies: ["Next.js", "Framer Motion", "TypeScript"],
    image: "/placeholder-project.jpg",
    github: "https://github.com",
    live: "https://example.com",
  },
];

export default function Projects() {
  return (
    <div className="min-h-screen container mx-auto px-4 py-12 sm:py-16 md:py-20">
      <div className="text-center mb-8 sm:mb-12">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
          <FolderKanban className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
          <h1 className="text-3xl sm:text-4xl font-bold">My Projects</h1>
        </div>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
          A collection of projects I&apos;ve built and contributed to
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex-1 w-full sm:w-auto">
                    <Eye className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">View Details</span>
                    <span className="sm:hidden">Details</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[90vw] sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl">{project.title}</DialogTitle>
                    <DialogDescription className="text-sm sm:text-base">{project.description}</DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <h4 className="font-semibold mb-2 text-sm sm:text-base">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} className="text-xs sm:text-sm">{tech}</Badge>
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      This project demonstrates my skills in building scalable
                      web applications with modern technologies. It includes
                      features like user authentication, data management, and
                      responsive design.
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  className="flex-1 sm:flex-initial sm:h-10 sm:w-10 sm:px-0" 
                  asChild
                >
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center gap-2 sm:gap-0 w-full sm:w-auto"
                  >
                    <Github className="h-4 w-4 flex-shrink-0" />
                    <span className="sm:hidden font-medium">GitHub</span>
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 sm:flex-initial sm:h-10 sm:w-10 sm:px-0" 
                  asChild
                >
                  <a 
                    href={project.live} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center gap-2 sm:gap-0 w-full sm:w-auto"
                  >
                    <ExternalLink className="h-4 w-4 flex-shrink-0" />
                    <span className="sm:hidden font-medium">Live</span>
                  </a>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

