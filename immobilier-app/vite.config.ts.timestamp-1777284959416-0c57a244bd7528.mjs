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
    host: "0.0.0.0",
    port: 5175,
    strictPort: true,
    hmr: {
      host: "192.168.1.131"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxkZWxsXFxcXERvd25sb2Fkc1xcXFxsaXZyYWlzb24taW1tb2JpbGllclxcXFxpbW1vYmlsaWVyLWFwcFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcZGVsbFxcXFxEb3dubG9hZHNcXFxcbGl2cmFpc29uLWltbW9iaWxpZXJcXFxcaW1tb2JpbGllci1hcHBcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2RlbGwvRG93bmxvYWRzL2xpdnJhaXNvbi1pbW1vYmlsaWVyL2ltbW9iaWxpZXItYXBwL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHRhaWx3aW5kY3NzIGZyb20gXCJAdGFpbHdpbmRjc3Mvdml0ZVwiXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiXG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCJcbmltcG9ydCBsYXJhdmVsIGZyb20gJ2xhcmF2ZWwtdml0ZS1wbHVnaW4nO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgdGFpbHdpbmRjc3MoKSxcbiAgICBsYXJhdmVsKHtcbiAgICAgIGlucHV0OiBbJ3NyYy9tYWluLnRzeCcsICdzcmMvaW5kZXguY3NzJ10sXG4gICAgICByZWZyZXNoOiB0cnVlLFxuICAgIH0pLFxuICAgIHJlYWN0KClcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcbiAgICB9LFxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiAnMC4wLjAuMCcsXG4gICAgcG9ydDogNTE3NSxcbiAgICBzdHJpY3RQb3J0OiB0cnVlLFxuICAgIGhtcjoge1xuICAgICAgaG9zdDogJzE5Mi4xNjguMS4xMzEnXG4gICAgfVxuICB9LFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBK1csT0FBTyxpQkFBaUI7QUFDdlksT0FBTyxVQUFVO0FBQ2pCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sV0FBVztBQUNsQixPQUFPLGFBQWE7QUFKcEIsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsWUFBWTtBQUFBLElBQ1osUUFBUTtBQUFBLE1BQ04sT0FBTyxDQUFDLGdCQUFnQixlQUFlO0FBQUEsTUFDdkMsU0FBUztBQUFBLElBQ1gsQ0FBQztBQUFBLElBQ0QsTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxJQUNaLEtBQUs7QUFBQSxNQUNILE1BQU07QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
