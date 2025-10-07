import { Button } from "@/components/ui/button";
import { MedicalSpecialty } from "@/types/medical-specialty";
import { ArrowRight } from "lucide-react";

import { Heart, Brain, Baby, Eye, Bone, Stethoscope } from "lucide-react";
import { HomeMedicalSpecialtiesCard } from "./home-medical-specialties-card";

const specialties: MedicalSpecialty[] = [
  {
    name: "Cardiologia",
    icon: Heart,
    description: "Cuidados com o coração",
    doctorCount: 145,
    color: "text-red-500",
  },
  {
    name: "Neurologia",
    icon: Brain,
    description: "Sistema nervoso",
    doctorCount: 98,
    color: "text-purple-500",
  },
  {
    name: "Pediatria",
    icon: Baby,
    description: "Cuidados infantis",
    doctorCount: 234,
    color: "text-blue-500",
  },
  {
    name: "Oftalmologia",
    icon: Eye,
    description: "Saúde dos olhos",
    doctorCount: 76,
    color: "text-green-500",
  },
  {
    name: "Ortopedia",
    icon: Bone,
    description: "Ossos e articulações",
    doctorCount: 189,
    color: "text-orange-500",
  },
  {
    name: "Clínica Geral",
    icon: Stethoscope,
    description: "Cuidados gerais",
    doctorCount: 312,
    color: "text-primary",
  },
];

export function HomeMedicalSpecialties() {
    return (
        <div className="bg-gray-50">
            <div className="px-6 py-10 flex flex-col gap-8">
            <div className="flex flex-col items-center gap-2">
                <h2 className="text-4xl font-semibold text-gray-900">Especialidades Médicas</h2>
                <p className="text-lg text-gray-700">Encontre o especialista ideal para suas necessidades de saúde</p>
            </div>
            <div className="container mx-auto grid grid-cols-6 gap-4">
                {specialties.map(item => <HomeMedicalSpecialtiesCard specialty={item} key={item.name} />)}
            </div>
            <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary/5 w-fit mx-auto">Ver todos os médicos <ArrowRight /></Button>
        </div>
        </div>
    )
}