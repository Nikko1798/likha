// vite.config.ts (or .js)
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import laravel from 'laravel-vite-plugin';
import path from 'path';
import tailwindcss from 'tailwindcss';
import { resolve } from 'node:path';
import { randomFillSync } from 'crypto';

// 🔥 Polyfill crypto.getRandomValues for Node.js build environments (like GitHub Actions)
if (!globalThis.crypto) {
    globalThis.crypto = {
      getRandomValues: (buffer: any) => randomFillSync(buffer),
      subtle: {} as SubtleCrypto,
      randomUUID: () => '00000000-0000-0000-0000-000000000000',
    } as unknown as Crypto;
  }

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/js/app.ts'],
      ssr: 'resources/js/ssr.ts',
      refresh: true,
    }),
    vue({
      template: {
        transformAssetUrls: {
          base: null,
          includeAbsolute: false,
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './resources/js'),
      'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
      // ✅ Polyfills for browser packages used during build
      crypto: 'crypto-browserify',
      stream: 'stream-browserify',
      buffer: 'buffer',
    },
  },
  define: {
    'process.env': {}, // avoids "process is not defined" errors
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
});
