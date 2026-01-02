# Developer Portfolio

A modern, responsive developer portfolio built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui components.

## Features

- **Home Page**: Hero section with introduction and quick stats
- **About Page**: Profile, experience, education, and achievements with tabs and accordion
- **Projects Page**: Showcase of projects with cards and dialog modals
- **Skills Page**: Interactive skills display with progress bars and tabs
- **Contact Page**: Contact form and information cards

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components (exact components from shadcn.com)
- Radix UI primitives
- Lucide React icons

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── about/          # About page
│   ├── projects/       # Projects page
│   ├── skills/         # Skills page
│   ├── contact/        # Contact page
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/
│   ├── ui/             # shadcn/ui components
│   ├── navigation.tsx  # Navigation component
│   └── footer.tsx      # Footer component
└── lib/
    └── utils.ts        # Utility functions
```

## shadcn/ui Components Used

All components are exact implementations from [shadcn/ui](https://ui.shadcn.com):

- Button
- Card
- Navigation Menu
- Avatar
- Badge
- Tabs
- Input
- Textarea
- Label
- Separator
- Progress
- Dialog
- Accordion

## Customization

You can customize the content by editing:
- `app/page.tsx` - Home page content
- `app/about/page.tsx` - About page content
- `app/projects/page.tsx` - Projects data
- `app/skills/page.tsx` - Skills data
- `app/contact/page.tsx` - Contact information

## Build for Production

```bash
npm run build
npm start
```

## License

MIT

