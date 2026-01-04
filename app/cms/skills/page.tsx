"use client";

import { SkillsEditor } from "@/components/cms/SkillsEditor";
import { getSkills, saveSkills, defaultSkills } from "@/lib/firebase-data";
import { dataPreloader } from "@/lib/data-preloader";
import { useState, useEffect } from "react";

export default function CMSSkills() {
  const [skills, setSkills] = useState(defaultSkills);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set page title
    document.title = "CMS - Skills | Bhanu Prakash Chintal";
    
    const loadSkills = async () => {
      try {
        // Try to get preloaded data first
        const preloadedData = dataPreloader.getData();
        if (preloadedData.loaded) {
          setSkills(preloadedData.skills);
          setLoading(false);
        } else {
          // Wait for preloader or fetch directly
          const data = await Promise.race([
            dataPreloader.preloadAll().then(d => d.skills),
            getSkills()
          ]);
          setSkills(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error loading skills:", error);
        setLoading(false);
      }
    };
    loadSkills();
  }, []);

  const handleSaveSkills = async (updatedSkills: typeof defaultSkills) => {
    try {
      await saveSkills(updatedSkills);
      setSkills(updatedSkills);
      alert("Skills saved successfully to Firebase! Changes will reflect on portfolio pages.");
    } catch (error) {
      console.error("Error saving skills:", error);
      alert("Error saving skills. Please check your Firebase configuration.");
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground">Loading skills...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Skills Management</h1>
        <p className="text-muted-foreground">Manage your skills and proficiency levels (Firebase)</p>
      </div>
      <SkillsEditor skills={skills} onSave={handleSaveSkills} />
    </div>
  );
}

