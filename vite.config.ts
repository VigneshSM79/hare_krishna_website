import { defineConfig, loadEnv, type Plugin, type ViteDevServer } from 'vite';
import type { IncomingMessage, ServerResponse } from 'node:http';
import react from '@vitejs/plugin-react';

/**
 * Runs the `api/*.ts` functions during `npm run dev`.
 *
 * In production Vercel serves those files itself. Locally, Vite only knows how
 * to serve the front end, so without this plugin every form would POST to
 * /api/submit and get index.html back.
 *
 * `vercel dev` is the other way to run them, but the SPA rewrite in vercel.json
 * ("/(.*)" -> "/index.html") swallows Vite's own module requests there, so
 * /src/main.tsx comes back as HTML and the page renders blank.
 */
function apiRoutes(env: Record<string, string>): Plugin {
  return {
    name: 'temple-api-dev',
    apply: 'serve',

    configureServer(server: ViteDevServer) {
      // Vite only exposes VITE_-prefixed variables. The Google credentials are
      // deliberately unprefixed so they never reach the browser, which means we
      // have to hand them to the API functions ourselves.
      for (const [key, value] of Object.entries(env)) {
        if (!key.startsWith('VITE_') && process.env[key] === undefined) {
          process.env[key] = value;
        }
      }

      server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next) => {
        const url = req.url ?? '';
        if (!url.startsWith('/api/')) return next();

        const route = url.split('?')[0].slice('/api/'.length).replace(/\/+$/, '');
        if (!/^[a-z0-9-]+$/i.test(route)) return next();

        const send = (code: number, payload: unknown) => {
          res.statusCode = code;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(payload));
        };

        try {
          const chunks: Buffer[] = [];
          for await (const chunk of req) chunks.push(chunk as Buffer);
          const raw = Buffer.concat(chunks).toString('utf8');

          const module = await server.ssrLoadModule(`/api/${route}.ts`);
          const handler = module.default as (
            request: { method?: string; body: unknown; headers: IncomingMessage['headers'] },
            response: { status: (c: number) => unknown; json: (b: unknown) => void }
          ) => Promise<void>;

          // Mirrors what Vercel hands the function: a parsed JSON body.
          await handler(
            { method: req.method, body: raw ? JSON.parse(raw) : {}, headers: req.headers },
            {
              status(code: number) {
                res.statusCode = code;
                return this;
              },
              json: (payload: unknown) => send(res.statusCode || 200, payload),
            }
          );
        } catch (error) {
          server.config.logger.error(`[api/${route}] ${String(error)}`);
          send(500, { ok: false, error: `Local API error: ${String(error)}` });
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // '' as the prefix loads every variable in .env / .env.local, not just VITE_.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), apiRoutes(env)],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});
