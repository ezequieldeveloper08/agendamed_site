"use client"

import { useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { FormInput } from "../form-components/form-input"
import { professions, specialtiesByProfession } from "@/types/professions"
import { FormSelect } from "../form-components/form-select"
import { IUser } from "@/types/user"
import { FormInputPrice } from "../form-components/form-input-price"
import { FormTextarea } from "../form-components/form-textarea"


export function ProfessionalStep() {
    const form = useFormContext<IUser>()
    const selectedProfession = form.watch("professional.type")
    const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([])

    const selectedProfessionData = professions.find((p) => p.value === selectedProfession)
    const availableSpecialties = selectedProfession
        ? specialtiesByProfession[selectedProfession as keyof typeof specialtiesByProfession] || []
        : []

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                    control={form.control}
                    label="Nome profissional *"
                    placeholder="Ex.: Dr. José Roberto"
                    {...form.register("professional.name", {
                        required: "Profissão é obrigatória",
                    })}
                />
                <FormSelect
                    control={form.control}
                    label="Profissão *"
                    items={professions.map((profession) => ({
                        name: profession.label,
                        value: profession.value,
                    }))}
                    {...form.register("professional.type", {
                        required: "Profissão é obrigatória",
                    })}
                />
            </div>

            {selectedProfessionData && (
                <FormInput
                    control={form.control}
                    label={`Registro ${selectedProfessionData.council} *`}
                    placeholder={selectedProfessionData.placeholder}
                    {...form.register("professional.document", { required: "Registro profissional é obrigatório" })}
                />
            )}

            {availableSpecialties.length > 0 && (
                <div className="flex gap-2 flex-col">
                    <label className="text-sm font-medium">Especialidades</label>
                    <Controller
                        control={form.control}
                        name="professional.specialties"
                        render={({ field }) => (
                            <div className="flex gap-4 flex-wrap">
                                {availableSpecialties.map((specialty) => (
                                    <label key={specialty} className="flex items-center gap-2 font-normal text-sm">
                                        <input
                                            type="checkbox"
                                            checked={field.value?.includes(specialty) || false}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    field.onChange([...(field.value || []), specialty])
                                                } else {
                                                    field.onChange(field.value.filter((s: string) => s !== specialty))
                                                }
                                            }}
                                        />
                                        {specialty}
                                    </label>
                                ))}
                            </div>
                        )}
                    />
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInputPrice
                    control={form.control}
                    label="Valor da consulta (R$) *"
                    placeholder="150.00"
                    {...form.register("professional.cost", {
                        required: "Valor da consulta é obrigatório",
                    })}
                />
                <FormInput
                    control={form.control}
                    label="Celular profissional *"
                    placeholder="(11) 99999-9999"
                    type="tel"
                    mask="(99) 99999-9999"
                    {...form.register("professional.cellphone", { required: "Celular é obrigatório" })}
                />
            </div>

            <FormInput
                control={form.control}
                label="Descrição breve *"
                placeholder="Ex: Cardiologista com 10 anos de experiência..."
                {...form.register("professional.description", { required: "Descrição é obrigatória" })}
            />

            <FormTextarea
                control={form.control}
                label="Biografia profissional *"
                placeholder="Conte mais sobre sua formação, experiência e abordagem profissional..."
                {...form.register("professional.bio", { required: "Biografia é obrigatória" })}
            />
        </div>
    )
}
