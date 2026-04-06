import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import oxlintPlugin from "vite-plugin-oxlint";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [oxlintPlugin(), tailwindcss(), reactRouter()],
  resolve: {
    tsconfigPaths: true,
  },
});
