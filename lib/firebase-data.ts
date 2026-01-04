// Firestore data service - replaces localStorage with Firebase
import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  onSnapshot,
  Timestamp,
  enableNetwork,
  type Firestore
} from "firebase/firestore";
import { db } from "./firebase";
import type { Project, ProjectCategory } from "./portfolio-data";
import { 
  defaultProjects, 
  defaultHomeContent, 
  defaultAboutContent, 
  defaultSkills 
} from "./portfolio-data";

// Re-export types and defaults for use in other files
export type { Project, ProjectCategory };
export { defaultProjects, defaultHomeContent, defaultAboutContent, defaultSkills };

// Collection names
const COLLECTIONS = {
  projects: "projects",
  home: "home",
  about: "about",
  skills: "skills",
} as const;

// Helper to check if Firebase is initialized
const isFirebaseReady = (): boolean => {
  return typeof window !== "undefined" && db !== undefined;
};

// Helper to ensure network is enabled (with deduplication to prevent race conditions)
let networkEnablePromise: Promise<void> | null = null;

const ensureNetworkEnabled = async (): Promise<void> => {
  if (!db) return;
  
  // If already enabling, wait for that promise
  if (networkEnablePromise) {
    return networkEnablePromise;
  }
  
  // Create a new promise for enabling network
  networkEnablePromise = (async () => {
    try {
      // Only enable network if not already enabled
      // This prevents the internal assertion error from concurrent calls
      await enableNetwork(db!);
    } catch (error: any) {
      // Network already enabled or other error - this is fine
      // Firestore will manage network state automatically
      if (error?.code !== "failed-precondition" && 
          !error?.message?.includes("already enabled")) {
        // Only log unexpected errors
        console.warn("Firebase network enable warning:", error);
      }
    } finally {
      // Clear the promise after a short delay to allow reuse
      setTimeout(() => {
        networkEnablePromise = null;
      }, 100);
    }
  })();
  
  return networkEnablePromise;
};

// Projects
export const getProjects = async (): Promise<Project[]> => {
  if (!isFirebaseReady() || !db) return defaultProjects;
  
  try {
    // Ensure network is enabled before fetching
    await ensureNetworkEnabled();
    
    const docRef = doc(db, COLLECTIONS.projects, "data");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data().items as Project[];
    }
    
    // If no data exists, initialize with defaults
    await setDoc(docRef, { items: defaultProjects });
    return defaultProjects;
  } catch (error: any) {
    console.error("Error fetching projects:", error);
    // If offline error, return defaults instead of failing
    if (error?.code === "failed-precondition" || 
        error?.code === "unavailable" ||
        error?.message?.includes("offline") ||
        error?.message?.includes("network")) {
      console.warn("Firebase offline, using default data");
      return defaultProjects;
    }
    return defaultProjects;
  }
};

