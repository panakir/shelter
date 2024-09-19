import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import path from "path";

export default defineConfig({
  root: "src",
  base: "/",
  publicDir: "./public",
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
      {
        find: "@styles",
        replacement: path.resolve(__dirname, "src/assets/styles"),
      },
      {
        find: "@assets",
        replacement: fileURLToPath(new URL("./src/assets", import.meta.url)),
      },

      {
        find: "@scripts",
        replacement: path.resolve(__dirname, "src/assets/scripts"),
      },
    ],
  },
});
