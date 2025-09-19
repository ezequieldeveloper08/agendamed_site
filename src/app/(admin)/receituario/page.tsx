// app/receituario/page.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface Medicamento {
  nome: string;
  dose: string;
  duracao: string;
}

interface Receita {
  paciente: string;
  medico: string;
  data: string;
  medicamentos: Medicamento[];
  observacoes?: string;
  ativa: boolean;
  cronica: boolean;
}

const receitas: Receita[] = [
  {
    paciente: "Maria Silva Santos",
    medico: "Dr. Carlos Silva",
    data: "15/03/2024",
    medicamentos: [
      { nome: "Losartana", dose: "50mg - 1x ao dia", duracao: "30 dias" },
      { nome: "Sinvastatina", dose: "20mg - 1x ao dia", duracao: "30 dias" }
    ],
    observacoes: "Tomar sempre no mesmo horário",
    ativa: true,
    cronica: true
  },
  {
    paciente: "João Carlos Lima",
    medico: "Dra. Ana Souza",
    data: "10/04/2024",
    medicamentos: [
      { nome: "Metformina", dose: "500mg - 2x ao dia", duracao: "60 dias" }
    ],
    observacoes: "",
    ativa: true,
    cronica: false
  }
];

export default function Receituario() {
  return (
    <div className="p-6 space-y-6">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Receituário</h1>
          <p className="text-sm text-muted-foreground">Gerencie prescrições médicas e medicamentos</p>
        </div>
        <Button>+ Nova Receita</Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="flex flex-col md:flex-row gap-4 md:items-end">
          <Input placeholder="Buscar prescrições..." className="flex-1" />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="ativos">Ativos</SelectItem>
              <SelectItem value="finalizados">Finalizados</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="cronicas">Crônicas</SelectItem>
            </SelectContent>
          </Select>
          <Button>Relatório</Button>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent>
            <p className="text-sm text-muted-foreground">Total de Receitas</p>
            <p className="text-2xl font-bold">5</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent>
            <p className="text-sm text-muted-foreground">Ativas</p>
            <p className="text-2xl font-bold">4</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent>
            <p className="text-sm text-muted-foreground">Crônicas</p>
            <p className="text-2xl font-bold">2</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent>
            <p className="text-sm text-muted-foreground">Finalizadas</p>
            <p className="text-2xl font-bold">1</p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de receitas */}
      <div className="space-y-4">
        {receitas.map((receita, idx) => (
          <Card key={idx}>
            <CardHeader className="flex justify-between items-center">
              <div>
                <h3 className="font-bold">{receita.paciente}</h3>
                <p className="text-sm text-muted-foreground">{receita.medico} - {receita.data}</p>
              </div>
              <div className="flex gap-2">
                {receita.ativa && <Badge variant="secondary">Ativa</Badge>}
                {receita.cronica && <Badge variant="outline">Crônica</Badge>}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {receita.medicamentos.map((med, i) => (
                  <div key={i} className="flex justify-between bg-gray-50 p-2 rounded">
                    <div>
                      <p className="font-medium">{med.nome}</p>
                      <p className="text-sm text-muted-foreground">{med.dose}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">{med.duracao}</span>
                  </div>
                ))}
              </div>
              {receita.observacoes && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Observações: {receita.observacoes}
                </p>
              )}
              <div className="mt-4 flex gap-2">
                <Button variant="outline">Ver Detalhes</Button>
                <Button variant="outline">Imprimir</Button>
                <Button>Renovar</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
