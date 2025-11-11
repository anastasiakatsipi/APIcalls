import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Κάνε POST στο /kc-token και ο Vite θα το προωθεί προς Keycloak
      "/kc-token": {
        target: "https://snap4.rhodes.gr",
        changeOrigin: true,
        // Σβήνει το prefix και το στέλνει στο πραγματικό KC endpoint
        rewrite: (p) =>
          p.replace(
            /^\/kc-token/,
            "/auth/realms/master/protocol/openid-connect/token"
          ),
        secure: true, // άφησέ το true (https)
      },
       "/snap": {
        target: "https://snap4.rhodes.gr",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/snap/, ""), // αφαιρεί το /snap prefix
        secure: true,
        },
    },
  },
});
