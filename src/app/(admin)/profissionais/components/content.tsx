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
import { IProfessional } from "@/types/user"
import Link from "next/link"

export function MedicosContent({ professionals }: { professionals: Array<IProfessional> }) {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Profissionais</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie a equipe médica da clínica
          </p>
        </div>
        <Link href={'/profissionais/novo'}>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Médico
          </Button>
        </Link>
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
        {professionals?.map((m, i) => (
          <Card key={i} className="p-4">
            <div className="flex items-start justify-between">
              {/* Avatar + Nome */}
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {m.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{m.name}</p>
                  <p className="text-sm text-muted-foreground">{m.specialties.join(", ")}</p>
                  <p className="text-xs text-muted-foreground">{m.document}</p>
                </div>
              </div>
              {/* Status */}
              <Badge
                variant={"default"}
              >
                Ativo
              </Badge>
            </div>

            {/* Avaliação + Consultas */}
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>4.8</span>
              </div>
              <span className="text-sm text-muted-foreground">4 consultas</span>
            </div>

            {/* Contatos */}
            <CardContent className="mt-2 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {m.cellphone}
              </div>
              {/* <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {m.email}
              </div> */}
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {m.address?.name}
              </div>
              {/* <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {m.horario}
              </div> */}
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