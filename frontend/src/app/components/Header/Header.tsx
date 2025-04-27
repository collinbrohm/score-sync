'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './Header.module.css';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Later pass this query to filter players, teams, etc.
  };

  return (
    <div className={styles.header}>
      {/* Search Bar */}
      <div className={styles.searchBox}>
        <Image src="/search.png" alt="Search" width={20} height={20} />
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Image
          src="/close.png"
          alt="Clear"
          width={20}
          height={20}
          onClick={() => setSearchQuery('')}
          style={{ cursor: 'pointer' }}
        />

      </div>

      {/* Notification and Profile */}
      <div className={styles.icons}>
        <Image src="/notification.png" alt="Notifications" width={24} height={24} />
        <Image src="/chat.png" alt="Chat" width={24} height={24} />
        <div className={styles.profile}>
          <Image src="/avatarDefault.png" alt="User" width={40} height={40} />
          <span className={styles.username}>USERNAME</span> {/* make this dynamic later */}
        </div>
      </div>
    </div>
  );
}
