import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { Control } from "react-hook-form";
import { MultiSelect } from "./multi-select";
  
  interface Props {
    control: Control<any, any>;
    name: string;
    label?: string;
    placeholder?: string;
    description?: string;
    rules?: {
      required?: boolean | string;
    };
    disabled?: boolean;
    items: {
      label: string;
      value: string;
      icon?: React.ComponentType<{ className?: string }>;
    }[];
    maxCount?: number;
    animation?: number;
  }
  
  export function FormMultiSelect({
    control,
    name,
    label,
    placeholder = "Selecione...",
    description,
    rules,
    disabled,
    items,
    maxCount = 3,
    animation = 0,
  }: Props) {
    return (
      <FormField
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => (
          <FormItem className="w-full">
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <MultiSelect
                options={items}
                defaultValue={field.value || []}
                onValueChange={field.onChange}
                placeholder={placeholder}
                maxCount={maxCount}
                animation={animation}
                disabled={disabled}
              />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
  