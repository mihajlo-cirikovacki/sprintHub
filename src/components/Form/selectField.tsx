import clsx from 'clsx';
import type { UseFormRegisterReturn } from 'react-hook-form';

import {
  FieldWrapper,
  type FieldWrapperPassThroughProps,
} from './fieldWrapper';

type Option = {
  label: React.ReactNode;
  value: string | number | string[];
};

type SelectFieldProps = FieldWrapperPassThroughProps & {
  options: Option[];
  className?: string;
  defaultValue?: string;
  placeholder?: string;
  registration: Partial<UseFormRegisterReturn>;
};

export const SelectField = ({
  label,
  error,
  placeholder,
  className,
  defaultValue,
  registration,
  options,
}: SelectFieldProps) => {
  return (
    <FieldWrapper label={label} error={error}>
      <select
        placeholder={placeholder}
        className={clsx([className])}
        defaultValue={defaultValue}
        {...registration}
      >
        {options.map(({ label, value }) => (
          <option key={label?.toString()} value={value}>
            {label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
};
