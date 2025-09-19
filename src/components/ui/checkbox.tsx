"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Label } from "./label"

interface Props extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
  label?: string;
}

function Checkbox({
  label,
  className,
  ...props
}: Props) {
  return (
    <div className="flex gap-2 items-center h-fit">
      <CheckboxPrimitive.Root
        data-slot="checkbox"
        className={cn(
          "peer border-input data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          className="flex items-center justify-center text-current transition-none"
        >
          <CheckIcon className="size-3.5" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && <Label htmlFor={props?.name}>{label}</Label>}
    </div>
  )
}

export { Checkbox }
