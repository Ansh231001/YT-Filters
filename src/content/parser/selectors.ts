export const SELECTORS = {
  // Container of the playlist shelf
  PLAYLIST_SHELF: 'ytmusic-playlist-shelf-renderer, ytmusic-section-list-renderer',
  
  // Single song row container
  SONG_ROW: 'ytmusic-responsive-list-item-renderer',
  
  // Playlist details selectors
  PLAYLIST_TITLE: 'ytmusic-playlist-header-renderer h2.title, ytmusic-responsive-header-renderer h2.title, h1.title',
  
  // Song details within SONG_ROW
  TITLE_LINK: '.title-column yt-formatted-string a, a.yt-simple-endpoint.yt-formatted-string',
  TITLE_TEXT: '.title-column yt-formatted-string, .title',
  
  // Byline / Secondary columns containing Artist and Album
  BYLINE_WRAPPER: '.secondary-flex-columns yt-formatted-string',
  
  // Duration column
  DURATION: '.fixed-column yt-formatted-string, .fixed-columns yt-formatted-string',
  
  // Thumbnail image
  THUMBNAIL: 'yt-img-shadow img, img#img',
};
