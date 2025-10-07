"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Users,
  Calendar,
  FileText,
  AlertCircle,
  UserPlus,
  ClipboardPlus,
  FilePlus2,
  ListChecks,
  Clock,
} from "lucide-react"

export default function Page() {
  return (
     <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Confira seus resultados</p>
        </div>
        <Button>+ Solicitar Exame</Button>
      </div>
      {/* Métricas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Pacientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-green-600">+12% em relação ao mês passado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Consultas Hoje</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-green-600">+3 em relação ao mês passado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prontuários Atualizados</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-green-600">+8% em relação ao mês passado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendências</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-red-600">-2 em relação ao mês passado</p>
          </CardContent>
        </Card>
      </div>

      {/* Agenda e Ações rápidas */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Agenda */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" /> Agenda de Hoje
            </CardTitle>
            <CardDescription>Próximos atendimentos agendados</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">14:30 - Maria Silva</p>
                <p className="text-xs text-muted-foreground">Consulta</p>
              </div>
              <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                Aguardando
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">15:00 - João Santos</p>
                <p className="text-xs text-muted-foreground">Retorno</p>
              </div>
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                Em atendimento
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">15:30 - Ana Costa</p>
                <p className="text-xs text-muted-foreground">Consulta</p>
              </div>
              <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                Agendado
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">16:00 - Pedro Lima</p>
                <p className="text-xs text-muted-foreground">Exame</p>
              </div>
              <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                Agendado
              </span>
            </div>

            <Button variant="outline" className="w-full">
              Ver agenda completa
            </Button>
          </CardContent>
        </Card>

        {/* Ações rápidas */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>
              Acesso rápido às principais funcionalidades
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button variant="outline" className="justify-start gap-2">
              <UserPlus className="h-4 w-4" /> Cadastrar Novo Paciente
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <ClipboardPlus className="h-4 w-4" /> Agendar Consulta
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <FilePlus2 className="h-4 w-4" /> Criar Prontuário
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <ListChecks className="h-4 w-4" /> Ver Pendências
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}