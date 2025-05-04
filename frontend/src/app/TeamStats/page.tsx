'use client';
import TeamStats from './TeamStats';

export default function TeamStatsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-staatliches p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl mb-10 text-center">Insert Top Bar</h1>
        <TeamStats />
      </div>
    </div>
  );
}