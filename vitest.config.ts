// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom', // ✅ safer, faster, ESM-compatible
    setupFiles: './vitest.setup.ts',

    //coverage - vitest moved coverage thresholds into a nested 'threshold' object in newer versions
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      thresholds: {
        lines: 85,
        functions: 85,
        branches: 80,
        statements: 85,
      }
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "app"),   // back to app
      "@root": path.resolve(__dirname),      // root alias for your lib/
    }
  }
})
