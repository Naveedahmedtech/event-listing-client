import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateInputProps {
  label: string;
  selected: Date | null;
  onChange: (date: Date | null) => void;
}

const DateInput: React.FC<DateInputProps> = ({ label, selected, onChange }) => {
  return (
    <div className="mb-4">
      <label className="text-sm text-textSecondary mb-2 block">{label}</label>
      <DatePicker
        selected={selected}
        onChange={onChange}
        className="w-full p-2 border border-border rounded-lg bg-surface text-text focus:ring-primary focus:border-primary"
        placeholderText={`Select ${label.toLowerCase()}`}
      />
    </div>
  );
};

export default DateInput;
