import {Context} from "$oak/mod.ts";

export async function getIndex(ctx: Context) {
    ctx.response.body = {msg: "storage-s3-api"};
}
