import React from "react";

interface TabProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ label, isActive, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-lg transition-colors ${
                isActive 
                    ? 'bg-primary text-white' // Active state styles
                    : 'bg-surface text-text'  // Inactive state styles
            }`}
        >
            {label}
        </button>
    );
};

export default Tab;
