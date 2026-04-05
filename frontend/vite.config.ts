import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react({ jsxRuntime: "classic" })],
  build: {
    lib: {
      entry: "src/index.tsx",
      formats: ["iife"],
      name: "HfPluginHello",
      fileName: () => "index.js",
    },
    outDir: "dist",
    rollupOptions: {
      // React is provided by the host app as window globals.
      // @tauri-apps/api and @haloforge/plugin-sdk are bundled inline.
      external: ["react", "react-dom"],
      output: {
        globals: {
          "react": "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
