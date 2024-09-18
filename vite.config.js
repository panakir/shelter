import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  root: "src",
  base: "./",
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
        find: "@scripts",
        replacement: path.resolve(__dirname, "src/assets/scripts"),
      },
    ],
  },
});
