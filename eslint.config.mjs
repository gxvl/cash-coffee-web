import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// FlatCompat is used to translate legacy configs
const compat = new FlatCompat({
  baseDirectory: __dirname
});

/** @type {import('eslint').Linter.FlatConfig[]} */
const eslintConfig = [
  // 1. Extend the base configurations using FlatCompat
  // This is equivalent to the "extends" array in your .eslintrc.json
  ...compat.extends("@rocketseat/eslint-config/next", "next/core-web-vitals"),

  // 2. Add your custom rules
  // This is equivalent to the "rules" object in your .eslintrc.json
  {
    rules: {
      "prettier/prettier": [
        "error",
        {
          trailingComma: "none",
          endOfLine: "auto"
        }
      ],
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index"
          ],
          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before"
            },
            {
              pattern: "@/common/**",
              group: "internal"
            },
            {
              pattern: "@/config/**",
              group: "internal"
            },
            {
              pattern: "@/hooks/**",
              group: "internal"
            },
            {
              pattern: "@/store/services/**",
              group: "internal"
            },
            {
              pattern: "@/validations/**",
              group: "internal"
            },
            {
              pattern: "./**",
              group: "internal",
              position: "after"
            }
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true
          }
        }
      ]
    }
  }
];

export default eslintConfig;
