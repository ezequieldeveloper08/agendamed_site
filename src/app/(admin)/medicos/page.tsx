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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Plus, Search, Star, Phone, Mail, MapPin, Clock } from "lucide-react"

export default function MedicosPage() {
  const medicos = [
    {
      nome: "Dr. Carlos Silva",
      especialidade: "Cardiologia",
      crm: "CRM/SP 123456",
      status: "Ativo",
      avaliacao: 4.8,
      consultas: 156,
      telefone: "(11) 99999-1111",
      email: "carlos.silva@medpro.com",
      consultorio: "Consultório A",
      horario: "Seg-Sex: 08:00-18:00",
    },
    {
      nome: "Dra. Ana Costa",
      especialidade: "Endocrinologia",
      crm: "CRM/SP 789123",
      status: "Ativo",
      avaliacao: 4.9,
      consultas: 203,
      telefone: "(11) 99999-2222",
      email: "ana.costa@medpro.com",
      consultorio: "Consultório B",
      horario: "Ter-Sáb: 09:00-17:00",
    },
    {
      nome: "Dr. Pedro Lima",
      especialidade: "Clínica Geral",
      crm: "CRM/SP 456789",
      status: "Ativo",
      avaliacao: 4.7,
      consultas: 98,
      telefone: "(11) 99999-3333",
      email: "pedro.lima@medpro.com",
      consultorio: "Consultório C",
      horario: "Seg-Qui: 07:00-16:00",
    },
    {
      nome: "Dra. Maria Santos",
      especialidade: "Pediatria",
      crm: "CRM/SP 321654",
      status: "Férias",
      avaliacao: 4.6,
      consultas: 134,
      telefone: "(11) 99999-4444",
      email: "maria.santos@medpro.com",
      consultorio: "Consultório D",
      horario: "Seg-Sex: 09:00-18:00",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Médicos</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie a equipe médica da clínica
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Médico
        </Button>
      </div>

      {/* Buscar Médicos */}
      <Card>
        <CardHeader>
          <CardTitle>Buscar Médicos</CardTitle>
          <CardDescription>
            Encontre médicos por nome, especialidade ou CRM
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar por nome, especialidade ou CRM..." className="pl-8" />
          </div>
        </CardContent>
      </Card>

      {/* Lista de Médicos */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {medicos.map((m, i) => (
          <Card key={i} className="p-4">
            <div className="flex items-start justify-between">
              {/* Avatar + Nome */}
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {m.nome.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{m.nome}</p>
                  <p className="text-sm text-muted-foreground">{m.especialidade}</p>
                  <p className="text-xs text-muted-foreground">{m.crm}</p>
                </div>
              </div>
              {/* Status */}
              <Badge
                variant={m.status === "Ativo" ? "default" : "secondary"}
              >
                {m.status}
              </Badge>
            </div>

            {/* Avaliação + Consultas */}
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>{m.avaliacao}</span>
              </div>
              <span className="text-sm text-muted-foreground">{m.consultas} consultas</span>
            </div>

            {/* Contatos */}
            <CardContent className="mt-2 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {m.telefone}
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {m.email}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {m.consultorio}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {m.horario}
              </div>
            </CardContent>

            {/* Botões */}
            <div className="flex gap-2 mt-4">
              <Button variant="outline" className="flex-1">Perfil</Button>
              <Button className="flex-1">Agenda</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
