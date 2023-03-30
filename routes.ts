import { Router } from "$oak/mod.ts";
import { getIndex } from "./controllers/index.ts";
// import { getGraphQL } from "./controllers/graphql.ts"; <--- see `controllers/graphql.ts`

const router = new Router();
router.get("/", getIndex);
// router.get("/graphql", getGraphQL); <--- see `controllers/graphql.ts`

export default router;
