import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, Clock, MapPin, Star } from "lucide-react";
import Link from "next/link";

export function HomeProfessionalCard() {
    return (

        <Card>
            <CardContent>
                <div className="flex gap-2">
                    <img src={"/avatars/medica.jpg"} alt={""} width={64} height={64} className="object-cover rounded-xl w-20 h-20 min-w-20" />
                    <div className="flex-1 flex flex-col gap-1">
                        <div className="flex justify-between">
                            <span className="text-primary font-semibold">Dr. Maria Silva</span>
                            <span className="text-primary font-semibold">R$ 250</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-700 font-medium">Cardiologista</span>
                            <span className="text-gray-700 text-sm">consulta</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Star className="text-yellow-500" size={16} />
                            <span className="text-sm font-medium">4.9</span>
                            <span className="text-sm text-gray-600">(234 avaliações)</span>
                        </div>
                    </div>
                </div>
                <div className="mt-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span className="text-sm text-gray-600">Catalão, GO</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span className="text-sm text-gray-600">15 anos de experiência</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-500">
                        <CalendarIcon size={16} />
                        <span className="text-sm">Próximo horário: Hoje às 14:30</span>
                    </div>
                    <div className="mt-4 w-full flex gap-2">
                        <Link href={`/caio-flavio-castro-e-macedo-2/urologista/catalao`} className="flex-1">
                            <Button size="lg" variant="outline" className="w-full">Ver perfil</Button>
                        </Link>

                        <Button size="lg" className="bg-green-500 flex-1">Agendar</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}