'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Sidebar.module.css';

interface SidebarProps {
  isOpen: boolean;
  onToggleSidebar: () => void;
}

export default function Sidebar({ isOpen, onToggleSidebar }: SidebarProps) {
  return (
    <div className={`${styles.sidebar} ${!isOpen ? styles.closed : ''}`}>
      <div className={styles.toggleButton} onClick={onToggleSidebar}>
        <Image src="/sidebarIcon.png" alt="Toggle Sidebar" width={25} height={25} />
      </div>

      <div className={styles.sidebarContent}>
        {/* MENU Section */}
        <div className={styles.section}>
          <h2 className={`${styles.sectionTitle} ${!isOpen ? styles.hiddenText : ''}`}>Menu</h2>
          <Link href="/Dashboard" className={styles.link}>
            <Image src="/browseIcon.png" alt="Browse" width={30} height={30} />
            <span className={`${styles.linkText} ${!isOpen ? styles.hiddenText : ''}`}>Browse</span>
          </Link>
          <Link href="/TeamStats" className={styles.link}>
            <Image src="/statsIcon.png" alt="Stats" width={26} height={26} />
            <span className={`${styles.linkText} ${!isOpen ? styles.hiddenText : ''}`}>Stats</span>
          </Link>
        </div>

        {/* SOCIAL Section */}
        <div className={styles.section}>
          <h2 className={`${styles.sectionTitle} ${!isOpen ? styles.hiddenText : ''}`}>Social</h2>
          <Link href="/PlayerProfile" className={styles.link}>
            <Image src="/playersIcon.png" alt="Player Profile" width={30} height={30} />
            <span className={`${styles.linkText} ${!isOpen ? styles.hiddenText : ''}`}>Player Profile</span>
          </Link>
          <Link href="/Dashboard" className={styles.link}>
            <Image src="/teamsIcon.png" alt="Teams" width={30} height={30} />
            <span className={`${styles.linkText} ${!isOpen ? styles.hiddenText : ''}`}>Teams</span>
          </Link>
        </div>

        {/* GENERAL Section */}
        <div className={styles.section}>
          <h2 className={`${styles.sectionTitle} ${!isOpen ? styles.hiddenText : ''}`}>General</h2>
          <Link href="/Settings" className={styles.link}>
            <Image src="/settingsIcon.png" alt="Settings" width={30} height={30} />
            <span className={`${styles.linkText} ${!isOpen ? styles.hiddenText : ''}`}>Settings</span>
          </Link>
          <Link href="/" className={styles.link}>
            <Image src="/logoutIcon.png" alt="Log Out" width={24} height={24} />
            <span className={`${styles.linkText} ${!isOpen ? styles.hiddenText : ''}`}>Log Out</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
