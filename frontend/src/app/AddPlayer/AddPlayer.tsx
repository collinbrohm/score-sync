'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddPlayers() {
  const router = useRouter();

  // Hardcoded players for now — will use GET/POST from database in final version
  const allPlayers = [
    { id: 1, firstName: "LeBron", lastName: "James" },
    { id: 2, firstName: "Cristiano", lastName: "Ronaldo" },
    { id: 3, firstName: "Morgan", lastName: "Gibbs-White" },
    { id: 4, firstName: "Anthony", lastName: "Davis" },
    { id: 5, firstName: "Dennis", lastName: "Schroder" },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<any[]>([]);

  // Later: Replace with GET request from database
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const results = allPlayers.filter((player) =>
      `${player.firstName} ${player.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleAddPlayer = (player: any) => {
    if (!selectedPlayers.find((p) => p.id === player.id)) {
      setSelectedPlayers([...selectedPlayers, player]);
    }
  };

  const handleDone = () => {
    localStorage.setItem('selectedPlayers', JSON.stringify(selectedPlayers));
    router.push('/TeamStats'); // Redirect back to TeamStats page
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8 font-staatliches">
      <div className="max-w-4xl mx-auto space-y-10">
        <h1 className="text-4xl mb-6 text-center">Add Players</h1>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex space-x-4">
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            required
            className="flex-1 p-2 border-2 border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-foreground text-background rounded-md hover:bg-gray-700 transition"
          >
            Search
          </button>
        </form>

        {/* Search Results */}
        <div className="space-y-4">
          <h3 className="text-2xl">Search Results:</h3>
          {searchResults.length > 0 ? (
            searchResults.map((player) => (
              <div
                key={player.id}
                className="flex items-center justify-between p-4 bg-gray-100 rounded-md shadow-sm"
              >
                <span>{player.firstName} {player.lastName}</span>
                <button
                  onClick={() => handleAddPlayer(player)}
                  className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                >
                  Add
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No players found.</p>
          )}
        </div>

        {/* Selected Players */}
        <div className="space-y-4">
          <h3 className="text-2xl">Selected Players:</h3>
          {selectedPlayers.length > 0 ? (
            selectedPlayers.map((player) => (
              <p key={player.id}>
                {player.firstName} {player.lastName}
              </p>
            ))
          ) : (
            <p className="text-gray-500">No players selected yet.</p>
          )}
        </div>

        {/* Done Button */}
        <div className="flex justify-center">
          <button
            onClick={handleDone}
            className="px-6 py-3 bg-foreground text-background rounded-lg hover:bg-gray-700 transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
