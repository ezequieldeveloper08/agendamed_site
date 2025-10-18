'use client'

import { FormInput } from "@/components/form-components/form-input";
import { FormInputPrice } from "@/components/form-components/form-input-price";
import { FormSelect } from "@/components/form-components/form-select";
import { FormTextarea } from "@/components/form-components/form-textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useApi } from "@/hooks/use-api";
import { professions, specialtiesByProfession } from "@/types/professions";
import { IProfessional } from "@/types/user";
import { ArrowLeft, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

export function AboutForm({ data }: { data?: IProfessional }) {
    const { post, running } = useApi()
    const router = useRouter()
    const form = useForm<IProfessional>({ defaultValues: data })
    const selectedProfession = form.watch("type")
    const selectedProfessionData = professions.find((p) => p.value === selectedProfession)
    const availableSpecialties = selectedProfession
        ? specialtiesByProfession[selectedProfession as keyof typeof specialtiesByProfession] || []
        : []
    const cep = form.watch("address.zipcode")

    useEffect(() => {
        const fetchAddress = async () => {
            const cleanCep = cep?.replace(/\D/g, "")
            if (cleanCep?.length === 8) {
                try {
                    const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
                    const data = await res.json()

                    if (!data.erro) {
                        form.setValue("address.uf", data.uf)
                        form.setValue("address.city", data.localidade)
                        form.setValue("address.district", data.bairro)
                        form.setValue("address.route", data.logradouro)
                    }
                } catch (error) {
                    console.error("Erro ao buscar CEP:", error)
                }
            }
        }

        fetchAddress()
    }, [cep, form])

    const handleSubmit = async (data) => {
        try {
            await post('professionals', data);
            toast.success(data ? "Profissional atualizado com sucesso! 🎉" : "Profissional criada com sucesso! 🎉");
            router.back();
        } catch (e: any) {
            console.log(e);
            toast.error(e ?? e.message ?? "Erro ao criar Profissional 😢");
        }
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Sobre mim</h1>
                        <p className="text-sm text-muted-foreground">
                            Mantenha seus dados atualizados
                        </p>
                    </div>
                    <Button>Salvar alterações</Button>
                </div>
                <div className="flex flex-col gap-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Dados do Profissional</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormInput
                                control={form.control}
                                label="Nome profissional *"
                                placeholder="Ex.: Dr. José Roberto"
                                {...form.register("name", {
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
                                {...form.register("type", {
                                    required: "Profissão é obrigatória",
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
                        </div>
                        {availableSpecialties.length > 0 && (
                            <div className="flex gap-2 flex-col">
                                <label className="text-sm font-medium">Especialidades</label>
                                <Controller
                                    control={form.control}
                                    name="specialties"
                                    render={({ field }) => (
                                        <div className="flex flex-wrap gap-2">
                                            {availableSpecialties.map((specialty) => {
                                                const isSelected = (field.value ?? []).includes(specialty);

                                                return (
                                                    <Button
                                                        key={specialty}
                                                        type="button"
                                                        variant={isSelected ? "secondary" : "outline"}
                                                        className="border"
                                                        onClick={() => {
                                                            const current = field.value ?? [];
                                                            if (isSelected) {
                                                                field.onChange(current.filter((item) => item !== specialty));
                                                            } else {
                                                                field.onChange([...current, specialty]); // imutável
                                                            }
                                                        }}
                                                    >
                                                        {isSelected && <Check />}
                                                        {specialty}
                                                    </Button>
                                                );
                                            })}
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
                                {...form.register("cost", {
                                    required: "Valor da consulta é obrigatório",
                                })}
                            />
                            <FormInput
                                control={form.control}
                                label="Celular profissional *"
                                placeholder="(11) 99999-9999"
                                type="tel"
                                mask="(99) 99999-9999"
                                {...form.register("cellphone", { required: "Celular é obrigatório" })}
                            />
                        </div>

                        <FormInput
                            control={form.control}
                            label="Descrição breve *"
                            placeholder="Ex: Cardiologista com 10 anos de experiência..."
                            {...form.register("description", { required: "Descrição é obrigatória" })}
                        />

                        <FormTextarea
                            control={form.control}
                            label="Biografia profissional *"
                            placeholder="Conte mais sobre sua formação, experiência e abordagem profissional..."
                            {...form.register("bio", { required: "Biografia é obrigatória" })}
                        />
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Endereço de atendimento</h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormInput
                                control={form.control}
                                label="CEP *"
                                placeholder="00000-000"
                                mask="99999-999"
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
                <div className="flex justify-end gap-4">
                    <Button variant="ghost">Cancelar</Button>
                    <Button>Salvar profissional</Button>
                </div>
            </form>
        </FormProvider>
    )
}