import Image from 'next/image';
import styles from './page.module.css';
import { Toplist } from './Toplist';
import { Emojis } from './Emojis';

export default function Home() {
    return (
        <main className={styles.main}>
            <div className={styles.rotatingLogo}>
                <div style={{ position: 'relative', height: '300px', width: '200px', marginTop: '100px' }}>
                    <Image
                        src="/metadorerna.png"
                        width={200}
                        height={200}
                        alt="Riktiga fipplare"
                        priority
                        className={styles.metalogga}
                    />
                    <Image
                        src="/sombrero.png"
                        width={200}
                        height={200}
                        alt="Riktiga fipplare"
                        priority
                        className={styles.sombrero}
                    />
                </div>
            </div>
            <Toplist />
            <Emojis />
        </main>
    );
}
