import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { ScheduleGrid } from "./schedule-grid";
import { ScheduleCalendar } from "./schedule-calendar";

export function ScheduleForm() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size="lg" className="w-fit mt-4"><CalendarIcon /> Agendar consulta</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-full sm:max-w-2xl">
                <AlertDialogHeader>
                    <AlertDialogTitle>Selecione uma data e horário</AlertDialogTitle>
                    <AlertDialogDescription>
                        Escolha o dia, o serviço e o horário desejado para agendar sua consulta.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <ScheduleCalendar />
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction>Continuar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}