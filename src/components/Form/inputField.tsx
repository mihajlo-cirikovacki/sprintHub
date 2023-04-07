import clsx from 'clsx';
import type { UseFormRegisterReturn } from 'react-hook-form';

import {
  FieldWrapper,
  type FieldWrapperPassThroughProps,
} from './fieldWrapper';

type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: 'text' | 'email' | 'file';
  className?: string;
  registration: Partial<UseFormRegisterReturn>;
};

export const InputField = ({
  label,
  error,
  type = 'text',
  className,
  registration,
}: InputFieldProps) => {
  return (
    <FieldWrapper label={label} error={error}>
      <input type={type} className={clsx([className])} {...registration} />
    </FieldWrapper>
  );
};
