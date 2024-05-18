import Image from 'next/image';
import styles from './page.module.css';
import { Toplist } from './Toplist';
import { Emojis } from './Emojis';

export default function Home() {
    return (
        <main className={styles.main}>
            <Image
                src="/metadorerna.png"
                width={200}
                height={200}
                alt="Riktiga fipplare"
                priority
                className={styles.rotatingLogo}
            />
            <div className={styles.description}>
                <Toplist />
            </div>
            <Emojis />
        </main>
    );
}
