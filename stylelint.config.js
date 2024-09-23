/** @type {import('stylelint').Config} */

export default {
  extends: [
    "stylelint-config-recommended-scss",
    "stylelint-config-standard-scss",
  ],
  ignoreFiles: ["**/*.js", "*.json", "**/*.html"],
  plugins: ["stylelint-scss"],
  rules: {
    "selector-class-pattern": null,
  },
};
