import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { LucideIcon } from 'lucide-react';

interface InputFieldProps {
  control: any;
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  accept?: string;
  disabled?: boolean;
  startIcon?: LucideIcon;
}

const InputField: React.FC<InputFieldProps> = ({
  control,
  name,
  label,
  type = 'text',
  placeholder = '',
  accept = '',
  disabled,
  startIcon,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              accept={accept}
              disabled={disabled}
              startIcon={startIcon}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputField;
