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
            className={`px-4 py-2 rounded-lg ${isActive ? 'bg-primary text-text' : 'bg-surface text-text'} transition-colors`}
        >
            {label}
        </button>
    );
};

export default Tab;
