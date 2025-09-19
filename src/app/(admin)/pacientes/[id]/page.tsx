import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, FileText, Calendar, UserIcon, HeartIcon, PillIcon, ActivityIcon, NotebookTextIcon } from "lucide-react";

export default function ProntuarioPaciente() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Prontuário do Paciente</h1>
          <p className="text-sm text-gray-500">
            Informações completas do paciente
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center space-x-2">
            <FileText className="h-4 w-4" /> <span>Gerar Relatório</span>
          </Button>
          <Button className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" /> <span>Agendar Consulta</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Dados Pessoais */}
        <Card>
          <CardContent className="p-4 space-y-2">
            <h2 className="text-lg font-semibold flex items-center space-x-2">
              <UserIcon size={20} />
              <span>Dados Pessoais</span>
            </h2>
            <p><strong>Nome Completo:</strong> Maria Silva Santos</p>
            <p><strong>CPF:</strong> 123.456.789-00</p>
            <p><strong>Data de Nascimento:</strong> 15/05/1978 (45 anos)</p>
            <p><strong>Sexo:</strong> Feminino</p>

            <Separator />

            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Phone className="h-4 w-4" /> <span>(11) 99999-9999</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Mail className="h-4 w-4" /> <span>maria.silva@email.com</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>Rua das Flores, 123 - Centro, São Paulo - SP</span>
            </div>
          </CardContent>
        </Card>

        {/* Informações Médicas */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <h2 className="text-lg font-semibold flex items-center space-x-2">
              <HeartIcon size={20} />
              <span>Informações Médicas</span>
            </h2>
            <p><strong>Tipo Sanguíneo:</strong> O+</p>
            <p><strong>Contato de Emergência:</strong> João Silva - (11) 88888-8888</p>

            <div>
              <p className="font-medium">Alergias</p>
              <div className="flex space-x-2 mt-1">
                <Badge variant="destructive">Penicilina</Badge>
                <Badge variant="destructive">Frutos do mar</Badge>
              </div>
            </div>

            <div>
              <div className="flex gap-2 items-center">
                <ActivityIcon size={16} />
                <p className="font-medium">Condições Crônicas</p>
              </div>
              <div className="flex space-x-2 mt-1">
                <Badge variant="secondary">Hipertensão</Badge>
                <Badge variant="secondary">Diabetes Tipo 2</Badge>
              </div>
            </div>

            <div>
              <div className="flex gap-2 items-center">
                <PillIcon size={16} />
                <p className="font-medium">Medicações Atuais</p>
              </div>
              <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                <li>Losartana 50mg</li>
                <li>Metformina 850mg</li>
                <li>Sinvastatina 20mg</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Histórico de Consultas */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold flex items-center space-x-2">
            <NotebookTextIcon size={20} />
            <span>Histórico de Consultas</span>
          </h2>
          <p className="text-sm text-gray-500">Últimas consultas e atendimentos</p>

          {[
            {
              data: "15/03/2024",
              medico: "Dr. Carlos Silva - Cardiologia",
              motivo: "Consulta de rotina",
              obs: "Paciente apresenta melhora no quadro de hipertensão."
            },
            {
              data: "10/02/2024",
              medico: "Dra. Ana Costa - Endocrinologia",
              motivo: "Acompanhamento diabetes",
              obs: "Glicemia controlada. Manter medicação atual."
            },
            {
              data: "20/01/2024",
              medico: "Dr. Pedro Lima - Clínica Geral",
              motivo: "Check-up anual",
              obs: "Exames de rotina solicitados."
            }
          ].map((consulta, i) => (
            <div key={i} className="p-3 border rounded-lg bg-gray-50">
              <div className="flex justify-between">
                <p className="font-medium">{consulta.data}</p>
                <Badge>Concluída</Badge>
              </div>
              <p className="text-sm text-gray-700">{consulta.medico}</p>
              <p className="text-sm mt-1">
                <strong>Motivo:</strong> {consulta.motivo}
              </p>
              <p className="text-sm mt-1">
                <strong>Observações:</strong> {consulta.obs}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}