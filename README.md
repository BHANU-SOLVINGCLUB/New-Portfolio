# Developer Portfolio

A modern, responsive developer portfolio built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui components.

## Features

- **Home Page**: Hero section with introduction and quick stats
- **About Page**: Profile, experience, education, and achievements with tabs and accordion
- **Projects Page**: Showcase of projects with cards and dialog modals
- **Skills Page**: Interactive skills display with progress bars and tabs
- **Contact Page**: Contact form and information cards
- **CMS**: Content Management System at `/cms` for managing portfolio content
- **Firebase Integration**: Real-time data sync with Firestore and Firebase Storage

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components (exact components from shadcn.com)
- Radix UI primitives
- Lucide React icons
- Firebase (Firestore & Storage)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up Firebase:
   - Create a Firebase project and enable Firestore & Storage
   - Copy your Firebase config
   - Create `.env.local` file with your Firebase credentials (see `FIREBASE_SETUP.md`)

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.
5. Access CMS at [http://localhost:3000/cms](http://localhost:3000/cms) (default password: `admin123`)

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

You can customize the content via the CMS at `/cms` or by editing:
- `lib/portfolio-data.ts` - Default portfolio data
- `app/page.tsx` - Home page structure
- `app/about/page.tsx` - About page structure
- `app/projects/page.tsx` - Projects page structure
- `app/skills/page.tsx` - Skills page structure
- `app/contact/page.tsx` - Contact information

## CMS Access

Access the Content Management System at `/cms`:
- Default password: `admin123` (change via `NEXT_PUBLIC_CMS_PASSWORD` env variable)
- Manage all portfolio content without code changes
- Upload images to Firebase Storage
- Real-time updates across all pages

## Build for Production

```bash
npm run build
npm start
```

See `PRODUCTION_DEPLOYMENT.md` for detailed deployment instructions.

## Documentation

- `FIREBASE_SETUP.md` - Firebase setup guide
- `PRODUCTION_DEPLOYMENT.md` - Production deployment guide

## License

MIT

