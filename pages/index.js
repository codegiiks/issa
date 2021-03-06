import Main from 'layouts/Main';
import { useEffect, useRef, useState } from 'react';

import { About, Hero, Gallery, Initiatives } from 'components';
import Link from 'next/link';

/* Style */
import style from 'styles/pages/index.module.css';
import supabase from 'lib/supabase';
import { message } from 'react-message-popup';

export default function Home({ switchTheme, info }) {
    const [latestComp, setLatestComp] = useState(null);
    const changed = useRef(null);

    useEffect(() => {
        const fetchLastComp = async () => {
            const { data, error } = await supabase
                .from('competitions')
                .select()
                .order('id', { ascending: false })
                .limit(1)
                .single();
            if (error) return message.error(error.message);
            return setLatestComp(data);
        };

        fetchLastComp();
    }, []);

    const handleScroll = (e) => {
        if (!window) return;

        if (window.scrollY > 1000) {
            switchTheme('light');
            changed.current = true;
        } else if (changed.current) {
            console.log('ciao');
            switchTheme('dark');
            changed.current = false;
        }
    };

    useEffect(() => {
        if (window) window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <Hero className={style.hero} />
            <About data={info.ABOUT_DATA} />
            <Gallery comp={latestComp} />
            <div className="flex items-center justify-center">
                <Link href="/competitions" passHref>
                    <p className={style.otherComps}>
                        Controlla le vecchie edizioni
                    </p>
                </Link>
            </div>
            <Initiatives data={info.INITIATIVES_DATA} />
        </>
    );
}

Home.getLayout = (page) => <Main>{page}</Main>;
