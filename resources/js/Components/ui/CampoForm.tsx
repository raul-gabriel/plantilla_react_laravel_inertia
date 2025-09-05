import React from 'react';

interface InputProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    placeholder?: string;
    type?: React.HTMLInputTypeAttribute; // aquí está el tipo dinámico de input
    required?: boolean;
    disabled?: boolean;
    autoComplete?: string;
    className?: string;
}

export function Input({
    label,
    name,
    value,
    onChange,
    error,
    placeholder = '',
    type = 'text',
    required = false,
    disabled = false,
    autoComplete,
    className = '',
}: InputProps) {
    return (
        <div className={className}>
            <label htmlFor={name} className="block text-sm font-medium mb-1">
                {label}{required && ' *'}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                autoComplete={autoComplete}
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${error ? 'border-red-500' : 'border-gray-300'
                    }`}
            />
            {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
        </div>
    );
}


interface CheckboxOption {
  value: string;
  label: string;
}

interface CheckboxGroupProps {
  label: string;
  name: string;
  values: string[]; // varios valores seleccionados
  onChange: (values: string[]) => void;
  options: CheckboxOption[];
  error?: string;
  disabled?: boolean;
  className?: string;
}

export function CheckboxGroup({
  label,
  name,
  values,
  onChange,
  options,
  error,
  disabled = false,
  className = '',
}: CheckboxGroupProps) {
  const handleCheckboxChange = (value: string) => {
    if (values.includes(value)) {
      onChange(values.filter((v) => v !== value));
    } else {
      onChange([...values, value]);
    }
  };

  return (
    <fieldset className={className}>
      <legend className="block text-sm font-medium mb-1">{label}</legend>
      <div className="flex flex-col gap-2">
        {options.map((opt) => (
          <label key={opt.value} className="inline-flex items-center">
            <input
              type="checkbox"
              name={name}
              value={opt.value}
              checked={values.includes(opt.value)}
              onChange={() => handleCheckboxChange(opt.value)}
              disabled={disabled}
              className="form-checkbox text-blue-600"
            />
            <span className="ml-2">{opt.label}</span>
          </label>
        ))}
      </div>
      {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
    </fieldset>
  );
}


interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options: RadioOption[];
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export function RadioGroup({
  label,
  name,
  value,
  onChange,
  options,
  error,
  required = false,
  disabled = false,
  className = '',
}: RadioGroupProps) {
  return (
    <fieldset className={className}>
      <legend className="block text-sm font-medium mb-1">
        {label}{required && ' *'}
      </legend>
      <div className="flex gap-4">
        {options.map((opt) => (
          <label key={opt.value} className="inline-flex items-center">
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={onChange}
              disabled={disabled}
              required={required}
              className="form-radio text-blue-600"
            />
            <span className="ml-2">{opt.label}</span>
          </label>
        ))}
      </div>
      {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
    </fieldset>
  );
}




interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export function Select({
  label,
  name,
  value,
  onChange,
  options,
  error,
  required = false,
  disabled = false,
  className = '',
}: SelectProps) {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium mb-1">
        {label}{required && ' *'}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
    </div>
  );
}






/*
<Select
  label="Estado"
  name="estado"
  value={data.estado}
  onChange={e => setData('estado', e.target.value)}
  options={[
    { value: 'activo', label: 'Activo' },
    { value: 'inactivo', label: 'Inactivo' },
    { value: 'suspendido', label: 'Suspendido' },
  ]}
  error={errors.estado}
/>

<RadioGroup
  label="Rol"
  name="rol"
  value={data.rol}
  onChange={e => setData('rol', e.target.value)}
  options={[
    { value: 'usuario', label: 'Usuario' },
    { value: 'moderador', label: 'Moderador' },
    { value: 'administrador', label: 'Administrador' },
  ]}
  error={errors.rol}
/>

<CheckboxGroup
  label="Permisos"
  name="permisos"
  values={data.permisos || []}
  onChange={(vals) => setData('permisos', vals)}
  options={[
    { value: 'read', label: 'Leer' },
    { value: 'write', label: 'Escribir' },
    { value: 'delete', label: 'Eliminar' },
  ]}
  error={errors.permisos}
/>
*/

