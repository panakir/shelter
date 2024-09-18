import js from "@eslint/js";
import nodePlugin from "eslint-plugin-n";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import stylelintConfig from "eslint-config-stylelint";
import stylisticJs from "@stylistic/eslint-plugin-js";

export default [
  {
    plugins: {
      prettier: prettierPlugin,
      "@stylistic/js": stylisticJs,
      n: nodePlugin,
    },
  },
  {
    ignores: ["node_modules", "dist"],
  },
  js.configs.recommended,
  {
    rules: {
      ...stylelintConfig.rules,
      ...prettierConfig.rules,
      "no-console": "error",
      "no-unused-vars": "error",
      "no-undefined": "error",
      "no-use-before-define": "error",
      "no-undef": "off",
      "no-duplicate-imports": "error",
      "no-inline-comments": "error",
      "prefer-const": "error",
      "no-var": "error",
      "prefer-destructuring": "error",
    },
  },
];
