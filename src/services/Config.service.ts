import dotenv from "dotenv";
dotenv.config();
import lupLang from "lup-language";

export function getDefaultLocale(): string {
    return lupLang.DEFAULT_LANGUAGE;
}

export function isDevMode(){
    return process.env.NODE_ENV !== 'production' && !process.argv.includes("--production");
}

export function getDomain(){
    return process.env.DOMAIN || "localhost";
}

const Config = {
    getDefaultLocale,
    isDevMode,
    getDomain,
};
export default Config;