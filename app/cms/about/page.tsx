"use client";

import { AboutEditor } from "@/components/cms/AboutEditor";
import { getAboutContent, saveAboutContent, defaultAboutContent } from "@/lib/firebase-data";
import { dataPreloader } from "@/lib/data-preloader";
import { useState, useEffect } from "react";

export default function CMSAbout() {
  const [aboutContent, setAboutContent] = useState(defaultAboutContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set page title
    document.title = "CMS - About | Bhanu Prakash Chintal";
    
    const loadContent = async () => {
      try {
        // Try to get preloaded data first
        const preloadedData = dataPreloader.getData();
        if (preloadedData.loaded) {
          setAboutContent(preloadedData.aboutContent);
          setLoading(false);
        } else {
          // Wait for preloader or fetch directly
          const data = await Promise.race([
            dataPreloader.preloadAll().then(d => d.aboutContent),
            getAboutContent()
          ]);
          setAboutContent(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error loading about content:", error);
        setLoading(false);
      }
    };
    loadContent();
  }, []);

  const handleSaveAbout = async (content: typeof defaultAboutContent) => {
    try {
      await saveAboutContent(content);
      setAboutContent(content);
      alert("About content saved successfully to Firebase! Changes will reflect on portfolio pages.");
    } catch (error) {
      console.error("Error saving about content:", error);
      alert("Error saving about content. Please check your Firebase configuration.");
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground">Loading about content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">About Page Content</h1>
        <p className="text-muted-foreground">Edit your about page content (Firebase)</p>
      </div>
      <AboutEditor content={aboutContent} onSave={handleSaveAbout} />
    </div>
  );
}

