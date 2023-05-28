'use server';
import "server-only";

import Config from "../../services/Config.service";
import { getTranslations } from "lup-language";

export default async function loadTranslations(locale: string, translationKeys: string[]): Promise<{[key: string]: string}> {
    return await getTranslations(locale, Config.getDefaultLocale(), translationKeys);
};