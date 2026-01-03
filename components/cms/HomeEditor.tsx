"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";

interface HomeContent {
  name: string;
  badges: string[];
  description: string;
}

interface HomeEditorProps {
  content: HomeContent;
  onSave: (content: HomeContent) => void;
}

export function HomeEditor({ content, onSave }: HomeEditorProps) {
  const [localContent, setLocalContent] = useState<HomeContent>(content);

  const handleSave = () => {
    onSave(localContent);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Home Page</CardTitle>
            <CardDescription>Edit home page content</CardDescription>
          </div>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="home-name">Name</Label>
          <Input
            id="home-name"
            value={localContent.name}
            onChange={(e) => setLocalContent({ ...localContent, name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="home-badges">Badges (comma-separated)</Label>
          <Input
            id="home-badges"
            value={localContent.badges.join(", ")}
            onChange={(e) =>
              setLocalContent({
                ...localContent,
                badges: e.target.value.split(",").map((b) => b.trim()),
              })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="home-description">Description</Label>
          <Textarea
            id="home-description"
            value={localContent.description}
            onChange={(e) => setLocalContent({ ...localContent, description: e.target.value })}
            rows={5}
          />
        </div>
      </CardContent>
    </Card>
  );
}

