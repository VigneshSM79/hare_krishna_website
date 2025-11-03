# Hare Krishna Temple Website - Planning Document

## Project Overview
Website for Hare Krishna Temple with admin capabilities for content management.

## Tech Stack
- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router v7
- **Backend:** Supabase
- **Image Management:** ImageKit.io
- **Icons:** Lucide React

---

## Current Features
- Admin carousel management
- Admin gallery management with automated ImageKit sync
- ImageKit.io integration for image handling and API access
- Supabase backend integration
- Automated image import from ImageKit folders to Supabase
- Dynamic gallery with category filtering
- Image lightbox viewer with navigation
- Google Maps integration on Contact page
- Interactive map with directions and location features
- Complete contact information with temple timings

---

## Planned Features

### Phase 1: Core Functionality
- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3

### Phase 2: Enhancements
- [ ] Enhancement 1
- [ ] Enhancement 2

### Phase 3: Future Improvements
- [ ] Future feature 1
- [ ] Future feature 2

---

## Architecture

### Component Structure
```
src/
├── components/
├── lib/
│   ├── imagekit.ts
│   └── supabase.ts (assumed)
├── pages/
└── ...
```

### Key Components
- AdminCarouselManager
- AdminGalleryManager

---

## Development Guidelines

### Code Standards
- Use TypeScript for type safety
- Follow ESLint rules
- Use functional components with hooks
- Implement proper error handling

### Git Workflow
- Main branch: `main`
- Commit messages should be descriptive
- Test before committing

---

## Notes
- Add specific planning details as development progresses
- Update this document with architectural decisions
- Track dependencies and version updates

---