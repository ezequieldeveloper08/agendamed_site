'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { FormProvider, useForm } from "react-hook-form"
import { useApi } from "@/hooks/use-api"
import { toast } from "sonner"
import { Building2Icon, CheckCircle2, SquareMousePointer, StethoscopeIcon, UserIcon } from "lucide-react"
import { UserTypeSelection } from "../steps/user-type-selection"
import { useState } from "react"
import { CreateAccountStep } from "../steps/create-account-step"
import { EstablishmentStep } from "../steps/establishment-step"
import { ProfessionalStep } from "../steps/professional-step"
import { IUser } from "@/types/user"
import { Card, CardContent } from "../ui/card"
import Image from "next/image"
import Link from "next/link"

export function CreateAccountForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const form = useForm<IUser>();
  const type = form.watch('type');
  const [step, setStep] = useState(1);
  const { post, data, running, error } = useApi();

  const handleSubmit = async (form: IUser) => {
    try {
      if (step < 3) {
        return setStep(step + 1);
      }
      const res = await post("users", form);

      toast.success("Conta criada com sucesso! 🎉");
      router.push("/entrar");
    } catch (e: any) {
      console.log(e);
      toast.error(error ?? e.message ?? "Erro ao criar conta 😢");
    }
  };

  const steps = [
    { number: 1, label: "Tipo", icon: SquareMousePointer },
    { number: 2, label: "Dados", icon: UserIcon },
    { number: 3, label: "Perfil", icon: type === "Profissional" ? StethoscopeIcon : Building2Icon },
  ]

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardContent>
          <FormProvider {...form}>
            <form className="p-6" onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="flex flex-col gap-6">
                  <Link href={'/'} className="mx-auto">
                    <Image src={'/logo.svg'} alt="agenda.max" width={200} height={40} />
                  </Link>
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Comece sua jornada no AgendaMed</h1>
                  <p className="text-muted-foreground text-balance">
                    Crie sua conta gratuita e conecte-se a pacientes, profissionais e estabelecimentos de saúde de forma simples e rápida.
                  </p>
                </div>
                <div className="flex items-center justify-center gap-2 px-4">
                  {steps.map((s, index) => {
                    const Icon = s.icon
                    const isActive = step === s.number
                    const isCompleted = step > s.number

                    return (
                      <div key={s.number} className="flex items-center gap-2">
                        <div className="flex flex-col items-center gap-2">
                          <div
                            className={cn(
                              "relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
                              isCompleted && "bg-primary text-primary-foreground shadow-lg shadow-primary/25",
                              isActive && "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-110",
                              !isActive && !isCompleted && "bg-blue-100 text-blue-900",
                            )}
                          >
                            {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                          </div>
                          <span
                            className={cn(
                              "text-xs font-medium transition-colors",
                              isActive || isCompleted ? "text-foreground" : "text-muted-foreground",
                            )}
                          >
                            {s.label}
                          </span>
                        </div>
                        {index < steps.length - 1 && (
                          <div
                            className={cn(
                              "w-12 md:w-20 h-0.5 mb-6 transition-all duration-300",
                              step > s.number ? "bg-primary" : "bg-border",
                            )}
                          />
                        )}
                      </div>
                    )
                  })}
                </div>
                <div>
                  {step == 1 && <UserTypeSelection onSelect={(type) => form.setValue('type', type)} type={type} />}
                  {step == 2 && <CreateAccountStep onAccountCreated={() => { }} onBack={() => { }} userType="" />}
                  {step == 3 && type == 'Profissional' && <ProfessionalStep />}
                  {step == 3 && type != 'Profissional' && <EstablishmentStep />}
                </div>
              </div>
            </form>
          </FormProvider>
          <div className="flex gap-2 justify-center">
            <Button onClick={() => step == 1 ? router.back() : setStep(step - 1)} variant={"ghost"} size={"lg"}>Voltar</Button>
            <Button onClick={form.handleSubmit(handleSubmit, (e) => console.log(e))} size={"lg"} disabled={step == 1 && type == null || type == 'undefiend'}>{step == 3 ? 'Finalizar' : 'Próximo'}</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
