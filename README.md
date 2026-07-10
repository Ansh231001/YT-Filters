# YT Music Filters 🎵🔍

[![Chrome Web Store](https://img.shields.io/badge/Chrome_Web_Store-v0.0.1-green.svg)](https://chrome.google.com/webstore)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-secondary)](http://makeapullrequest.com)

**YT Music Filters** is a modern, high-performance Chrome Extension designed to revolutionize playlist management in YouTube Music. Starting with the **Liked Songs** playlist, this extension injects a sleek, fast, and feature-rich sidebar directly into the YouTube Music web application to provide advanced filtering, sorting, searching, and organization capabilities.

---

## 🌟 Motivation

YouTube Music is a fantastic platform for music streaming, but its web interface lacks robust playlist management tools. Users with large playlists (especially the "Liked Songs" playlist, which often contains thousands of songs) struggle with:
* Lack of instant fuzzy searching.
* Absence of multi-dimensional filtering (e.g., filter by artist, album, duration, or release year).
* Limited sorting options (currently restricted to default order).
* No duplicate detection or advanced playlist analytics.

**YT Music Filters** addresses these limitations by adding a highly responsive, modern React interface directly into YouTube Music, giving users total control over their music library.

---

## ✨ Features

### 🚀 MVP Features (Current Scope)
- **Sidebar Integration**: Non-intrusive UI injected directly into the YouTube Music layout.
- **Robust DOM Playlist Parsing**: Efficiently reads the active playlist from the page structure.
- **Instant Search**: Micro-second fuzzy searching across titles, artists, and albums.
- **Advanced Filtering**:
  - Filter by Artist (with multi-select support)
  - Filter by Album
  - Filter by Duration range (e.g., < 3m, 3m-5m, > 5m)
- **Flexible Sorting**:
  - Artist Name (A-Z, Z-A)
  - Song Title (A-Z, Z-A)
  - Album Name (A-Z, Z-A)
  - Duration (Shortest to Longest, Longest to Shortest)
  - Recently Added (based on playlist order)
  - Random Shuffle (with seed-preservation)

### 🔮 Future Roadmap
- **Enriched Metadata Filtering**: Filter by Release Year, Genre, Language, Mood, Popularity, and BPM.
- **Smart Playlists**: Generate custom dynamic playlists based on rule sets (e.g., "90s Rock under 4 mins").
- **Metadata Enrichment**: Integration with third-party APIs (MusicBrainz, Last.fm, Discogs).
- **Playlist Analytics**: Genre distribution charts, artist statistics, and listening history visualization.
- **Duplicate Detection**: Identify and highlight duplicate tracks in playlists.
- **One-Click Playlist Generation**: Create and save filtered lists directly back to YouTube Music.

---

## 📸 Screenshots

*(Screenshots and GIFs showing the sidebar in action will be placed here)*
| Sidebar Interface | Filtering & Sorting | Fuzzy Search |
| :---: | :---: | :---: |
| ![Sidebar Placeholder](https://via.placeholder.com/300x500?text=Sidebar+Interface) | ![Filtering Placeholder](https://via.placeholder.com/300x500?text=Filtering+Options) | ![Fuzzy Search Placeholder](https://via.placeholder.com/300x500?text=Fuzzy+Search) |

---

## 🛠️ Tech Stack

- **Frontend Core**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vite.dev/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Extension Framework**: Chrome Extension Manifest V3, [@crxjs/vite-plugin](https://crxjs.dev/)
- **Storage Layer**: Chrome Storage API (for preferences), [Dexie.js](https://dexie.org/) / IndexedDB (for playlist metadata and caching)
- **Search Utility**: [Fuse.js](https://www.fusejs.io/) for high-performance client-side fuzzy searching

---

## 📁 Folder Structure

The project enforces a clean, modular, and highly decoupled folder structure to ensure maintainability as new features are added:

```text
src/
    content/              # Content script (injected into YouTube Music)
        components/       # UI Components (Sidebar, Filters, SortDropdown, SongList)
        hooks/            # Reusable React hooks (usePlaylist, useFilter, useFuseSearch)
        parser/           # DOM Parser engine (independent of React UI)
        services/         # External API and DOM lifecycle managers
        utils/            # Helper functions (time formatting, DOM selectors)
        types/            # TypeScript type definitions for content scripts
        App.tsx           # Content script React root component
        index.tsx         # Entry point for content script rendering

    background/           # Background Service Worker (handles storage sync, enrichment API calls)
        index.ts

    popup/                # Extension popup UI (extension status and settings)
        App.tsx
        index.tsx

    shared/               # Shared utilities, types, and constants between background & content
        types.ts
        constants.ts

public/                   # Static assets (icons, manifest configuration)

docs/                     # Architectural design docs, wireframes, and API specs
```

---

## 🏛️ Architecture Overview

YT Music Filters is structured around the principles of **Separation of Concerns** and **Minimal Main-Thread Blocking**:

1. **Content Script React UI**: Injected safely into the YouTube Music shell (`ytmusic-app`). Styled using Tailwind CSS to visually match YTM's dark glassmorphism theme.
2. **Decoupled DOM Parser**: Runs independently of the React rendering loop. It watches the playlist containers, extracts song records, and updates local state.
3. **Data & Caching Layer**: IndexedDB (managed via `Dexie.js`) caches playlist configurations and track metadata. This prevents performance degradation on large (1,000+ songs) playlists and avoids hitting external API limits.
4. **Background Service Worker**: Handles heavy lifting, scheduling metadata enrichment tasks (MusicBrainz/Last.fm), and maintaining cache integrity.

---

## 💻 Development Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [npm](https://www.npmjs.com/) (v9.0.0 or higher)

### Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/ytmusic-filters.git
   cd ytmusic-filters
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   This command starts the Vite development server and generates the unpacked extension in the `dist/` directory.

4. **Load the Extension in Chrome**:
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable **Developer mode** (toggle in top-right corner).
   - Click **Load unpacked** (top-left button).
   - Select the `dist/` folder in the project directory.

5. **Test on YouTube Music**:
   - Navigate to [YouTube Music](https://music.youtube.com/).
   - Open the "Liked Songs" or any playlist.
   - The YT Music Filters sidebar should slide in on the side.

---

## 🔄 Development Workflow

- **Hot Reloading**: The build uses `@crxjs/vite-plugin`, which enables Hot Module Replacement (HMR). Changes made to UI components in `src/content/components/` will update in the browser immediately.
- **Linting & Formatting**: We use [Oxlint](https://oxc.rs/) for ultra-fast code verification. Run linter before committing:
  ```bash
  npm run lint
  ```

---

## 🤝 Contributing

We welcome contributions of all types! To contribute:

1. **Find or Create an Issue**: Discuss changes in an issue before writing code.
2. **Follow Coding Standards**: Please read [AGENT.md](file:///d:/ytmusic-filters/AGENT.md) for strict coding style, naming conventions, and architectural rules.
3. **Submit a Pull Request**:
   - Branch name format: `feature/your-feature` or `bugfix/your-fix`.
   - Ensure linting passes (`npm run lint`).
   - Write clear, descriptive commit messages matching [Conventional Commits](https://www.conventionalcommits.org/).

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
