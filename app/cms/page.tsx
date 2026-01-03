"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, User, FolderOpen, Code } from "lucide-react";
import Link from "next/link";

export default function CMSDashboard() {
  const sections = [
    {
      href: "/cms/home",
      title: "Home Page",
      description: "Edit home page content including name, badges, and description",
      icon: Home,
    },
    {
      href: "/cms/about",
      title: "About Page",
      description: "Manage about page content including bio, title, and skills",
      icon: User,
    },
    {
      href: "/cms/projects",
      title: "Projects",
      description: "Add, edit, and delete portfolio projects",
      icon: FolderOpen,
    },
    {
      href: "/cms/skills",
      title: "Skills",
      description: "Manage skills and proficiency levels across categories",
      icon: Code,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Content Management System</h1>
        <p className="text-muted-foreground">Manage your portfolio content</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Link key={section.href} href={section.href}>
              <Card className="group hover:border-primary/50 transition-colors h-full">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {section.title}
                  </CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
