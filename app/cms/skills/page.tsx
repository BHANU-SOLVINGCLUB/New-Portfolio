"use client";

import { SkillsEditor } from "@/components/cms/SkillsEditor";
import { getSkills, defaultSkills } from "@/lib/portfolio-data";
import { useState, useEffect } from "react";

export default function CMSSkills() {
  const [skills, setSkills] = useState(defaultSkills);

  useEffect(() => {
    setSkills(getSkills());
  }, []);

  const handleSaveSkills = (updatedSkills: typeof defaultSkills) => {
    setSkills(updatedSkills);
    const data = JSON.stringify(updatedSkills);
    localStorage.setItem("cms_skills", data);
    localStorage.setItem("cms_skills_updated", Date.now().toString());
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("cms-data-updated", { detail: { type: "skills" } }));
      localStorage.setItem("cms_trigger", Date.now().toString());
      localStorage.removeItem("cms_trigger");
    }
    alert("Skills saved successfully! Changes will reflect on portfolio pages.");
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Skills Management</h1>
        <p className="text-muted-foreground">Manage your skills and proficiency levels</p>
      </div>
      <SkillsEditor skills={skills} onSave={handleSaveSkills} />
    </div>
  );
}

