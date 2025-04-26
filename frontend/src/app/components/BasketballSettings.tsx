import React from 'react';
import { BasketballSettings as BasketballSettingsType } from '../types/league';
import Input from './ui/Input';
import Select from './ui/Select';
import Checkbox from './ui/Checkbox';
import Card from './ui/Card';

interface BasketballSettingsProps {
  settings: BasketballSettingsType;
  onChange: (settings: BasketballSettingsType) => void;
}

const BasketballSettings: React.FC<BasketballSettingsProps> = ({ settings, onChange }) => {
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({
      ...settings,
      [name]: parseInt(value, 10) || 0
    });
  };

  const handleCheckboxChange = (name: keyof BasketballSettingsType) => (checked: boolean) => {
    onChange({
      ...settings,
      [name]: checked
    });
  };

  return (
    <Card title="Basketball Settings">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Quarter Length (minutes)"
          name="quarterLength"
          type="number"
          min={1}
          max={20}
          value={settings.quarterLength.toString()}
          onChange={handleNumberChange}
          fullWidth
        />
        
        <Input
          label="Shot Clock (seconds)"
          name="shotClockLength"
          type="number"
          min={0}
          max={60}
          value={settings.shotClockLength.toString()}
          onChange={handleNumberChange}
          fullWidth
        />
        
        <Input
          label="Overtime Length (minutes)"
          name="overtimeLength"
          type="number"
          min={1}
          max={10}
          value={settings.overtimeLength.toString()}
          onChange={handleNumberChange}
          fullWidth
        />
        
        <Input
          label="Fouls Per Quarter (team)"
          name="foulsPerQuarter"
          type="number"
          min={1}
          max={10}
          value={settings.foulsPerQuarter.toString()}
          onChange={handleNumberChange}
          fullWidth
        />
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Checkbox
          label="Use Three-Point Line"
          checked={settings.useThreePointLine}
          onChange={handleCheckboxChange('useThreePointLine')}
        />
        
        <Checkbox
          label="Use Bonus Free Throws"
          checked={settings.useBonus}
          onChange={handleCheckboxChange('useBonus')}
        />
      </div>
    </Card>
  );
};

export default BasketballSettings;