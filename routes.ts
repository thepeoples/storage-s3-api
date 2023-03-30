import { Router } from "$oak/mod.ts";
import { getIndex } from "./controllers/index.ts";

const router = new Router();
router.get("/", getIndex);

export default router;
