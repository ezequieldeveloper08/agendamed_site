"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { FormProvider, useForm } from "react-hook-form"
import { FormSelect } from "@/components/form-components/form-select"
import { FormInput } from "@/components/form-components/form-input"

const days = [
  { name: "Segunda", value: "SEGUNDA" },
  { name: "Terça", value: "TERCA" },
  { name: "Quarta", value: "QUARTA" },
  { name: "Quinta", value: "QUINTA" },
  { name: "Sexta", value: "SEXTA" },
  { name: "Sábado", value: "SABADO" },
  { name: "Domingo", value: "DOMINGO" },
]

export function OpeningHourDialog() {
  const form = useForm()

  function handleSubmit(data: any) {
    console.log("Novo horário:", data)
  }

  return (
    <FormProvider {...form}>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Novo Horário</Button>
        </DialogTrigger>

        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Cadastrar Horário</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <FormSelect
              control={form.control}
              label="Dia da Semana"
              items={days}
              {...form.register("day")}
            />
            <FormInput
              control={form.control}
              label="Hora Inicial"
              type="time"
              {...form.register("start")}
            />
            <FormInput
              control={form.control}
              label="Hora Final"
              type="time"
              {...form.register("end")}
            />
            <FormInput
              control={form.control}
              label="Data específica (opcional)"
              type="date"
              {...form.register("specificDate")}
            />
          </div>

          <DialogFooter className="gap-2 sm:justify-end">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={form.handleSubmit(handleSubmit)}>Salvar</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </FormProvider>
  )
}
