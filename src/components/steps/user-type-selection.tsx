"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, UserCheck } from "lucide-react"

interface UserTypeSelectionProps {
    type: string;
    onSelect: (type: string) => void
}

export function UserTypeSelection({ onSelect, type }: UserTypeSelectionProps) {

    return (
        <div className="grid md:grid-cols-2 gap-6">
            <Card onClick={() => onSelect('Profissional')} className={type == 'Profissional' ? "bg-blue-50 text-blue-500 border-blue-500 cursor-pointer shadow-none hover:shadow-sm" : "cursor-pointer shadow-none hover:shadow-sm"}>
                <CardContent className="p-8 text-center">
                    <div className="">
                        <UserCheck className="w-8 h-8 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">Sou Profissional</h3>
                        <p className="text-sm">
                            Médico, dentista, psicólogo ou outro profissional da saúde que deseja oferecer seus serviços
                        </p>
                    </div>
                </CardContent>
            </Card>

            <Card onClick={() => onSelect('Dono de Estabelecimento')} className={type == 'Dono de Estabelecimento' ? "bg-blue-50 text-blue-500 border-blue-500 cursor-pointer shadow-none hover:shadow-sm" : "cursor-pointer shadow-none hover:shadow-sm"}>
                <CardContent className="p-8 text-center">
                    <div className="">
                        <Building2 className="w-8 h-8 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">Dono de Estabelecimento</h3>
                        <p className="text-sm">
                            Proprietário de clínica, hospital, consultório ou outro estabelecimento de saúde
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
