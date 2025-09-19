"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FormProvider, useForm } from "react-hook-form"
import { FormInput } from "../form-components/form-input"
import { useApi } from "@/hooks/use-api"
import { toast } from "sonner"
import { ArrowLeft } from "lucide-react"

interface CreateAccountDto {
    name: string
    email: string
    password: string
    confirmPassword: string
    dateOfBirth: string
    gender: string
    cellphone?: string
    document?: string
}

interface CreateAccountStepProps {
    userType: string
    onAccountCreated: (data: string) => void
    onBack: () => void
    className?: string
}

export function CreateAccountStep({
    userType,
    onAccountCreated,
    onBack,
    className,
    ...props
}: CreateAccountStepProps & React.ComponentProps<"div">) {
    const form = useForm<CreateAccountDto>()
    const { post, running, error } = useApi()

    const handleSubmit = async (formData: CreateAccountDto) => {
        if (formData.password !== formData.confirmPassword) {
            toast.error("As senhas não coincidem")
            return
        }

        try {
            const { confirmPassword, ...userData } = formData
            const userDataWithType = {
                ...userData,
                userType,
            }

            /* onAccountCreated(userDataWithType) */
            toast.success("Dados salvos! Agora vamos completar seu cadastro.")
        } catch (e: any) {
            console.log(e)
            toast.error(error ?? e.message ?? "Erro ao salvar dados 😢")
        }
    }

    const getUserTypeLabel = () => {
        return userType === "professional" ? "Profissional" : "Dono de Estabelecimento"
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>

            <FormProvider {...form}>
                <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput
                            control={form.control}
                            label="Nome completo"
                            placeholder="Ex.: João de Almeida"
                            {...form.register("name", { required: "Nome é obrigatório" })}
                        />
                        <FormInput
                            control={form.control}
                            label="Email"
                            placeholder="joao@example.com"
                            type="email"
                            {...form.register("email", {
                                required: "Email é obrigatório",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Email inválido",
                                },
                            })}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput
                            control={form.control}
                            label="Data de nascimento"
                            placeholder="DD/MM/AAAA"
                            type="date"
                            {...form.register("dateOfBirth", { required: "Data de nascimento é obrigatória" })}
                        />
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Gênero</label>
                            <select
                                className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                                {...form.register("gender", { required: "Gênero é obrigatório" })}
                            >
                                <option value="">Selecione...</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Feminino">Feminino</option>
                                <option value="Outro">Outro</option>
                                <option value="Prefiro não informar">Prefiro não informar</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput
                            control={form.control}
                            label="Celular (opcional)"
                            placeholder="(11) 99999-9999"
                            type="tel"
                            {...form.register("cellphone")}
                        />
                        <FormInput
                            control={form.control}
                            label="CPF (opcional)"
                            placeholder="000.000.000-00"
                            {...form.register("document")}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput
                            control={form.control}
                            label="Senha"
                            placeholder="Mínimo 8 caracteres"
                            type="password"
                            {...form.register("password", {
                                required: "Senha é obrigatória",
                                minLength: {
                                    value: 8,
                                    message: "Senha deve ter pelo menos 8 caracteres",
                                },
                            })}
                        />
                        <FormInput
                            control={form.control}
                            label="Confirmar senha"
                            placeholder="Digite a senha novamente"
                            type="password"
                            {...form.register("confirmPassword", {
                                required: "Confirmação de senha é obrigatória",
                            })}
                        />
                    </div>
                </div>
            </FormProvider>
        </div>
    )
}
