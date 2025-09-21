import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Control } from "react-hook-form";
import { ReactNode } from "react";

interface Props {
  control: Control<any, any>;
  label?: string;
  name: string;
  placeholder?: string;
  description?: string;
  rules?: {
    required: boolean | string;
  };
  disabled?: boolean;
  icon?: ReactNode;
  items: {
    name: string;
    value: string;
  }[];
}

export function FormSelect({
  control,
  label,
  name,
  placeholder,
  description,
  items,
  rules,
  disabled,
  icon,
}: Props) {
  return (
    <FormField
      control={control}
      name={name}
      rules={rules}
      disabled={disabled}
      render={({ field }) => (
        <FormItem className="w-full flex flex-col gap-2">
          {label && <FormLabel>{label}</FormLabel>}
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="w-full">
                <div className="flex items-center gap-2">
                  {icon && <span>{icon}</span>}
                  <SelectValue placeholder={placeholder ?? "Selecione um valor"} />
                </div>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {items.length === 0 && (
                <span className="p-2 text-sm">Nenhum resultado.</span>
              )}
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
