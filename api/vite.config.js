import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    proxy: {
      // Κάνε POST στο /kc-token και ο Vite θα το προωθεί προς Keycloak
      "/kc-token": {  ///kc-token → Keycloak token endpoint Ό,τι request ξεκινά με /kc-token θα περάσει από αυτόν τον κανόνα
        target: "https://snap4.rhodes.gr",
        changeOrigin: true, //Αλλάζει το Host header του request ώστε να ταιριάζει με το target. Πολλοί servers το απαιτούν.
        // Σβήνει το prefix και το στέλνει στο πραγματικό KC endpoint
        rewrite: (p) =>
          p.replace(
            /^\/kc-token/,  //αυτό replace 
            "/auth/realms/master/protocol/openid-connect/token" //με αυτό
          ),
        secure: true, // άφησέ το true (https)
      },
       "/snap": {   //Ό,τι request ξεκινά με /snap θα περάσει από αυτόν τον κανόνα
        target: "https://snap4.rhodes.gr",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/snap/, ""), // αφαιρεί το /snap prefix
        secure: true,
        },
    },
  },
});
