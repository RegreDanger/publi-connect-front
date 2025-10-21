# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Publi-Connect is a WiFi captive portal application built with React, TypeScript, and Vite. The application provides a two-phase user registration system for public WiFi access:

1. **Quick Access**: Users provide name and email for 5 minutes of free WiFi
2. **Complete Access**: Users complete their profile (phone, age, gender, postal code) for unlimited WiFi access

## Development Commands

### Development Server
```bash
pnpm dev
# Runs on http://0.0.0.0:5173 (accessible from other devices on network)
```

### Build
```bash
pnpm build
# Compiles TypeScript and builds the production bundle
```

### Lint
```bash
pnpm lint
# Runs ESLint to check code quality
```

### Preview Production Build
```bash
pnpm preview
# Previews the production build locally
```

## Architecture

### Component Structure

The application uses a single-page architecture with a carousel-based UI that supports both desktop and mobile touch gestures.

**Main Components:**

- `PubliConnectPortal.tsx` (src/components/PubliConnect/PubliConnectPortal.tsx:79) - Main orchestrator component
  - Manages registration phase state (`quick` or `complete`)
  - Handles form data for both registration phases
  - Implements carousel navigation with touch gestures
  - Contains email validation logic with restricted domain support
  - Auto-detects network information (MAC address, SSID)

- `QuickAccessForm.tsx` - Collects name and email for 5-minute access
  - Simple two-field form (nombre, correo)
  - First step in the registration flow

- `CompleteAccessForm.tsx` - Extended registration form
  - Displays both quick data (editable) and complete data fields
  - Collects: phone, age, gender, postal code
  - Includes hidden fields for backend: authProvider, macAddress, ssid
  - Only accessible after completing quick access

- `InfoSidebar.tsx` - Informational sidebar
  - Displays welcome message and features
  - Second slide in mobile carousel view
  - Purely presentational, no props currently used

### Data Flow

The portal manages two separate data objects:

1. **QuickData**: `{ nombre: string, correo: string }`
2. **CompleteData**: `{ numero, edad, genero, codigoPostal, authProvider, macAddress, ssid }`

When complete access form is submitted, both objects are merged into a backend-ready format at src/components/PubliConnect/PubliConnectPortal.tsx:198:

```typescript
{
  name, age, gender, email, phoneNo, zipCode,
  authProvider, macAddress, ssid
}
```

### Email Validation

The portal implements strict email validation (src/components/PubliConnect/PubliConnectPortal.tsx:26):

- **Allowed domains**: gmail, hotmail, outlook, yahoo, icloud, protonmail, live, msn, aol, mail
- **Allowed TLDs**: .com, .mx, .es
- Enforces single @ symbol, no spaces, valid domain structure
- Returns detailed error messages for invalid formats

### State Management

Registration flow is controlled by `quickAccessCompleted` state:
- Users must complete quick access before accessing complete form
- Phase buttons are disabled/locked based on completion state
- Alert notifications guide users through the flow

### Mobile Support

The application implements a carousel interface with:
- Touch gesture detection (swipe left/right)
- Two-slide layout: Form section and Info section
- Visual indicators for current slide
- Responsive design for mobile and desktop

## Styling

- Global styles: `src/index.css` (minimal reset)
- Component styles: `src/components/PubliConnect/PortalStyle.css` (all portal styling)
- Bootstrap 5.3.8 is installed but may not be actively used
- Uses CSS custom properties for consistent theming

## Backend Integration Notes

The application is frontend-ready with backend integration points prepared at:
- Quick access submission: src/components/PubliConnect/PubliConnectPortal.tsx:169
- Complete registration: src/components/PubliConnect/PubliConnectPortal.tsx:213

Comments in Spanish indicate where backend endpoints should be connected.

## TypeScript Configuration

- Strict mode enabled
- Target: ES2022
- Module: ESNext with bundler resolution
- Unused locals/parameters checking enabled
- React JSX transform

## Network Configuration

Vite dev server configured to:
- Bind to 0.0.0.0 (accessible from network devices)
- Run on port 5173 with strict port enforcement
- Useful for testing on mobile devices during development
