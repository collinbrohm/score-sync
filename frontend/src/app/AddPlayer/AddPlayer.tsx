'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

export default function AddPlayers() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const teamId = searchParams.get('team_id');
  console.log('TEAM ID', teamId)
  const [players, setPlayers] = useState<any[]>([]);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    jerseyNumber: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddPlayer = async () => {
    const payload = {
      team_id: teamId,
      first_name: form.firstName,
      last_name: form.lastName,
      jersey_number: parseInt(form.jerseyNumber),
      email: form.email,
    };

    try {
      const response = await fetch('http://localhost:5000/player', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to add player');
      const data = await response.json();
      setPlayers([...players, data]);

      setForm({ firstName: '', lastName: '', jerseyNumber: '', email: '' });
    } catch (err) {
      console.error('Error adding player:', err);
      alert('Failed to add player');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8 font-staatliches">
      <div className="max-w-3xl mx-auto space-y-10">
        <h1 className="text-4xl mb-6 text-center">Add a Player</h1>

        <div className="space-y-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="jerseyNumber"
            placeholder="Jersey Number"
            value={form.jerseyNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <button
            onClick={handleAddPlayer}
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Add Player
          </button>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl mb-4">Added Players</h2>
          {players.map((p) => (
            <div key={p.id} className="border p-4 rounded mb-2 bg-white shadow-sm">
              <p>{p.first_name} {p.last_name} (#{p.jersey_number}) - {p.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
