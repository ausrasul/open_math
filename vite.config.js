import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode })  => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), eslint()],
    server: {
      port: 3000,
      proxy: {
        "/api": {
          target: env.VITE_SERVER_URL,
          changeOrigin: true,
          //secure: false,
        },
      },
    },
    test: {
      globals: true,
    },
  };
});
