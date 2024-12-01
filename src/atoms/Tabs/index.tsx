import Tab from '@/components/Tab';
import React from 'react';

interface TabsProps {
  options: string[];
  onSelect: (selectedOption: string) => void;
  selectedOption: string;
}

const Tabs: React.FC<TabsProps> = ({ options, onSelect, selectedOption }) => {
  return (
    <div className="flex space-x-4 mb-6">
      {options.map((option) => (
        <Tab
          key={option}
          label={option}
          isActive={option === selectedOption}
          onClick={() => onSelect(option)}
        />
      ))}
    </div>
  );
};

export default Tabs;
