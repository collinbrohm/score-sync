import React from 'react';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  className = '',
  ...props
}) => {
  const id = props.id || `checkbox-${label.toLowerCase().replace(/\s+/g, '-')}`;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };
  
  return (
    <div className="flex items-center mb-3">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className={`h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded ${className}`}
        {...props}
      />
      <label htmlFor={id} className="ml-2 block text-sm text-gray-700">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;