"use client"

import { AddressCard } from "./(components)/address-card";
import { AddressDialog } from "./(components)/address-dialog";

const mockedAddresses = [
    {
        id: 1,
        name: "Casa",
        route: "Rua das Flores",
        number: "123",
        district: "Centro",
        city: "São Paulo",
        uf: "SP",
        zipcode: "01000-000",
    },
    {
        id: 2,
        name: "Trabalho",
        route: "Avenida Paulista",
        number: "1500",
        district: "Bela Vista",
        city: "São Paulo",
        uf: "SP",
        zipcode: "01310-200",
    },
    {
        id: 3,
        name: "Depósito",
        route: "Rua dos Operários",
        number: "85",
        district: "Industrial",
        city: "Campinas",
        uf: "SP",
        zipcode: "13030-120",
    },
    {
        id: 4,
        name: "Casa de Praia",
        route: "Alameda das Ondas",
        number: "25",
        district: "Mar Azul",
        city: "Guarujá",
        uf: "SP",
        zipcode: "11440-100",
    },
    {
        id: 5,
        name: "Sítio da Família",
        route: "Estrada do Sol",
        number: "KM 12",
        district: "Zona Rural",
        city: "Atibaia",
        uf: "SP",
        zipcode: "12940-000",
    },
]

export default function Page() {

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Endereços</h1>
                    <p className="text-sm text-muted-foreground">
                        Gerencie seus endereços
                    </p>
                </div>
                <AddressDialog />
            </div>
            <div className="grid grid-cols-4 gap-4">
                {mockedAddresses.map((addr) => (
                    <AddressCard
                        key={addr.id}
                        address={addr}
                        onEdit={() => {}}
                        onDelete={() => {}}
                    />
                ))}
            </div>
        </div>
    )
}