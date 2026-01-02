import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, Code, Briefcase, Mail, FolderKanban, Users, Award, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16 md:py-20">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <Avatar className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 ring-2 ring-border">
            <AvatarImage src="/avatar.svg" alt="Bhanu Prakash Chintal" />
            <AvatarFallback className="text-lg sm:text-xl md:text-2xl">BPC</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge>Data Analyst</Badge>
              <Badge>Software Engineer</Badge>
              <Badge>Flutter Developer</Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Hi, I&apos;m Bhanu Prakash Chintal
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6">
              Data Analyst and Software Engineer with hands-on experience in Python-based data analytics, 
              visualization, and automation, along with strong Flutter and full-stack development skills. 
              I enjoy building scalable applications, extracting insights from data, and solving real-world problems using technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="w-full sm:w-auto">
                <Link href="/projects">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full sm:w-auto">
                <Link href="/contact">
                  Get In Touch
                  <Mail className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16 md:py-20 border-t border-border">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">What I Do</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Specialized in data analytics, mobile development, and full-stack solutions
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="group hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Data Analytics</CardTitle>
              <CardDescription>
                Python-based data analysis, visualization, and automation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Extracting insights from data, building KPI dashboards, and creating 
                interactive visualizations using Python, pandas, and Streamlit.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Mobile Development</CardTitle>
              <CardDescription>
                Building scalable Flutter applications with clean architecture
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Developing cross-platform mobile apps using Flutter, Dart, and 
                implementing modular architecture for scalable solutions.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Full Stack Development</CardTitle>
              <CardDescription>
                End-to-end web applications with modern technologies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Building complete web solutions using Next.js, TypeScript, and 
                integrating with Firebase, Supabase, and REST APIs.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="container mx-auto px-4 py-12 sm:py-16 md:py-20 border-t border-border">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center mb-4">
              <FolderKanban className="h-6 w-6 text-primary" />
            </div>
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">3+</div>
            <p className="text-sm text-muted-foreground">Years Experience</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">10+</div>
            <p className="text-sm text-muted-foreground">Projects Completed</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">2</div>
            <p className="text-sm text-muted-foreground">Companies Worked</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center mb-4">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">1</div>
            <p className="text-sm text-muted-foreground">Research Paper</p>
          </div>
        </div>
      </section>
    </div>
  );
}

