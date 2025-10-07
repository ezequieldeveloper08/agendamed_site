import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { HomeProfessionalCard } from "./home-professional-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HomeProfessionals() {
    return (
        <div className="px-6 py-10 flex flex-col gap-8">
            <div className="flex flex-col items-center gap-2">
                <h2 className="text-4xl font-semibold text-gray-900">Médicos em Destaque</h2>
                <p className="text-lg text-gray-700">Conheça alguns dos nossos profissionais mais bem avaliados e experientes</p>
            </div>
            <div className="container mx-auto grid grid-cols-4 gap-4">
                <HomeProfessionalCard />
                <HomeProfessionalCard />
                <HomeProfessionalCard />
                <HomeProfessionalCard />
            </div>
            <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary/5 w-fit mx-auto">Ver todos os médicos <ArrowRight /></Button>
        </div>
    )
}