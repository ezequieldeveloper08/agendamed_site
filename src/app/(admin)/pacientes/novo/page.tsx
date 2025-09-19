import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, User, Phone, HeartPulse, ShieldAlert } from "lucide-react";

export default function CadastroPaciente() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="flex items-center space-x-1">
            <ArrowLeft className="h-4 w-4" /> <span>Voltar</span>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Cadastro de Paciente</h1>
            <p className="text-sm text-gray-500">Preencha os dados do novo paciente</p>
          </div>
        </div>
        <Button className="flex items-center space-x-2">
          <Save className="h-4 w-4" /> <span>Salvar Paciente</span>
        </Button>
      </div>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Dados Pessoais */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <h2 className="text-lg font-semibold flex items-center space-x-2">
              <User className="h-5 w-5 text-blue-600" />
              <span>Dados Pessoais</span>
            </h2>
            <p className="text-sm text-gray-500">Informações básicas do paciente</p>

            <div className="space-y-2">
              <Label>Nome Completo</Label>
              <Input placeholder="Digite o nome completo" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>CPF</Label>
                <Input placeholder="000.000.000-00" />
              </div>
              <div className="space-y-2">
                <Label>RG</Label>
                <Input placeholder="00.000.000-0" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Data de Nascimento</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Sexo</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o sexo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="feminino">Feminino</SelectItem>
                    <SelectItem value="masculino">Masculino</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Informações de Contato */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <h2 className="text-lg font-semibold flex items-center space-x-2">
              <Phone className="h-5 w-5 text-blue-600" />
              <span>Informações de Contato</span>
            </h2>
            <p className="text-sm text-gray-500">Telefone, email e endereço</p>

            <div className="space-y-2">
              <Label>Telefone</Label>
              <Input placeholder="(11) 99999-9999" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input placeholder="exemplo@email.com" />
            </div>
            <div className="space-y-2">
              <Label>Endereço</Label>
              <Input placeholder="Rua, número, bairro" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>CEP</Label>
                <Input placeholder="00000-000" />
              </div>
              <div className="space-y-2">
                <Label>Cidade</Label>
                <Input placeholder="Nome da cidade" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Informações Médicas */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <h2 className="text-lg font-semibold flex items-center space-x-2">
              <HeartPulse className="h-5 w-5 text-blue-600" />
              <span>Informações Médicas</span>
            </h2>
            <p className="text-sm text-gray-500">Dados de saúde e histórico médico</p>

            <div className="space-y-2">
              <Label>Tipo Sanguíneo</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo sanguíneo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Alergias</Label>
              <Textarea placeholder="Liste as alergias conhecidas..." />
            </div>

            <div className="space-y-2">
              <Label>Condições Crônicas</Label>
              <Textarea placeholder="Diabetes, hipertensão, etc..." />
            </div>
          </CardContent>
        </Card>

        {/* Convênio e Emergência */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <h2 className="text-lg font-semibold flex items-center space-x-2">
              <ShieldAlert className="h-5 w-5 text-blue-600" />
              <span>Convênio e Emergência</span>
            </h2>
            <p className="text-sm text-gray-500">Informações de convênio e contato de emergência</p>

            <div className="space-y-2">
              <Label>Convênio</Label>
              <Input placeholder="Nome do convênio" />
            </div>
            <div className="space-y-2">
              <Label>Número do Cartão</Label>
              <Input placeholder="Número do cartão do convênio" />
            </div>
            <div className="space-y-2">
              <Label>Contato de Emergência</Label>
              <Input placeholder="Nome e telefone para emergência" />
            </div>
            <div className="space-y-2">
              <Label>Medicações em Uso</Label>
              <Textarea placeholder="Liste as medicações em uso..." />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}