import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
// Preload data on app initialization
import "@/lib/data-preloader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home | Bhanu Prakash Chintal",
  description: "Data Analyst and Software Engineer with hands-on experience in Python-based data analytics, visualization, and automation, along with strong Flutter and full-stack development skills",
  icons: {
    icon: [
      { url: "/avatar.svg", type: "image/svg+xml", sizes: "any" },
      { url: "/avatar.svg", type: "image/svg+xml", sizes: "32x32" },
      { url: "/avatar.svg", type: "image/svg+xml", sizes: "48x48" },
    ],
    shortcut: "/avatar.svg",
    apple: [
      { url: "/avatar.svg", type: "image/svg+xml", sizes: "180x180" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

