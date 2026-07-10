# YT Music Filters — Plan of Action (POA)

## Project Goal

Build a Chrome Extension that enhances YouTube Music by providing powerful filtering, searching, sorting, analytics, and playlist management features that are not available in the native application.

The extension should feel like a native part of YouTube Music while remaining fast, scalable, and maintainable.

---

# Phase 0 — Foundation

## Objective

Create a stable development environment that supports rapid iteration.

### Tasks

* Initialize project with Vite + React + TypeScript
* Configure CRXJS
* Configure Manifest V3
* Configure TailwindCSS
* Configure ESLint
* Configure Prettier
* Configure Husky + lint-staged
* Configure path aliases
* Create GitHub repository
* Create README.md
* Create AGENT.md

### Deliverables

* Extension loads successfully
* Hot reload works
* React renders inside YouTube Music

---

# Phase 1 — Extension Framework

## Objective

Build the extension shell before implementing functionality.

### Features

### Content Script

Inject React application into:

```
music.youtube.com
```

### Sidebar

Create a floating sidebar that can:

* Open
* Close
* Collapse
* Resize (future)

### Theme

Automatically detect

* Light Theme
* Dark Theme

### Routing

Prepare internal routing

```
Home

Filters

Analytics

Settings
```

### Deliverables

* Sidebar renders correctly
* No playlist interaction yet

---

# Phase 2 — Playlist Extraction

## Objective

Extract playlist information from YouTube Music.

### Research

Investigate

* DOM structure
* Internal YouTube API
* Dynamic loading
* Infinite scrolling

### Initial Implementation

Parse visible songs using DOM.

Extract

* Video ID
* Song Title
* Artist
* Album
* Duration
* Thumbnail

Represent as

```
Song {
    id
    title
    artist
    album
    duration
    thumbnail
}
```

### Future

Replace DOM parser with API parser when stable.

### Deliverables

* Complete playlist model
* Live updates when playlist changes

---

# Phase 3 — Search Engine

## Objective

Provide instant playlist searching.

### Features

Search by

* Song Title
* Artist
* Album

Implement

* Fuzzy Search
* Typo tolerance
* Highlight matches

Use

```
Fuse.js
```

### Deliverables

Instant search with <100ms latency.

---

# Phase 4 — Filtering Engine

## Objective

Create reusable filtering infrastructure.

### Initial Filters

Artist

Album

Duration

### Future Filters

Genre

Language

Release Year

Mood

Popularity

Explicit

Live

Remastered

Country

BPM

Decade

### Architecture

Each filter should implement

```
interface Filter {

    id

    label

    apply()

}
```

Filters should be composable.

### Deliverables

Multiple filters working simultaneously.

---

# Phase 5 — Sorting Engine

## Objective

Allow sorting independent of filtering.

### Sorting Options

Alphabetical

Artist

Album

Duration

Recently Added

Release Year

Popularity

Random

Ascending

Descending

### Deliverables

Sorting should preserve active filters.

---

# Phase 6 — Metadata Service

## Objective

Enrich playlist data.

### Sources

MusicBrainz

Last.fm

Discogs

### Store

Genre

Release Year

Language

Country

Mood

Popularity

Artist Image

Album Cover

### Cache

Use

IndexedDB

Cache forever unless invalidated.

### Deliverables

Metadata fetched automatically.

---

# Phase 7 — Analytics

## Objective

Generate insights from playlists.

### Statistics

Total Songs

Unique Artists

Albums

Average Duration

Most Played Artist

Longest Song

Shortest Song

Songs Per Year

Songs Per Genre

### Visualizations

Genre Pie Chart

Year Histogram

Artist Ranking

Duration Distribution

Listening Timeline

### Deliverables

Analytics dashboard.

---

# Phase 8 — Smart Playlists

## Objective

Generate playlists automatically.

Examples

```
Punjabi after 2020

Rock before 2005

Workout

Chill

Morning

Road Trip

Late Night

Hindi under 4 minutes

Artist Mixes
```

### Deliverables

One-click playlist generation.

---

# Phase 9 — Duplicate Detection

## Objective

Detect duplicate songs.

Cases

* Same video
* Live versions
* Acoustic
* Remastered
* Explicit
* Clean

### Deliverables

Duplicate manager.

---

# Phase 10 — Playlist Export

## Objective

Export filtered playlists.

Support

CSV

JSON

YouTube Playlist

### Deliverables

Export dialog.

---

# Phase 11 — Settings

Settings page

Theme

Animation

Metadata Providers

Cache

Import

Export

Keyboard Shortcuts

Advanced Mode

Developer Mode

---

# Phase 12 — Performance

Optimize

Virtual Lists

Memoization

Lazy Rendering

Caching

Background Sync

Debouncing

Target

10,000 songs

without lag.

---

# Phase 13 — Polish

Animations

Accessibility

Keyboard Navigation

Responsive Layout

Dark Mode

Tooltips

Loading States

Error States

Empty States

Notifications

---

# Phase 14 — Chrome Web Store

Prepare

Icons

Banner

Screenshots

Privacy Policy

Store Listing

Versioning

CI/CD

Release Pipeline

---

# Folder Structure

```
src/

    content/

        components/

        hooks/

        parser/

        filters/

        sorting/

        analytics/

        services/

        storage/

        models/

        utils/

        pages/

        App.tsx

        index.tsx

    background/

    popup/

    shared/

public/

docs/

tests/
```

---

# Suggested Git Commits

```
Initialize project

Configure CRXJS

Inject React app

Create sidebar

Implement theme detection

Build playlist parser

Normalize song model

Implement search

Implement filter engine

Implement sorting

Create metadata service

Add IndexedDB cache

Integrate MusicBrainz

Integrate Last.fm

Build analytics dashboard

Implement smart playlists

Duplicate detection

Settings page

Performance optimization

Prepare Chrome Store release
```

---

# MVP Milestone (v0.1)

By the first public release, users should be able to:

* Inject the extension into YouTube Music.
* View a sidebar without disrupting the native UI.
* Read the current playlist.
* Search songs instantly.
* Filter by artist, album, and duration.
* Sort by artist, title, album, duration, or random.
* Persist user preferences (e.g., selected filters) locally.
* Handle playlists with hundreds of songs smoothly.

---

# Stretch Goals (v0.2–v1.0)

* Metadata enrichment (genre, release year, language).
* Analytics dashboard with charts and insights.
* Smart playlists and advanced query syntax.
* Duplicate song detection.
* Playlist export and import tools.
* Local listening history and recommendations.
* Cross-browser support (Edge, Firefox) if feasible.

---

# Guiding Principles

1. Ship a working MVP before adding advanced features.
2. Prefer stable, well-tested solutions over clever ones.
3. Keep UI, parsing, business logic, and storage loosely coupled.
4. Optimize for responsiveness on large playlists.
5. Treat external metadata as an enhancement, not a dependency.
6. Design every feature so it can be extended without major refactoring.
7. Document architectural decisions as the project evolves.
8. Build with long-term maintainability and open-source collaboration in mind.
