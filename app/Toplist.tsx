'use client';
import { useCallback, useEffect, useState } from 'react';
import styles from './Toplist.module.css';
import { getTop5 } from './google';

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
        const readLocal = localStorage.getItem('top5');
        let top5Local;
        try {
            top5Local = readLocal && JSON.parse(readLocal);
        } catch (error) {
            console.error(error);
        }
        if (!googleData && top5Local?.length > 0) {
            setGoogleData(top5Local);
        }
    }, [googleData, setGoogleData]);

    const loadGoogleData = useCallback(async () => {
        try {
            const data = await getTop5();
            setGoogleData(data);
            localStorage.setItem('top5', JSON.stringify(data));
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
        <div className={styles.container}>
            <h1>👽 Top 5 🤠</h1>
            {googleData?.map((item, index) => (
                <ToplistItem
                    key={index}
                    pos={index + 1}
                    name={item.name}
                    score={item.score}
                />
            ))}
        </div>
    );
}

function ToplistItem({ pos, name, score }: { pos: number; name: string; score: number }) {
    return (
        <div className={styles.item}>
            <p>
                {pos} {name}
            </p>
            <p>{score} points</p>
        </div>
    );
}
