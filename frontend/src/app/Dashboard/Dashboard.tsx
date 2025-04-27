'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import Image from 'next/image';
import styles from './Dashboard.module.css';

// Helper to get sport image path
const getSportImage = (sport: string) => {
  switch (sport.toLowerCase()) {
    case 'football':
      return '/football.png';
    case 'basketball':
      return '/basketball.png';
    case 'soccer':
      return '/soccer.png';
    case 'baseball':
      return '/baseball.png';
    case 'volleyball':
      return '/volleyball.png';
    default:
      return '/default_team.png'; // fallback in case sport name doesn't match
  }
};

export default function Dashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // This will be replaced later with real backend data
  const username = 'USERNAME HERE'; // placeholder for now

  // Placeholder teams
  const teams = [
    { name: 'Team 1', sport: 'Basketball' },
    { name: 'Team 2', sport: 'Football' },
    { name: 'Team 3', sport: 'Soccer' },
    { name: 'Team 4', sport: 'Baseball' },
    { name: 'Team 5', sport: 'Volleyball' },
  ];

  // Placeholder players
  const players = [
    { name: 'Lionel Messi', description: '#10 GOAT • Description goes here', image: '/lionel_messi.jpg' },
    { name: 'LeBron James', description: '6\'9" • Description goes here', image: '/lebron_james.jpg' },
    { name: 'Kirby Joseph', description: 'DB • Description goes here', image: '/kirby_joseph.jpg' },
    { name: 'Ronald Acuña Jr.', description: 'OF • Description goes here', image: '/ronald_acuna.jpg' },
  ];

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar isOpen={isSidebarOpen} onToggleSidebar={handleToggleSidebar} />

      <div className={`${styles.mainContent} ${isSidebarOpen ? styles.mainContentShift : ''}`}>
        <Header />

        {/* Banner Section */}
        <div className={styles.banner}>
          <div className={styles.bannerText}>
            <div>WELCOME BACK</div>
            <div>{username}</div> {/* Replace this with actual username from backend */}
          </div>
        </div>

        {/* My Teams Section */}
        <h2 className={styles.sectionTitle}>My Teams</h2>
        <div className={styles.scrollContainer}>
          {teams.map((team, index) => (
            <div key={index} className={styles.teamCard}>
              <Image
                src={getSportImage(team.sport)}
                alt={team.sport}
                width={44}
                height={44}
              />
              <div className={styles.teamName}>{team.name}</div>
              <div className={styles.sportName}>{team.sport}</div>
            </div>
          ))}
        </div>

        {/* Players Section */}
        <h2 className={styles.sectionTitle}>Players</h2>
        <div className={styles.scrollContainer}>
          {players.map((player, index) => (
            <div key={index} className={styles.playerCard}>
              <Image
                src={player.image}
                alt={player.name}
                width={200}
                height={120}
              />
              <div className={styles.playerName}>{player.name}</div>
              <div className={styles.playerDesc}>{player.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
