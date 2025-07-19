# ChronoBit Frontend

A React TypeScript frontend for **ChronoBit** - a digital real estate application where users can claim historical dates as NFTs.

## About

ChronoBit allows users to:
- Browse and claim historical dates as digital assets
- View interactive 3D visualizations and animations
- Manage their claimed dates through a user-friendly interface
- Navigate through different time periods with calendar components

## Features

- **Interactive 3D Components**: DNA strands, time spheres, and wave grid backgrounds
- **Calendar Interface**: Year, month, and date selection grids
- **Claim System**: Form overlays and modals for claiming dates
- **User Management**: Profile and vault pages for managing assets
- **Modern UI**: Built with React, TypeScript, and Vite

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: CSS with modern animations
- **3D Graphics**: Custom Three.js components
- **State Management**: React hooks and context

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── Components/
│   ├── 3D/           # 3D visualization components
│   ├── Form/         # Calendar and form components
│   └── Navigation.tsx
├── Pages/            # Main application pages
├── api/              # API integration
└── assets/           # Static assets
```

## Development

This project uses:
- **ESLint** for code quality
- **TypeScript** for type safety
- **Vite** for fast development and building

For detailed ESLint configuration, see `eslint.config.js`.
