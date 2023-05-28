export type StaticParamsContext = {
    params: {
        locale: string,
    }
};

export type MetadataContext = {
    params: {locale: string} | {[key: string]: string},
    searchParams: {[key: string]: string | string[] | undefined},
};