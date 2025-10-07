'use client'

import { FormInput } from "@/components/form-components/form-input";
import { FormSelect } from "@/components/form-components/form-select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";

export function HomeFormSearch() {
    const form = useForm()

    return (
        <FormProvider {...form}>
            <form className="w-full max-w-4xl mt-8">
                <Card>
                    <CardContent className="flex flex-col gap-4">
                        <div className="grid grid-cols-3 gap-4">
                            <FormSelect
                                control={form.control}
                                label="Especialidade"
                                items={[]}
                                {...form.register('')}
                            />
                            <FormSelect
                                control={form.control}
                                label="Localização"
                                items={[]}
                                {...form.register('')}
                            />
                            <FormInput
                                control={form.control}
                                label="Data"
                                type="date"
                                {...form.register('')}
                            />
                        </div>
                        <Button className="w-full"><Search /> Buscar Médicos</Button>
                    </CardContent>
                </Card>
            </form>
        </FormProvider>
    )
}