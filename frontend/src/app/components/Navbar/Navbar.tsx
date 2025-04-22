import styles from './Navbar.module.css';

export default function Navbar() {
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
        <button className={styles.signIn}>Sign in</button>
        <button className={styles.register}>Register</button>
      </div>
    </nav>
  );
}
