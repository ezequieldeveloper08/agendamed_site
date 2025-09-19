'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { FormProvider, useForm } from "react-hook-form"
import { FormInput } from "../form-components/form-input"
import Link from "next/link"
import { useApi } from "@/hooks/use-api"
import { toast } from "sonner"

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
        <CardContent className="grid p-0 md:grid-cols-2">
          <FormProvider {...form}>
            <form className="p-6 md:p-8" onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Bem-vindo de volta</h1>
                  <p className="text-muted-foreground text-balance">
                    Entre na sua conta AgendaMed.
                  </p>
                </div>
                <FormInput
                  control={form.control}
                  label="Nome completo"
                  placeholder="Ex.: João de Almeida"
                  {...form.register('name', { required: 'Nome é obrigatório' })}
                />
                <FormInput
                  control={form.control}
                  label="Email"
                  placeholder="m@example.com"
                  type="email"
                  {...form.register('email', { required: 'Email é obrigatório' })}
                />
                <FormInput
                  control={form.control}
                  label="Senha"
                  placeholder="********"
                  type="password"
                  {...form.register('password', { required: 'Senha é obrigatória' })}
                />
                <Button type="submit" className="w-full" loading={running}>
                  Entrar
                </Button>
                <div className="text-center text-sm">
                  Já tem uma conta?{" "}
                  <Link href="/entrar" className="underline underline-offset-4">
                    Entrar
                  </Link>
                </div>
              </div>
            </form>
          </FormProvider>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/cadastrar-bg.jpg"
              alt="Image"
              className="w-full h-full object-cover"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
