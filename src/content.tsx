import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './content/App';
import sidebarStyles from './content/styles/sidebar.css?inline';

const HOST_ID = 'ytmusic-filters-shadow-host';

function initContentScript() {
  if (document.getElementById(HOST_ID)) {
    return;
  }

  // Create container element
  const host = document.createElement('div');
  host.id = HOST_ID;
  host.style.position = 'fixed';
  host.style.top = '0';
  host.style.left = '0';
  host.style.width = '0';
  host.style.height = '0';
  host.style.zIndex = '2147483647';
  host.style.overflow = 'visible';
  document.body.appendChild(host);

  // Attach Shadow DOM to isolate CSS
  const shadowRoot = host.attachShadow({ mode: 'open' });

  // Inject Styles into shadow DOM
  const styleEl = document.createElement('style');
  styleEl.textContent = sidebarStyles;
  shadowRoot.appendChild(styleEl);

  // Mount React App inside Shadow DOM
  const rootEl = document.createElement('div');
  rootEl.id = 'ytmusic-filters-root';
  shadowRoot.appendChild(rootEl);

  const reactRoot = createRoot(rootEl);
  reactRoot.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  console.log('[YT Music Filters] Phase 1 Extension Framework successfully injected inside Shadow DOM.');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initContentScript);
} else {
  initContentScript();
}

// Keep an observer to ensure host isn't removed during YTM SPA transitions
const observer = new MutationObserver(() => {
  if (document.body && !document.getElementById(HOST_ID)) {
    initContentScript();
  }
});

if (document.body) {
  observer.observe(document.body, { childList: true });
} else {
  window.addEventListener('DOMContentLoaded', () => {
    observer.observe(document.body, { childList: true });
  });
}