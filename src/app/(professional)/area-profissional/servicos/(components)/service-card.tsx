"use client"

import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Pencil, Trash2 } from "lucide-react"

interface ServiceCardProps {
    service: {
        id?: number
        name: string
        description?: string
        image?: string
        duration?: string
        price?: number
    }
    onEdit?: () => void
    onDelete?: () => void
    onBook?: () => void
}

export function ServiceCard({ service, onEdit, onDelete, onBook }: ServiceCardProps) {
    const { name, description, image, duration, price } = service

    return (
        <Card className="overflow-hidden border rounded-2xl hover:shadow-md transition pb-4 pt-0">
            <div className="flex flex-col h-full flex-1">
                <div className="flex-1 flex flex-col justify-between">
                    <CardHeader className="flex flex-row justify-between items-start mt-4 pb-2 px-4">
                        <div className="flex flex-col gap-1">
                            <CardTitle className="text-base font-semibold leading-tight">
                                {name}
                            </CardTitle>
                            {description && <CardDescription className="line-clamp-2">{description}</CardDescription>}
                        </div>
                        <div className="flex gap-2">
                            {onEdit && (
                                <Button variant="ghost" size="icon" onClick={onEdit} title="Editar serviço">
                                    <Pencil className="w-4 h-4" />
                                </Button>
                            )}
                            {onDelete && (
                                <Button variant="ghost" size="icon" onClick={onDelete} title="Excluir serviço">
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                </Button>
                            )}
                        </div>
                    </CardHeader>

                    <CardContent className="pt-0 text-sm text-muted-foreground space-y-2 px-4">
                        <div className="flex items-center justify-between text-xs">
                            {duration &&
                                <div className="flex gap-1 items-center">
                                    <Clock size={16} />
                                    <p> {duration} min</p>
                                </div>
                            }
                            {price !== undefined && (
                                <p className="font-medium text-primary">
                                    R$ {price.toFixed(2).replace(".", ",")}
                                </p>
                            )}
                        </div>
                    </CardContent>

                    {onBook && (
                        <CardFooter>
                            <Button className="w-full" onClick={onBook}>
                                Agendar
                            </Button>
                        </CardFooter>
                    )}
                </div>
            </div>
        </Card>
    )
}
