import React from 'react';
import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

interface EmailPasswordFormFieldProps {
  control: any;
}

const EmailPasswordFormField: React.FC<EmailPasswordFormFieldProps> = ({
  control,
}) => {
  return (
    <>
      <FormField
        control={control}
        name={'email'}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email Address</FormLabel>
            <FormControl>
              <Input type="text" placeholder="" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={'password'}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" placeholder="" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default EmailPasswordFormField;
