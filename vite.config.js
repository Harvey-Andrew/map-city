import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // console.log(command);  pnpm dev[serve]  pnpm build[build]
  // console.log(mode);  获取开发者模式
  // console.log(process.cwd());  可以获取项目所在的位置
  const env = loadEnv(mode, process.cwd());
  // console.log(env);
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      proxy: {
        "/api": {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
        "/map": {
          target: env.VITE_BASE_MAP,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/map/, ""),
        },
      },
    },
  };
});
