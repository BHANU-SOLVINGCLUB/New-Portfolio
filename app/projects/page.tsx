import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ExternalLink, Github, FolderKanban, Eye } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "TUVO – Ticket Booking Platform",
    description: "Full-stack Next.js 15 ticket booking platform with secure PayU payments, PDF ticket generation, and role-based admin dashboard.",
    technologies: ["Next.js", "TypeScript", "Tailwind", "Radix UI", "Supabase", "Vercel"],
    image: "/placeholder-project.jpg",
    github: "",
    live: "https://www.tuvo.in/",
    type: "Freelance Project",
    period: "June 2025",
    details: "Built a full-stack ticket booking platform with secure PayU payments and server verification. Implemented PDF ticket generation with QR codes and automated email receipts. Developed a comprehensive role-based admin dashboard for managing events and bookings."
  },
  {
    id: 2,
    title: "Data Analytics & Visualization Studio",
    description: "Streamlit-based analytics platform for CSV/XLSX datasets with automatic schema detection, interactive dashboards, and KPI visualization.",
    technologies: ["Python", "Streamlit", "pandas", "Plotly", "NumPy"],
    image: "/placeholder-project.jpg",
    github: "https://github.com/JadhavMeghana/Data-Analytics---Visualization-Studio",
    live: "https://dav-studio.streamlit.app/",
    type: "Personal Project",
    period: "Aug 2025",
    details: "Built a comprehensive Streamlit-based analytics platform that automatically detects schemas and column mappings. Delivers end-to-end data analysis including trends, distributions, and outlier detection. Features interactive dashboards with KPIs and advanced filtering capabilities."
  },
  {
    id: 3,
    title: "Travel Together",
    description: "Smart travel app with AI-powered itinerary planning, real-time geolocation navigation, and intuitive UI with admin panel.",
    technologies: ["Flutter", "Dart", "Firebase", "Firestore", "AI Integration"],
    image: "/placeholder-project.jpg",
    github: "https://github.com/BhanuPrakashChintal/TravelTogether",
    live: "",
    type: "Freelancing Project",
    period: "May 2024 – Jun 2024",
    details: "Developed a smart travel application featuring AI-powered itinerary planning and real-time geolocation navigation. Designed an intuitive user interface with a comprehensive admin panel. Utilized Firebase for secure backend and efficient data handling."
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

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="flex flex-col group hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <CardTitle className="group-hover:text-primary transition-colors">{project.title}</CardTitle>
              </div>
              <CardDescription className="line-clamp-2">{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex-1 sm:flex-initial">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[90vw] sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl">{project.title}</DialogTitle>
                    <DialogDescription className="text-sm sm:text-base">{project.description}</DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.type && <Badge variant="secondary" className="text-xs sm:text-sm">{project.type}</Badge>}
                      {project.period && <Badge variant="outline" className="text-xs sm:text-sm">{project.period}</Badge>}
                    </div>
                    <h4 className="font-semibold mb-2 text-sm sm:text-base">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} className="text-xs sm:text-sm">{tech}</Badge>
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {project.details || project.description}
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
              <div className="flex gap-2">
                {project.github && (
                  <Button 
                    variant="outline" 
                    size="icon"
                    asChild
                  >
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                {project.live && (
                  <Button 
                    variant="outline" 
                    size="icon"
                    asChild
                  >
                    <a 
                      href={project.live} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

