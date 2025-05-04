"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import Image from "next/image";
import styles from "./Dashboard.module.css";

// Types
interface Team {
  id: number;
  name: string;
  sport: string;
}

interface Player {
  name: string;
  description: string;
  image: string | null;
}

// Helpers
const getSportImage = (sport: string) => {
  switch (sport.toLowerCase()) {
    case "football":
      return "/football.png";
    case "basketball":
      return "/basketball.png";
    case "soccer":
      return "/soccer.png";
    case "baseball":
      return "/baseball.png";
    case "volleyball":
      return "/volleyball.png";
    default:
      return "/defaultSport.png";
  }
};

const getPlayerImage = (image: string | null) => {
  return image || "/defaultProfile.svg";
};

export default function Dashboard() {
  const router = useRouter();

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [username, setUsername] = useState("Loading...");
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  const handleToggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const handleCreateLeague = () => router.push("/CreateLeague");
  const handleTeamClick = () => router.push("/TeamStats");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/dashboard");
        const data = await response.json();

        setUsername(data.username);
        setTeams(data.teams || []);
        setPlayers(data.players || []);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar isOpen={isSidebarOpen} onToggleSidebar={handleToggleSidebar} />

      <div className={`${styles.mainContent} ${isSidebarOpen ? styles.mainContentShift : ""}`}>
        <Navbar />

        {/* Banner */}
        <div className={styles.banner}>
          <div className={styles.bannerText}>
            <div>WELCOME BACK</div>
            <div>{username}</div>
          </div>
        </div>

        {/* My Teams */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>My Teams</h2>
          <button className={styles.plusButton} onClick={handleCreateLeague}>
            <Image src="/plusIcon.png" alt="Add Team" width={30} height={30} />
          </button>
        </div>

        <div className={styles.scrollContainer}>
          {teams.map((team) => (
            <div key={team.id} className={styles.teamCard} onClick={handleTeamClick}>
              <Image src={getSportImage(team.sport)} alt={team.sport} width={44} height={44} />
              <div className={styles.teamName}>{team.name}</div>
              <div className={styles.sportName}>{team.sport}</div>
            </div>
          ))}
        </div>

        {/* Players */}
        <h2 className={styles.sectionTitle}>Players</h2>
        <div className={styles.scrollContainer}>
          {players.map((player, index) => (
            <div key={index} className={styles.playerCard}>
              <Image
                src={getPlayerImage(player.image)}
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
