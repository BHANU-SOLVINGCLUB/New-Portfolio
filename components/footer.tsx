import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <Separator className="mb-6" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Developer Portfolio. All rights reserved.
          </p>
          <div className="flex gap-3 sm:gap-4">
            <a href="https://github.com/bhanuprakashchintal" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 sm:gap-2">
              <Github className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-xs sm:text-sm hidden sm:inline">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/bhanuprakashchintal/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 sm:gap-2">
              <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-xs sm:text-sm hidden sm:inline">LinkedIn</span>
            </a>
            <a href="https://bhanuprakashchintal.vercel.app" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 sm:gap-2">
              <span className="text-xs sm:text-sm hidden sm:inline">Portfolio</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

