import Image from 'next/image';

import LogoText from 'assets/svgs/LogoText';
import veliero from 'public/imgs/veliero.png';
import velieroDark from 'public/imgs/velierodark.png';
import { Link } from './Link';

import style from 'styles/components/navbar.module.css';
import { useRouter } from 'next/router';
import { useState } from 'react';

const LINKS = [
    {
        href: '#hero',
        label: 'Home',
        scrollTo: true,
    },
    {
        href: '#about',
        label: 'Chi Siamo',
        scrollTo: true,
    },
    {
        href: '#gallery',
        label: 'Premio ISSA',
        scrollTo: true,
    },
    {
        href: '#initiatives',
        label: 'Iniziative',
        scrollTo: true,
    },
];

export function Navbar({ className, theme }) {
    const [menuActive, setMenuActive] = useState(false);
    const router = useRouter();

    return (
        <>
            <nav
                id="mainNavbar"
                className={[
                    style.mainNavbar,
                    theme == 'dark' ? style.dark : style.light,
                    className,
                ].join(' ')}
            >
                <div className={style.logo}>
                    <Image
                        src={theme == 'dark' ? veliero : velieroDark}
                        alt="Veliero"
                        width={50}
                        height={50}
                        className={style.logoVeliero}
                    />
                    <LogoText className={style.logoText} />
                </div>
                <div className={style.links}>
                    {LINKS.map((v, i) => (
                        <Link href={v.href} {...v} key={i} passHref>
                            <p
                                className={[
                                    style.link,
                                    router.asPath == v.href
                                        ? style.selected
                                        : null,
                                ].join(' ')}
                            >
                                {v.label}
                            </p>
                        </Link>
                    ))}
                    <span
                        className={['material-icons', style.hamburgerIcon].join(
                            ' '
                        )}
                        onClick={() => setMenuActive(!menuActive)}
                    >
                        {menuActive ? 'close' : 'menu'}
                    </span>
                </div>
            </nav>
            <div
                className={[
                    style.hamburgerMenu,
                    menuActive ? style.open : null,
                ].join(' ')}
            >
                {LINKS.map((v, i) => (
                    <Link href={v.href} {...v} key={i} passHref>
                        <p
                            className={[
                                style.link,
                                router.asPath == v.href ? style.selected : null,
                            ].join(' ')}
                            onClick={() => setMenuActive(false)}
                        >
                            {v.label}
                        </p>
                    </Link>
                ))}
            </div>
        </>
    );
}

Navbar.defaultProps = {
    theme: 'dark',
};
