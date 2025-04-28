import React from 'react';
import { LeagueAdministrator } from '../types/league';
import Input from './ui/Input';
import Card from './ui/Card';

interface AdministratorInfoProps {
  administrator: LeagueAdministrator;
  onChange: (administrator: LeagueAdministrator) => void;
}

const AdministratorInfo: React.FC<AdministratorInfoProps> = ({ 
  administrator, 
  onChange 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({
      ...administrator,
      [name]: value
    });
  };
  
  return (
    <Card title="Administrator Information">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          name="name"
          value={administrator.name}
          onChange={handleChange}
          placeholder="Your name"
          fullWidth
          required
        />
        
        <Input
          label="Email"
          name="email"
          type="email"
          value={administrator.email}
          onChange={handleChange}
          placeholder="email@example.com"
          fullWidth
          required
        />
        
        <Input
          label="Phone Number"
          name="phone"
          type="tel"
          value={administrator.phone}
          onChange={handleChange}
          placeholder="(123) 456-7890"
          fullWidth
        />
      </div>
    </Card>
  );
};

export default AdministratorInfo;