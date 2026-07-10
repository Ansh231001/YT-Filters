import Dexie, { type Table } from 'dexie';

export interface Playlist {
  id: string; // Playlist ID from YouTube Music URL (e.g. list=...)
  title: string;
  trackCount: number;
  lastParsedAt: number; // Timestamp
}

export interface Track {
  dbId?: number; // Auto-incrementing primary key
  id: string; // Video ID from YouTube Music (watch?v=...)
  playlistId: string; // Reference to Playlist
  title: string;
  artist: string;
  album: string;
  duration: string; // Duration as "MM:SS" or "H:MM:SS"
  durationSeconds: number; // For filtering/sorting by duration
  thumbnail: string; // Thumbnail URL
  addedAt: number; // Timestamp of extraction
}

export class YTMusicFiltersDB extends Dexie {
  playlists!: Table<Playlist>;
  tracks!: Table<Track>;

  constructor() {
    super('YTMusicFiltersDB');
    this.version(1).stores({
      playlists: 'id, title, lastParsedAt',
      tracks: '++dbId, [playlistId+id], playlistId, id, artist, album, durationSeconds',
    });
  }
}

export const db = new YTMusicFiltersDB();
