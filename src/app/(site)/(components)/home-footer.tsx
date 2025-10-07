import { Button } from "@/components/ui/button";
import { Facebook, InstagramIcon, LinkedinIcon, Mail, MapPin, Phone, TwitterIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HomeFooter() {
    return (
        <footer className="bg-primary py-10">
            <div className="container mx-auto px-4 grid grid-cols-4 gap-8">
                <div className="flex flex-col gap-2">
                    <Link href={'/'}>
                        <Image src={'/logo-white.svg'} alt="" width={160} height={40} />
                    </Link>
                    <span className="text-sm text-white/90">Conectando você aos melhores profissionais de saúde. Sua saúde é nossa prioridade.</span>
                    <div>
                        <Button variant="ghost" className="text-white" size="icon"><Facebook /></Button>
                        <Button variant="ghost" className="text-white" size="icon"><TwitterIcon /></Button>
                        <Button variant="ghost" className="text-white" size="icon"><InstagramIcon /></Button>
                        <Button variant="ghost" className="text-white" size="icon"><LinkedinIcon /></Button>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <h4 className="text font-medium text-white">Para Pacientes</h4>
                    <ul className="flex flex-col gap-2">
                        <li>
                            <Link href={''} className="text-sm text-white/80 hover:text-white">Encontrar Médicos</Link>
                        </li>
                        <li>
                            <Link href={''} className="text-sm text-white/80 hover:text-white">Agendar Consulta</Link>
                        </li>
                        <li>
                            <Link href={''} className="text-sm text-white/80 hover:text-white">Especialidades</Link>
                        </li>
                        <li>
                            <Link href={''} className="text-sm text-white/80 hover:text-white">Convênios</Link>
                        </li>
                        <li>
                            <Link href={''} className="text-sm text-white/80 hover:text-white">Telemedicina</Link>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col gap-2">
                    <h4 className="text font-medium text-white">Para Médicos</h4>
                    <ul className="flex flex-col gap-2">
                        <li>
                            <Link href={''} className="text-sm text-white/80 hover:text-white">Cadastre-se</Link>
                        </li>
                        <li>
                            <Link href={''} className="text-sm text-white/80 hover:text-white">Área do Médico</Link>
                        </li>
                        <li>
                            <Link href={''} className="text-sm text-white/80 hover:text-white">Agenda Online</Link>
                        </li>
                        <li>
                            <Link href={''} className="text-sm text-white/80 hover:text-white">Planos</Link>
                        </li>
                        <li>
                            <Link href={''} className="text-sm text-white/80 hover:text-white">Suporte</Link>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col gap-2">
                    <h4 className="text font-medium text-white">Contato</h4>
                    <ul className="flex flex-col gap-2">
                        <li>
                            <Link href={''} className="text-sm text-white/80 hover:text-white flex gap-2 items-center"><Phone size={16} /> (11) 4000-0000</Link>
                        </li>
                        <li>
                            <Link href={''} className="text-sm text-white/80 hover:text-white flex gap-2 items-center"><Mail size={16} /> contato@mediconnect.com</Link>
                        </li>
                        <li>
                            <Link href={''} className="text-sm text-white/80 hover:text-white flex gap-2 items-center"><MapPin size={16} /> Av. Paulista, 1000 São Paulo, SP</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="container mx-auto px-4 flex items-center justify-center mt-8 pt-8 border-t border-white/10">
                <span className="text-xs text-white/80">© 2024 MediConnect. Todos os direitos reservados.</span>
            </div>
        </footer>
    )
}