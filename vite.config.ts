/// <reference types="vitest" />
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, './lib/index.ts'),
      fileName: 'jtjs_view',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['@jtjs/event'],
    },
  },
});
