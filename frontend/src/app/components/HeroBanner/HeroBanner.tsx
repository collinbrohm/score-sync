'use client';

import Link from 'next/link';
import styles from './HeroBanner.module.css';

export default function HeroBanner() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.cover} />

      <h1 className={styles.score}>SCORE</h1>
      <h1 className={styles.sync}>SYNC</h1>
      <p className={styles.subtitle}>TRACK PLAYERS STATS<br />IN LOCAL LEAGUES</p>

      <div className={styles.auth}>
        <Link href="/Login" className={styles.login}>LOGIN</Link>
        <div className={styles.or}>OR</div>
        <Link href="/SignUp" className={styles.signup}>SIGN UP TODAY</Link>
      </div>
    </div>
  );
}
