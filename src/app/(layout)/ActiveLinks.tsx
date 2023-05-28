"use client";

import {usePathname} from "next/navigation";
import LocaleLink from "./LocaleLink";

type ActiveLinkProps = {
    children: React.ReactNode,
    href: string,
    locale: string,
    className?: string,
    activeClassName?: string,
};
export default function ActiveLink({children, href, locale, className, activeClassName}: ActiveLinkProps){
    className ||= "";
    const localeHref = locale ? "/"+locale+href : href;

    const pathname = usePathname();
    if(activeClassName && pathname.length >= href.length && (localeHref.startsWith(pathname) || href.startsWith(pathname))) 
        className += " "+activeClassName;
    
    return <LocaleLink className={className} href={href} locale={locale}>{children}</LocaleLink>
}