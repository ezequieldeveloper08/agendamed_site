"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Pencil, Trash2 } from "lucide-react"

interface OpeningHourCardProps {
  hour: {
    id?: string
    day: string
    start: string
    end: string
    specificDate?: string
  }
  onEdit?: () => void
  onDelete?: () => void
}

export function OpeningHourCard({ hour, onEdit, onDelete }: OpeningHourCardProps) {
  const { day, start, end, specificDate } = hour

  const formatTime = (time: string) => time.slice(0, 5) // ex: 09:00:00 → 09:00

  return (
    <Card className="border rounded-2xl hover:shadow-md transition py-4 gap-2">
      <CardHeader className="flex flex-row justify-between items-center pb-0 px-4">
        <div className="flex items-center gap-2">
          <CardTitle className="text-base font-semibold">
            {specificDate ? (
              <span>
                {new Date(specificDate).toLocaleDateString("pt-BR")}
              </span>
            ) : (
              day.charAt(0) + day.slice(1).toLowerCase()
            )}
          </CardTitle>
        </div>

        <div className="flex gap-2">
          {onEdit && (
            <Button variant="ghost" size="icon" onClick={onEdit}>
              <Pencil className="w-4 h-4" />
            </Button>
          )}
          {onDelete && (
            <Button variant="ghost" size="icon" onClick={onDelete}>
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="text-sm text-muted-foreground px-4">
        <p>
          {formatTime(start)} às {formatTime(end)}
        </p>
      </CardContent>
    </Card>
  )
}
