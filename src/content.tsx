import { createRoot } from 'react-dom/client';
import App from './content/App';
import styles from './content/index.css?inline';

// Self-executing initialization to prevent polluting global namespace
(() => {
  // Ensure we only mount the sidebar once
  if (document.getElementById('ytmusic-filters-root')) {
    return;
  }

  const container = document.createElement('div');
  container.id = 'ytmusic-filters-root';
  
  // Apply structural container styles to prevent page content shift
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.right = '0';
  container.style.height = '100vh';
  container.style.zIndex = '999999';
  container.style.display = 'block';
  
  document.body.appendChild(container);
  
  // Attach Shadow DOM for CSS isolation
  const shadowRoot = container.attachShadow({ mode: 'open' });
  
  // Inject Compiled CSS Stylesheet
  const styleEl = document.createElement('style');
  styleEl.textContent = styles;
  shadowRoot.appendChild(styleEl);
  
  // Create React mount anchor
  const mountPoint = document.createElement('div');
  mountPoint.id = 'app-mount';
  shadowRoot.appendChild(mountPoint);
  
  // Render Sidebar App
  const root = createRoot(mountPoint);
  root.render(<App />);
})();