'use client';
import { useEffect, useState } from 'react';
import StatsBox from '../components/StatsBox/StatsBox';
import RosterSection from '../components/RosterSection/RosterSection';

interface Player {
  id: number;
  firstName: string;
  lastName: string;
  jerseyNumber?: number;
  email?: string;
}

interface TeamData {
  id: number;
  team_name: string;
  wins: number;
  losses: number;
  ties: number;
  roster_names: Player[];
}

export default function TeamStats() {
  const [teams, setTeams] = useState<TeamData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      const leagueId = localStorage.getItem('league_id');
      if (!leagueId) {
        console.warn('No league_id found in localStorage');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/team/${leagueId}`);
        if (!response.ok) throw new Error('Failed to fetch teams');
        const data = await response.json();
        console.log(data)
        setTeams(data.responses.teams || []);
      } catch (err) {
        console.error('Error fetching teams:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const handleStatChange = (teamId: number, updatedStats: { wins: number; losses: number; ties: number }) => {
    setTeams((prev) =>
      prev.map((team) => (team.id === teamId ? { ...team, ...updatedStats } : team))
    );
  };

  const handleRosterChange = (teamId: number, updatedRoster: Player[]) => {
    setTeams((prev) =>
      prev.map((team) => (team.id === teamId ? { ...team, roster_names: updatedRoster } : team))
    );
  };

  const saveTeamStats = async (team: TeamData) => {
    console.log('TEAM', team)
    const leagueId = localStorage.getItem('league_id');
    try {
      console.log(team.id)
      const response = await fetch(`http://localhost:5000/team/${leagueId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          team_id: team.id,
          wins: team.wins,
          losses: team.losses,
          ties: team.ties,
          roster_names: team.roster_names,
        }),
      });

      if (!response.ok) throw new Error('Failed to save team stats');
      alert(`Saved changes for ${team.team_name}`);
    } catch (error) {
      console.error('Error saving team stats:', error);
      alert('Failed to update team');
    }
  };

  if (loading) {
    return <div className="text-center text-lg mt-10">Loading teams...</div>;
  }

  return (
    <div className="space-y-10">
      {teams.map((team) => (
        <div key={team.id} className="border p-6 rounded-lg shadow-md bg-white space-y-4">
          <h2 className="text-2xl font-semibold">{team.team_name}</h2>

          <StatsBox
            stats={{
              wins: team.wins,
              losses: team.losses,
              ties: team.ties,
              record: `${team.wins}-${team.losses}-${team.ties}`,
            }}
            setStats={(updatedStats) => handleStatChange(team.id, updatedStats)}
          />

          <RosterSection
            teamId={team.id}
            roster={team.roster_names}
            setRoster={(updatedRoster) => handleRosterChange(team.id, updatedRoster)}
          />

          <button
            onClick={() => saveTeamStats(team)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>
      ))}
    </div>
  );
}
