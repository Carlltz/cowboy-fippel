'use client';
import { useCallback, useEffect, useState } from 'react';
import styles from './Toplist.module.css';
import { getTopList } from './google';

export function Toplist() {
    const [googleData, setGoogleData] = useState<{ name: string; score: number }[] | null>(null);

    useEffect(() => {
        const readLocal = localStorage.getItem('top');
        let topLocal;
        try {
            topLocal = readLocal && JSON.parse(readLocal);
        } catch (error) {
            console.error(error);
        }
        if (!googleData && topLocal?.length > 0) {
            setGoogleData(topLocal);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadGoogleData = useCallback(async () => {
        try {
            const data = await getTopList();
            setGoogleData(data);
            localStorage.setItem('top', JSON.stringify(data));
        } catch (error) {
            console.error(error);
        }
    }, [setGoogleData]);

    useEffect(() => {
        loadGoogleData();
        const interval = setInterval(loadGoogleData, 1000 * 2);

        return () => clearInterval(interval);
    }, [loadGoogleData]);

    if (!googleData?.length) return null;

    return (
        <div className={styles.toplistsContainer}>
            <div className={styles.container}>
                <h1>👽 Top 1 🤠</h1>
                {googleData?.slice(0, 1).map((item, index) => (
                    <ToplistItem
                        key={item.name}
                        pos={index + 1}
                        name={item.name}
                        score={item.score}
                    />
                ))}
            </div>
            {/* <div className={styles.small}>
                {googleData?.slice(2).map((item, index) => (
                    <SmallItem
                        key={item.name}
                        pos={index + 3}
                        name={item.name}
                        score={item.score}
                    />
                ))}
            </div> */}
        </div>
    );
}

function SmallItem({ pos, name, score }: { pos: number; name: string; score: number }) {
    return (
        <div className={styles.smallItem}>
            <p>
                {pos}. {name}
            </p>
            <p>{score} points</p>
        </div>
    );
}

function ToplistItem({ pos, name, score }: { pos: number; name: string; score: number }) {
    return (
        <div className={styles.item}>
            <p>
                {pos}. {name}
            </p>
            <p>{score} points</p>
        </div>
    );
}
