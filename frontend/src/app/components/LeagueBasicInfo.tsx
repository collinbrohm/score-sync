import React from 'react';
import { LeagueSettings } from '../types/league';
import Input from './ui/Input';
import Card from './ui/Card';

interface LeagueBasicInfoProps {
  leagueSettings: LeagueSettings;
  onChange: (settings: LeagueSettings) => void;
}

const LeagueBasicInfo: React.FC<LeagueBasicInfoProps> = ({ 
  leagueSettings, 
  onChange 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({
      ...leagueSettings,
      [name]: value
    });
  };

  return (
    <Card title="League Information">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="League Name"
          name="name"
          value={leagueSettings.name}
          onChange={handleChange}
          placeholder="Enter league name"
          fullWidth
          required
        />
        
        <Input
          label="Location"
          name="location"
          value={leagueSettings.location}
          onChange={handleChange}
          placeholder="City, State"
          fullWidth
        />
        
        <Input
          label="Season"
          name="season"
          value={leagueSettings.season}
          onChange={handleChange}
          placeholder="e.g. Summer 2025"
          fullWidth
        />
        
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            label="Start Date"
            name="startDate"
            type="date"
            value={leagueSettings.startDate}
            onChange={handleChange}
            fullWidth
          />
          
          <Input
            label="End Date"
            name="endDate"
            type="date"
            value={leagueSettings.endDate}
            onChange={handleChange}
            fullWidth
          />
        </div>
      </div>
    </Card>
  );
};

export default LeagueBasicInfo;