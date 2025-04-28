import React from 'react';
import Card from './ui/Card';
import Sidebar from './Sidebar/Sidebar';

interface LeagueRulesProps {
  rules: string;
  onChange: (rules: string) => void;
}

const LeagueRules: React.FC<LeagueRulesProps> = ({ rules, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };
  
  return (
    
    <Card title="League Rules">
      <div className="mb-4">
        <label htmlFor="rules" className="block mb-2 text-sm font-medium text-gray-700">
          Additional Rules and Information
        </label>
        <textarea
          id="rules"
          rows={6}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter any additional rules, requirements, or information about your league..."
          value={rules}
          onChange={handleChange}
        />
      </div>
    </Card>
  );
};

export default LeagueRules;