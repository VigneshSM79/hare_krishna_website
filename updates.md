# Updates Log

This document tracks all updates and changes made to the Hare Krishna Temple website.

---

## [2025-11-03]

### Initial Setup
- Created updates.md and planning.md documentation files
- Application currently uses Vite + React + TypeScript
- Integrated with ImageKit.io for image management
- Integrated with Supabase for backend services

### ImageKit Gallery Automation Feature
**Type:** Feature / Enhancement

**Changes:**
- Added `listFilesFromFolder()` function to imagekit.ts for fetching images from ImageKit API
- Implemented automated sync functionality in AdminGalleryManager to import images from ImageKit folders
- Added "Sync from ImageKit" button with dialog UI in admin panel
- Updated Gallery.tsx to fetch images from Supabase instead of hardcoded Pexels images
- Gallery now dynamically loads images from database with category filtering
- Added loading states and empty state handling

**Files Modified:**
- `src/lib/imagekit.ts` - Added ImageKit List Files API integration
- `src/components/AdminGalleryManager.tsx` - Added sync functionality and UI
- `src/components/Gallery.tsx` - Converted to dynamic data fetching from Supabase

**How to Use:**
1. Go to Admin Panel > Gallery Manager
2. Click "Sync Folder" button
3. Enter ImageKit folder path (e.g., `/2025 hare krishna janmastami`)
4. Click "Start Sync" - all images will be automatically imported to Supabase
5. Gallery page will now display these images with category filtering

**Notes:**
- No manual URL copying needed anymore
- All images automatically tagged with category "festivals"
- Display order is auto-incremented
- Image names are converted to readable alt text
- Works with your existing ImageKit and Supabase credentials

**Admin Authentication Setup:**
To use the admin panel, you need to create an admin user in Supabase:
1. Go to Supabase Dashboard > Authentication > Users
2. Click "Add User"
3. Enter email and password
4. Enable "Auto Confirm User"
5. Use these credentials to login at `/admin` route
6. Row Level Security policies require authentication for INSERT/UPDATE/DELETE operations

### About and Programs Pages Implementation
**Type:** Feature / Bug Fix

**Changes:**
- Added About and Programs components to main application
- Redesigned About page with spiritual mission content from about.txt
- Added Programs link to header navigation
- Fixed critical navigation issue where About link didn't work

**Files Modified:**
- `src/App.tsx` - Added About and Programs imports and rendered components
- `src/components/About.tsx` - Complete redesign with new mission-focused content
- `src/components/Header.tsx` - Added Programs to navigation menu

**New About Page Features:**
- Mission statement explaining the purpose of human life
- Three core principles: Chant Holy Names, Read Srimad Bhagavatam, Honor Prasadam
- Detailed explanation of root causes of suffering
- Scriptural quotes from Sri Chaitanya Mahaprabhu, Srimad Bhagavatam, and Bhagavad Gita
- Beautiful card-based layout with gradient backgrounds
- Responsive design with hover effects
- Benefits section showing Happiness, Good Health, Peace of Mind, All Good Qualities

**Navigation Structure:**
- Home → About → Programs → Events → Gallery → Contact

**Content Source:**
- Content sourced from about.txt
- Maintained spiritual authenticity and scriptural references
- Sanskrit verses included with translations

### Google Maps Integration
**Type:** Feature

**Changes:**
- Integrated Google Maps embed in Contact page
- Replaced "Interactive Map Coming Soon" placeholder with live Google Maps iframe
- Added "Open in Google Maps" and "Get Directions" buttons
- Updated temple address across all components (Contact, Footer)
- Corrected address to: 147, Chinnamman Koil St, Paruthippattu, Annamalai Nagar, Ambattur, Avadi, Chennai, Tamil Nadu 600054

**Files Modified:**
- `src/components/Contact.tsx` - Added Google Maps embed and updated address
- `src/components/Footer.tsx` - Updated address

**Features:**
- Fully interactive embedded Google Map
- Users can zoom, pan, and view in street view
- Direct link to open in Google Maps app
- "Get Directions" button for navigation
- Responsive design - works on mobile and desktop
- No API key required
- Lazy loading for better performance

**Technical Details:**
- Using Google Maps iframe embed
- Added `allowFullScreen` for full map experience
- Added `loading="lazy"` for performance optimization
- Used `referrerPolicy="no-referrer-when-downgrade"` for security
- Links open in new tab with `target="_blank"` and `rel="noopener noreferrer"`

### Previous Updates (from git history)
- Completed ImageKit.io integration
- Updated AdminGalleryManager.tsx
- Fixed ImageKit import syntax error
- Updated AdminCarouselManager.tsx

---

## Template for Future Updates

### [YYYY-MM-DD] - Update Title
**Type:** Feature / Bug Fix / Enhancement / Refactor

**Changes:**
- Change description
- Another change

**Files Modified:**
- `path/to/file.tsx`

**Notes:**
- Any additional context or important information

---