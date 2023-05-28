import { NextFunction, Request, Response, Router } from "express";
import Config from "../services/Config.service.js";

const app = Router();

// redirect if domain starts with 'www.'
app.use(async(req: Request, res: Response, next: NextFunction) => {
    const dev = Config.isDevMode();
    if(dev){ next(); return; } // if dev mode then skip domain check

    const reqHostname = (process.env.DOMAIN || req.hostname).toLowerCase();
    let domain = reqHostname;
    domain = domain.startsWith('www.') ? domain.substring(4) : domain;
    
    // prevent duplicate content by redirecting always to main domain
    if(reqHostname !== domain){
        res.redirect(301, 'https://'+domain+req.originalUrl); // permanent
        return;
    }

    next();
});

export default app;