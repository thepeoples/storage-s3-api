#!/usr/bin/env -S deno run --allow-env --allow-net

import {Application, Context} from "$oak/mod.ts";
import router from "./routes.ts";

// Create new application
const app = new Application();

// Handle the router's configured routes
app.use(router.allowedMethods());
app.use(router.routes());

// Handle request logging
app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.headers.get("X-Response-Time");
    console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// Handle 404, when there is no middleware registered to process the incoming request
app.use((ctx: Context) => {
    ctx.response.status = 404;
    ctx.response.body = {msg: "not found"};
});

// Handle 500, when something unexpected happens
app.use(async (ctx: Context, next: Function) => {
    try {
        await next();
    } catch (err) {
        ctx.response.status = 500;
        ctx.response.body = {msg: err.message};
    }
});

// Catch process interrupt and terminate signals
Deno.addSignalListener("SIGTERM", () => {
    console.log("Aborting for SIGTERM...");
    Deno.exit(0);
});

Deno.addSignalListener("SIGINT", () => {
    console.log("Aborting for SIGINT...");
    Deno.exit(0);
});

console.log("Listening on port 8000...");
await app.listen(":8000");
