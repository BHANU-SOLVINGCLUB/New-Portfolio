"use client";

import { HomeEditor } from "@/components/cms/HomeEditor";
import { getHomeContent, defaultHomeContent } from "@/lib/portfolio-data";
import { useState, useEffect } from "react";

export default function CMSHome() {
  const [homeContent, setHomeContent] = useState(defaultHomeContent);

  useEffect(() => {
    setHomeContent(getHomeContent());
  }, []);

  const handleSaveHome = (content: typeof defaultHomeContent) => {
    setHomeContent(content);
    const data = JSON.stringify(content);
    localStorage.setItem("cms_home", data);
    localStorage.setItem("cms_home_updated", Date.now().toString());
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("cms-data-updated", { detail: { type: "home" } }));
      localStorage.setItem("cms_trigger", Date.now().toString());
      localStorage.removeItem("cms_trigger");
    }
    alert("Home content saved successfully! Changes will reflect on portfolio pages.");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Home Page Content</h1>
        <p className="text-muted-foreground">Edit your home page content</p>
      </div>
      <HomeEditor content={homeContent} onSave={handleSaveHome} />
    </div>
  );
}

