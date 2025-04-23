'use client';

import Image from 'next/image';
import styles from './Header.module.css';

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.searchBox}>
        <Image src="/search_icon.png" alt="Search" width={20} height={20} />
        <input type="text" placeholder="search..." />
        <Image src="/close_icon.png" alt="Close" width={20} height={20} />
      </div>

      <div className={styles.icons}>
        <Image src="/notification_icon.png" alt="Notifications" width={24} height={24} />
        <Image src="/chat_icon.png" alt="Chat" width={24} height={24} />
        <div className={styles.profile}>
          <Image src="/profile.png" alt="User" width={40} height={40} />
          <span className={styles.username}>USERNAME</span>
        </div>
      </div>
    </div>
  );
}
