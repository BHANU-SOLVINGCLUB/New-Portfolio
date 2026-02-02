// Shared data source for portfolio and CMS
// CMS saves to localStorage, portfolio pages read from localStorage or fallback to this

export type ProjectCategory = "web" | "mobile" | "data" | "freelance";

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  github: string;
  live: string;
  appStore?: string;
  playStore?: string;
  type: string;
  period: string;
  team: string;
  achievement: string | null;
  category: ProjectCategory;
  details: string;
  featured: boolean;
}

export const defaultProjects: Project[] = [
  {
    id: 1,
    title: "TUVO – Ticket Booking Platform",
    description: "Full-stack Next.js 15 ticket booking platform with secure PayU payments, PDF ticket generation, and role-based admin dashboard.",
    technologies: ["Next.js", "TypeScript", "Tailwind", "Radix UI", "Supabase", "Vercel"],
    image: "",
    github: "",
    live: "https://tuvo.in/",
    type: "Freelance Project",
    period: "June 2025",
    team: "1",
    achievement: null,
    category: "web",
    details: "Built a full-stack ticket booking platform with secure PayU payments and server verification. Implemented PDF ticket generation with QR codes and automated email receipts. Developed a comprehensive role-based admin dashboard for managing events and bookings.",
    featured: true
  },
  {
    id: 2,
    title: "Heritage Hues",
    description: "A cross-platform travel and tourism app built with Flutter & Dart. Aggregates data on heritage sites and commerce markets.",
    technologies: ["Flutter", "Dart", "FlutterFlow", "MapTiler", "Supabase"],
    image: "",
    github: "",
    live: "",
    appStore: "",
    playStore: "",
    type: "University Project",
    period: "Nov 2023 - Dec 2023",
    team: "2",
    achievement: "Won First Prize at the University-Level Project Expo (2024)",
    category: "mobile",
    details: "A cross-platform travel and tourism application built with Flutter and Dart, designed to streamline the process of finding information about various places. The app aggregates data from multiple sources, focusing on hereditary and commerce markets to showcase hidden gems. Utilizing Flutterflow and APIs for automation, HeritageHues offers a user-friendly experience. For mapping, it employs MapTiler, an open-source alternative to Google API, and uses Supabase for its backend.",
    featured: true
  },
  {
    id: 3,
    title: "Travel Together",
    description: "AI-driven travel app offering personalized itineraries. Developed a secure backend using Firebase and designed an interactive admin dashboard.",
    technologies: ["Flutter", "Dart", "Firebase", "Firestore", "AI Integration"],
    image: "",
    github: "https://github.com/BhanuPrakashChintal/TravelTogether",
    live: "",
    appStore: "",
    playStore: "",
    type: "Freelancing Project",
    period: "May 2024 – Jun 2024",
    team: "1",
    achievement: null,
    category: "mobile",
    details: "Developed a smart travel application featuring AI-powered itinerary planning and real-time geolocation navigation. Designed an intuitive user interface with a comprehensive admin panel. Utilized Firebase for secure backend and efficient data handling.",
    featured: true
  },
  {
    id: 4,
    title: "Data Analytics & Visualization Studio",
    description: "Streamlit-based analytics platform for CSV/XLSX datasets with automatic schema detection, interactive dashboards, and KPI visualization.",
    technologies: ["Python", "Streamlit", "pandas", "Plotly", "NumPy"],
    image: "",
    github: "https://github.com/JadhavMeghana/Data-Analytics---Visualization-Studio",
    live: "https://dav-studio.streamlit.app/",
    appStore: "",
    playStore: "",
    type: "Personal Project",
    period: "Aug 2025",
    team: "1",
    achievement: null,
    category: "data",
    details: "Built a comprehensive Streamlit-based analytics platform that automatically detects schemas and column mappings. Delivers end-to-end data analysis including trends, distributions, and outlier detection. Features interactive dashboards with KPIs and advanced filtering capabilities.",
    featured: false
  },
  {
    id: 5,
    title: "Geek for Geeks Student Club Website",
    description: "Developed a university club website for event updates using HTML, Bootstrap, JavaScript, Cloudflare CMS, GitHub, and Firebase.",
    technologies: ["HTML", "Bootstrap", "JavaScript", "Cloudflare CMS", "Firebase"],
    image: "",
    github: "",
    live: "",
    appStore: "",
    playStore: "",
    type: "University Project",
    period: "2024",
    team: "1",
    achievement: null,
    category: "web",
    details: "Developed a university club website for event updates and announcements. Built with HTML, Bootstrap, and JavaScript, integrated with Cloudflare CMS for content management and Firebase for backend services.",
    featured: false
  },
  {
    id: 6,
    title: "SaralEvents",
    description: "A comprehensive event management and booking platform with vendor management, real-time availability tracking, and featured events system.",
    technologies: ["Flutter", "Dart", "TypeScript", "Supabase", "PLpgSQL", "Vercel"],
    image: "",
    github: "https://github.com/SOLVING-CLUB/SaralEvents",
    live: "https://saralevents.vercel.app",
    appStore: "",
    playStore: "",
    type: "Freelance Project",
    period: "2024",
    team: "2+",
    achievement: null,
    category: "mobile",
    details: "SaralEvents is a full-stack event management platform built with Flutter and Dart for the mobile application, TypeScript for web components, and Supabase for backend services. The platform features comprehensive event planning capabilities including vendor management, real-time availability tracking, banner system for promotions, featured events showcase, and an integrated booking system. The project includes a vendor app for service providers to manage their events and availability. Built with modern architecture using Supabase for database management, real-time updates, and authentication.",
    featured: true
  },
  {
    id: 7,
    title: "Plattrr",
    description: "A full-stack cross-platform application with web, iOS, and Android support. Provided technical support and managed app store deployments.",
    technologies: ["TypeScript", "React", "Supabase", "Firebase", "Capacitor", "Vercel", "iOS", "Android"],
    image: "",
    github: "https://github.com/SOLVING-CLUB/plattr",
    live: "https://plattrr.vercel.app",
    appStore: "https://apps.apple.com/app/plattrr",
    playStore: "https://play.google.com/store/apps/details?id=com.plattrr.app",
    type: "Freelance Project",
    period: "2024",
    team: "4",
    achievement: null,
    category: "mobile",
    details: "Plattrr is a comprehensive cross-platform application built with TypeScript, React, and Capacitor for mobile deployment. The project features a full-stack architecture with client, server, and mobile components. Provided technical support throughout the development process and successfully managed deployments to both Apple App Store and Google Play Store. The application utilizes Supabase for backend services, Firebase for additional integrations, and Vercel for web hosting. Implemented proper build configurations for iOS and Android platforms, ensuring smooth cross-platform functionality.",
    featured: true
  },
  {
    id: 8,
    title: "rest-express (Plattr)",
    description: "Plattr is a mobile-first catering and bulk meal ordering application built for the Bangalore market.",
    technologies: [
      "React 18",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Supabase (PostgreSQL)",
      "Capacitor (Android/iOS)",
      "Node.js",
      "Express",
      "Firebase Cloud Messaging",
      "Razorpay"
    ],
    image: "",
    github: "",
    live: "",
    appStore: "https://apps.apple.com/in/app/plattr/id6754812718",
    playStore: "https://play.google.com/store/apps/details?id=com.caterplanner.app",
    type: "",
    period: "",
    team: "",
    achievement: null,
    category: "mobile",
    details:
      "What it does:\n- Lets users browse menus (tiffins, snacks, lunch/dinner) and place catering, meal box, snack box, and bulk meal orders.\n- Processes payments (Razorpay; Stripe is referenced in docs/client code).\n- Sends push notifications for order updates and supports notification preferences with deep links (plattr://...).\n\nKey features:\n- Mobile-first React app packaged with Capacitor for Android/iOS.\n- Supabase-backed data persistence and (documented) authentication.\n- Razorpay payment flow with server + Supabase Edge Function support.\n- Push notification system using Firebase Cloud Messaging (device token registration, preferences, deep links).\n- Integrations for Odoo sync (CRM/order/product) and Facebook Conversions API (server-side events).\n\nArchitecture overview:\n- React + Vite client (client/) runs as a web app and is packaged via Capacitor.\n- Supabase (PostgreSQL + Edge Functions) handles data/ops; Express (server/) provides REST endpoints (notifications + Razorpay) in a transitional setup.\n\nNotes:\n- RLS is referenced for database protection; service role key is intended for server-side use only.\n- Theme is forced to light mode (dark mode explicitly disabled in client).",
    featured: false
  },
];

