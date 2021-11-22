import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { fetchWeather } from '../api/weather';

export async function getStaticProps() {
    const weathers = await fetchWeather();

    if (weathers) {
        return;
        {
            props: {
                weathers;
            }
        }
    } else {
        return { props: { key: null } };
    }
}

const Home: NextPage = (props) => {
console.log(props)
    return (
        <div className={styles.container}>
            <Head>
                <title>TDY</title>
                <meta
                    name="description"
                    content="Temperature Difference from Yesterday"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Temperature Difference from Yesterday
                </h1>
                <button
                    onClick={() => {
                        weather();
                    }}
                >
                    hi
                </button>
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
                        <Image
                            src="/vercel.svg"
                            alt="Vercel Logo"
                            width={72}
                            height={16}
                        />
                    </span>
                </a>
            </footer>
        </div>
    );
};

export default Home;
