"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Home, User, FolderOpen, Code, Mail, Menu } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: User },
  { href: "/projects", label: "Projects", icon: FolderOpen },
  { href: "/skills", label: "Skills", icon: Code },
  { href: "/contact", label: "Contact", icon: Mail },
];

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Hide navigation on CMS routes
  if (pathname?.startsWith("/cms")) {
    return null;
  }

  const activeIndex = navItems.findIndex((item) => item.href === pathname);
  const resolvedActiveIndex = activeIndex === -1 ? 0 : activeIndex;
  const currentHoverIndex = hoverIndex ?? resolvedActiveIndex;

  return (
    <nav className="sticky top-4 z-50">
      <div className="container mx-auto px-4">
        <div className="relative flex h-16 items-center justify-center">
          
          {/* Desktop Navigation (centered) */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
            <div
              className="relative inline-flex rounded-full border border-[#3f3f3f] px-2 py-1"
              style={{
                boxShadow: "inset 10px 0 10px #000000",
                background: "linear-gradient(0deg, #141414, #242424)",
              }}
            >
              {/* Outer ring / border gradient (equivalent to ::after) */}
              <div
                className="pointer-events-none absolute rounded-full -z-10"
                style={{
                  inset: "-5px",
                  background: "linear-gradient(180deg, #3f3f3f, #212121)",
                }}
              />

              {/* Hover bubble (sits under active bubble) */}
              <div
                className="absolute inset-y-1 rounded-full transition-transform duration-150 ease-out"
                style={{
                  width: `${100 / navItems.length}%`,
                  background: "linear-gradient(180deg, #3f3f3f, #212121)",
                  boxShadow: "inset 0 2px 7px #ffffff29",
                  transform: `translateX(${currentHoverIndex * 100}%)`,
                }}
              />

              {/* Active bubble */}
              <div
                className="absolute inset-y-1 rounded-full transition-transform duration-200 ease-out"
                style={{
                  width: `${100 / navItems.length}%`,
                  background: "linear-gradient(180deg, #f2f2f2, #b3b3b3)",
                  boxShadow: "inset 0 2px 7px #ffffff",
                  transform: `translateX(${resolvedActiveIndex * 100}%)`,
                }}
              />

              {/* Nav tabs */}
              <div className="relative flex min-w-[420px] gap-2">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onMouseEnter={() => setHoverIndex(index)}
                      onMouseLeave={() => setHoverIndex(null)}
                      className={cn(
                        "relative z-10 flex-1 h-10 px-0 text-xs sm:text-sm font-medium rounded-full transition-colors duration-150 flex items-center justify-center text-center",
                        isActive ? "text-black" : "text-white/80 hover:text-white"
                      )}
                    >
                      <span className="inline-flex items-center gap-2 px-6">
                        <Icon className="h-4 w-4" />
                        <span className="hidden sm:inline">{item.label}</span>
                        <span className="sm:hidden">{item.label}</span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <SheetClose key={item.href} asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors",
                          pathname === item.href
                            ? "bg-accent text-accent-foreground"
                            : "hover:bg-accent hover:text-accent-foreground"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        {item.label}
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

