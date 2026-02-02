"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Plus, Trash2 } from "lucide-react";
import type { HomeStat, HomeStatIcon } from "@/lib/portfolio-data";

const STAT_ICONS: { value: HomeStatIcon; label: string }[] = [
  { value: "folder", label: "Folder (Years Experience)" },
  { value: "trending-up", label: "Trending Up (Projects)" },
  { value: "users", label: "Users (Companies)" },
  { value: "award", label: "Award (Research / Achievements)" },
];

/** Accepts icon as string so Firestore-loaded content is assignable. */
export interface HomeContent {
  name: string;
  badges: string[];
  description: string;
  stats?: Array<{ value: string; label: string; icon: string }>;
}

interface HomeEditorProps {
  content: HomeContent;
  onSave: (content: HomeContent) => void;
}

export function HomeEditor({ content, onSave }: HomeEditorProps) {
  const [localContent, setLocalContent] = useState<HomeContent>({
    ...content,
    stats: content.stats?.length ? content.stats : [
      { value: "3+", label: "Years Experience", icon: "folder" as HomeStatIcon },
      { value: "10+", label: "Projects Completed", icon: "trending-up" as HomeStatIcon },
      { value: "2", label: "Companies Worked", icon: "users" as HomeStatIcon },
      { value: "1", label: "Research Paper", icon: "award" as HomeStatIcon },
    ],
  });

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

        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Quick Stats (homepage counters)</Label>
              <CardDescription>Edit the numbers and labels shown in the stats section.</CardDescription>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                setLocalContent({
                  ...localContent,
                  stats: [...(localContent.stats ?? []), { value: "", label: "", icon: "folder" }],
                })
              }
            >
              <Plus className="mr-2 h-4 w-4" />
              Add stat
            </Button>
          </div>
          <div className="space-y-3">
            {(localContent.stats ?? []).map((stat, index) => (
              <div key={index} className="flex flex-wrap items-end gap-3 rounded-lg border p-3">
                <div className="flex-1 min-w-[80px] space-y-1">
                  <Label className="text-xs">Value</Label>
                  <Input
                    placeholder="e.g. 3+"
                    value={stat.value}
                    onChange={(e) => {
                      const next = [...(localContent.stats ?? [])];
                      next[index] = { ...next[index], value: e.target.value };
                      setLocalContent({ ...localContent, stats: next });
                    }}
                  />
                </div>
                <div className="flex-[2] min-w-[120px] space-y-1">
                  <Label className="text-xs">Label</Label>
                  <Input
                    placeholder="e.g. Years Experience"
                    value={stat.label}
                    onChange={(e) => {
                      const next = [...(localContent.stats ?? [])];
                      next[index] = { ...next[index], label: e.target.value };
                      setLocalContent({ ...localContent, stats: next });
                    }}
                  />
                </div>
                <div className="min-w-[180px] space-y-1">
                  <Label className="text-xs">Icon</Label>
                  <select
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                    value={stat.icon}
                    onChange={(e) => {
                      const next = [...(localContent.stats ?? [])];
                      next[index] = { ...next[index], icon: e.target.value };
                      setLocalContent({ ...localContent, stats: next });
                    }}
                  >
                    {STAT_ICONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="shrink-0 text-destructive hover:text-destructive"
                  onClick={() =>
                    setLocalContent({
                      ...localContent,
                      stats: (localContent.stats ?? []).filter((_, i) => i !== index),
                    })
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

