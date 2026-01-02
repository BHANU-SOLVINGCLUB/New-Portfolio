import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Briefcase, GraduationCap, Trophy, Building2, Calendar, Code2, Mic, FileText, User } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen container mx-auto px-4 py-12 sm:py-16 md:py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
            <User className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            <h1 className="text-3xl sm:text-4xl font-bold">About Me</h1>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
            Get to know more about my journey and experience
          </p>
        </div>

        {/* Profile Card */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
              <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
                <AvatarImage src="/placeholder-avatar.jpg" alt="Developer" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <CardTitle className="text-2xl sm:text-3xl mb-2">John Doe</CardTitle>
                <CardDescription className="text-sm sm:text-base mb-4">
                  Full Stack Developer & UI/UX Enthusiast
                </CardDescription>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  <Badge>React</Badge>
                  <Badge>Next.js</Badge>
                  <Badge>TypeScript</Badge>
                  <Badge>Node.js</Badge>
                  <Badge>Python</Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              I&apos;m a passionate full-stack developer with over 5 years of
              experience building web applications. I specialize in creating
              modern, responsive, and user-friendly interfaces while ensuring
              robust backend architecture. My journey in tech started with a
              curiosity about how websites work, and it has evolved into a
              career dedicated to crafting exceptional digital experiences.
            </p>
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <Tabs defaultValue="experience" className="mb-6 sm:mb-8">
          <TabsList className="grid w-full grid-cols-3 h-auto">
            <TabsTrigger value="experience" className="text-xs sm:text-sm">
              <Briefcase className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Experience</span>
              <span className="sm:hidden">Exp</span>
            </TabsTrigger>
            <TabsTrigger value="education" className="text-xs sm:text-sm">
              <GraduationCap className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Education</span>
              <span className="sm:hidden">Edu</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="text-xs sm:text-sm">
              <Trophy className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Achievements</span>
              <span className="sm:hidden">Ach</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="experience" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Work Experience</CardTitle>
                <CardDescription>
                  My professional journey in tech
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0 mb-2">
                    <div className="flex items-start gap-3">
                      <Building2 className="h-4 w-4 sm:h-5 sm:w-5 mt-1 text-primary flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-base sm:text-lg">Senior Full Stack Developer</h3>
                        <p className="text-sm sm:text-base text-muted-foreground">Tech Company Inc.</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="flex items-center gap-1 w-fit text-xs sm:text-sm">
                      <Calendar className="h-3 w-3" />
                      2021 - Present
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Leading development of scalable web applications using
                    React, Next.js, and Node.js. Mentoring junior developers and
                    implementing best practices.
                  </p>
                </div>
                <Separator />
                <div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0 mb-2">
                    <div className="flex items-start gap-3">
                      <Building2 className="h-4 w-4 sm:h-5 sm:w-5 mt-1 text-primary flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-base sm:text-lg">Full Stack Developer</h3>
                        <p className="text-sm sm:text-base text-muted-foreground">StartupXYZ</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="flex items-center gap-1 w-fit text-xs sm:text-sm">
                      <Calendar className="h-3 w-3" />
                      2019 - 2021
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Developed and maintained multiple client projects. Worked
                    with various technologies including Python, Django, and
                    React.
                  </p>
                </div>
                <Separator />
                <div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0 mb-2">
                    <div className="flex items-start gap-3">
                      <Building2 className="h-4 w-4 sm:h-5 sm:w-5 mt-1 text-primary flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-base sm:text-lg">Junior Developer</h3>
                        <p className="text-sm sm:text-base text-muted-foreground">Web Agency</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="flex items-center gap-1 w-fit text-xs sm:text-sm">
                      <Calendar className="h-3 w-3" />
                      2018 - 2019
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Started my career building websites and learning modern web
                    development practices.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
                <CardDescription>Academic background</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0 mb-2">
                    <div className="flex items-start gap-3">
                      <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 mt-1 text-primary flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-base sm:text-lg">Bachelor of Science in Computer Science</h3>
                        <p className="text-sm sm:text-base text-muted-foreground">University Name</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="flex items-center gap-1 w-fit text-xs sm:text-sm">
                      <Calendar className="h-3 w-3" />
                      2014 - 2018
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Focused on software engineering, algorithms, and web
                    development. Graduated with honors.
                  </p>
                </div>
                <Separator />
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">Certifications</h3>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Badge>AWS Certified Developer</Badge>
                    <Badge>React Advanced Patterns</Badge>
                    <Badge>Node.js Best Practices</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
                <CardDescription>Notable accomplishments</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="flex items-center gap-2">
                      <Code2 className="h-4 w-4 text-primary" />
                      Open Source Contributor
                    </AccordionTrigger>
                    <AccordionContent>
                      Contributed to multiple open-source projects with over
                      1000+ stars combined. Maintained several popular npm
                      packages.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="flex items-center gap-2">
                      <Mic className="h-4 w-4 text-primary" />
                      Tech Speaker
                    </AccordionTrigger>
                    <AccordionContent>
                      Spoke at 5+ tech conferences and meetups about modern web
                      development practices and React best practices.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      Published Articles
                    </AccordionTrigger>
                    <AccordionContent>
                      Written 20+ technical articles on Medium and Dev.to with
                      over 50k total views, sharing knowledge about web
                      development.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

