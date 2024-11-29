import React from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
    return (
        <div className="relative w-full max-w-lg">
            <FaSearch className="absolute top-3 left-3 text-textSecondary" />
            <input
                type="text"
                placeholder="Search..."
                value={value}
                onChange={onChange}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-surface text-textPrimary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
            />
        </div>
    );
};

export default SearchInput;
