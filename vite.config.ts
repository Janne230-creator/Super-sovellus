import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "VITE_");
  const leaguePort = env.VITE_CREATOR_LEAGUE_PORT ?? "8788";

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api/creator-league": {
          target: `http://127.0.0.1:${leaguePort}`,
        },
        "/calls": {
          target: "ws://127.0.0.1:8787",
          ws: true,
        },
      },
    },
  };
});
