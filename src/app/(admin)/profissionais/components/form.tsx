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

export function ProfissionalForm({ data }: { data?: IProfessional }) {
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
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <Card>
                    <CardHeader>
                        <div className="flex justify-between">
                            <div className="flex gap-2 items-center">
                                <Button size="icon" variant="outline" className="w-8 h-8"><ArrowLeft /></Button>
                                <CardTitle>Adicionar Profissional de Saúde</CardTitle>
                            </div>
                            <Button>Salvar profissional</Button>
                        </div>
                        <CardDescription>Cadastre um novo profissional em sua clínica. Preencha as informações necessárias como nome, especialidade, registro profissional e formas de contato para manter o atendimento sempre organizado e acessível.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Dados do Profissional</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            </div>

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
                    </CardContent>
                    <CardFooter className="flex justify-end gap-4">
                        <Button variant="ghost">Cancelar</Button>
                        <Button>Salvar profissional</Button>
                    </CardFooter>
                </Card>
            </form>
        </FormProvider>
    )
}