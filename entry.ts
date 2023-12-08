import { Hono } from 'https://deno.land/x/hono/mod.ts';

const app = new Hono();

app.get("/", (ctx) => {
  return ctx.body(ctx.env.remoteAddr().hostname);
});

const { serve } = Deno;

serve(async (request, connInfo) => {
  console.log(connInfo.remoteAddr)
  const remoteAddr = () => connInfo.remoteAddr;
  const env = { remoteAddr };
  return app.fetch(request, env);
}, {
  hostname: "0.0.0.0",
  port: 3000,
});
