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
import ScheduleContent from "@/components/schedule/content"

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
      </div>

      <ScheduleContent />
    </div>
  )
}
