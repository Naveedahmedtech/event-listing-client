import React from 'react';
import Select from 'react-select';

interface CitySelectorProps {
    options: { value: string; label: string }[];
    value: any;
    onChange: (selectedOption: any) => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({ options, value, onChange }) => {
    return (
        <div className="w-48">
            <Select
                options={options}
                placeholder="Select City"
                value={value}
                onChange={onChange}
                className="text-sm"
                styles={{
                    control: (provided) => ({
                        ...provided,
                        backgroundColor: 'var(--surface)',
                        borderColor: 'var(--border)',
                        borderRadius: '0.375rem',
                        color: 'var(--text-primary)',
                        boxShadow: 'none',
                        ':hover': {
                            borderColor: 'var(--primary)',
                        },
                    }),
                    singleValue: (provided) => ({
                        ...provided,
                        color: 'var(--text-primary)',
                    }),
                    placeholder: (provided) => ({
                        ...provided,
                        color: 'var(--text-secondary)',
                    }),
                    menu: (provided) => ({
                        ...provided,
                        backgroundColor: 'var(--surface)',
                    }),
                    option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isFocused ? 'var(--primary-hover)' : 'var(--surface)',
                        color: state.isFocused ? 'var(--text-primary)' : 'var(--text-primary)',
                        ':active': {
                            backgroundColor: 'var(--primary)',
                        },
                    }),
                }}
            />
        </div>
    );
};

export default CitySelector;
