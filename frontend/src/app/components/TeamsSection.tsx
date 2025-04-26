import React from 'react';
import { Team } from '../types/league';
import Button from './ui/Button';
import Input from './ui/Input';
import Card from './ui/Card';
import { Trash2 } from 'lucide-react';

interface TeamsSectionProps {
  teams: Team[];
  onChange: (teams: Team[]) => void;
}

const TeamsSection: React.FC<TeamsSectionProps> = ({ teams, onChange }) => {
  const addTeam = () => {
    const newTeam: Team = {
      id: `team-${Date.now()}`,
      name: '',
      contactName: '',
      contactEmail: ''
    };
    
    onChange([...teams, newTeam]);
  };
  
  const updateTeam = (index: number, field: keyof Team, value: string) => {
    const updatedTeams = [...teams];
    updatedTeams[index] = {
      ...updatedTeams[index],
      [field]: value
    };
    
    onChange(updatedTeams);
  };
  
  const removeTeam = (index: number) => {
    const updatedTeams = teams.filter((_, i) => i !== index);
    onChange(updatedTeams);
  };
  
  return (
    <Card title="Teams">
      {teams.map((team, index) => (
        <div key={team.id} className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50 relative">
          <button
            type="button"
            onClick={() => removeTeam(index)}
            className="absolute top-3 right-3 text-gray-500 hover:text-red-600 transition-colors"
            aria-label="Remove team"
          >
            <Trash2 size={18} />
          </button>
          
          <div className="mb-4">
            <h4 className="font-medium text-gray-700 mb-2">Team {index + 1}</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Team Name"
              value={team.name}
              onChange={(e) => updateTeam(index, 'name', e.target.value)}
              placeholder="Enter team name"
              fullWidth
            />
            
            <Input
              label="Contact Person"
              value={team.contactName}
              onChange={(e) => updateTeam(index, 'contactName', e.target.value)}
              placeholder="Full name"
              fullWidth
            />
            
            <Input
              label="Contact Email"
              type="email"
              value={team.contactEmail}
              onChange={(e) => updateTeam(index, 'contactEmail', e.target.value)}
              placeholder="email@example.com"
              fullWidth
            />
          </div>
        </div>
      ))}
      
      <div className="mt-4">
        <Button 
          type="button"
          variant="outline"
          onClick={addTeam}
        >
          Add Team
        </Button>
      </div>
    </Card>
  );
};

export default TeamsSection;