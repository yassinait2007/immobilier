// vite.config.ts
import tailwindcss from "file:///C:/Users/dell/Downloads/livraison-immobilier/immobilier-app/node_modules/@tailwindcss/vite/dist/index.mjs";
import path from "path";
import { defineConfig } from "file:///C:/Users/dell/Downloads/livraison-immobilier/immobilier-app/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/dell/Downloads/livraison-immobilier/immobilier-app/node_modules/@vitejs/plugin-react/dist/index.mjs";
import laravel from "file:///C:/Users/dell/Downloads/livraison-immobilier/immobilier-app/node_modules/laravel-vite-plugin/dist/index.js";
var __vite_injected_original_dirname = "C:\\Users\\dell\\Downloads\\livraison-immobilier\\immobilier-app";
var vite_config_default = defineConfig({
  plugins: [
    tailwindcss(),
    laravel({
      input: ["src/main.tsx", "src/index.css"],
      refresh: true
    }),
    react()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  server: {
    host: "127.0.0.1",
    port: 5175,
    strictPort: true,
    hmr: {
      host: "127.0.0.1"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxkZWxsXFxcXERvd25sb2Fkc1xcXFxsaXZyYWlzb24taW1tb2JpbGllclxcXFxpbW1vYmlsaWVyLWFwcFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcZGVsbFxcXFxEb3dubG9hZHNcXFxcbGl2cmFpc29uLWltbW9iaWxpZXJcXFxcaW1tb2JpbGllci1hcHBcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2RlbGwvRG93bmxvYWRzL2xpdnJhaXNvbi1pbW1vYmlsaWVyL2ltbW9iaWxpZXItYXBwL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHRhaWx3aW5kY3NzIGZyb20gXCJAdGFpbHdpbmRjc3Mvdml0ZVwiXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiXG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCJcbmltcG9ydCBsYXJhdmVsIGZyb20gJ2xhcmF2ZWwtdml0ZS1wbHVnaW4nO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgdGFpbHdpbmRjc3MoKSxcbiAgICBsYXJhdmVsKHtcbiAgICAgIGlucHV0OiBbJ3NyYy9tYWluLnRzeCcsICdzcmMvaW5kZXguY3NzJ10sXG4gICAgICByZWZyZXNoOiB0cnVlLFxuICAgIH0pLFxuICAgIHJlYWN0KClcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcbiAgICB9LFxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiAnMTI3LjAuMC4xJyxcbiAgICBwb3J0OiA1MTc1LFxuICAgIHN0cmljdFBvcnQ6IHRydWUsXG4gICAgaG1yOiB7XG4gICAgICBob3N0OiAnMTI3LjAuMC4xJ1xuICAgIH1cbiAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQStXLE9BQU8saUJBQWlCO0FBQ3ZZLE9BQU8sVUFBVTtBQUNqQixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFdBQVc7QUFDbEIsT0FBTyxhQUFhO0FBSnBCLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLFlBQVk7QUFBQSxJQUNaLFFBQVE7QUFBQSxNQUNOLE9BQU8sQ0FBQyxnQkFBZ0IsZUFBZTtBQUFBLE1BQ3ZDLFNBQVM7QUFBQSxJQUNYLENBQUM7QUFBQSxJQUNELE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixZQUFZO0FBQUEsSUFDWixLQUFLO0FBQUEsTUFDSCxNQUFNO0FBQUEsSUFDUjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
