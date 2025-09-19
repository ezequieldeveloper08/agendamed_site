"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FormProvider, useForm } from "react-hook-form"
import { FormInput } from "../form-components/form-input"
import { ArrowLeft } from "lucide-react"
import { toast } from "sonner"
import { useApi } from "@/hooks/use-api"
import { EstablishmentData, UserData } from "@/types/data"
import { LocationType } from "@/types/location"
import { FormSelect } from "../form-components/form-select"

interface EstablishmentRegistrationProps {
    userData: UserData
    onBack: () => void
}

export function EstablishmentStep({ userData, onBack }: EstablishmentRegistrationProps) {
    const form = useForm<EstablishmentData>()
    const { post, running } = useApi()

    const handleSubmit = async (formData: EstablishmentData) => {
        try {
            const userResponse = await post("users", userData)

            const establishmentData = {
                ...formData,
                managerId: userResponse.id,
            }

            await post("locations", establishmentData)

            toast.success("Cadastro do estabelecimento concluído com sucesso! 🎉")
            // Redirect to dashboard or login
        } catch (e: any) {
            toast.error("Erro ao completar cadastro do estabelecimento")
        }
    }

    const locationTypes = Object.entries(LocationType).map(([key, value]) => ({
        value: key,
        label: value,
    }))

    return (
        <FormProvider {...form}>
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                        control={form.control}
                        label="Nome do estabelecimento *"
                        placeholder="Ex: Clínica São João"
                        {...form.register("name", { required: "Nome é obrigatório" })}
                    />
                    <FormSelect
                        control={form.control}
                        label="Tipo de estabelecimento *"
                        items={locationTypes.map((type) => ({ name: type.label, value: type.value }))}
                        {...form.register("type", { required: "Tipo é obrigatório" })}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Descrição</label>
                    <textarea
                        className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm min-h-[80px]"
                        placeholder="Descreva seu estabelecimento, serviços oferecidos..."
                        {...form.register("description")}
                    />
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Endereço</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormInput
                            control={form.control}
                            label="CEP *"
                            placeholder="00000-000"
                            {...form.register("address.zipcode", { required: "CEP é obrigatório" })}
                        />
                        <FormInput
                            control={form.control}
                            label="Estado *"
                            placeholder="SP"
                            {...form.register("address.uf", { required: "Estado é obrigatório" })}
                        />
                        <FormInput
                            control={form.control}
                            label="Cidade *"
                            placeholder="São Paulo"
                            {...form.register("address.city", { required: "Cidade é obrigatória" })}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput
                            control={form.control}
                            label="Bairro *"
                            placeholder="Centro"
                            {...form.register("address.district", { required: "Bairro é obrigatório" })}
                        />
                        <FormInput
                            control={form.control}
                            label="Rua *"
                            placeholder="Rua das Flores"
                            {...form.register("address.route", { required: "Rua é obrigatória" })}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput
                            control={form.control}
                            label="Número *"
                            placeholder="123"
                            {...form.register("address.number", { required: "Número é obrigatório" })}
                        />
                        <FormInput
                            control={form.control}
                            label="Nome/Referência"
                            placeholder="Próximo ao shopping"
                            {...form.register("address.name")}
                        />
                    </div>
                </div>
            </div>
        </FormProvider>
    )
}
