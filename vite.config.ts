// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // Force-enable the Nitro SSR build plugin so the project runs standalone
  // (`npm run dev` / `npm run build`) outside the Lovable sandbox. Without
  // this, the plugin skips Nitro when no Lovable env vars are present, and
  // Vite falls back to plain SPA mode (build fails with
  // "Cannot resolve entry module index.html"; dev returns a bare 404).
  // Inside the Lovable sandbox, the wrapper overrides preset/output to
  // `cloudflare-module` automatically, so this stays compatible with the
  // live preview. The `node-server` preset produces a portable Node SSR
  // build locally (run with `node .output/server/index.mjs`).
  nitro: {
    preset: "node-server",
  },
});
