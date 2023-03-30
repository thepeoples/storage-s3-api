import {Context} from "$oak/mod.ts";
import {GetIndexResponse} from "../models/index.ts";

export async function getIndex(ctx: Context) {
    ctx.response.body = new GetIndexResponse();
}
