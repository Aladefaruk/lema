import React from 'react';

interface FormInputProps {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  id,
  value,
  onChange,
  placeholder,
  required = false
}) => {
  return (
    <div className="mb-6">
      <label htmlFor={id} className="block text-lg font-medium text-gray-600 mb-2">
        {label}
      </label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded outline-none text-sm"
        required={required}
      />
    </div>
  );
};

export default FormInput;