import tailwindcss from "@tailwindcss/vite"
import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import laravel from 'laravel-vite-plugin';

export default defineConfig({
  plugins: [
    tailwindcss(),
    laravel({
      input: ['src/main.tsx', 'src/index.css'],
      refresh: true,
    }),
    react()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '127.0.0.1',
    port: 5175,
    strictPort: true,
    hmr: {
      host: '127.0.0.1'
    }
  },
})
