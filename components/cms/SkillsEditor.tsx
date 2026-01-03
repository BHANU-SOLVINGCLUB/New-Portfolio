"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Save, Plus, Trash2 } from "lucide-react";

export interface Skill {
  name: string;
  level: number;
}

export interface SkillsData {
  dataAnalytics: Skill[];
  visualization: Skill[];
  appDev: Skill[];
  database: Skill[];
  tools: Skill[];
}

interface SkillsEditorProps {
  skills: SkillsData;
  onSave: (skills: SkillsData) => void;
}

export function SkillsEditor({ skills, onSave }: SkillsEditorProps) {
  const [localSkills, setLocalSkills] = useState<SkillsData>(skills);

  const handleSave = () => {
    onSave(localSkills);
  };

  const updateSkill = (
    category: keyof SkillsData,
    index: number,
    field: "name" | "level",
    value: string | number
  ) => {
    const updated = [...localSkills[category]];
    updated[index] = { ...updated[index], [field]: value };
    setLocalSkills({ ...localSkills, [category]: updated });
  };

  const addSkill = (category: keyof SkillsData) => {
    setLocalSkills({
      ...localSkills,
      [category]: [...localSkills[category], { name: "", level: 50 }],
    });
  };

  const removeSkill = (category: keyof SkillsData, index: number) => {
    setLocalSkills({
      ...localSkills,
      [category]: localSkills[category].filter((_, i) => i !== index),
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Skills</CardTitle>
            <CardDescription>Edit skills and proficiency levels</CardDescription>
          </div>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(localSkills).map(([category, skillList]) => (
            <div key={category} className="border rounded-lg p-4 space-y-3">
              <h3 className="font-semibold capitalize">{category.replace(/([A-Z])/g, " $1").trim()}</h3>
              <Separator />
              <div className="space-y-3">
                {(skillList as Skill[]).map((skill: Skill, index: number) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Input
                      value={skill.name}
                      onChange={(e) => updateSkill(category as keyof SkillsData, index, "name", e.target.value)}
                      placeholder="Skill name"
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={skill.level}
                      onChange={(e) =>
                        updateSkill(category as keyof SkillsData, index, "level", parseInt(e.target.value) || 0)
                      }
                      placeholder="Level"
                      className="w-24"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeSkill(category as keyof SkillsData, index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addSkill(category as keyof SkillsData)}
                  className="w-full"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Skill
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

