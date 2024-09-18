/** @type {import('stylelint').Config} */

export default {
  extends: "stylelint-config-recommended-scss",
  ignoreFiles: ["**/*.js", "*.json", "**/*.html"],
  rules: {
    "no-descending-specificity": null,
    "color-hex-alpha": "always",
  },
};
