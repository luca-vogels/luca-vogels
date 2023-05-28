import * as dotenv from "dotenv";
dotenv.config();

import http from "http";
import express, { NextFunction, Request, Response } from "express";
import next from "next";
import Config from "./services/Config.service.js";
import { LanguageRouter } from "lup-language";
import { ImageRequestHandler } from "lup-images";
import routesHandler from "./routes/index.mjs";

const dev = Config.isDevMode();
const HTTP_BIND = process.env.HTTP_BIND || "0.0.0.0";
const HTTP_PORT = parseInt(process.env.HTTP_PORT || "80") || 80;
const IMAGE_CACHE_SEC = 86400;

const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();
const nextUpgradeHandler = nextApp.getUpgradeHandler();

nextApp.prepare().then(async () => {

    const app = express();
    const server = http.createServer(app);

    // middleware
    app.use(await LanguageRouter({
        useNextLanguages: false,
        languagesFromTranslations: true,
        redirectRoot: true, 
    }));

    // favicon
    app.get("/favicon.ico", (req: Request, res: Response) => {
        res.sendFile("favicon.ico", { root: "./public/images/favicons" });
    });

    // images caching
    app.get("/images/*", ImageRequestHandler({
        uriPrefix: "/images",
        srcDir: "./public/images",
        cacheDir: ".cache",
        httpCacheTime: IMAGE_CACHE_SEC,
    }));

    // backend routes
    app.use(routesHandler);

    // all frontend routes
    app.all('*', (req: Request | any, res: Response) => {

        // add language prefix back to url (got removed by LanguageRouter)
        const idx1 = req.originalUrl.lastIndexOf("."), idx2 = req.originalUrl.lastIndexOf("/");
        req.url = (idx1 > idx2 || req.originalUrl.startsWith("/"+req.lang) || req.originalUrl.startsWith("/_next")) ? 
                    req.originalUrl : "/"+req.lang+req.originalUrl;
                
        return nextHandler(req, res);
    });

    // all frontend routes (upgrade)
    server.on("upgrade", (req: Request, socket, head) => {
        nextUpgradeHandler(req, socket, head);
    });

    // start server
    server.listen(HTTP_PORT, HTTP_BIND, function(){
        console.log("Server running at "+HTTP_BIND+":"+HTTP_PORT+" in "+(dev ? "development" : "production")+" mode");
    });
});