import { Control } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";

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
  height?: number;
}

export function FormTextarea({ control, label, name, placeholder, description, rules, disabled, height }: Props) {
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
            <Textarea style={{ height: height ?? 200 }} className={height ? `min-h-[${height}px]` : ""} placeholder={placeholder ?? 'Insira um valor'} {...field} value={field.value ?? ""} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}