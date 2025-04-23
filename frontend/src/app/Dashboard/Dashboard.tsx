'use client';

//import Header from './components/Header/Header.tsx;'
import styles from './Dashboard.module.css';
import Image from 'next/image';

export default function Dashboard() {
  return (
    <div className={styles.dashboardContainer}>
     {/* <Header /> */}

      {/* Welcome Banner */}
      <div className={styles.welcomeBanner}>
        <div className={styles.coverImage}></div>
        <div className={styles.bannerText}>
          <h1>WELCOME BACK</h1>
          <h1>USERNAME HERE</h1>
        </div>
      </div>

      {/* My Teams */}
      <h2 className={styles.sectionTitle}>My Teams</h2>
      <div className={styles.teamRow}>
        {[1, 2, 3, 4].map((team) => (
          <div key={team} className={styles.teamCard}>
            <Image src="/team.png" alt={`Team ${team}`} width={44} height={44} />
            <h3>Team {team}</h3>
            <p>{['Basketball', 'Football', 'Soccer', 'Baseball'][team - 1]}</p>
          </div>
        ))}
      </div>

      {/* Players */}
      <h2 className={styles.sectionTitle}>Players</h2>
      <div className={styles.playerRow}>
        {/* Placeholder images for now */}
        {["messi.png", "lebron.png", "kirby.png", "ronald.png"].map((img, i) => (
          <div key={i} className={styles.playerCard}>
            <Image src={`/${img}`} alt="Player" width={200} height={120} className={styles.playerImg} />
            <div className={styles.playerInfo}>
              <h4>{['Lionel Messi', 'LeBron James', 'Kirby Joseph', 'Ronald Acuña Jr.'][i]}</h4>
              <p>Player description goes here</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
