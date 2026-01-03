"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";

interface AboutContent {
  name: string;
  title: string;
  bio: string;
  skills: string[];
}

interface AboutEditorProps {
  content: AboutContent;
  onSave: (content: AboutContent) => void;
}

export function AboutEditor({ content, onSave }: AboutEditorProps) {
  const [localContent, setLocalContent] = useState<AboutContent>(content);

  const handleSave = () => {
    onSave(localContent);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>About Page</CardTitle>
            <CardDescription>Edit about page content</CardDescription>
          </div>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="about-name">Name</Label>
          <Input
            id="about-name"
            value={localContent.name}
            onChange={(e) => setLocalContent({ ...localContent, name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="about-title">Title</Label>
          <Input
            id="about-title"
            value={localContent.title}
            onChange={(e) => setLocalContent({ ...localContent, title: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="about-bio">Bio</Label>
          <Textarea
            id="about-bio"
            value={localContent.bio}
            onChange={(e) => setLocalContent({ ...localContent, bio: e.target.value })}
            rows={5}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="about-skills">Skills (comma-separated)</Label>
          <Input
            id="about-skills"
            value={localContent.skills.join(", ")}
            onChange={(e) =>
              setLocalContent({
                ...localContent,
                skills: e.target.value.split(",").map((s) => s.trim()),
              })
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}

