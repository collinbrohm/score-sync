'use client';
import { useState, useEffect } from 'react';
import StatsBox from '../components/StatsBox/StatsBox';
import RosterSection from '../components/RosterSection/RosterSection';

export default function TeamStats() {
  const [roster, setRoster] = useState<any[]>([]);
  const [stats, setStats] = useState({
    wins: 0,
    losses: 0,
    ties: 0,
    record: '0-0-0',
  });
  const [teamName, setTeamName] = useState('Team Name');

  const fetchTeamData = async () => {
    try {
      // const response = await fetch('/api/team/123');
      // const data = await response.json();
      // setTeamName(data.teamName);
      // setStats(data.stats);
      // setRoster(data.roster);
    } catch (error) {
      console.error('Failed to fetch team data:', error);
    }
  };

  useEffect(() => {
    fetchTeamData();  // Fetch data when component mounts
  }, []);

  return (
    <div className="space-y-8">
      <StatsBox stats={stats} setStats={setStats} />
  
     <RosterSection roster={roster} setRoster={setRoster} />
   </div>
  );
}
