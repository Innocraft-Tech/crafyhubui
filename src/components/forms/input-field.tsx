import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

interface InputFieldProps {
  control: any;
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  accept?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  control,
  name,
  label,
  type = 'text',
  placeholder = '',
  accept = '',
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
