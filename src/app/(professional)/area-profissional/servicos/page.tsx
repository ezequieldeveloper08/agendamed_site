"use client"

import { ServiceCard } from "./(components)/service-card";
import { ServiceDialog } from "./(components)/service-dialog";

const mockedDentalServices = [
  {
    id: 1,
    name: "Limpeza e Profilaxia",
    description:
      "Remoção de placa bacteriana e tártaro para manter a saúde bucal em dia.",
    image:
      "https://www.clinicaconsulta.com.br/upload/service/emVMfM0D3JfgUtu2fVkNqMv5H3kiUgj9XCf0h7K5.jpeg",
    duration: "40",
    price: 180.0,
  },
  {
    id: 2,
    name: "Clareamento Dental",
    description:
      "Tratamento estético para deixar os dentes mais brancos e com brilho natural.",
    image:
      "https://www.clinicaconsulta.com.br/upload/service/emVMfM0D3JfgUtu2fVkNqMv5H3kiUgj9XCf0h7K5.jpeg",
    duration: "60",
    price: 600.0,
  },
  {
    id: 3,
    name: "Restauração Dental",
    description:
      "Reparo de dentes danificados por cáries com resina estética de alta durabilidade.",
    image:
      "https://www.clinicaconsulta.com.br/upload/service/emVMfM0D3JfgUtu2fVkNqMv5H3kiUgj9XCf0h7K5.jpeg",
    duration: "45",
    price: 250.0,
  },
  {
    id: 4,
    name: "Avaliação e Diagnóstico",
    description:
      "Consulta completa com exame clínico, raio-x e plano de tratamento personalizado.",
    image:
      "https://www.clinicaconsulta.com.br/upload/service/emVMfM0D3JfgUtu2fVkNqMv5H3kiUgj9XCf0h7K5.jpeg",
    duration: "30",
    price: 120.0,
  },
  {
    id: 5,
    name: "Tratamento de Canal",
    description:
      "Eliminação de infecções e preservação do dente natural com segurança.",
    image:
      "https://www.clinicaconsulta.com.br/upload/service/emVMfM0D3JfgUtu2fVkNqMv5H3kiUgj9XCf0h7K5.jpeg",
    duration: "90",
    price: 850.0,
  },
  {
    id: 6,
    name: "Implante Dental",
    description:
      "Colocação de pino de titânio para substituição de dentes perdidos.",
    image:
      "https://www.clinicaconsulta.com.br/upload/service/emVMfM0D3JfgUtu2fVkNqMv5H3kiUgj9XCf0h7K5.jpeg",
    duration: "120",
    price: 2500.0,
  },
  {
    id: 7,
    name: "Aparelho Ortodôntico",
    description:
      "Avaliação e manutenção mensal do aparelho fixo ou alinhador transparente.",
    image:
      "https://www.clinicaconsulta.com.br/upload/service/emVMfM0D3JfgUtu2fVkNqMv5H3kiUgj9XCf0h7K5.jpeg",
    duration: "30",
    price: 300.0,
  },
  {
    id: 8,
    name: "Emergência Odontológica",
    description:
      "Atendimento imediato para dor, trauma ou sangramento gengival.",
    image:
      "https://www.clinicaconsulta.com.br/upload/service/emVMfM0D3JfgUtu2fVkNqMv5H3kiUgj9XCf0h7K5.jpeg",
    duration: "20",
    price: 150.0,
  },
]

export default function Page() {

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Agenda</h1>
                    <p className="text-sm text-muted-foreground">
                        Gerencie agendamentos e consultas
                    </p>
                </div>
                <ServiceDialog />
            </div>
            <div className="grid grid-cols-4 gap-4">
                {mockedDentalServices.map((addr) => (
                    <ServiceCard
                        key={addr.id}
                        service={addr}
                        onEdit={() => { }}
                        onDelete={() => { }}
                    />
                ))}
            </div>
        </div>
    )
}