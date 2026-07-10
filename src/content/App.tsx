import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../shared/db';
import { parsePlaylistId, parsePlaylistTitle } from './parser/playlistParser';
import { usePlaylistExtractor } from './hooks/usePlaylistExtractor';
import { 
  Filter, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Music, 
  Settings, 
  BarChart2, 
  RefreshCw, 
  Search,
  ListMusic
} from 'lucide-react';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'songs' | 'filters' | 'analytics' | 'settings'>('songs');
  
  const playlistId = parsePlaylistId() || '';
  
  // Use our extractor hook
  const { isExtracting, triggerExtraction } = usePlaylistExtractor();

  // Retrieve playlist details from Dexie DB
  const playlist = useLiveQuery(
    async () => {
      if (!playlistId) return undefined;
      return db.playlists.get(playlistId);
    },
    [playlistId]
  );

  // Retrieve tracks from Dexie DB
  const tracks = useLiveQuery(
    async () => {
      if (!playlistId) return [];
      return db.tracks.where('playlistId').equals(playlistId).toArray();
    },
    [playlistId]
  );

  // Toggle sidebar
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="font-sans text-zinc-100 select-none">
      {/* Floating Toggle Button (Visible when sidebar is closed) */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-24 right-4 z-50 flex items-center justify-center w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group"
          title="Open YT Music Filters"
        >
          <Filter size={20} className="group-hover:rotate-12 transition-transform" />
        </button>
      )}

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 right-0 h-screen w-96 sidebar-glass text-zinc-100 shadow-2xl flex flex-col z-50 transition-transform duration-300 ease-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Resize/Collapse handle on the left edge */}
        <button
          onClick={toggleSidebar}
          className="absolute top-1/2 -left-3 transform -translate-y-1/2 flex items-center justify-center w-6 h-12 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white rounded-l-md cursor-pointer transition-colors shadow-md"
        >
          {isOpen ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

        {/* Sidebar Header */}
        <div className="p-4 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-950/40">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-md shadow-red-900/20">
              <Filter size={16} />
            </div>
            <div>
              <h1 className="text-base font-semibold tracking-wide text-zinc-100">YT Music Filters</h1>
              <p className="text-[10px] text-zinc-500 font-medium tracking-wider uppercase">Beta Workspace</p>
            </div>
          </div>
          <button
            onClick={toggleSidebar}
            className="p-1.5 hover:bg-zinc-800/60 rounded-md text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Active Playlist Header Banner */}
        {playlistId && (
          <div className="px-4 py-3 bg-zinc-900/40 border-b border-zinc-800/60 flex items-center justify-between">
            <div className="truncate pr-2">
              <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">Active Playlist</p>
              <h2 className="text-sm font-semibold truncate text-zinc-200" title={playlist?.title || 'Loading playlist...'}>
                {playlist?.title || parsePlaylistTitle() || 'Unknown Playlist'}
              </h2>
            </div>
            <button
              onClick={triggerExtraction}
              disabled={isExtracting}
              className={`p-1.5 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-zinc-300 rounded-md transition-all cursor-pointer flex items-center gap-1.5 text-xs font-medium border border-zinc-700/50 ${
                isExtracting ? 'animate-pulse' : ''
              }`}
              title="Re-scan current playlist"
            >
              <RefreshCw size={12} className={isExtracting ? 'animate-spin' : ''} />
              Sync
            </button>
          </div>
        )}

        {/* No Active Playlist Warning */}
        {!playlistId && (
          <div className="m-4 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-center">
            <Music className="mx-auto mb-2 text-zinc-600" size={32} />
            <h3 className="text-sm font-semibold text-zinc-300">No playlist detected</h3>
            <p className="text-xs text-zinc-500 mt-1">
              Please open a playlist on YouTube Music to begin.
            </p>
          </div>
        )}

        {/* Sidebar Tabs */}
        {playlistId && (
          <div className="flex bg-zinc-950/20 border-b border-zinc-800/60 text-xs text-zinc-400 font-medium">
            <button
              onClick={() => setActiveTab('songs')}
              className={`flex-1 py-3 text-center border-b-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'songs' 
                  ? 'border-red-600 text-zinc-100 font-semibold bg-zinc-900/20' 
                  : 'border-transparent hover:text-zinc-200 hover:bg-zinc-900/10'
              }`}
            >
              <ListMusic size={14} />
              Songs ({tracks?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('filters')}
              className={`flex-1 py-3 text-center border-b-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'filters' 
                  ? 'border-red-600 text-zinc-100 font-semibold bg-zinc-900/20' 
                  : 'border-transparent hover:text-zinc-200 hover:bg-zinc-900/10'
              }`}
            >
              <Filter size={14} />
              Filters
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex-1 py-3 text-center border-b-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'analytics' 
                  ? 'border-red-600 text-zinc-100 font-semibold bg-zinc-900/20' 
                  : 'border-transparent hover:text-zinc-200 hover:bg-zinc-900/10'
              }`}
            >
              <BarChart2 size={14} />
              Charts
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`p-3 border-b-2 transition-all cursor-pointer flex items-center justify-center ${
                activeTab === 'settings' 
                  ? 'border-red-600 text-zinc-100 bg-zinc-900/20' 
                  : 'border-transparent hover:text-zinc-200 hover:bg-zinc-900/10'
              }`}
              title="Settings"
            >
              <Settings size={14} />
            </button>
          </div>
        )}

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-zinc-900/10">
          {playlistId && activeTab === 'songs' && (
            <div className="p-3 space-y-2">
              {/* Simple Search Placeholder */}
              <div className="relative mb-3">
                <input
                  type="text"
                  placeholder="Search songs in playlist..."
                  disabled
                  className="w-full bg-zinc-950/40 border border-zinc-800/80 rounded-lg py-2 pl-9 pr-3 text-xs text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 cursor-not-allowed opacity-60"
                />
                <Search size={14} className="absolute left-3 top-2.5 text-zinc-600" />
              </div>

              {/* Tracks List */}
              {tracks && tracks.length > 0 ? (
                <div className="space-y-1.5">
                  {tracks.map((track) => (
                    <div 
                      key={track.id} 
                      className="p-2 bg-zinc-900/35 hover:bg-zinc-800/40 border border-zinc-900 rounded-lg flex items-center gap-3 transition-all hover:translate-x-0.5 group"
                    >
                      {/* Song Image */}
                      <div className="relative w-10 h-10 rounded bg-zinc-850 overflow-hidden flex-shrink-0 border border-zinc-800/50">
                        {track.thumbnail ? (
                          <img src={track.thumbnail} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-zinc-600 bg-zinc-900">
                            <Music size={16} />
                          </div>
                        )}
                      </div>

                      {/* Song Details */}
                      <div className="flex-1 min-w-0 pr-1">
                        <h4 className="text-xs font-medium text-zinc-200 truncate group-hover:text-white transition-colors" title={track.title}>
                          {track.title}
                        </h4>
                        <p className="text-[10px] text-zinc-500 truncate mt-0.5 font-medium" title={track.artist}>
                          {track.artist} {track.album && `\u2022 ${track.album}`}
                        </p>
                      </div>

                      {/* Duration */}
                      <div className="text-[10px] text-zinc-500 font-semibold pr-1">
                        {track.duration}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-zinc-500">
                  <Music className="mx-auto mb-3 opacity-20" size={40} />
                  <p className="text-xs">No tracks extracted yet.</p>
                  <p className="text-[10px] text-zinc-600 mt-1">Scroll down the playlist to parse items.</p>
                </div>
              )}
            </div>
          )}

          {playlistId && activeTab === 'filters' && (
            <div className="p-6 text-center text-zinc-500 space-y-3">
              <Filter className="mx-auto opacity-20" size={48} />
              <div>
                <h3 className="text-xs font-semibold text-zinc-300">Filters coming in Phase 4</h3>
                <p className="text-[10px] text-zinc-650 mt-1">
                  You'll be able to filter by Artist, Album, and Duration range.
                </p>
              </div>
            </div>
          )}

          {playlistId && activeTab === 'analytics' && (
            <div className="p-6 text-center text-zinc-500 space-y-3">
              <BarChart2 className="mx-auto opacity-20" size={48} />
              <div>
                <h3 className="text-xs font-semibold text-zinc-300">Analytics coming in Phase 7</h3>
                <p className="text-[10px] text-zinc-650 mt-1">
                  Insights like genre share, decade charts, and duration breakdown.
                </p>
              </div>
            </div>
          )}

          {playlistId && activeTab === 'settings' && (
            <div className="p-4 space-y-4 text-xs">
              <div>
                <h3 className="font-semibold text-zinc-300 mb-2">Extension Info</h3>
                <div className="p-3 bg-zinc-950/40 border border-zinc-800/80 rounded-lg space-y-1.5 text-[11px] text-zinc-400">
                  <div className="flex justify-between">
                    <span>Version:</span>
                    <span className="text-zinc-200">0.0.1 (Phase 2)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Database:</span>
                    <span className="text-zinc-200">IndexedDB (Dexie)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Engine:</span>
                    <span className="text-zinc-200">DOM Playlist Parser</span>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-zinc-950/20 border border-zinc-900 rounded-lg text-[10px] text-zinc-500 leading-normal">
                Designed to run alongside YouTube Music. Open a playlist, and the extraction engine will automatically read the visible tracks in the DOM and save them locally.
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Footer Status */}
        <div className="p-3 border-t border-zinc-800/60 bg-zinc-950/30 flex items-center justify-between text-[10px] font-semibold text-zinc-500 tracking-wide">
          <span className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${playlistId ? 'bg-green-500 shadow-sm shadow-green-500/20' : 'bg-amber-500'}`}></span>
            {playlistId ? 'SYNCED TO IDB' : 'IDLE'}
          </span>
          <span>DEV BUILD v0.0.1</span>
        </div>
      </div>
    </div>
  );
}