export type HomeStatIcon = "folder" | "trending-up" | "users" | "award";

export interface HomeStat {
  value: string;
  label: string;
  icon: HomeStatIcon;
}

export const defaultHomeContent = {
  name: "Bhanu Prakash Chintal",
  badges: ["Data Analyst", "Software Engineer", "Flutter Developer"],
  description: "Data Analyst and Software Engineer with hands-on experience in Python-based data analytics, visualization, and automation, along with strong Flutter and full-stack development skills. I enjoy building scalable applications, extracting insights from data, and solving real-world problems using technology.",
  stats: [
    { value: "3+", label: "Years Experience", icon: "folder" },
    { value: "10+", label: "Projects Completed", icon: "trending-up" },
    { value: "2", label: "Companies Worked", icon: "users" },
    { value: "1", label: "Research Paper", icon: "award" },
  ],
};

export const defaultAboutContent = {
  name: "Bhanu Prakash Chintal",
  title: "Data Analyst | Software Engineer | Flutter Developer",
  bio: "Data Analyst and Software Engineer with hands-on experience in Python-based data analytics, visualization, and automation, along with strong Flutter and full-stack development skills. Experienced in end-to-end product development, clean architecture, and cross-team collaboration. I enjoy building scalable applications, extracting insights from data, and solving real-world problems using technology.",
  skills: ["Python", "Flutter", "Next.js", "TypeScript", "Data Analytics"],
};

