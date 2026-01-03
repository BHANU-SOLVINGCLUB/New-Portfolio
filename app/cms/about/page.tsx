"use client";

import { AboutEditor } from "@/components/cms/AboutEditor";
import { getAboutContent, defaultAboutContent } from "@/lib/portfolio-data";
import { useState, useEffect } from "react";

export default function CMSAbout() {
  const [aboutContent, setAboutContent] = useState(defaultAboutContent);

  useEffect(() => {
    setAboutContent(getAboutContent());
  }, []);

  const handleSaveAbout = (content: typeof defaultAboutContent) => {
    setAboutContent(content);
    const data = JSON.stringify(content);
    localStorage.setItem("cms_about", data);
    localStorage.setItem("cms_about_updated", Date.now().toString());
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("cms-data-updated", { detail: { type: "about" } }));
      localStorage.setItem("cms_trigger", Date.now().toString());
      localStorage.removeItem("cms_trigger");
    }
    alert("About content saved successfully! Changes will reflect on portfolio pages.");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">About Page Content</h1>
        <p className="text-muted-foreground">Edit your about page content</p>
      </div>
      <AboutEditor content={aboutContent} onSave={handleSaveAbout} />
    </div>
  );
}

