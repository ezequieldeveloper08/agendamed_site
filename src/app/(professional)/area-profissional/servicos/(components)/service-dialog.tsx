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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FormProvider, useForm } from "react-hook-form"
import { FormInput } from "@/components/form-components/form-input"
import { FormTextarea } from "@/components/form-components/form-textarea"
import { FormSelect } from "@/components/form-components/form-select"


export function ServiceDialog() {
  const form = useForm()

  function handleSubmit() { }

  return (
    <FormProvider {...form}>
      <Dialog>
      <DialogTrigger asChild>
        <Button>Novo Serviço</Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Cadastrar Serviço</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <FormInput 
            control={form.control}
            label="Nome do serviço"
            {...form.register('name')}
          />
          <FormTextarea 
            control={form.control}
            label="Descrição do serviço"
            height={100}
            {...form.register('description')}
          />
          <FormInput 
            control={form.control}
            label="URL da Imagem"
            {...form.register('image')}
          />
          <FormSelect 
            control={form.control}
            label="Duração (minutos)"
            items={[
              {name: '15 minutos', value: '15',},
              {name: '30 minutos', value: '30',},
              {name: '60 minutos', value: '60',},
            ]}
            {...form.register('duration')}
          />
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
