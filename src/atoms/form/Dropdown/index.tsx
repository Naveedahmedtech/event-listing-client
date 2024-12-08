import React from "react";
import Select from "react-select";

interface DropdownProps {
  label: string;
  options: { value: string; label: string }[];
  value: { value: string; label: string } | null;
  onChange: (value: { value: string; label: string } | null) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="text-sm text-textSecondary mb-2 block">{label}</label>
      <Select
        value={value}
        onChange={onChange}
        options={options}
        classNamePrefix="custom-select"
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
            boxShadow: "none",
          }),
          singleValue: (base) => ({
            ...base,
            color: "var(--text)",
          }),
        }}
      />
    </div>
  );
};

export default Dropdown;