export const defaultSkills = {
  dataAnalytics: [
    { name: "Python", level: 85 },
    { name: "pandas", level: 80 },
    { name: "NumPy", level: 75 },
    { name: "Data Cleaning & Analysis", level: 85 },
    { name: "Data Visualization", level: 80 },
    { name: "KPI Dashboards", level: 75 },
  ],
  visualization: [
    { name: "Streamlit", level: 85 },
    { name: "Plotly", level: 80 },
  ],
  appDev: [
    { name: "Flutter", level: 88 },
    { name: "Dart", level: 85 },
    { name: "REST APIs", level: 80 },
    { name: "Firebase", level: 85 },
    { name: "Supabase", level: 75 },
    { name: "Next.js", level: 80 },
    { name: "TypeScript", level: 75 },
  ],
  database: [
    { name: "Firestore", level: 85 },
    { name: "Supabase", level: 75 },
    { name: "SQL (Basics)", level: 70 },
    { name: "Oracle / PL-SQL", level: 60 },
  ],
  tools: [
    { name: "Git & GitHub", level: 85 },
    { name: "Modular Architecture", level: 80 },
    { name: "Debugging & Performance", level: 80 },
    { name: "Automation", level: 75 },
    { name: "Notion", level: 85 },
    { name: "AI-assisted Development", level: 80 },
  ],
};

// Helper functions to get data (checks localStorage first, then defaults)
export const getProjects = (): Project[] => {
  if (typeof window === "undefined") return defaultProjects;
  const saved = localStorage.getItem("cms_projects");
  return saved ? JSON.parse(saved) : defaultProjects;
};

export const getHomeContent = () => {
  if (typeof window === "undefined") return defaultHomeContent;
  const saved = localStorage.getItem("cms_home");
  return saved ? JSON.parse(saved) : defaultHomeContent;
};

export const getAboutContent = () => {
  if (typeof window === "undefined") return defaultAboutContent;
  const saved = localStorage.getItem("cms_about");
  return saved ? JSON.parse(saved) : defaultAboutContent;
};

export const getSkills = () => {
  if (typeof window === "undefined") return defaultSkills;
  const saved = localStorage.getItem("cms_skills");
  return saved ? JSON.parse(saved) : defaultSkills;
};

