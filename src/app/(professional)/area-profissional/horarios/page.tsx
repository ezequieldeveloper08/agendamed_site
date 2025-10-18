'use client'

import { OpeningHourCard } from "./(components)/opening-hour-card";
import { OpeningHourDialog } from "./(components)/opening-hour-dialog";

const mockedOpeningHours = [
  { id: "1", day: "SEGUNDA", start: "08:00", end: "18:00" },
  { id: "2", day: "TERCA", start: "08:00", end: "18:00" },
  { id: "3", day: "QUARTA", start: "08:00", end: "18:00" },
  { id: "4", day: "QUINTA", start: "08:00", end: "18:00" },
  { id: "5", day: "SEXTA", start: "08:00", end: "17:00" },
  { id: "6", day: "SABADO", start: "09:00", end: "13:00" },
]

export default function Page() {
    return (
        <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">Horários</h1>
                            <p className="text-sm text-muted-foreground">
                                Gerencie seus Horários
                            </p>
                        </div>
                        <OpeningHourDialog />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {mockedOpeningHours.map((addr) => (
                            <OpeningHourCard
                                key={addr.id}
                                hour={addr}
                                onEdit={() => { }}
                                onDelete={() => { }}
                            />
                        ))}
                    </div>
                </div>
    )
}