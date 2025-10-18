"use client"

import { useState } from "react"
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
import { FormInput } from "@/components/form-components/form-input"

export function AddressDialog() {
  const form = useForm()

  function handleSubmit() { }

  return (
    <FormProvider {...form}>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Novo Endereço</Button>
        </DialogTrigger>

        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Cadastrar Endereço</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <FormInput
                control={form.control}
                label="Nome/Referência"
                placeholder="Próximo ao shopping"
                {...form.register("localManager.0.address.name")}
              />
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                control={form.control}
                label="CEP *"
                placeholder="00000-000"
                mask="99999-999"
                {...form.register("localManager.0.address.zipcode", { required: "CEP é obrigatório" })}
              />
              <FormInput
                control={form.control}
                label="Número *"
                placeholder="123"
                {...form.register("localManager.0.address.number", { required: "Número é obrigatório" })}
              />
              <FormInput
                control={form.control}
                label="Estado *"
                placeholder="SP"
                {...form.register("localManager.0.address.uf", { required: "Estado é obrigatório" })}
              />
              <FormInput
                control={form.control}
                label="Cidade *"
                placeholder="São Paulo"
                {...form.register("localManager.0.address.city", { required: "Cidade é obrigatória" })}
              />
            </div>

            <div className="grid gap-4">
              <FormInput
                control={form.control}
                label="Bairro *"
                placeholder="Centro"
                {...form.register("localManager.0.address.district", { required: "Bairro é obrigatório" })}
              />
              <FormInput
                control={form.control}
                label="Rua *"
                placeholder="Rua das Flores"
                {...form.register("localManager.0.address.route", { required: "Rua é obrigatória" })}
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:justify-end">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={handleSubmit}>Salvar</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </FormProvider>
  )
}