export const saveProjects = async (projects: Project[]): Promise<void> => {
  if (!isFirebaseReady() || !db) {
    console.error("Firebase not initialized");
    return;
  }
  
  try {
    const docRef = doc(db, COLLECTIONS.projects, "data");
    await setDoc(docRef, { 
      items: projects,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error("Error saving projects:", error);
    throw error;
  }
};

export const subscribeToProjects = (
  callback: (projects: Project[]) => void
): (() => void) => {
  if (!isFirebaseReady() || !db) {
    callback(defaultProjects);
    return () => {};
  }
  
  // Set up subscription asynchronously after network is enabled
  let unsubscribe: (() => void) | null = null;
  ensureNetworkEnabled().then(() => {
    if (!db) return;
    const docRef = doc(db, COLLECTIONS.projects, "data");
    unsubscribe = onSnapshot(
    docRef,
    (docSnap) => {
      if (docSnap.exists()) {
        callback(docSnap.data().items as Project[]);
      } else {
        callback(defaultProjects);
      }
    },
    (error: any) => {
      console.error("Error in projects subscription:", error);
      if (error?.code === "failed-precondition" || 
          error?.code === "unavailable" ||
          error?.message?.includes("offline") ||
          error?.message?.includes("network")) {
        console.warn("Firebase offline, using default data");
      }
      callback(defaultProjects);
    }
    );
  }).catch((error) => {
    console.error("Error setting up projects subscription:", error);
    callback(defaultProjects);
  });
  
  // Return unsubscribe function that handles the async case
  return () => {
    if (unsubscribe) {
      unsubscribe();
    }
  };
};

// Home Content
export const getHomeContent = async () => {
  if (!isFirebaseReady() || !db) return defaultHomeContent;
  
  try {
    await ensureNetworkEnabled();
    const docRef = doc(db, COLLECTIONS.home, "data");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as typeof defaultHomeContent;
    }
    
    await setDoc(docRef, defaultHomeContent);
    return defaultHomeContent;
  } catch (error: any) {
    console.error("Error fetching home content:", error);
    if (error?.code === "failed-precondition" || 
        error?.code === "unavailable" ||
        error?.message?.includes("offline") ||
        error?.message?.includes("network")) {
      console.warn("Firebase offline, using default data");
    }
    return defaultHomeContent;
  }
};

export const saveHomeContent = async (content: typeof defaultHomeContent): Promise<void> => {
  if (!isFirebaseReady() || !db) {
    console.error("Firebase not initialized");
    return;
  }
  
  try {
    const docRef = doc(db, COLLECTIONS.home, "data");
    await setDoc(docRef, { 
      ...content,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error("Error saving home content:", error);
    throw error;
  }
};

export const subscribeToHomeContent = (
  callback: (content: typeof defaultHomeContent) => void
): (() => void) => {
  if (!isFirebaseReady() || !db) {
    callback(defaultHomeContent);
    return () => {};
  }
  
  // Set up subscription asynchronously after network is enabled
  let unsubscribe: (() => void) | null = null;
  ensureNetworkEnabled().then(() => {
    if (!db) return;
    const docRef = doc(db, COLLECTIONS.home, "data");
    unsubscribe = onSnapshot(
    docRef,
    (docSnap) => {
      if (docSnap.exists()) {
        callback(docSnap.data() as typeof defaultHomeContent);
      } else {
        callback(defaultHomeContent);
      }
    },
    (error: any) => {
      console.error("Error in home content subscription:", error);
      if (error?.code === "failed-precondition" || 
          error?.code === "unavailable" ||
          error?.message?.includes("offline") ||
          error?.message?.includes("network")) {
        console.warn("Firebase offline, using default data");
      }
      callback(defaultHomeContent);
    }
    );
  }).catch((error) => {
    console.error("Error setting up home content subscription:", error);
    callback(defaultHomeContent);
  });
  
  // Return unsubscribe function that handles the async case
  return () => {
    if (unsubscribe) {
      unsubscribe();
    }
  };
};

// About Content
export const getAboutContent = async () => {
  if (!isFirebaseReady() || !db) return defaultAboutContent;
  
  try {
    await ensureNetworkEnabled();
    const docRef = doc(db, COLLECTIONS.about, "data");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as typeof defaultAboutContent;
    }
    
    await setDoc(docRef, defaultAboutContent);
    return defaultAboutContent;
  } catch (error: any) {
    console.error("Error fetching about content:", error);
    if (error?.code === "failed-precondition" || 
        error?.code === "unavailable" ||
        error?.message?.includes("offline") ||
        error?.message?.includes("network")) {
      console.warn("Firebase offline, using default data");
    }
    return defaultAboutContent;
  }
};

export const saveAboutContent = async (content: typeof defaultAboutContent): Promise<void> => {
  if (!isFirebaseReady() || !db) {
    console.error("Firebase not initialized");
    return;
  }
  
  try {
    const docRef = doc(db, COLLECTIONS.about, "data");
    await setDoc(docRef, { 
      ...content,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error("Error saving about content:", error);
    throw error;
  }
};

export const subscribeToAboutContent = (
  callback: (content: typeof defaultAboutContent) => void
): (() => void) => {
  if (!isFirebaseReady() || !db) {
    callback(defaultAboutContent);
    return () => {};
  }
  
  // Set up subscription asynchronously after network is enabled
  let unsubscribe: (() => void) | null = null;
  ensureNetworkEnabled().then(() => {
    if (!db) return;
    const docRef = doc(db, COLLECTIONS.about, "data");
    unsubscribe = onSnapshot(
    docRef,
    (docSnap) => {
      if (docSnap.exists()) {
        callback(docSnap.data() as typeof defaultAboutContent);
      } else {
        callback(defaultAboutContent);
      }
    },
    (error: any) => {
      console.error("Error in about content subscription:", error);
      if (error?.code === "failed-precondition" || 
          error?.code === "unavailable" ||
          error?.message?.includes("offline") ||
          error?.message?.includes("network")) {
        console.warn("Firebase offline, using default data");
      }
      callback(defaultAboutContent);
    }
    );
  }).catch((error) => {
    console.error("Error setting up about content subscription:", error);
    callback(defaultAboutContent);
  });
  
  // Return unsubscribe function that handles the async case
  return () => {
    if (unsubscribe) {
      unsubscribe();
    }
  };
};

// Skills
export const getSkills = async () => {
  if (!isFirebaseReady() || !db) return defaultSkills;
  
  try {
    await ensureNetworkEnabled();
    const docRef = doc(db, COLLECTIONS.skills, "data");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as typeof defaultSkills;
    }
    
    await setDoc(docRef, defaultSkills);
    return defaultSkills;
  } catch (error: any) {
    console.error("Error fetching skills:", error);
    if (error?.code === "failed-precondition" || 
        error?.code === "unavailable" ||
        error?.message?.includes("offline") ||
        error?.message?.includes("network")) {
      console.warn("Firebase offline, using default data");
    }
    return defaultSkills;
  }
};

export const saveSkills = async (skills: typeof defaultSkills): Promise<void> => {
  if (!isFirebaseReady() || !db) {
    console.error("Firebase not initialized");
    return;
  }
  
  try {
    const docRef = doc(db, COLLECTIONS.skills, "data");
    await setDoc(docRef, { 
      ...skills,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error("Error saving skills:", error);
    throw error;
  }
};

export const subscribeToSkills = (
  callback: (skills: typeof defaultSkills) => void
): (() => void) => {
  if (!isFirebaseReady() || !db) {
    callback(defaultSkills);
    return () => {};
  }
  
  // Set up subscription asynchronously after network is enabled
  let unsubscribe: (() => void) | null = null;
  ensureNetworkEnabled().then(() => {
    if (!db) return;
    const docRef = doc(db, COLLECTIONS.skills, "data");
    unsubscribe = onSnapshot(
    docRef,
    (docSnap) => {
      if (docSnap.exists()) {
        callback(docSnap.data() as typeof defaultSkills);
      } else {
        callback(defaultSkills);
      }
    },
    (error: any) => {
      console.error("Error in skills subscription:", error);
      if (error?.code === "failed-precondition" || 
          error?.code === "unavailable" ||
          error?.message?.includes("offline") ||
          error?.message?.includes("network")) {
        console.warn("Firebase offline, using default data");
      }
      callback(defaultSkills);
    }
    );
  }).catch((error) => {
    console.error("Error setting up skills subscription:", error);
    callback(defaultSkills);
  });
  
  // Return unsubscribe function that handles the async case
  return () => {
    if (unsubscribe) {
      unsubscribe();
    }
  };
};

