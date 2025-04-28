import React from 'react';
import { SchedulePreference } from '../types/league';
import Checkbox from './ui/Checkbox';
import Input from './ui/Input';
import Card from './ui/Card';

interface SchedulePreferencesProps {
  preferences: SchedulePreference;
  onChange: (preferences: SchedulePreference) => void;
}

const SchedulePreferences: React.FC<SchedulePreferencesProps> = ({ 
  preferences, 
  onChange 
}) => {
  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];
  
  const timesOfDay = [
    'Morning (9am-12pm)', 'Afternoon (12pm-5pm)', 'Evening (5pm-9pm)', 'Night (9pm-12am)'
  ];
  
  const handleDayChange = (day: string) => (checked: boolean) => {
    const updatedDays = checked
      ? [...preferences.dayOfWeek, day]
      : preferences.dayOfWeek.filter(d => d !== day);
    
    onChange({
      ...preferences,
      dayOfWeek: updatedDays
    });
  };
  
  const handleTimeChange = (time: string) => (checked: boolean) => {
    const updatedTimes = checked
      ? [...preferences.timeOfDay, time]
      : preferences.timeOfDay.filter(t => t !== time);
    
    onChange({
      ...preferences,
      timeOfDay: updatedTimes
    });
  };
  
  const handleGamesPerWeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...preferences,
      gamesPerWeek: parseInt(e.target.value, 10) || 1
    });
  };
  
  return (
    <Card title="Schedule Preferences">
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Available Days</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {daysOfWeek.map(day => (
            <Checkbox
              key={day}
              label={day}
              checked={preferences.dayOfWeek.includes(day)}
              onChange={handleDayChange(day)}
            />
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Preferred Times</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {timesOfDay.map(time => (
            <Checkbox
              key={time}
              label={time}
              checked={preferences.timeOfDay.includes(time)}
              onChange={handleTimeChange(time)}
            />
          ))}
        </div>
      </div>
      
      <div className="max-w-xs">
        <Input
          label="Games Per Week"
          type="number"
          min={1}
          max={7}
          value={preferences.gamesPerWeek.toString()}
          onChange={handleGamesPerWeekChange}
          fullWidth
        />
      </div>
    </Card>
  );
};

export default SchedulePreferences;