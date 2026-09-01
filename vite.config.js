import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Tailwind runs through the Vite plugin here; this empty inline PostCSS
  // config stops Vite from walking up to D:\postcss.config.mjs.
  css: { postcss: {} },
})
