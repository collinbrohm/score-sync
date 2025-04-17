'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './SignUp.module.css';

export default function SignUp() {
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !username || !email || !password) {
      alert('Please fill out all fields.');
      return;
    }

    console.log('Signing up with:', {
      firstName,
      lastName,
      username,
      email,
      password,
    });

    router.push('/Dashboard');
  };

  return (
    <div className={styles.container}>
      <form className={styles.formBox} onSubmit={handleSubmit}>
        <h1 className={styles.heading}>WELCOME TO SCORESYNC</h1>
        <p className={styles.subheading}>
          Get started now! Please enter your details.
        </p>

        <div className={styles.row}>
          <div className={styles.halfInput}>
            <label htmlFor="firstName" className={styles.label}>
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={styles.input}
              placeholder="First Name"
              required
            />
          </div>
          <div className={styles.halfInput}>
            <label htmlFor="lastName" className={styles.label}>
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={styles.input}
              placeholder="Last Name"
              required
            />
          </div>
        </div>

        <label htmlFor="username" className={styles.label}>
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
          placeholder="Enter your Username"
          required
        />

        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          placeholder="Enter your email"
          required
        />

        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          placeholder="********"
          required
        />

        <button type="submit" className={styles.signUpButton}>
          Sign Up
        </button>

        <p className={styles.loginRedirect}>
          Already have an account? <Link href="/Login">Click here!</Link>
        </p>
      </form>

      <div className={styles.rightSide}>
        <div className={styles.sportsImages}>
          <Image
            src="/playing_rugby.png"
            alt="rugby"
            width={186}
            height={186}
            className={styles.rugby}
          />
          <Image
            src="/ultimate_frisbee.png"
            alt="frisbee"
            width={186}
            height={186}
            className={styles.frisbee}
          />
          <Image
            src="/playing_basketball.png"
            alt="basketball"
            width={186}
            height={186}
            className={styles.basketball}
          />
        </div>
      </div>
    </div>
  );
}
