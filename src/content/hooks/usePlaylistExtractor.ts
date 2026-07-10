import { useState, useEffect, useRef, useCallback } from 'react';
import { db } from '../../shared/db';
import { 
  parsePlaylistId, 
  parsePlaylistTitle, 
  parseVisibleSongs 
} from '../parser/playlistParser';
import { SELECTORS } from '../parser/selectors';

export function usePlaylistExtractor() {
  const [isExtracting, setIsExtracting] = useState(false);
  const currentPlaylistIdRef = useRef<string | null>(null);
  const observerRef = useRef<MutationObserver | null>(null);
  const debounceTimerRef = useRef<number | null>(null);

  // Core extraction logic
  const triggerExtraction = useCallback(async () => {
    const playlistId = parsePlaylistId();
    if (!playlistId) return;

    setIsExtracting(true);
    try {
      const title = parsePlaylistTitle();
      const tracks = parseVisibleSongs(playlistId);

      if (tracks.length > 0) {
        // Save/Update playlist details
        await db.playlists.put({
          id: playlistId,
          title,
          trackCount: tracks.length,
          lastParsedAt: Date.now()
        });

        // Use bulkPut to upsert tracks. The composite key [playlistId+id] handles uniqueness per playlist.
        await db.tracks.bulkPut(tracks);
      }
    } catch (error) {
      console.error('[YT Music Filters] Extraction failed:', error);
    } finally {
      setIsExtracting(false);
    }
  }, []);

  // Debounced wrapper for extraction
  const debouncedExtract = useCallback(() => {
    if (debounceTimerRef.current) {
      window.clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = window.setTimeout(() => {
      triggerExtraction();
    }, 1200); // 1.2s debounce to allow DOM to settle during scroll/navigation
  }, [triggerExtraction]);

  // Hook setup for SPA page tracking & DOM changes
  useEffect(() => {
    const handlePageNavigation = () => {
      const newPlaylistId = parsePlaylistId();
      
      // If playlist ID changes, perform initial scan and bind observers
      if (newPlaylistId !== currentPlaylistIdRef.current) {
        currentPlaylistIdRef.current = newPlaylistId;
        
        // Clean up previous observer
        if (observerRef.current) {
          observerRef.current.disconnect();
          observerRef.current = null;
        }

        if (newPlaylistId) {
          // Trigger immediate scan
          triggerExtraction();
          
          // Setup observer to watch for infinite scroll loads
          setupDOMObserver();
        }
      }
    };

    const setupDOMObserver = () => {
      // Find the element containing the list of items
      const targetNode = document.querySelector(SELECTORS.PLAYLIST_SHELF) || document.body;
      
      const observer = new MutationObserver((mutations) => {
        // Check if any row was added
        let hasNewRows = false;
        for (const mutation of mutations) {
          if (mutation.addedNodes.length > 0) {
            hasNewRows = Array.from(mutation.addedNodes).some(node => {
              if (node instanceof Element) {
                return node.matches(SELECTORS.SONG_ROW) || node.querySelector(SELECTORS.SONG_ROW);
              }
              return false;
            });
          }
          if (hasNewRows) break;
        }

        if (hasNewRows) {
          debouncedExtract();
        }
      });

      observer.observe(targetNode, {
        childList: true,
        subtree: true
      });

      observerRef.current = observer;
    };

    // YTM is an SPA; check URL changes via polling
    const urlCheckInterval = setInterval(handlePageNavigation, 1500);

    // Initial invocation
    handlePageNavigation();

    // Cleanup
    return () => {
      clearInterval(urlCheckInterval);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (debounceTimerRef.current) {
        window.clearTimeout(debounceTimerRef.current);
      }
    };
  }, [triggerExtraction, debouncedExtract]);

  return {
    isExtracting,
    triggerExtraction
  };
}
