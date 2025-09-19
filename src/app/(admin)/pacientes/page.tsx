"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Search,
  Eye,
  Edit,
  MoreHorizontal,
} from "lucide-react"

export default function PacientesPage() {
  const pacientes = [
    {
      nome: "Maria Silva Santos",
      cpf: "123.456.789-00",
      idade: 45,
      telefone: "(11) 99999-9999",
      ultimaConsulta: "15/03/2024",
      status: "Ativo",
      proxima: "20/03/2024",
    },
    {
      nome: "João Carlos Lima",
      cpf: "987.654.321-00",
      idade: 62,
      telefone: "(11) 88888-8888",
      ultimaConsulta: "10/03/2024",
      status: "Ativo",
      proxima: "18/03/2024",
    },
    {
      nome: "Ana Paula Costa",
      cpf: "456.789.123-00",
      idade: 34,
      telefone: "(11) 77777-7777",
      ultimaConsulta: "12/03/2024",
      status: "Ativo",
      proxima: "25/03/2024",
    },
    {
      nome: "Pedro Henrique Oliveira",
      cpf: "321.654.987-00",
      idade: 28,
      telefone: "(11) 66666-6666",
      ultimaConsulta: "08/03/2024",
      status: "Inativo",
      proxima: null,
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Pacientes</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie os pacientes cadastrados na clínica
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Paciente
        </Button>
      </div>

      {/* Buscar Pacientes */}
      <Card>
        <CardHeader>
          <CardTitle>Buscar Pacientes</CardTitle>
          <CardDescription>
            Encontre pacientes por nome ou CPF
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar por nome ou CPF..." className="pl-8" />
          </div>
        </CardContent>
      </Card>

      {/* Lista de Pacientes */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Pacientes</CardTitle>
          <CardDescription>
            {pacientes.length} pacientes encontrados
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {pacientes.map((p, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-md border p-4"
            >
              <div>
                <p className="font-medium">{p.nome}</p>
                <p className="text-sm text-muted-foreground">{p.cpf}</p>
              </div>
              <div className="hidden md:flex flex-col text-sm text-muted-foreground">
                <span>{p.idade} anos</span>
                <span>{p.telefone}</span>
              </div>
              <div className="text-sm">
                <p className="text-muted-foreground">
                  Última consulta: {p.ultimaConsulta}
                </p>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={p.status === "Ativo" ? "default" : "secondary"}
                  >
                    {p.status}
                  </Badge>
                  {p.proxima && (
                    <span className="text-xs text-muted-foreground">
                      Próxima: {p.proxima}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="icon" variant="outline">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
