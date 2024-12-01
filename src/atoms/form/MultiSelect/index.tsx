import React from 'react';
import Select from 'react-select';

interface MultiSelectProps {
    options: { value: string; label: string }[];
    value: any[];
    onChange: (selectedOptions: any) => void;
    placeholder: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ options, value, onChange, placeholder }) => {
    return (
        <Select
            options={options}
            value={value}
            onChange={onChange}
            isMulti
            placeholder={placeholder}
            className="react-select-container bg-surface"
            classNamePrefix="react-select"
            closeMenuOnSelect={false}
            captureMenuScroll
            styles={{
                control: (provided) => ({
                    ...provided,
                    borderColor: 'var(--primary)', // Custom border color
                    backgroundColor: 'var(--surface)', // Background color for the control
                    borderRadius: '8px',
                    padding: '5px',
                    cursor: 'pointer',
                    '&:hover': {
                        borderColor: 'var(--primary)', // Hover border color
                    },
                }),
                multiValue: (provided) => ({
                    ...provided,
                    backgroundColor: 'var(--surface)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                }),
                multiValueLabel: (provided) => ({
                    ...provided,
                    color: 'var(--text)', // Text color for the selected items
                }),
                multiValueRemove: (provided) => ({
                    ...provided,
                    color: 'var(--text)',
                    ':hover': {
                        backgroundColor: 'var(--primary)', // Hover background color
                        color: 'var(--text)',
                    },
                    cursor: 'pointer',
                }),
                // Targeting the placeholder directly in the 'control' element
                placeholder: (provided) => ({
                    ...provided,
                    color: 'var(--text) !important', // Force text color of input

                }),
                input: (provided) => ({
                    ...provided,
                    color: 'var(--text) !important', // Force text color of input
                }),
                dropdownIndicator: (provided) => ({
                    ...provided,
                    color: 'var(--text)', // Dropdown arrow color
                    cursor: 'pointer',
                }),
                menu: (provided) => ({
                    ...provided,
                    backgroundColor: 'var(--surface)', // Background color for dropdown menu
                }),
                option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected ? 'var(--primary)' : 'var(--surface)',
                    color: state.isSelected ? 'var(--text)' : 'var(--text)',
                    cursor: 'pointer',
                    ':hover': {
                        backgroundColor: 'var(--background)', // Hover background color
                        color: 'var(--text)', // Hover text color
                    },
                }),
            }}
        />
    );
};

export default MultiSelect;
