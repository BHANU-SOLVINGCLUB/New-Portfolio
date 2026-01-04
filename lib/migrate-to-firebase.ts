// Migration utility to move localStorage data to Firestore
// Run this once to migrate existing CMS data to Firebase

import { saveProjects, saveHomeContent, saveAboutContent, saveSkills } from "./firebase-data";

export const migrateLocalStorageToFirebase = async () => {
  if (typeof window === "undefined") {
    console.error("Migration must be run in the browser");
    return;
  }

  try {
    // Migrate Projects
    const projectsData = localStorage.getItem("cms_projects");
    if (projectsData) {
      const projects = JSON.parse(projectsData);
      await saveProjects(projects);
      console.log("✅ Migrated projects to Firebase");
    }

    // Migrate Home Content
    const homeData = localStorage.getItem("cms_home");
    if (homeData) {
      const home = JSON.parse(homeData);
      await saveHomeContent(home);
      console.log("✅ Migrated home content to Firebase");
    }

    // Migrate About Content
    const aboutData = localStorage.getItem("cms_about");
    if (aboutData) {
      const about = JSON.parse(aboutData);
      await saveAboutContent(about);
      console.log("✅ Migrated about content to Firebase");
    }

    // Migrate Skills
    const skillsData = localStorage.getItem("cms_skills");
    if (skillsData) {
      const skills = JSON.parse(skillsData);
      await saveSkills(skills);
      console.log("✅ Migrated skills to Firebase");
    }

    console.log("🎉 Migration complete! You can now clear localStorage if desired.");
    return true;
  } catch (error) {
    console.error("❌ Migration failed:", error);
    return false;
  }
};

