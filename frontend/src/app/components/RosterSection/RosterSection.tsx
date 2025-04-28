'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function RosterSection() {
  // Hardcoded starting roster for visualization
  
  const [roster, setRoster] = useState([
    { id: 1, firstName: "Alice", lastName: "Anderson", jerseyNumber: 7, email: "alice@example.com" },
  ]);

  const handleRemovePlayer = (id: number) => {
    const updatedRoster = roster.filter(player => player.id !== id);
    setRoster(updatedRoster);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-staatliches">Team Roster</h2>
        <Link href="/AddPlayer">
          <button className="px-4 py-2 bg-foreground text-background rounded-md hover:bg-gray-700 transition">
            Add Player
          </button>
        </Link>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-background border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b text-left">Player Name</th>
              <th className="py-2 px-4 border-b text-left">Jersey Number</th>
              <th className="py-2 px-4 border-b text-left">Email</th>
              <th className="py-2 px-4 border-b text-center"></th>
            </tr>
          </thead>
          <tbody>
            {roster.length > 0 ? (
              roster.map((player) => (
                <tr key={player.id}>
                  <td className="py-2 px-4 border-b">{player.firstName} {player.lastName}</td>
                  <td className="py-2 px-4 border-b text-center">{player.jerseyNumber ?? "-"}</td>
                  <td className="py-2 px-4 border-b text-center">{player.email ?? "-"}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      onClick={() => handleRemovePlayer(player.id)}
                      className="bg-red-100 text-red-600 hover:bg-red-300 transition rounded-md px-2 py-1"
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-4 px-4 text-center text-gray-500">
                  No players added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
