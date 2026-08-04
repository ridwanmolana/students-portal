# Student Monitoring & Parent Information Portal PRD v2.0

## Overview

Modern PWA for parents and students using Google Spreadsheet + Google
Drive.

## Tech Stack

-   Frontend: Next.js 15, React 19, TypeScript, Tailwind CSS
-   Backend: Next.js API Routes, TypeScript
-   Database: Google Spreadsheet
-   Storage: Google Drive
-   Hosting: Vercel
-   PWA: next-pwa
-   Image: next/image
-   Cache: React Query + ISR

## Modules

### Home

-   Today's Reminder
-   Birthday (05:00)
-   Upcoming Reminder
-   Quick Access

### Reminder

-   Source: Google Sheet
-   Filter date
-   Paging 7 days
-   Skeleton loading

### Topic

-   Filter week/month
-   Paging
-   Search

### Behaviour

-   PIN authentication
-   Timeline
-   Pagination
-   Rate limit

### Schedule

-   PDF preview
-   Download

### Gallery

-   Dynamic folders
-   Infinite scroll
-   Fullscreen
-   Swipe
-   Lazy loading
-   Thumbnail cache

### Materials

-   PDF preview
-   Search

## Global Search

Search across Reminder, Topic, Gallery, Materials, Schedule.

## Spreadsheet Schema

### Students

StudentID, Name, Gender, DateOfBirth, PIN

### Behaviour

StudentID, DateMIS, Behaviour, TeacherNotes

### Reminder

Date, Day, Notes

### Topic

Month, Week, Subject, Topic, Activities, Task

## API

-   GET /api/dashboard
-   GET /api/reminders
-   GET /api/topics
-   POST /api/pin
-   GET /api/behaviour
-   GET /api/gallery
-   GET /api/gallery/:folder
-   GET /api/materials
-   GET /api/schedule
-   GET /api/search

## Performance

-   First Load \<2s
-   API \<500ms
-   Google Sheet Cache 5m
-   Drive Cache 10m

## Security

-   Backend-only Google API
-   Env Variables
-   Zod Validation
-   Rate Limit
-   CSP Headers

## PWA

-   Installable
-   Offline cache
-   Splash screen
-   Standalone
-   Background sync ready

## Skeleton Loading

Dashboard, Reminder, Topic, Gallery, Behaviour, PDF

## Image Optimization

-   next/image
-   WebP/AVIF
-   Lazy loading
-   Blur placeholder
-   Responsive images
-   Cached thumbnails

## Folder Structure

``` text
app/
components/
hooks/
services/
lib/
types/
public/
```

## Future

-   Admin Panel
-   Push Notification
-   Multi-language
-   WhatsApp Integration
-   Academic Calendar
