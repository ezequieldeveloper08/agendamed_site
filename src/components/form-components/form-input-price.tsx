import { useEffect, useRef } from "react";
import { Control } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import VMasker from "vanilla-masker";

interface Props extends React.ComponentProps<"input"> {
  control: Control<any>;
  label?: string;
  name: string;
  placeholder?: string;
  description?: string;
  rules?: {
    required?: boolean | string;
  };
  disabled?: boolean;
}

export function FormInputPrice({ control, label, name, placeholder, description, rules, disabled, ...props }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const formatCurrency = (value: string) => {
    if (!value) return "";
    
    const numericValue = value.replace(/\D/g, "");

    const formattedValue = VMasker.toMoney(numericValue, {
      precision: 2,
      separator: ",",
      delimiter: ".",
      unit: "R$ ",
    });

    return formattedValue;
  };

  return (
    <FormField
      control={control}
      name={name}
      rules={rules}
      disabled={disabled}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              placeholder={placeholder ?? "Digite um valor"}
              {...props}
              {...field}
              ref={inputRef}
              value={formatCurrency(field.value ?? "")}
              onChange={(e) => field.onChange(formatCurrency(e.target.value))}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
