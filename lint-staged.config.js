export default {
  "**/*.scss": "npm run style",
  "src/**/*": ["npm run lint", "npm run format"],
};
