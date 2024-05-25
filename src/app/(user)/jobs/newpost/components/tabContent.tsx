import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TabsContent } from '@/components/ui/tabs';
import { Control, Controller, FieldError } from 'react-hook-form';

interface InputFieldProps {
  id: string;
  label: string;
  placeholder: string;
  control: Control<any>;
  name: string;
  error?: FieldError;
}
const InputField = ({
  id,
  label,
  placeholder,
  control,
  name,
  error,
}: InputFieldProps) => (
  <div className="input flex flex-col w-full max-w-xs space-y-2">
    <Label htmlFor={id} className="text-xs">
      {label}
    </Label>
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Input type="text" id={id} placeholder={placeholder} {...field} />
      )}
    />
    {error && <p className="text-red-500">{error.message}</p>}
  </div>
);

interface TabContentProps {
  value: 'hourly' | 'weekly' | 'monthly';
  control: Control<any>;
  errors: any;
}

export const TabContent = ({ value, control, errors }: TabContentProps) => {
  const placeholders = {
    hourly: { min: '$75', max: '$125', hours: '0' },
    weekly: { min: '$75', max: '$500' },
    monthly: { min: '$5000', max: '$8000' },
  };

  return (
    <TabsContent value={value}>
      <p className="text-xs w-full mt-4">
        We review every job to ensure a high quality marketplace
      </p>
      <div className="flex flex-col w-full gap-2.5 my-3">
        <div className="flex w-full gap-2.5">
          <InputField
            id={`MinRate`}
            label="Min rate"
            placeholder={placeholders[value].min}
            control={control}
            name={`onGoing.1`}
            error={errors.ongoing?.[1]}
          />
          <InputField
            id={`MaxRate`}
            label="Max rate"
            placeholder={placeholders[value].min}
            control={control}
            name={`onGoing.2`}
            error={errors.ongoing?.[2]}
          />
          {value === 'hourly' && (
            <InputField
              id="hourlyMaxHours"
              label="Max. hours per week"
              placeholder="0"
              control={control}
              name="onGoing.3"
            />
          )}
        </div>
      </div>
    </TabsContent>
  );
};
