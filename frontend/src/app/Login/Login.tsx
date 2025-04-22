'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Login.module.css';
import { useRouter } from 'next/navigation';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Logging in with:', { email, password });
    router.push('/Dashboard');
  };
  

  return (
    <div className={styles.container}>
      <form className={styles.formBox} onSubmit={handleSubmit}>
        <h1 className={styles.heading}>WELCOME BACK</h1>
        <p className={styles.subheading}>Welcome back! Please enter your details.</p>

        <label htmlFor="email" className={styles.label}>Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          placeholder="Enter your email"
          required
        />

        <label htmlFor="password" className={styles.label}>Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          placeholder="********"
          required
        />

        <div className={styles.options}>
          <label className={styles.remember}>
            <input type="checkbox" />
            Remember me
          </label>
          <a href="#" className={styles.forgot}>Forgot password</a>
        </div>

        <button type="submit" className={styles.signInButton}>Sign in</button>
        <p className={styles.signupText}>
          Don’t have an account? <Link href="/SignUp">Sign up for free!</Link>
        </p>
      </form>

    <div className={styles.rightSide}>
        <div className={styles.sportsImages}>
            <Image src="/playing_rugby.png" alt="rugby" width={186} height={186} className={styles.rugby} />
            <Image src="/ultimate_frisbee.png" alt="frisbee" width={186} height={186} className={styles.frisbee} />
            <Image src="/playing_basketball.png" alt="basketball" width={186} height={186} className={styles.basketball} />
        </div>
    </div>

</div>
  );
}
