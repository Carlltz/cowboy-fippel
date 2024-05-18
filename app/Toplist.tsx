'use client';
import { useCallback, useEffect, useState } from 'react';
import styles from './Toplist.module.css';
import { getTopList } from './google';

const fakeData = [
    { name: 'Alice', points: 100 },
    { name: 'Bob', points: 50 },
    { name: 'Charlie', points: 25 },
    { name: 'David har ett väldigt', points: 40 },
    { name: 'Elin', points: 30 },
];

export function Toplist() {
    const [googleData, setGoogleData] = useState<{ name: string; score: number }[] | null>(null);

    useEffect(() => {
        const readLocal = localStorage.getItem('to5');
        let topLocal;
        try {
            topLocal = readLocal && JSON.parse(readLocal);
        } catch (error) {
            console.error(error);
        }
        if (!googleData && topLocal?.length > 0) {
            setGoogleData(topLocal);
        }
    }, [googleData, setGoogleData]);

    const loadGoogleData = useCallback(async () => {
        try {
            const data = await getTopList();
            setGoogleData(data);
            localStorage.setItem('top', JSON.stringify(data));
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        loadGoogleData();
        const interval = setInterval(loadGoogleData, 1000 * 2);

        return () => clearInterval(interval);
    }, [loadGoogleData]);

    return (
        <div className={styles.toplistsContainer}>
            <div className={styles.container}>
                <h1>👽 Top 5 🤠</h1>
                {googleData?.slice(0, 5).map((item, index) => (
                    <ToplistItem
                        key={index}
                        pos={index + 1}
                        name={item.name}
                        score={item.score}
                    />
                ))}
            </div>
            <div className={styles.small}>
                {googleData?.slice(5).map((item, index) => (
                    <div
                        key={item.name}
                        className={styles.smallItem}>
                        <p>
                            {index + 6}. {item.name}
                        </p>
                        <p>{item.score} points</p>
                    </div>
                ))}
            </div>
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
