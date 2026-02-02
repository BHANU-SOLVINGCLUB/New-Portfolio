"use client";

import { useEffect, useState } from "react";
import {
  subscribeToHomeContent,
  subscribeToSkills,
  subscribeToProjects,
  type Project,
  defaultHomeContent,
  defaultSkills,
} from "@/lib/firebase-data";
import { getTechLogo } from "@/lib/tech-logos";

const SECTION_BLUE = "#0056A4";

type ResumeRole = "general";

interface ResumeState {
  home: typeof defaultHomeContent;
  projects: Project[];
  loading: boolean;
}

const initialState: ResumeState = {
  home: defaultHomeContent,
  projects: [],
  loading: true,
};

export default function ResumePage() {
  const [role] = useState<ResumeRole>("general");
  const [state, setState] = useState<ResumeState>(initialState);

  useEffect(() => {
    let mounted = true;

    // Home content (name, headline)
    const unsubHome = subscribeToHomeContent((home) => {
      if (!mounted) return;
      setState((prev) => ({ ...prev, home, loading: false }));
    });

    // Projects – we use them later for the Projects section
    const unsubProjects = subscribeToProjects((projects) => {
      if (!mounted) return;
      setState((prev) => ({ ...prev, projects, loading: false }));
    });

    // Skills – we only need to trigger subscription so defaults stay in sync
    const unsubSkills = subscribeToSkills(() => {
      // no-op; we can wire this into skills display later
    });

    return () => {
      mounted = false;
      unsubHome();
      unsubProjects();
      unsubSkills();
    };
  }, []);

  const { home, projects, loading } = state;

  // Very simple mapping: pick a few featured projects for the resume section
  const featuredForResume = projects.length
    ? projects.filter((p) => p.featured).slice(0, 3)
    : [];

  return (
    <div className="min-h-screen bg-background flex justify-center px-4 py-8 sm:py-10">
      <div className="w-full max-w-4xl bg-white text-black shadow-lg p-6 sm:p-8 md:p-10">
        {/* HEADER */}
        <header className="flex flex-col md:flex-row gap-6 md:gap-8 mb-6">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide mb-2 uppercase">
              {home.name.toUpperCase()}
            </h1>
            <p className="font-semibold text-sm sm:text-base text-gray-800 mb-2">
              Data Analyst &amp; Software Engineer
            </p>
            <p className="text-xs sm:text-sm text-gray-800 leading-snug">
              Address: 3-14/21/4/D, Srinivasapuram Colony, Ramanthapur, Hyderabad, Telangana,
              India - 500013
            </p>
          </div>
          <div className="text-xs sm:text-sm text-gray-800 space-y-1 md:text-right">
            <p>
              <span className="font-semibold">Phone:</span> +91 6304725752
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              <a
                href="mailto:chintalbhanuprakash30oct@gmail.com"
                className="text-blue-700 underline"
              >
                chintalbhanuprakash30oct@gmail.com
              </a>
            </p>
            <p>
              <span className="font-semibold">LinkedIn:</span>{" "}
              <a
                href="https://www.linkedin.com/in/bhanuprakashchintal/"
                className="text-blue-700 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/bhanuprakashchintal
              </a>
            </p>
            <p>
              <span className="font-semibold">Website:</span>{" "}
              <a
                href="https://bhanuprakashchintal.vercel.app"
                className="text-blue-700 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                bhanuprakashchintal.vercel.app
              </a>
            </p>
          </div>
        </header>

        {/* SUMMARY */}
        <ResumeSection title="SUMMARY">
          <p className="text-xs sm:text-sm leading-relaxed text-gray-900">
            Data Analyst and Software Engineer with hands-on experience in Python-based data
            analytics, visualization, and automation, alongside strong application development
            skills. Experienced in end-to-end development, clean coding practices, and
            collaborating across teams. Actively seeking data-focused roles where analytics,
            automation, and problem-solving drive business impact.
          </p>
        </ResumeSection>

        {/* WORK EXPERIENCE */}
        <ResumeSection title="WORK EXPERIENCE">
          <div className="flex justify-between text-xs sm:text-sm font-semibold text-gray-900 mb-1">
            <span>Flutter Developer (SDE), Sas Estetica Solutions Private Limited</span>
            <span className="whitespace-nowrap">Oct 2025</span>
          </div>
          <ul className="list-disc list-outside pl-5 text-xs sm:text-sm leading-relaxed text-gray-900 mb-4">
            <li>
              Built and maintained a SaaS mobile app using Flutter with Riverpod and REST APIs.
            </li>
            <li>
              Implemented modular architecture and clean navigation for scalable development.
            </li>
            <li>
              Managed internal app testing and distribution through deployment platforms.
            </li>
            <li>Ensured a stable and smooth application experience by resolving bugs.</li>
          </ul>

          <div className="flex justify-between text-xs sm:text-sm font-semibold text-gray-900 mb-1">
            <span>Flutter Developer (SDE), Cyberbyte Technologies</span>
            <span className="whitespace-nowrap">(7 Months) Oct 2024 - Apr 2025</span>
          </div>
          <ul className="list-disc list-outside pl-5 text-xs sm:text-sm leading-relaxed text-gray-900">
            <li>Developed and optimized a Flutter IoT app including authentication and FCM.</li>
            <li>Worked mainly on real-time database, authentication, and Firestore database.</li>
          </ul>
        </ResumeSection>

        {/* TECHNICAL SKILLS */}
        <ResumeSection title="TECHNICAL SKILLS">
          <div className="flex flex-wrap gap-2 mb-3">
            {["Python", "Streamlit", "Plotly", "Flutter", "Dart", "Firebase", "Supabase", "Git", "GitHub", "Notion", "Next.js", "TypeScript", "Figma"].map((tech) => {
              const logoUrl = getTechLogo(tech);
              if (!logoUrl) return null;
              return (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-gray-100 border border-gray-200"
                  title={tech}
                >
                  <img src={logoUrl} alt={tech} className="h-4 w-4 object-contain" />
                  <span className="text-xs font-medium text-gray-800">{tech}</span>
                </span>
              );
            })}
          </div>
          <ul className="list-disc list-outside pl-5 text-xs sm:text-sm leading-relaxed text-gray-900 space-y-1">
            <li>
              <span className="font-semibold">Data &amp; Analytics:</span> Python, pandas, NumPy,
              SQL (Basics), Data Cleaning, Data Analysis, Data Visualization, KPI Dashboards
            </li>
            <li>
              <span className="font-semibold">Visualization Tools:</span> Streamlit, Plotly
            </li>
            <li>
              <span className="font-semibold">Backend &amp; App Development:</span> Flutter, Dart,
              REST APIs, Firebase
            </li>
            <li>
              <span className="font-semibold">Databases:</span> Firestore, Supabase, SQL (Learning:
              Oracle / PL-SQL)
            </li>
            <li>
              <span className="font-semibold">Development Practices:</span> Modular Architecture,
              Debugging, Performance Optimization, Automation
            </li>
            <li>
              <span className="font-semibold">Tools:</span> Git, GitHub, Notion,
              AI-assisted development (Cursor)
            </li>
          </ul>
        </ResumeSection>

        {/* EDUCATION */}
        <ResumeSection title="EDUCATION">
          <EducationItem
            title="Bachelor of Technology, Information Technology"
            place="Anurag University"
            period="Sep 2021 - Apr 2025"
            details={["CGPA: 8.22 / 10"]}
          />
          <EducationItem
            title="Intermediate, Science Stream (MPC)"
            place="Sri Chaitanya Junior Kalasala (TSBIE)"
            period="Jun 2019 - Mar 2021"
            details={["Percentage: 91.8 %"]}
          />
          <EducationItem
            title="Xth"
            place="Kakatiya Techno School, Hyderabad (SSC)"
            period="Jun 2018 - Mar 2019"
            details={["CGPA: 8.7 / 10"]}
          />
        </ResumeSection>

        {/* PROJECTS */}
        <ResumeSection title="PROJECTS">
          {featuredForResume.map((project) => (
            <div key={project.id} className="mb-4">
              <div className="flex justify-between text-xs sm:text-sm font-semibold text-gray-900 mb-1">
                <span>{project.title}</span>
                <span className="whitespace-nowrap">{project.period || ""}</span>
              </div>
              {project.live && (
                <p className="text-xs text-blue-700 mb-1 break-all">
                  Live Link:{" "}
                  <a href={project.live} target="_blank" rel="noopener noreferrer">
                    {project.live}
                  </a>
                </p>
              )}
              <p className="text-xs sm:text-sm text-gray-900">{project.description}</p>
            </div>
          ))}
        </ResumeSection>

        {/* The remaining sections (Research Paper, Awards, Web Links, etc.) could be added here
            in the same pattern when you’re ready to wire all of them. */}

        {loading && (
          <p className="mt-4 text-xs text-gray-500 text-center">
            Loading latest content from CMS / Firebase...
          </p>
        )}
      </div>
    </div>
  );
}

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-4 sm:mb-5">
      <h2
        className="text-xs sm:text-sm font-extrabold tracking-wide mb-1"
        style={{ color: SECTION_BLUE }}
      >
        {title.toUpperCase()}
      </h2>
      <div
        className="h-[1px] mb-2"
        style={{ backgroundColor: SECTION_BLUE, opacity: 0.8 }}
      />
      {children}
    </section>
  );
}

function EducationItem(props: {
  title: string;
  place: string;
  period: string;
  details: string[];
}) {
  const { title, place, period, details } = props;
  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs sm:text-sm font-semibold text-gray-900">
        <span>{title}</span>
        <span className="whitespace-nowrap">{period}</span>
      </div>
      <p className="text-xs sm:text-sm text-gray-900 mb-0.5">{place}</p>
      <ul className="list-disc list-outside pl-5 text-xs sm:text-sm text-gray-900">
        {details.map((d, idx) => (
          <li key={idx}>{d}</li>
        ))}
      </ul>
    </div>
  );
}

