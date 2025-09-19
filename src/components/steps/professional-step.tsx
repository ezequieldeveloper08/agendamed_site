"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FormProvider, useForm } from "react-hook-form"
import { FormInput } from "../form-components/form-input"
import { ArrowLeft } from "lucide-react"
import { toast } from "sonner"
import { useApi } from "@/hooks/use-api"
import { ProfessionalData, UserData } from "@/types/data"
import { professions, specialtiesByProfession } from "@/types/professions"
import { FormSelect } from "../form-components/form-select"

interface ProfessionalRegistrationProps {
    userData: UserData
    onBack: () => void
}

export function ProfessionalStep({ userData, onBack }: ProfessionalRegistrationProps) {
    const form = useForm<ProfessionalData>()
    const { post, running } = useApi()
    const [selectedProfession, setSelectedProfession] = useState("")
    const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([])

    const handleSubmit = async (formData: ProfessionalData) => {
        try {
            const userResponse = await post("users", userData)

            const professionalData = {
                ...formData,
                specialties: selectedSpecialties,
                userId: userResponse.id,
            }

            await post("professionals", professionalData)

            toast.success("Cadastro profissional concluído com sucesso! 🎉")
            // Redirect to dashboard or login
        } catch (e: any) {
            toast.error("Erro ao completar cadastro profissional")
        }
    }

    const selectedProfessionData = professions.find((p) => p.value === selectedProfession)
    const availableSpecialties = selectedProfession
        ? specialtiesByProfession[selectedProfession as keyof typeof specialtiesByProfession] || []
        : []

    return (
        <FormProvider {...form}>
            <div className="space-y-6">
                <FormSelect
                    control={form.control}
                    label="Profissão *"
                    items={professions.map((profession) => ({
                        name: profession.label,
                        value: profession.value,
                    }))}
                    /* value={selectedProfession}
                    onValueChange={(value) => {
                      setSelectedProfession(value)
                      setSelectedSpecialties([])
                      form.setValue("type", value)
                    }} */
                    {...form.register("type", {
                        required: "Profissão é obrigatória", onChange: (e) => {
                            setSelectedProfession(e.target.value)
                             form.setValue("type", e.target.value)
                        }
                    })}
                />

                {selectedProfessionData && (
                    <FormInput
                        control={form.control}
                        label={`Registro ${selectedProfessionData.council} *`}
                        placeholder={selectedProfessionData.placeholder}
                        {...form.register("document", { required: "Registro profissional é obrigatório" })}
                    />
                )}

                {availableSpecialties.length > 0 && (
                    <div className="flex gap-2 flex-col">
                        <label className="text-sm font-medium">Especialidades</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto border rounded-md p-3">
                            {availableSpecialties.map((specialty) => (
                                <label key={specialty} className="flex items-center space-x-2 text-sm">
                                    <input
                                        type="checkbox"
                                        checked={selectedSpecialties.includes(specialty)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedSpecialties([...selectedSpecialties, specialty])
                                            } else {
                                                setSelectedSpecialties(selectedSpecialties.filter((s) => s !== specialty))
                                            }
                                        }}
                                        className="rounded"
                                    />
                                    <span>{specialty}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                        control={form.control}
                        label="Valor da consulta (R$) *"
                        placeholder="150.00"
                        type="number"
                        step="0.01"
                        {...form.register("cost", {
                            required: "Valor da consulta é obrigatório",
                            min: { value: 0, message: "Valor deve ser positivo" },
                        })}
                    />
                    <FormInput
                        control={form.control}
                        label="Celular profissional *"
                        placeholder="(11) 99999-9999"
                        type="tel"
                        {...form.register("cellphone", { required: "Celular é obrigatório" })}
                    />
                </div>

                <FormInput
                    control={form.control}
                    label="Descrição breve *"
                    placeholder="Ex: Cardiologista com 10 anos de experiência..."
                    {...form.register("description", { required: "Descrição é obrigatória" })}
                />

                <div className="space-y-2">
                    <label className="text-sm font-medium">Biografia profissional *</label>
                    <textarea
                        className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm min-h-[100px]"
                        placeholder="Conte mais sobre sua formação, experiência e abordagem profissional..."
                        {...form.register("bio", { required: "Biografia é obrigatória" })}
                    />
                </div>
            </div>
        </FormProvider>
    )
}
