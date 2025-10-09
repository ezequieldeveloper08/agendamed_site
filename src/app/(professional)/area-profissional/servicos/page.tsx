import { ServiceDialog } from "./(components)/service-dialog";

export default function Page() {

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Agenda</h1>
                    <p className="text-sm text-muted-foreground">
                        Gerencie agendamentos e consultas
                    </p>
                </div>
                <ServiceDialog />
            </div>
        </div>
    )
}