import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import manifest from './manifest.json' with { type: 'json' }

// Custom plugin to guarantee 100% ASCII output in extension bundles, preventing Chrome's "It isn't UTF-8 encoded" error on Windows.
function escapeNonAsciiPlugin() {
  return {
    name: 'escape-non-ascii',
    enforce: 'post' as const,
    generateBundle(_options: any, bundle: any) {
      for (const fileName in bundle) {
        const file = bundle[fileName];
        if (file.type === 'chunk' && typeof file.code === 'string') {
          file.code = file.code.replace(/[^\x00-\x7F]/g, (char: string) => {
            return '\\u' + char.charCodeAt(0).toString(16).padStart(4, '0');
          });
        }
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    crx({ manifest }),
    escapeNonAsciiPlugin(),
  ],
})

