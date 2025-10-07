import { Card, CardContent } from "@/components/ui/card";
import { MedicalSpecialty } from "@/types/medical-specialty";


export function HomeMedicalSpecialtiesCard({specialty}: {specialty: MedicalSpecialty}) {
    const IconComponent = specialty.icon;

    return (
        <Card
            key={specialty.name}
            className="group hover:shadow-hover transition-all duration-300 cursor-pointer bg-white border-0"
        >
            <CardContent className="p-6 text-center">
                <div className="mb-4">
                    <div className="w-12 h-12 mx-auto bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-gray-100 transition-all">
                        <IconComponent className={`h-6 w-6 ${specialty.color} group-hover:scale-110 transition-transform`} />
                    </div>
                </div>

                <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-smooth">
                    {specialty.name}
                </h3>

                <p className="text-xs text-muted-foreground mb-2">
                    {specialty.description}
                </p>

                <div className="text-xs text-primary font-medium">
                    {specialty.doctorCount} médicos
                </div>
            </CardContent>
        </Card>
    )
}