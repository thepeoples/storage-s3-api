#!/usr/bin/env -S deno run --allow-env --allow-net

import {Application, Context} from "$oak/mod.ts";
import router from "./routes.ts";

// Create new application
const app = new Application();

// Handle request logging
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    
    const responseTime = (Date.now() - start) + "ms";
    const url = ctx.request.url;

    ctx.response.headers.set("X-Response-Time", responseTime);
    console.log(`${ctx.request.method} ${url.protocol}//${url.host}${url.pathname} - ${responseTime}`);
});

// Handle the router's configured routes
app.use(router.allowedMethods());
app.use(router.routes());

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
    console.log("Aborting for SIGTERM...\n");
    Deno.exit(0);
});

Deno.addSignalListener("SIGINT", () => {
    console.log("Aborting for SIGINT...\n");
    Deno.exit(0);
});

console.log("Listening on port 8000...");
await app.listen(":8000");
