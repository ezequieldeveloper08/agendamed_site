'use client'

import { deleteCookies } from "@/app/actions"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLayout } from "@/providers/layout-provider"
import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut, Search, Sparkles, Stethoscope } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

export function ProfessionalHeader() {
    const { user } = useLayout()
    const router = useRouter()
    const path = usePathname()
    const paths = [
        {
            path: '/area-profissional',
            title: 'Agendamentos',
        },
        {
            path: '/area-profissional/pacientes',
            title: 'Pacientes',
        },
        {
            path: '/area-profissional/sobre',
            title: 'Sobre mim',
        },
        {
            path: '/area-profissional/servicos',
            title: 'Serviços',
        },
        {
            path: '/area-profissional/horarios',
            title: 'Horários',
        },
        {
            path: '/area-profissional/enderecos',
            title: 'Endereços',
        },
    ]

    return (
        <div className="pt-16">
            <header className="border-b h-16 flex items-center w-full fixed top-0 bg-white z-50">
                <div className="h-full mx-auto container w-full px-4 flex items-center justify-between">
                    <div className="px-4 flex items-center gap-4 h-full">
                        <Link href={'/'} className="mr-6">
                            <Image src={'/logo.svg'} alt="" width={160} height={40} />
                        </Link>
                        {paths.map(item => (
                            <button key={item.path} className={`h-full flex text-sm cursor-pointer items-center justify-center relative px-4 ${path == item.path ? 'font-medium text-primary' : 'font-normal text-gray-700'}`} onClick={() => router.push(item.path)}>
                                {item.title}
                                <div className={`${path != item.path && 'hidden'} absolute -bottom-[2px] h-[3px] rounded-xs bg-primary w-full`} />
                            </button>
                        ))}
                    </div>
                    {user && <div className="flex gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    size="lg"
                                    variant="ghost"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage src={user.avatar} alt={user.name} />
                                        <AvatarFallback className="rounded-lg">{user.name.split(' ').slice(0, 2).map(item => item.substring(0, 1)).join('')}</AvatarFallback>
                                    </Avatar>
                                    <ChevronsUpDown className="ml-auto size-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                side={"bottom"}
                                align="end"
                                sideOffset={4}
                            >
                                <DropdownMenuLabel className="p-0 font-normal">
                                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarImage src={user.avatar} alt={user.name} />
                                            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-medium">{user.name}</span>
                                            <span className="truncate text-xs">{user.email}</span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <Link href={'/area-profissional'}>
                                        <DropdownMenuItem>
                                            <Stethoscope />
                                            Area do Profissional
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <BadgeCheck />
                                        Minha conta
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <CreditCard />
                                        Pagamentos
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Bell />
                                        Notificações
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={async () => {
                                    await deleteCookies('agendamed.user')
                                    router.refresh()
                                }}>
                                    <LogOut />
                                    Sair
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>}
                </div>
            </header>
        </div>
    )
}