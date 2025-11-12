// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
// @ts-ignore: types are present under node-style resolution; consider setting "moduleResolution": "node16" or "nodenext" in tsconfig.json
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom', // ✅ safer, faster, ESM-compatible
    setupFiles: './vitest.setup.ts',
  },
})
