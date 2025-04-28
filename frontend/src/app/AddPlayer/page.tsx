'use client';
import AddPlayers from '../components/AddPlayer/AddPlayer';

export default function AddPlayersPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8 font-staatliches">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl mb-8 text-center">Add Players</h1>
        <AddPlayers />
      </div>
    </div>
  );
}