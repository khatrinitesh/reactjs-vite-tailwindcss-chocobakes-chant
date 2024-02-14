import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };

  // Custom logic to override .env variables for production
  if (mode === "production") {
    const productionEnv = loadEnv("production", process.cwd(), "");
    process.env = { ...process.env, ...productionEnv };
  }

  return defineConfig({
    plugins: [react()],
  });
};
