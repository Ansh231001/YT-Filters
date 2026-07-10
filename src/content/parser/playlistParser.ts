import { SELECTORS } from './selectors';
import type { Track } from '../../shared/db';

/**
 * Converts a duration string (e.g., "3:45", "1:02:15") into total seconds.
 */
export function parseDurationToSeconds(durationStr: string): number {
  if (!durationStr) return 0;
  const parts = durationStr.trim().split(':').map(Number);
  if (parts.some(isNaN)) return 0;
  
  if (parts.length === 2) {
    // MM:SS
    return parts[0] * 60 + parts[1];
  } else if (parts.length === 3) {
    // H:MM:SS
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  return 0;
}

/**
 * Extracts the playlist ID from the current page URL.
 */
export function parsePlaylistId(): string | null {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('list');
}

/**
 * Extracts the playlist title from the page DOM.
 */
export function parsePlaylistTitle(): string {
  const titleEl = document.querySelector(SELECTORS.PLAYLIST_TITLE);
  return titleEl?.textContent?.trim() || 'Unknown Playlist';
}

/**
 * Parses a single song element (ytmusic-responsive-list-item-renderer)
 * into a structured Track object.
 */
export function parseSongRow(el: Element, playlistId: string): Track | null {
  try {
    // 1. Title and Video ID extraction
    const titleLinkEl = el.querySelector(SELECTORS.TITLE_LINK) as HTMLAnchorElement | null;
    const titleTextEl = el.querySelector(SELECTORS.TITLE_TEXT);
    
    const title = titleLinkEl?.textContent?.trim() || titleTextEl?.textContent?.trim() || 'Unknown Title';
    
    // Extract video ID from the watch href parameter (e.g., watch?v=XYZ)
    let videoId = '';
    const href = titleLinkEl?.getAttribute('href') || '';
    if (href) {
      const match = href.match(/[?&]v=([^&]+)/);
      if (match && match[1]) {
        videoId = match[1];
      }
    }
    
    // Fallback if no video ID is found
    if (!videoId) {
      // Look for any anchor tag inside the row that might contain a video ID
      const anyWatchLink = el.querySelector('a[href*="watch?v="]') as HTMLAnchorElement | null;
      if (anyWatchLink) {
        const href = anyWatchLink.getAttribute('href') || '';
        const match = href.match(/[?&]v=([^&]+)/);
        if (match && match[1]) {
          videoId = match[1];
        }
      }
    }
    
    if (!videoId) {
      // If still no video ID, we cannot track this song uniquely. Skip or assign a hash.
      return null;
    }

    // 2. Artist & Album extraction from byline
    const bylineEl = el.querySelector(SELECTORS.BYLINE_WRAPPER);
    let artist = 'Unknown Artist';
    let album = '';
    
    if (bylineEl) {
      const text = bylineEl.textContent || '';
      // Split by bullet character: \u2022 or \u00b7
      const parts = text.split(/(?:\s*\u2022\s*|\s*\u00b7\s*)/);
      if (parts.length > 0) {
        artist = parts[0]?.trim() || 'Unknown Artist';
      }
      if (parts.length > 1) {
        album = parts[1]?.trim() || '';
      }
      
      // If the second part looks like plays or views, it is not an album
      if (album.includes('plays') || album.includes('views') || /^\d+(?:\.\d+)?[KMB]?$/i.test(album)) {
        album = '';
      }
    }

    // 3. Duration extraction
    const durationEl = el.querySelector(SELECTORS.DURATION);
    const duration = durationEl?.textContent?.trim() || '0:00';
    const durationSeconds = parseDurationToSeconds(duration);

    // 4. Thumbnail extraction
    const imgEl = el.querySelector(SELECTORS.THUMBNAIL) as HTMLImageElement | null;
    // Check src or data-src/srcset in case it is lazy loaded
    let thumbnail = imgEl?.getAttribute('src') || '';
    if (!thumbnail || thumbnail.startsWith('data:image')) {
      thumbnail = imgEl?.getAttribute('data-src') || imgEl?.srcset || '';
    }
    
    // Normalize thumbnail url
    if (thumbnail && thumbnail.startsWith('//')) {
      thumbnail = 'https:' + thumbnail;
    }

    return {
      id: videoId,
      playlistId,
      title,
      artist,
      album,
      duration,
      durationSeconds,
      thumbnail,
      addedAt: Date.now(),
    };
  } catch (error) {
    console.error('Error parsing song row:', error);
    return null;
  }
}

/**
 * Scans the page for all visible songs in the playlist.
 */
export function parseVisibleSongs(playlistId: string): Track[] {
  const songElements = document.querySelectorAll(SELECTORS.SONG_ROW);
  const tracks: Track[] = [];
  
  for (const el of Array.from(songElements)) {
    const track = parseSongRow(el, playlistId);
    if (track) {
      tracks.push(track);
    }
  }
  
  return tracks;
}
