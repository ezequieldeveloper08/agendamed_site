import { Control, Controller } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";

interface Props {
    control: Control<any, any>;
    label?: string;
    name: string;
    placeholder?: string;
    description?: string;
    disabled?: boolean;
}

export function FormCheckbox({control, name, description, label, disabled}: Props) {
    return (
        <Controller
            control={control}
            name={name}
            disabled={disabled}
            render={({ field }) => (
                <Checkbox
                    label={label}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                />
            )}
        />
    )
}