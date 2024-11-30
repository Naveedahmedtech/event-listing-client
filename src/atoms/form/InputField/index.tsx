import React from 'react';

interface InputFieldProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, placeholder }) => {
    return (
        <div className="flex flex-col">
            <label className="text-sm text-gray-700">{label}</label>
            <input
                type="text"
                value={value}
                onChange={onChange}
                className="mt-2 p-2 border rounded-lg"
                placeholder={placeholder}
            />
        </div>
    );
};

export default InputField;
