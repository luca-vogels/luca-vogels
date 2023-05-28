import Link from "next/link"

type LocaleLinkProps = {
    children: React.ReactNode,
    href: string,
    locale: string,
    className?: string,
}
export default function LocaleLink({children, href, locale, className}: LocaleLinkProps){
    return <Link href={((locale && !href.startsWith('https://') && !href.startsWith('http://')) ? '/'+locale : '')+href} 
                    className={className} locale={locale}>
                {children}
            </Link>
}