'use client'

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Configuracoes() {
  const [darkMode, setDarkMode] = useState(false);
  const [autoCompact, setAutoCompact] = useState(true);
  const [autoSync, setAutoSync] = useState(true);
  const [logoutAuto, setLogoutAuto] = useState(true);
  const [auditAccess, setAuditAccess] = useState(true);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Configurações</h1>
      <p className="text-sm text-gray-500">
        Gerencie suas preferências e configurações do sistema
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Perfil do Usuário */}
        <Card>
          <CardContent className="space-y-4 p-4">
            <h2 className="text-lg font-semibold">Perfil do Usuário</h2>
            <p className="text-sm text-gray-500">
              Atualize suas informações pessoais e profissionais
            </p>
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback>DS</AvatarFallback>
              </Avatar>
              <Button variant="outline">Alterar Foto</Button>
            </div>
            <div className="space-y-2">
              <Label>Nome Completo</Label>
              <Input defaultValue="Dr. Silva" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input defaultValue="dr.silva@medpro.com" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Telefone</Label>
                <Input defaultValue="(11) 99999-9999" />
              </div>
              <div className="space-y-2">
                <Label>CRM</Label>
                <Input defaultValue="CRM/SP 123456" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Especialidade</Label>
              <Input defaultValue="Cardiologia" />
            </div>
            <Button className="w-full">Salvar Alterações</Button>
          </CardContent>
        </Card>

        {/* Notificações */}
        <Card>
          <CardContent className="space-y-4 p-4">
            <h2 className="text-lg font-semibold">Notificações</h2>
            <p className="text-sm text-gray-500">
              Configure como você deseja receber notificações
            </p>

            <div className="space-y-2">
              <h3 className="font-medium">Canais de Notificação</h3>
              <div className="flex items-center justify-between">
                <span>Email</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span>SMS</span>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <span>Push Notifications</span>
                <Switch defaultChecked />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Tipos de Notificação</h3>
              <div className="flex items-center justify-between">
                <span>Agendamentos</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span>Resultados de Exames</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span>Prescrições</span>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Segurança */}
        <Card>
          <CardContent className="space-y-4 p-4">
            <h2 className="text-lg font-semibold">Segurança</h2>
            <p className="text-sm text-gray-500">
              Configurações de segurança e privacidade
            </p>

            <Button variant="outline" className="w-full">
              Alterar Senha
            </Button>
            <Button variant="outline" className="w-full">
              Configurar 2FA
            </Button>
            <Button variant="outline" className="w-full">
              Backup de Dados
            </Button>

            <div className="flex items-center justify-between">
              <span>Logout automático</span>
              <Switch checked={logoutAuto} onCheckedChange={setLogoutAuto} />
            </div>
            <div className="flex items-center justify-between">
              <span>Auditoria de acesso</span>
              <Switch checked={auditAccess} onCheckedChange={setAuditAccess} />
            </div>
          </CardContent>
        </Card>

        {/* Sistema */}
        <Card>
          <CardContent className="space-y-4 p-4">
            <h2 className="text-lg font-semibold">Sistema</h2>
            <p className="text-sm text-gray-500">
              Configurações gerais do sistema
            </p>

            <div className="flex items-center justify-between">
              <span>Modo escuro</span>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
            <div className="flex items-center justify-between">
              <span>Compactação automática</span>
              <Switch checked={autoCompact} onCheckedChange={setAutoCompact} />
            </div>
            <div className="flex items-center justify-between">
              <span>Sincronização automática</span>
              <Switch checked={autoSync} onCheckedChange={setAutoSync} />
            </div>

            <div className="text-sm space-y-1 text-gray-600">
              <p><strong>Versão do Sistema:</strong> v2.1.0</p>
              <p><strong>Último Backup:</strong> 20/03/2024</p>
              <p><strong>Espaço Utilizado:</strong> 2.4 GB</p>
            </div>

            <Button className="w-full">Verificar Atualizações</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
