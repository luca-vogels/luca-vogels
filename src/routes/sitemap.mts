import {Request, Response, Router} from 'express';
const app = Router();


class SitemapLocation {
    readonly uri: string = '/';
    readonly lastModified: Date = new Date();
    readonly changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' = 'always';
    readonly priority: number = 0.5;
    readonly addLanguagePrefix: boolean = true;

    constructor(options?: {
        uri?: string,
        lastModified?: Date | number,
        changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never',
        priority?: number,
        addLanguagePrefix?: boolean,
    }){
        if(!options) return;
        this.uri = options.uri || this.uri;
        this.lastModified = (Number.isInteger(options.lastModified) ? 
                                new Date(options.lastModified as number) : options.lastModified as Date) || this.lastModified;
        this.changeFrequency = options.changeFrequency || this.changeFrequency;
        this.priority = options.priority || this.priority;
        this.addLanguagePrefix = options.addLanguagePrefix !== undefined ? options.addLanguagePrefix : this.addLanguagePrefix;
    }
}


const getSitemapLocations = async (): Promise<SitemapLocation[]> => {
    const list = [] as SitemapLocation[];

    // '/'
    list.push(new SitemapLocation({
        uri: '/',
        changeFrequency: 'monthly',
        priority: 1.0
    }));

    // '/projects/'
    list.push(new SitemapLocation({
        uri: '/projects/',
        changeFrequency: 'monthly',
        priority: 0.9
    }));

    // '/contact/'
    list.push(new SitemapLocation({
        uri: '/contact/',
        changeFrequency: 'yearly',
        priority: 0.8
    }));

    // '/imprint/'
    list.push(new SitemapLocation({
        uri: '/imprint/',
        changeFrequency: 'yearly',
        priority: 0.2
    }));

    // '/privacy/'
    list.push(new SitemapLocation({
        uri: '/privacy/',
        changeFrequency: 'yearly',
        priority: 0.1
    }));

    return list;
}


const formatDate = (date: Date): string => {
    return date.getFullYear()+'-'+
            (date.getMonth()<9 ? '0' : '')+(date.getMonth()+1)+'-'+
            (date.getDate()<10 ? '0' : '')+date.getDate();
}

const xmlURL = (loc: SitemapLocation, urlPrefix: string) => {
    let xml = '\t<url>\n';
    xml +=      '\t\t<loc>'+urlPrefix+loc.uri+'</loc>\n';
    xml +=      '\t\t<lastmod>'+formatDate(loc.lastModified)+'</lastmod>\n';
    xml +=      '\t\t<changefreq>'+loc.changeFrequency+'</changefreq>\n';
    xml +=      '\t\t<priority>'+loc.priority+'</priority>\n';
    xml += '\t</url>\n';
    return xml;
}


// sitemap.xml
app.get("/sitemap.xml", async (req: Request, res: Response) => {
    res.setHeader('Cache-control', 'public, max-age=3600');
    res.setHeader('Content-type', 'text/xml;charset=UTF-8');

    const urlPrefix = 'https://'+req.hostname;
    const langs = (req as any).langs || [];

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    const locations = await getSitemapLocations();
    for(const loc of locations)
        if(loc.addLanguagePrefix)
            for(const lang of langs) xml += xmlURL(loc, urlPrefix+'/'+lang);
        else xml += xmlURL(loc, urlPrefix);

    xml += '</urlset>';

    res.send(xml);
});

export default app;
