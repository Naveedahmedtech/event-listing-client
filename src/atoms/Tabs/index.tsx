import Tab from '@/components/Tab';
import React from 'react';

interface TabsProps {
  options: string[];
  onSelect: (selectedOption: string) => void;
  selectedOption: string;
}

const Tabs: React.FC<TabsProps> = ({ options, onSelect, selectedOption }) => {
  return (
    <div className="flex flex-wrap justify-center sm:justify-start space-x-2 sm:space-x-4 mb-6 space-y-2">
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
