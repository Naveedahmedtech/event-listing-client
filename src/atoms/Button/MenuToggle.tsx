import React from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

interface MenuToggleProps {
    isOpen: boolean;
    onToggle: () => void;
}

const MenuToggle: React.FC<MenuToggleProps> = ({ isOpen, onToggle }) => {
    return (
        <button
            onClick={onToggle}
            className="lg:hidden text-textPrimary hover:text-primary focus:outline-none z-[1000]"
        >
            {isOpen ? <FaTimes className="w-7 h-7" /> : <FaBars className="w-7 h-7" />}
        </button>
    );
};

export default MenuToggle;
