'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { FormProvider, useForm } from "react-hook-form"
import { FormInput } from "../form-components/form-input"
import Link from "next/link"
import { useApi } from "@/hooks/use-api"
import { toast } from "sonner"
import { Building, Building2Icon, BuildingIcon, SquareMousePointer, StethoscopeIcon, UserIcon } from "lucide-react"
import { UserTypeSelection } from "../steps/user-type-selection"
import { useState } from "react"
import { CreateAccountStep } from "../steps/create-account-step"
import { EstablishmentStep } from "../steps/establishment-step"
import { ProfessionalStep } from "../steps/professional-step"

interface LoginDto {
  name: string;
  email: string;
  password: string;
}

export function CreateAccountForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const form = useForm<LoginDto>();
  const [step, setStep] = useState(1);
  const [type, setType] = useState('Profissional');
  const { post, data, running, error } = useApi();

  const handleSubmit = async (form: LoginDto) => {
    try {
      const res = await post("users", form);

      toast.success("Conta criada com sucesso! 🎉");
      router.push("/entrar");
    } catch (e: any) {
      console.log(e);
      toast.error(error ?? e.message ?? "Erro ao criar conta 😢");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="pb-6">
          <FormProvider {...form}>
            <form className="p-6" onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Comece sua jornada no AgendaMed</h1>
                  <p className="text-muted-foreground text-balance">
                    Crie sua conta gratuita e conecte-se a pacientes, profissionais e estabelecimentos de saúde de forma simples e rápida.
                  </p>
                </div>
                <div className="flex items-center w-full max-w-sm mx-auto">
                  <div className="w-14 h-14 flex items-center justify-center border rounded-full bg-blue-50 border-blue-500 text-blue-500">
                    <SquareMousePointer />
                  </div>
                  <div className={`flex-1 border-t ${step == 2 && 'border-blue-500'}`}></div>
                  <div className={`w-14 h-14 flex items-center justify-center border rounded-full ${step > 1 && 'bg-blue-50 border-blue-500 text-blue-500'}`}>
                    <UserIcon />
                  </div>
                  <div className={`flex-1 border-t ${step == 3 && 'border-blue-500'}`}></div>
                  <div className={`w-14 h-14 flex items-center justify-center border rounded-full ${step > 2 && 'bg-blue-50 border-blue-500 text-blue-500'}`}>
                    {type == 'Profissional' ? <StethoscopeIcon /> : <Building2Icon />}
                  </div>
                </div>
                <div>
                  {step == 1 && <UserTypeSelection onSelect={setType} type={type} />}
                  {step == 2 && <CreateAccountStep onAccountCreated={() => { }} onBack={() => { }} userType="" />}
                  {step == 3 && type == 'Profissional' && <ProfessionalStep onBack={() => { }} userData={{
                    name: 'Ezequiel Pires',
                    dateOfBirth: '2020-10-08',
                    email: 'ezequiel.pires082000@gmail.com',
                    gender: 'maale',
                    password: '12345678',
                    userType: 'establishment_owner',
                    cellphone: '(64) 99626-8117',
                    document: 'TESTE'
                  }} />}
                  {step == 3 && type != 'Profissional' && <EstablishmentStep onBack={() => { }} userData={{
                    name: 'Ezequiel Pires',
                    dateOfBirth: '2020-10-08',
                    email: 'ezequiel.pires082000@gmail.com',
                    gender: 'maale',
                    password: '12345678',
                    userType: 'establishment_owner',
                    cellphone: '(64) 99626-8117',
                    document: 'TESTE'
                  }} />}
                </div>
              </div>
            </form>
          </FormProvider>
          <CardFooter className="flex gap-2 justify-end">
            <Button onClick={() => step == 1 ? router.back() : setStep(step - 1)} variant={"ghost"} size={"lg"}>Voltar</Button>
            <Button onClick={() => step < 3 ? setStep(step + 1) : null} size={"lg"}>{step == 3 ? 'Finalizar' : 'Próximo'}</Button>
          </CardFooter>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
