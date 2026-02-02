"use client";

import { HomeEditor, type HomeContent } from "@/components/cms/HomeEditor";
import { getHomeContent, saveHomeContent, defaultHomeContent } from "@/lib/firebase-data";
import { dataPreloader } from "@/lib/data-preloader";
import type { HomeStat, HomeStatIcon } from "@/lib/portfolio-data";
import { useState, useEffect } from "react";

const VALID_ICONS: HomeStatIcon[] = ["folder", "trending-up", "users", "award"];

function normalizeHomeContent(raw: Record<string, unknown>): typeof defaultHomeContent {
  const stats = (Array.isArray(raw.stats)
    ? raw.stats.map((s: Record<string, unknown>) => {
        const iconRaw = s.icon as string;
        const icon: HomeStatIcon = VALID_ICONS.includes(iconRaw as HomeStatIcon) ? (iconRaw as HomeStatIcon) : "folder";
        return { value: typeof s.value === "string" ? s.value : "", label: typeof s.label === "string" ? s.label : "", icon };
      })
    : defaultHomeContent.stats) as HomeStat[];
  return {
    name: typeof raw.name === "string" ? raw.name : defaultHomeContent.name,
    badges: Array.isArray(raw.badges) ? raw.badges.filter((b): b is string => typeof b === "string") : defaultHomeContent.badges,
    description: typeof raw.description === "string" ? raw.description : defaultHomeContent.description,
    stats,
  };
}

export default function CMSHome() {
  const [homeContent, setHomeContent] = useState<typeof defaultHomeContent>(defaultHomeContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set page title
    document.title = "CMS - Home | Bhanu Prakash Chintal";
    
    const loadContent = async () => {
      try {
        // Try to get preloaded data first
        const preloadedData = dataPreloader.getData();
        if (preloadedData.loaded) {
          setHomeContent(normalizeHomeContent(preloadedData.homeContent as Record<string, unknown>));
          setLoading(false);
        } else {
          // Wait for preloader or fetch directly
          const data = await Promise.race([
            dataPreloader.preloadAll().then(d => d.homeContent),
            getHomeContent()
          ]);
          setHomeContent(normalizeHomeContent(data as Record<string, unknown>));
          setLoading(false);
        }
      } catch (error) {
        console.error("Error loading home content:", error);
        setLoading(false);
      }
    };
    loadContent();
  }, []);

  const handleSaveHome = async (content: HomeContent) => {
    try {
      const normalized = normalizeHomeContent(content as unknown as Record<string, unknown>);
      await saveHomeContent(normalized);
      setHomeContent(normalized);
      alert("Home content saved successfully to Firebase! Changes will reflect on portfolio pages.");
    } catch (error) {
      console.error("Error saving home content:", error);
      alert("Error saving home content. Please check your Firebase configuration.");
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground">Loading home content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Home Page Content</h1>
        <p className="text-muted-foreground">Edit your home page content (Firebase)</p>
      </div>
      <HomeEditor content={homeContent} onSave={handleSaveHome} />
    </div>
  );
}

