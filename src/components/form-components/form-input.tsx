import { useEffect, useRef, useState } from "react";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import VMasker from "vanilla-masker";
import { Eye, EyeOff } from "lucide-react";

interface Props extends React.ComponentProps<"input"> {
  control: Control<any>;
  label?: string;
  name: string;
  placeholder?: string;
  description?: string;
  rules?: {
    required?: boolean | string;
  };
  mask?: string;
  disabled?: boolean;
}

export function FormInput({
  control,
  label,
  name,
  placeholder,
  description,
  rules,
  disabled,
  mask,
  type,
  ...props
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const applyMask = (value: string) => {
    if (!mask) return value;
    return VMasker.toPattern(value, mask);
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
            <div className="relative">
              <Input
                placeholder={placeholder ?? "Insira um valor"}
                {...props}
                {...field}
                ref={inputRef}
                type={isPassword ? (showPassword ? "text" : "password") : type}
                value={applyMask(field.value ?? "")}
                onChange={(e) => field.onChange(applyMask(e.target.value))}
              />
              {isPassword && (
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              )}
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
