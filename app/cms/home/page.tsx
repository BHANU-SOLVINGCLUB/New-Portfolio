"use client";

import { HomeEditor } from "@/components/cms/HomeEditor";
import { getHomeContent, saveHomeContent, defaultHomeContent } from "@/lib/firebase-data";
import { dataPreloader } from "@/lib/data-preloader";
import { useState, useEffect } from "react";

export default function CMSHome() {
  const [homeContent, setHomeContent] = useState(defaultHomeContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set page title
    document.title = "CMS - Home | Bhanu Prakash Chintal";
    
    const loadContent = async () => {
      try {
        // Try to get preloaded data first
        const preloadedData = dataPreloader.getData();
        if (preloadedData.loaded) {
          setHomeContent(preloadedData.homeContent);
          setLoading(false);
        } else {
          // Wait for preloader or fetch directly
          const data = await Promise.race([
            dataPreloader.preloadAll().then(d => d.homeContent),
            getHomeContent()
          ]);
          setHomeContent(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error loading home content:", error);
        setLoading(false);
      }
    };
    loadContent();
  }, []);

  const handleSaveHome = async (content: typeof defaultHomeContent) => {
    try {
      await saveHomeContent(content);
      setHomeContent(content);
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

