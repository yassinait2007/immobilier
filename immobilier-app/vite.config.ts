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
    host: '0.0.0.0',
    port: 5175,
    strictPort: true,
    hmr: {
      host: '192.168.1.131'
    }
  },
})
