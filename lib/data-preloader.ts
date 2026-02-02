// Data preloader - loads all portfolio data on app initialization
import { getProjects, getHomeContent, getAboutContent, getSkills } from "./firebase-data";
import type { Project } from "./firebase-data";
import { defaultHomeContent, defaultAboutContent, defaultSkills } from "./firebase-data";

export interface PreloadedData {
  projects: Project[];
  homeContent: typeof defaultHomeContent;
  aboutContent: typeof defaultAboutContent;
  skills: typeof defaultSkills;
  loaded: boolean;
}

class DataPreloader {
  private data: PreloadedData = {
    projects: [],
    homeContent: defaultHomeContent,
    aboutContent: defaultAboutContent,
    skills: defaultSkills,
    loaded: false,
  };

  private loadingPromise: Promise<PreloadedData> | null = null;

  async preloadAll(): Promise<PreloadedData> {
    // If already loading, return the same promise
    if (this.loadingPromise) {
      return this.loadingPromise;
    }

    // If already loaded, return cached data
    if (this.data.loaded) {
      return this.data;
    }

    // Start loading
    this.loadingPromise = this.loadData();
    return this.loadingPromise;
  }

  private async loadData(): Promise<PreloadedData> {
    try {
      // Load all data in parallel for faster loading
      const [projects, homeContent, aboutContent, skills] = await Promise.all([
        getProjects(),
        getHomeContent(),
        getAboutContent(),
        getSkills(),
      ]);

      this.data = {
        projects,
        homeContent,
        aboutContent,
        skills,
        loaded: true,
      };

      return this.data;
    } catch (error) {
      console.error("Error preloading data:", error);
      // Return defaults if loading fails
      return {
        projects: [],
        homeContent: defaultHomeContent,
        aboutContent: defaultAboutContent,
        skills: defaultSkills,
        loaded: true, // Mark as loaded even if failed (will use defaults)
      };
    }
  }

  getData(): PreloadedData {
    return this.data;
  }

  isLoaded(): boolean {
    return this.data.loaded;
  }

  reset(): void {
    this.data = {
      projects: [],
      homeContent: defaultHomeContent,
      aboutContent: defaultAboutContent,
      skills: defaultSkills,
      loaded: false,
    };
    this.loadingPromise = null;
  }
}

// Singleton instance
export const dataPreloader = new DataPreloader();

// Preload data immediately when module loads (client-side only)
if (typeof window !== "undefined") {
  // Start preloading immediately
  dataPreloader.preloadAll().catch((error) => {
    console.error("Failed to preload data:", error);
  });
}


