"use client"

import { useEffect } from "react"
import { useFormContext } from "react-hook-form"
import { FormInput } from "../form-components/form-input"
import { FormSelect } from "../form-components/form-select"
import { IUser } from "@/types/user"
import { LocationType } from "@/types/location"

export function EstablishmentStep() {
  const form = useFormContext<IUser>()

  const locationTypes = Object.entries(LocationType).map(([key, value]) => ({
    value: key,
    label: value,
  }))

  // Observa mudanças no CEP
  const cep = form.watch("localManager.0.address.zipcode")

  useEffect(() => {
    const fetchAddress = async () => {
      const cleanCep = cep?.replace(/\D/g, "")
      if (cleanCep?.length === 8) {
        try {
          const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
          const data = await res.json()

          if (!data.erro) {
            form.setValue("localManager.0.address.uf", data.uf)
            form.setValue("localManager.0.address.city", data.localidade)
            form.setValue("localManager.0.address.district", data.bairro)
            form.setValue("localManager.0.address.route", data.logradouro)
          }
        } catch (error) {
          console.error("Erro ao buscar CEP:", error)
        }
      }
    }

    fetchAddress()
  }, [cep, form])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          control={form.control}
          label="Nome do estabelecimento *"
          placeholder="Ex: Clínica São João"
          {...form.register("localManager.0.name", { required: "Nome é obrigatório" })}
        />
        <FormSelect
          control={form.control}
          label="Tipo de estabelecimento *"
          items={locationTypes.map((type) => ({ name: type.label, value: type.value }))}
          {...form.register("localManager.0.type", { required: "Tipo é obrigatório" })}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Descrição</label>
        <textarea
          className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm min-h-[80px]"
          placeholder="Descreva seu estabelecimento, serviços oferecidos..."
          {...form.register("localManager.0.description")}
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
            {...form.register("localManager.0.address.zipcode", { required: "CEP é obrigatório" })}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            control={form.control}
            label="Número *"
            placeholder="123"
            {...form.register("localManager.0.address.number", { required: "Número é obrigatório" })}
          />
          <FormInput
            control={form.control}
            label="Nome/Referência"
            placeholder="Próximo ao shopping"
            {...form.register("localManager.0.address.name")}
          />
        </div>
      </div>
    </div>
  )
}
