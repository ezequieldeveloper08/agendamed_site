"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { format, addDays } from "date-fns"
import { ptBR } from "date-fns/locale"

export function ScheduleGrid() {
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  // 4 dias (hoje + 3)
  const days = Array.from({ length: 4 }, (_, i) => addDays(new Date(), i))

  // Exemplo de horários disponíveis apenas em um dos dias
  const availableTimes = [
    "08:10",
    "08:40",
    "09:10",
    "09:40",
    "10:10",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
  ]

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-2 min-w-max">
        {days.map((day, index) => {
          const isActiveDay = index === 2 // simula que o 3º dia (quarta) tem horários
          return (
            <div
              key={day.toISOString()}
              className="flex flex-col items-center min-w-[80px]"
            >
              {/* Cabeçalho do dia */}
              <div className="text-center mb-2">
                <div className="font-medium">
                  {index === 0
                    ? "Hoje"
                    : index === 1
                    ? "Amanhã"
                    : format(day, "EEE", { locale: ptBR })}
                </div>
                <div className="text-sm text-muted-foreground">
                  {format(day, "d MMM", { locale: ptBR })}
                </div>
              </div>

              {/* Horários */}
              <div className="flex flex-col gap-1">
                {isActiveDay
                  ? availableTimes.map((time) => (
                      <Button
                        key={time}
                        size="sm"
                        variant={selectedTime === time ? "default" : "outline"}
                        className={`w-16 ${
                          selectedTime === time
                            ? ""
                            : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                        }`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Button>
                    ))
                  : (
                      <div className="text-muted-foreground text-sm">-</div>
                    )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
