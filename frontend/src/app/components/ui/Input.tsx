import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const id = props.id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  
  const baseInputClasses = 
    'block px-4 py-2 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500';
  
  const errorInputClasses = error 
    ? 'border-red-500' 
    : 'border-gray-300';
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  const inputClasses = `${baseInputClasses} ${errorInputClasses} ${widthClass} ${className}`;
  
  return (
    <div className={`mb-4 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input id={id} className={inputClasses} {...props} />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input;