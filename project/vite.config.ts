import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

// Deze config vervangt de vroegere @lovable.dev/vite-tanstack-config wrapper
// door de "kale" TanStack Start / Vite opstelling. Functioneel verandert er
// niets aan de site zelf — enkel de Lovable-specifieke laag (o.a. de
// dev-only "component tagger" die de Lovable-editor nodig had) is weg.
export default defineConfig({
  server: {
    // host: true zorgt dat de dev server ook bereikbaar is buiten localhost
    // (handig in containers/CI). Pas de poort gerust aan naar wens.
    port: 8080,
    host: true,
  },
  resolve: {
    // voorkomt dubbele React/TanStack-instanties in de bundel
    dedupe: ["react", "react-dom", "@tanstack/react-router", "@tanstack/react-start"],
  },
  plugins: [
    tanstackStart({
      // TanStack Start's ingebouwde Nitro-integratie bouwt de server.
      // "cloudflare-module" is het originele target uit dit project
      // (vandaar de env/ctx parameters in src/server.ts, typisch voor
      // Cloudflare Workers/Pages). Host je liever op Vercel, Netlify of
      // een eigen Node-server? Zet dan het bijpassende preset, bv.
      // preset: "vercel", "netlify", "node-server" — zie
      // https://tanstack.com/start/latest/docs/framework/react/guide/hosting
      nitro: {
        preset: "cloudflare-module",
      },
      server: {
        // onze eigen SSR-foutafhandeling in src/server.ts blijft behouden
        // (pad is relatief t.o.v. de srcDirectory, dus geen "src/" ervoor)
        entry: "server",
      },
    }),
    // react's vite-plugin moet ná start's vite-plugin komen
    viteReact(),
    tailwindcss(),
    tsConfigPaths(),
  ],
});
