import sitemapHandler from "./sitemap.mjs";
import wwwHandler from "./www.mjs";

import { Router } from "express";
const app = Router();

app.use(sitemapHandler);
app.use(wwwHandler);

export default app;