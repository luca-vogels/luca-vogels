import styles from "./Socialmedia.module.css";
import LocaleLink from "../(layout)/LocaleLink";
import Image from "next/image";

const SOCIALMEDIA = {
    "Email": "/contact/",
    "Xing": "https://www.xing.com/profile/Luca_Vogels",
    "LinkedIn": "https://linkedin.com/in/luca-vogels",
    "Github": "https://github.com/luca-vogels",
    "Instagram": "https://www.instagram.com/luca.vogels/",
    "Twitter": "https://www.twitter.com/luca_vogels",
};
const ICON_SIZE = 30;

type SocialmediaProps = {
    locale: string,
}
export default function Socialmedia({locale}: SocialmediaProps) {
    return <div className={styles.socialmedia}>
        {Object.entries(SOCIALMEDIA).map(([name, href]) => 
            <LocaleLink key={name} href={href} locale={locale} className="nodrag noselect">
                <Image src={"/images/content/socialmedia/"+name.toLowerCase()+".svg"} width={ICON_SIZE} height={ICON_SIZE} 
                        alt={name} unoptimized draggable={false} />
            </LocaleLink>
        )}
    </div>;
}