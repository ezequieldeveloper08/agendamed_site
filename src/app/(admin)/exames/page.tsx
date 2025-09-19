// app/exams/page.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DownloadIcon, EyeIcon } from "lucide-react";

const exams = [
  {
    patient: "Maria Silva Santos",
    exam: "Eletrocardiograma",
    doctor: "Dr. Carlos Silva",
    specialty: "Cardiologia",
    date: "15/03/2024",
    time: "09:00",
    status: ["Concluído", "Normal"],
    severity: ["Normal"]
  },
  {
    patient: "João Carlos Lima",
    exam: "Hemograma Completo",
    doctor: "Dr. Pedro Lima",
    specialty: "Laboratório",
    date: "18/03/2024",
    time: "08:30",
    status: ["Pendente"],
    severity: ["Alta"]
  },
  {
    patient: "Ana Paula Costa",
    exam: "Glicemia de Jejum",
    doctor: "Dra. Ana Costa",
    specialty: "Endocrinologia",
    date: "20/03/2024",
    time: "07:00",
    status: ["Agendado"],
    severity: ["Normal"]
  },
  {
    patient: "Pedro Henrique",
    exam: "Raio X Tórax",
    doctor: "Dr. Carlos Silva",
    specialty: "Radiologia",
    date: "14/03/2024",
    time: "10:30",
    status: ["Concluído"],
    severity: ["Alta", "Alterado"]
  },
];

export default function ExamsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Exames</h1>
          <p className="text-sm text-muted-foreground">Gerencie exames laboratoriais e radiológicos</p>
        </div>
        <Button>+ Solicitar Exame</Button>
      </div>

      {/* Filtros e Busca */}
      <Card>
        <CardContent className="flex flex-wrap gap-4 items-center">
          <Input placeholder="Buscar exames..." className="flex-1 min-w-[200px]" />
          <Select>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="concluido">Concluídos</SelectItem>
              <SelectItem value="pendente">Pendentes</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="cardiologia">Cardiologia</SelectItem>
              <SelectItem value="laboratorio">Laboratório</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Relatório</Button>
        </CardContent>
      </Card>

      {/* Resumo */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent>
            <p className="text-sm text-muted-foreground">Total de Exames</p>
            <p className="text-2xl font-bold">5</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent>
            <p className="text-sm text-muted-foreground">Concluídos</p>
            <p className="text-2xl font-bold text-green-600">2</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent>
            <p className="text-sm text-muted-foreground">Pendentes</p>
            <p className="text-2xl font-bold text-yellow-600">1</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent>
            <p className="text-sm text-muted-foreground">Agendados</p>
            <p className="text-2xl font-bold text-green-600">2</p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Exames */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Exames</CardTitle>
          <p className="text-sm text-muted-foreground">{exams.length} exames encontrados</p>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Paciente</TableHead>
                <TableHead>Médico</TableHead>
                <TableHead>Data/Hora</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Severidade</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exams.map((exam, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{exam.patient}</span>
                      <span className="text-sm text-muted-foreground">{exam.exam}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{exam.doctor}</span>
                      <span className="text-sm text-muted-foreground">{exam.specialty}</span>
                    </div>
                  </TableCell>
                  <TableCell>{exam.date} {exam.time}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {exam.status.map((s, i) => (
                        <Badge key={i} variant={s === "Concluído" ? "default" : s === "Pendente" ? "destructive" : "outline"}>
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {exam.severity.map((sev, i) => (
                        <Badge key={i} variant={sev === "Alta" ? "destructive" : "default"}>
                          {sev}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <EyeIcon className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <DownloadIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
