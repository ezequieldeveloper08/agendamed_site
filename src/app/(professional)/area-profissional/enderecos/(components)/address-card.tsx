"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Pencil, Trash2 } from "lucide-react"

interface AddressCardProps {
  address: {
    name?: string
    zipcode?: string
    number?: string
    uf?: string
    city?: string
    district?: string
    route?: string
  }
  onEdit?: () => void
  onDelete?: () => void
}

export function AddressCard({ address, onEdit, onDelete }: AddressCardProps) {
  const {
    name,
    zipcode,
    number,
    uf,
    city,
    district,
    route,
  } = address

  return (
    <Card className="shadow-sm border rounded-2xl transition hover:shadow-md gap-2 py-4">
      <CardHeader className="flex flex-row items-center justify-between pb-0 px-4">
        <div className="flex items-center gap-2">
          <CardTitle className="text-base font-semibold">
            {name || "Endereço"}
          </CardTitle>
        </div>

        <div className="flex gap-2">
          {onEdit && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onEdit}
              title="Editar endereço"
            >
              <Pencil className="w-4 h-4" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onDelete}
              title="Excluir endereço"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="px-4 text-sm text-muted-foreground space-y-1">
        <p>{route}, {number}</p>
        <p>{district}</p>
        <p>{city} - {uf}</p>
        <p>CEP: {zipcode}</p>
      </CardContent>
    </Card>
  )
}
