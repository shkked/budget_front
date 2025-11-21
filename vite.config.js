import { quasar, transformAssetUrls } from "@quasar/vite-plugin";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    quasar({
      // sassVariables: "src/styles/quasar-variables.sass",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      // Все запросы, начинающиеся с "/api", перенаправляем на бэкенд
      "/api": {
        // Для локальной разработки
        // TODO не забыть закомментить и поправить env
        // target: "http://00000000",
        target: "http://00000000",
        changeOrigin: true,
      },
    },
  },
});
