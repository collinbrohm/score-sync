'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './Header.module.css';

interface HeaderProps {
  username?: string;
  profileImage?: string;
}

export default function Header({ username, profileImage }: HeaderProps) {
  const router = useRouter();

  const handleProfileClick = () => {
    router.push('/Settings');
  };

  return (
    <div className={styles.header}>
      <div className={styles.searchBox}>
        <Image src="/search.png" alt="Search" width={20} height={20} />
        <input type="text" placeholder="search..." />
        <Image src="/close.png" alt="Close" width={20} height={20} />
      </div>

      <div className={styles.icons}>
        <Image src="/notification.png" alt="Notifications" width={24} height={24} />
        <Image src="/chat.png" alt="Chat" width={24} height={24} />
        <div className={styles.profile} onClick={handleProfileClick}>
          <Image
            src={profileImage ? profileImage : '/avatarDefault.png'}
            alt="User Profile"
            width={40}
            height={40}
            className={styles.profileImage}
          />
          <span className={styles.username}>
            {username || 'USERNAME'}
          </span>
        </div>
      </div>
    </div>
  );
}
