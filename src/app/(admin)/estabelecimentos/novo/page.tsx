'use client'

import { FormInput } from "@/components/form-components/form-input";
import { FormInputPrice } from "@/components/form-components/form-input-price";
import { FormSelect } from "@/components/form-components/form-select";
import { FormTextarea } from "@/components/form-components/form-textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LocationType } from "@/types/location";
import { professions, specialtiesByProfession } from "@/types/professions";
import { ILocation, IProfessional } from "@/types/user";
import { ArrowLeft, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";

export default function Page() {
    const form = useForm<ILocation>();
    const selectedProfession = form.watch("type")
    const locationTypes = Object.entries(LocationType).map(([key, value]) => ({
        value: key,
        label: value,
    }))

    // Observa mudanças no CEP
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

    return (
        <FormProvider {...form}>
            <Card>
                <CardHeader>
                    <div className="flex justify-between">
                        <div className="flex gap-2 items-center">
                            <Button size="icon" variant="outline" className="w-8 h-8"><ArrowLeft /></Button>
                            <CardTitle>Adicionar Estabelecimento</CardTitle>
                        </div>
                        <Button>Salvar estabelecimento</Button>
                    </div>
                    <CardDescription>Registre um novo estabelecimento de saúde. Informe dados como nome, endereço, CNPJ, contatos e especialidades oferecidas para manter sua rede sempre completa e organizada.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
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
                </CardContent>
                <CardFooter className="flex justify-end gap-4">
                    <Button variant="ghost">Cancelar</Button>
                    <Button>Salvar estabelecimento</Button>
                </CardFooter>
            </Card>
        </FormProvider>
    )
}