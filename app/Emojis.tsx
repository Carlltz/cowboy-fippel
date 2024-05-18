'use client';
import { useEffect } from 'react';
import styles from './page.module.css';
import Image from 'next/image';

const emojis = ['🧹', '👽', '🤠', '🔫', '🧹', '👽', '🤠', '🔫', '🧹', '👽', '🤠', '🔫', '🧹', '👽', '🤠', '🔫'];

export function Emojis() {
    useEffect(() => {
        const bouncingArea = document.querySelector(`.${styles.bouncingArea}`);
        const emojiElements = Array.from(document.querySelectorAll(`.${styles.emoji}`));

        if (!bouncingArea) {
            return;
        }

        const randomDirection = () => (Math.random() - 0.5) * 2; // Random direction between -1 and 1

        emojiElements.forEach((emoji: any, index) => {
            let x = Math.random() * bouncingArea.clientWidth;
            let y = Math.random() * bouncingArea.clientHeight;
            let dx = randomDirection();
            let dy = randomDirection();
            const speed = 4;

            emoji.style.left = `${x}px`;
            emoji.style.top = `${y}px`;

            const updatePosition = () => {
                x += dx * speed;
                y += dy * speed;

                if (x <= 0 || x >= bouncingArea.clientWidth - emoji.clientWidth) {
                    dx = -dx;
                    x = Math.max(0, Math.min(x, bouncingArea.clientWidth - emoji.clientWidth));
                }

                if (y <= 0 || y >= bouncingArea.clientHeight - emoji.clientHeight) {
                    dy = -dy;
                    y = Math.max(0, Math.min(y, bouncingArea.clientHeight - emoji.clientHeight));
                }

                emoji.style.left = `${x}px`;
                emoji.style.top = `${y}px`;
                requestAnimationFrame(updatePosition);
            };

            updatePosition();
        });
    }, []);

    return (
        <div className={styles.bouncingArea}>
            {emojis.map((emoji, index) => (
                <div
                    key={index}
                    className={styles.emoji}>
                    {emoji}
                </div>
            ))}
            {[...Array(3)].map((index) => (
                <Image
                    key={Math.random() * 1000}
                    src="/metadorerna.png"
                    width={100}
                    height={100}
                    alt="Riktiga fipplare"
                    priority
                    className={[styles.emoji, styles.rotatingLogo].join(' ')}
                />
            ))}
        </div>
    );
}
