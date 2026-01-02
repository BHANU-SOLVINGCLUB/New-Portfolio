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
          <Avatar className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32">
            <AvatarImage src="/placeholder-avatar.jpg" alt="Developer" />
            <AvatarFallback>DEV</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge>Full Stack Developer</Badge>
              <Badge>Mobile Developer</Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Hi, I'm John Doe
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6">
              I build beautiful, functional web and mobile applications with modern
              technologies. Passionate about creating exceptional user
              experiences.
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
      <section className="container mx-auto px-4 py-12 sm:py-16 md:py-20 bg-muted/50">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">What I Do</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <Card>
            <CardHeader>
              <Code className="h-8 w-8 mb-2" />
              <CardTitle>Web Development</CardTitle>
              <CardDescription>
                Building responsive and modern web applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Creating beautiful, functional websites using the latest
                technologies and best practices.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Briefcase className="h-8 w-8 mb-2" />
              <CardTitle>Full Stack Solutions</CardTitle>
              <CardDescription>
                End-to-end development from frontend to backend
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Developing complete solutions with robust architecture and
                scalable design.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Mail className="h-8 w-8 mb-2" />
              <CardTitle>Consulting</CardTitle>
              <CardDescription>
                Helping teams build better products
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Providing technical guidance and expertise to help your projects
                succeed.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="container mx-auto px-4 py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
          <div>
            <FolderKanban className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 sm:mb-4 text-primary" />
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">50+</h3>
            <p className="text-sm sm:text-base text-muted-foreground">Projects Completed</p>
          </div>
          <div>
            <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 sm:mb-4 text-primary" />
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">5+</h3>
            <p className="text-sm sm:text-base text-muted-foreground">Years Experience</p>
          </div>
          <div>
            <Users className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 sm:mb-4 text-primary" />
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">30+</h3>
            <p className="text-sm sm:text-base text-muted-foreground">Happy Clients</p>
          </div>
          <div>
            <Award className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 sm:mb-4 text-primary" />
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">100%</h3>
            <p className="text-sm sm:text-base text-muted-foreground">Satisfaction Rate</p>
          </div>
        </div>
      </section>
    </div>
  );
}

