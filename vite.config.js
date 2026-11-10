import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" keeps every asset URL relative, so the build works at the domain
// root on Vercel and also when served from a sub-folder such as /projects/vesper-gt1/.
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: { chunkSizeWarningLimit: 1500 },
});
