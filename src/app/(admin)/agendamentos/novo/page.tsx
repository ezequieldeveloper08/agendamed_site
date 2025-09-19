import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { CalendarIcon, User, Stethoscope, ClipboardList, Clock, Info } from "lucide-react";

export default function NovoAgendamento() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Novo Agendamento</h1>
        <Button>
          <ClipboardList className="w-4 h-4 mr-2" /> Salvar Agendamento
        </Button>
      </div>
      <p className="text-gray-500">Agende uma nova consulta ou procedimento</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Dados do Agendamento */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-blue-500" /> Dados do Agendamento
            </CardTitle>
            <CardDescription>Informações básicas da consulta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o paciente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Maria Silva</SelectItem>
                <SelectItem value="2">João Souza</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o médico" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Dr. Carlos Silva</SelectItem>
                <SelectItem value="2">Dra. Ana Costa</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo de consulta" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="consulta">Consulta</SelectItem>
                <SelectItem value="exame">Exame</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="urgente">Urgente</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Data e Horário */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" /> Data e Horário
            </CardTitle>
            <CardDescription>Selecione data, horário e duração</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input type="date" placeholder="Selecione a data" />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o horário" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="08:00">08:00</SelectItem>
                <SelectItem value="09:00">09:00</SelectItem>
                <SelectItem value="10:00">10:00</SelectItem>
                <SelectItem value="14:00">14:00</SelectItem>
                <SelectItem value="15:00">15:00</SelectItem>
                <SelectItem value="16:00">16:00</SelectItem>
              </SelectContent>
            </Select>
            <Input type="number" placeholder="Duração (minutos)" defaultValue={30} />
          </CardContent>
        </Card>
      </div>

      {/* Informações Adicionais */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-500" /> Informações Adicionais
          </CardTitle>
          <CardDescription>Observações e instruções especiais</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea placeholder="Instruções especiais, motivo da consulta, etc..." />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="sms" />
              <label htmlFor="sms">Lembrete por SMS</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="email" />
              <label htmlFor="email">Lembrete por Email</label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
