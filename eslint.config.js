import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";
import globals from "globals";
export default defineConfig([
  {
    ignores: ["dist/**", "node_modules/**"], // глобальное игнорирование
  },
  {
    files: ["**/*.{js,mjs,cjs,vue}"],
    plugins: { js, prettier: prettierPlugin, pluginVue },
    extends: ["js/recommended", prettierConfig],
    languageOptions: { globals: globals.browser },
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      "vue/require-v-for-key": "off",
      "vue/multi-word-component-names": "off",
      "no-prototype-builtins": "off",
    },
  },
  pluginVue.configs["flat/essential"],
]);
