"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, ChevronLeft, ChevronRight, Calendar } from "lucide-react"

export default function AgendaPage() {
  const [view, setView] = useState<"Dia" | "Semana" | "Mês">("Dia")
  const [date, setDate] = useState(new Date("2024-03-20"))

  const agendamentos = [
    {
      hora: "08:00",
      paciente: "Maria Silva Santos",
      medico: "Dr. Carlos Silva",
      especialidade: "Cardiologia",
      status: "Confirmado",
      duracao: "30min",
    },
    {
      hora: "08:30",
      paciente: "João Carlos Lima",
      medico: "Dr. Carlos Silva",
      especialidade: "Cardiologia",
      status: "Confirmado",
      duracao: "30min",
    },
    {
      hora: "09:00",
      paciente: "Ana Paula Costa",
      medico: "Dra. Ana Costa",
      especialidade: "Endocrinologia",
      status: "Aguardando",
      duracao: "45min",
    },
  ]

  const resumo = {
    total: agendamentos.length,
    confirmados: agendamentos.filter(a => a.status === "Confirmado").length,
    aguardando: agendamentos.filter(a => a.status === "Aguardando").length,
    cancelados: agendamentos.filter(a => a.status === "Cancelado").length,
  }

  const nextDay = () => {
    setDate(new Date(date.getTime() + 24 * 60 * 60 * 1000))
  }

  const prevDay = () => {
    setDate(new Date(date.getTime() - 24 * 60 * 60 * 1000))
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Agenda</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie agendamentos e consultas
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Agendamento
        </Button>
      </div>

      {/* Filtro de visualização */}
      <Card>
        <CardContent className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={prevDay}>
              <ChevronLeft />
            </Button>
            <span className="font-medium">{date.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}</span>
            <Button variant="outline" onClick={nextDay}>
              <ChevronRight />
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant={view === "Dia" ? "default" : "outline"} onClick={() => setView("Dia")}>Dia</Button>
            <Button variant={view === "Semana" ? "default" : "outline"} onClick={() => setView("Semana")}>Semana</Button>
            <Button variant={view === "Mês" ? "default" : "outline"} onClick={() => setView("Mês")}>Mês</Button>
          </div>
        </CardContent>
      </Card>

      {/* Conteúdo */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Agenda do dia */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Agenda do {view}</CardTitle>
            <CardDescription>{agendamentos.length} agendamentos para hoje</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {agendamentos.map((a, i) => (
              <div key={i} className="flex items-center justify-between p-2 border rounded-md">
                <div>
                  <p className="font-semibold">{a.paciente}</p>
                  <p className="text-sm text-muted-foreground">{a.medico} - {a.especialidade}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={a.status === "Confirmado" ? "default" : a.status === "Aguardando" ? "secondary" : "destructive"}>
                    {a.status}
                  </Badge>
                  <span className="text-sm">{a.duracao}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Resumo e próximos */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resumo do Dia</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
              <p>Total: {resumo.total}</p>
              <p className="text-green-600">Confirmados: {resumo.confirmados}</p>
              <p className="text-orange-600">Aguardando: {resumo.aguardando}</p>
              <p className="text-red-600">Cancelados: {resumo.cancelados}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Próximos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {agendamentos.slice(0, 3).map((a, i) => (
                <div key={i}>
                  <p className="font-medium">{a.hora} - {a.paciente}</p>
                  <p className="text-muted-foreground text-xs">{a.medico}</p>
                  <Badge variant={a.status === "Confirmado" ? "default" : a.status === "Aguardando" ? "secondary" : "destructive"}>{a.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
