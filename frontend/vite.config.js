import { defineConfig } from "vite";

export default defineConfig({
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
  server: {
    proxy: {
      "/send-emails": "http://localhost:3000",
      "/emails": "http://localhost:3000",
      "/stats": "http://localhost:3000"
    }
  }
});
