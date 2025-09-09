import React from 'react';

interface FormInputProps {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  id,
  value,
  onChange,
  placeholder,
  required = false,
  maxLength
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
        maxLength={maxLength}
        className="w-full px-4 py-3 border border-gray-300 rounded outline-none text-sm"
        required={required}
      />
      {maxLength && (
        <div className="text-xs text-gray-500 mt-1 text-right">
          {value.length}/{maxLength} characters
        </div>
      )}
    </div>
  );
};

export default FormInput;