"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FormProvider, useForm, useFormContext } from "react-hook-form"
import { FormInput } from "../form-components/form-input"
import { useApi } from "@/hooks/use-api"
import { toast } from "sonner"
import { ArrowLeft } from "lucide-react"
import { FormSelect } from "../form-components/form-select"

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
    const form = useFormContext<CreateAccountDto>()

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
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
                    <FormSelect 
                        control={form.control}
                        label="Gênero"
                        items={[
                            {name: 'Masculino', value: 'Masculino'}, 
                            {name: 'Feminino', value: 'Feminino'}, 
                            {name: 'Outro', value: 'Outro'}, 
                            {name: 'Prefiro não informar', value: 'Prefiro não informar'}]}
                            {...form.register('gender', {required: 'Gênero é obrigatório'})}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                        control={form.control}
                        label="Celular"
                        placeholder="(11) 99999-9999"
                        type="tel"
                        mask="(99) 99999-9999"
                        {...form.register("cellphone", {required: 'Celular é obrigatório'})}
                    />
                    <FormInput
                        control={form.control}
                        label="CPF)"
                        placeholder="000.000.000-00"
                        mask="999.999.999-99"
                        {...form.register("document", {required: 'CPF é obrigatório'})}
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
        </div>
    )
}
