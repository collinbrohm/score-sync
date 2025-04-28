import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>SCORESYNC</div>
      <ul className={styles.navLinks}>
        <li>Home</li>
        <li>About us</li>
        <li>Services</li>
        <li>Testimonials</li>
      </ul>
      <div className={styles.authButtons}>
        <Link href="/Login">
          <button className={styles.signIn}>Sign in</button>
        </Link>
        <Link href="/SignUp">
          <button className={styles.register}>Register</button>
        </Link>
      </div>
    </nav>
  );
}
