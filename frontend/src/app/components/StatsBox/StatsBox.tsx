"use client";
import { useState } from "react";

export type Stats = {
  wins: number;
  losses: number;
  ties: number;
  record: string;
};

type StatsBoxProps = {
  stats: Stats;
  setStats: (stats: Stats) => void;
};

export default function StatsBox({ stats, setStats }: StatsBoxProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editStats, setEditStats] = useState(stats);

  const toggleEditing = () => {
    setEditStats(stats); // Reset edits when toggling
    setIsEditing(!isEditing);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditStats({
      ...editStats,
      [e.target.name]: Number(e.target.value),
    });
  };

  const handleSave = () => {
    const updatedRecord = `${editStats.wins}-${editStats.losses}-${editStats.ties}`;
    setStats({
      ...editStats,
      record: updatedRecord,
    });
    setIsEditing(false);
  };

  return (
    <div className="relative flex items-center bg-gray-100 text-foreground p-8 rounded-lg shadow-md">
      {/* Left side: Team Name */}
      <div className="pr-8 border-r-2 border-gray-300 flex-shrink-0">
        <h2 className="text-5xl font-staatliches">Team Name</h2>
      </div>

      {/* Right side: Stats */}
      <div className="pl-8 flex-1 grid grid-cols-2 gap-6">
        {isEditing ? (
          <>
            <div className="space-y-4">
              <label>
                Wins:
                <input
                  type="number"
                  name="wins"
                  value={editStats.wins}
                  onChange={handleChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                />
              </label>
              <label>
                Losses:
                <input
                  type="number"
                  name="losses"
                  value={editStats.losses}
                  onChange={handleChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                />
              </label>
            </div>
            <div className="space-y-4">
              <label>
                Ties:
                <input
                  type="number"
                  name="ties"
                  value={editStats.ties}
                  onChange={handleChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                />
              </label>
              <div className="flex space-x-2 pt-4">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                >
                  Save
                </button>
                <button
                  onClick={toggleEditing}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="text-lg">
              <p><span className="font-bold">Wins:</span> {stats.wins}</p>
              <p><span className="font-bold">Losses:</span> {stats.losses}</p>
            </div>
            <div className="text-lg">
              <p><span className="font-bold">Ties:</span> {stats.ties}</p>
              <p><span className="font-bold">Record:</span> {stats.record}</p>
            </div>
          </>
        )}
      </div>

      {/* Edit Button - always visible */}
      {!isEditing && (
        <button
          onClick={toggleEditing}
          className="absolute bottom-4 right-4 px-4 py-2 bg-foreground text-background rounded-md hover:bg-gray-700 transition"
        >
          Edit Stats
        </button>
      )}
    </div>
  );
}