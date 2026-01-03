import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, GraduationCap, Trophy, Building2, Calendar, Code2, FileText, User } from "lucide-react";

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
        <Card className="mb-6 sm:mb-8 border-border">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
              <Avatar className="h-20 w-20 sm:h-24 sm:w-24 ring-2 ring-border">
                <AvatarImage src="/avatar.svg" alt="Bhanu Prakash Chintal" />
                <AvatarFallback className="text-base sm:text-lg">BPC</AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left flex-1">
                <CardTitle className="text-2xl sm:text-3xl mb-2">Bhanu Prakash Chintal</CardTitle>
                <CardDescription className="text-sm sm:text-base mb-4">
                  Data Analyst | Software Engineer | Flutter Developer
                </CardDescription>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  <Badge variant="secondary">Python</Badge>
                  <Badge variant="secondary">Flutter</Badge>
                  <Badge variant="secondary">Next.js</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">Data Analytics</Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Data Analyst and Software Engineer with hands-on experience in Python-based data analytics, 
              visualization, and automation, along with strong Flutter and full-stack development skills. 
              Experienced in end-to-end product development, clean architecture, and cross-team collaboration.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I enjoy building scalable applications, extracting insights from data, and solving real-world 
              problems using technology.
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
                        <h3 className="font-semibold text-base sm:text-lg">Flutter Developer (SDE)</h3>
                        <p className="text-sm sm:text-base text-muted-foreground">Sas Estetica Solutions Pvt. Ltd.</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="flex items-center gap-1 w-fit text-xs sm:text-sm">
                      <Calendar className="h-3 w-3" />
                      Oct 2025 – Present
                    </Badge>
                  </div>
                  <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                    <li>Building and maintaining a SaaS mobile app using Flutter, Riverpod, and REST APIs</li>
                    <li>Implemented modular architecture and clean navigation for scalable development</li>
                    <li>Managed internal app testing and deployment workflows</li>
                    <li>Improved UI/UX with smooth animations, loading states, and feedback</li>
                    <li>Created and maintained API documentation in Notion</li>
                  </ul>
                </div>
                <Separator />
                <div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0 mb-2">
                    <div className="flex items-start gap-3">
                      <Building2 className="h-4 w-4 sm:h-5 sm:w-5 mt-1 text-primary flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-base sm:text-lg">Flutter Developer Intern (SDE)</h3>
                        <p className="text-sm sm:text-base text-muted-foreground">CyberMyte Technology Solutions</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="flex items-center gap-1 w-fit text-xs sm:text-sm">
                      <Calendar className="h-3 w-3" />
                      Oct 2024 – Apr 2025
                    </Badge>
                  </div>
                  <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                    <li>Developed and optimized a Flutter IoT application</li>
                    <li>Implemented authentication and Firebase integration</li>
                    <li>Built metrics dashboards with charts</li>
                    <li>Improved backend logic and overall app performance</li>
                    <li>Worked extensively with Firestore and Realtime Database</li>
                  </ul>
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
                        <h3 className="font-semibold text-base sm:text-lg">Bachelor of Technology – Information Technology</h3>
                        <p className="text-sm sm:text-base text-muted-foreground">Anurag University</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="flex items-center gap-1 w-fit text-xs sm:text-sm">
                      <Calendar className="h-3 w-3" />
                      Sep 2021 – Apr 2025
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <strong>CGPA:</strong> 8.22 / 10
                  </p>
                </div>
                <Separator />
                <div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0 mb-2">
                    <div className="flex items-start gap-3">
                      <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 mt-1 text-primary flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-base sm:text-lg">Intermediate – MPC</h3>
                        <p className="text-sm sm:text-base text-muted-foreground">Sri Chaitanya Junior Kalasala (TSBIE)</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="flex items-center gap-1 w-fit text-xs sm:text-sm">
                      <Calendar className="h-3 w-3" />
                      Jun 2019 – Mar 2021
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <strong>Percentage:</strong> 91.8%
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold text-lg mb-4">Certifications</h3>
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="secondary" className="px-4 py-2 text-sm font-medium rounded-full">
                      CISCO NetAcad – Python 1 & 2
                    </Badge>
                    <Badge variant="secondary" className="px-4 py-2 text-sm font-medium rounded-full">
                      AWS Academy Graduate – Cloud Foundations
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr">
              {/* Scholarships & Awards - Large Card */}
              <Card className="md:col-span-2 group hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Scholarships & Awards</CardTitle>
                  <CardDescription>Recognition for academic excellence</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Telangana State Post Matric Scholarship (TS EAMCET) – 4 years</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>First Prize – Heritage Hues Project, University Expo (2024)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Leadership - Medium Card */}
              <Card className="md:col-span-2 lg:col-span-2 group hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                    <Code2 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Leadership & Community</CardTitle>
                  <CardDescription>Active involvement in tech communities</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Led CodeChef Chapter at university</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Technical Team Member – GeeksforGeeks Student Club</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Organizer – iTechnoz Technical Club events & hackathons</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Research Publication - Large Card */}
              <Card className="md:col-span-2 lg:col-span-4 group hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>Research Publication</CardTitle>
                      <CardDescription>Published research work</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-base mb-1">
                        Decentralized Cloud Storage using Blockchain & IPFS
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Published at Anurag University (Apr 2025)
                      </p>
                      <a 
                        href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5142864" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                      >
                        View Published Paper
                        <FileText className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

