import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, Clock, FolderIcon, MapPin, Phone, Star, Users } from "lucide-react";
import { ScheduleForm } from "../(components)/schedule-form";

export default function Page() {
    return (
        <div className="bg-gray-50 flex-1">
            <div className="container mx-auto px-4 flex flex-col gap-8 py-8">
                <Card>
                    <CardContent>
                        <div className="flex gap-8">
                            <img src={"/avatars/medica.jpg"} alt={""} width={64} height={64} className="object-cover rounded-full w-36 h-36 min-w-36" />
                            <div className="flex-1 flex flex-col gap-1">
                                <div className="flex justify-between">
                                    <span className="text-2xl text-primary font-semibold">Dr. Maria Silva</span>
                                    <span className="text-2xl text-primary font-semibold">R$ 250</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-700 font-medium">Cardiologista</span>
                                    <span className="text-gray-700">consulta</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star className="text-yellow-500" size={16} />
                                    <span className="text-sm font-medium">4.9</span>
                                    <span className="text-sm text-gray-600">(234 avaliações)</span>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div className="mt-4 flex flex-col gap-2">
                                        <div className="flex items-center gap-2">
                                            <MapPin size={16} />
                                            <span className="text-sm text-gray-600">Catalão, GO</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock size={16} />
                                            <span className="text-sm text-gray-600">15 anos de experiência</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-green-500">
                                            <CalendarIcon size={16} />
                                            <span className="text-sm">Próximo horário: Hoje às 14:30</span>
                                        </div>
                                    </div>
                                    
                                    <ScheduleForm />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <div className="flex w-full flex-col gap-6">
                    <Tabs defaultValue="sobre" className="w-full gap-4">
                        <TabsList className="w-full bg-gray-100 h-fit p-2">
                            <TabsTrigger className="h-10" value="sobre">Sobre</TabsTrigger>
                            <TabsTrigger className="h-10" value="servicos">Serviços</TabsTrigger>
                            <TabsTrigger className="h-10" value="horarios">Horários</TabsTrigger>
                            <TabsTrigger className="h-10" value="avaliacoes">Avaliações</TabsTrigger>
                        </TabsList>
                        <TabsContent value="sobre">
                            <div className="grid grid-cols-12 gap-4">
                                <div className="col-span-8 flex flex-col gap-4">
                                    <Card className="gap-2">
                                        <CardHeader>
                                            <CardTitle>Sobre o médico</CardTitle>

                                        </CardHeader>
                                        <CardContent>
                                            <span className="text-gray-700">
                                                Cardiologista com mais de 15 anos de experiência, especializada em cardiologia intervencionista e prevenção cardiovascular. Atende em clínica própria e hospitais de referência em São Paulo.
                                            </span>
                                        </CardContent>
                                    </Card>
                                    <Card className="gap-2">
                                        <CardHeader>
                                            <CardTitle>Formação</CardTitle>

                                        </CardHeader>
                                        <CardContent>
                                            <ul className="list-disc pl-6 text-gray-700">
                                                <li>Medicina - USP (2008)</li>
                                                <li>Residência em Cardiologia - InCor (2012)</li>
                                                <li>Fellowship em Cardiologia Intervencionista - Mount Sinai (2014)</li>
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </div>
                                <div className="col-span-4 flex flex-col gap-4">
                                    <Card className="gap-2">
                                        <CardHeader>
                                            <CardTitle>Informações</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex items-center gap-2">
                                                <Users size={16} />
                                                <span className="text-sm text-gray-700">
                                                    Idiomas: Português, Inglês
                                                </span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card className="gap-2">
                                        <CardHeader>
                                            <CardTitle>Local de atendimento</CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex flex-col gap-1">
                                            <span className="text-gray-900 font-semibold">Clínica Cardio Excellence</span>
                                            <span className="text-sm text-gray-700">Av. Paulista, 1000 - Bela Vista, São Paulo - SP</span>
                                            <div className="flex items-center gap-2">
                                                <Phone size={16} />
                                                <span className="text-sm text-gray-700">
                                                    (11) 99999-9999
                                                </span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="servicos">
                            <Empty>
                                <EmptyHeader>
                                    <EmptyMedia variant="icon">
                                        <FolderIcon />
                                    </EmptyMedia>
                                    <EmptyTitle>No Projects Yet</EmptyTitle>
                                    <EmptyDescription>
                                        You haven&apos;t created any projects yet. Get started by creating
                                        your first project.
                                    </EmptyDescription>
                                </EmptyHeader>
                            </Empty>
                        </TabsContent>
                        <TabsContent value="horarios">
                            <Empty>
                                <EmptyHeader>
                                    <EmptyMedia variant="icon">
                                        <FolderIcon />
                                    </EmptyMedia>
                                    <EmptyTitle>No Projects Yet</EmptyTitle>
                                    <EmptyDescription>
                                        You haven&apos;t created any projects yet. Get started by creating
                                        your first project.
                                    </EmptyDescription>
                                </EmptyHeader>
                            </Empty>
                        </TabsContent>
                        <TabsContent value="avaliacoes">
                            <Empty>
                                <EmptyHeader>
                                    <EmptyMedia variant="icon">
                                        <FolderIcon />
                                    </EmptyMedia>
                                    <EmptyTitle>No Projects Yet</EmptyTitle>
                                    <EmptyDescription>
                                        You haven&apos;t created any projects yet. Get started by creating
                                        your first project.
                                    </EmptyDescription>
                                </EmptyHeader>
                            </Empty>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}