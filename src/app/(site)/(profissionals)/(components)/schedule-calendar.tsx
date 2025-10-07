"use client"

import * as React from "react"

import { Calendar } from "@/components/ui/calendar"
import { FormSelect } from "@/components/form-components/form-select"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

const times = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
]

export function ScheduleCalendar() {
    const form = useForm();
    const [dropdown, setDropdown] =
        React.useState<React.ComponentProps<typeof Calendar>["captionLayout"]>(
            "dropdown"
        )
    const [date, setDate] = React.useState<Date | undefined>(
        new Date(2025, 5, 12)
    )

    const handleSubmit = async (data) => {

    }

    return (
        <FormProvider {...form}>
            <form className="flex gap-4" onSubmit={form.handleSubmit(handleSubmit)}>
                <Calendar
                    mode="single"
                    defaultMonth={date}
                    selected={date}
                    onSelect={setDate}
                    captionLayout={dropdown}
                    className="rounded-lg border shadow-sm"
                />
                <div className="flex flex-col gap-3 flex-1">
                    <FormSelect
                        control={form.control}
                        label="Serviço"
                        items={[]}
                        {...form.register('service')}
                    />
                    <Controller
                        name="time"
                        control={form.control}
                        render={({ field, }) => <div className="flex flex-col gap-2">
                            <Label>Horário</Label>
                            <div className="grid grid-cols-4 gap-2">
                                {times.map((item) => <Button type="button" variant={field.value == item ? "default" : "outline"} size="sm" key={item} onClick={() => field.onChange(item)}>{item}</Button>)}
                            </div>
                        </div>}
                    />

                </div>
            </form>
        </FormProvider>
    )
}
