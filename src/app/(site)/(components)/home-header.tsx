"use client"

import { deleteCookies } from "@/app/actions";
import { NavUser } from "@/components/nav-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useLayout } from "@/providers/layout-provider";
import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut, Search, Sparkles, Stethoscope, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function HomeHeader() {
    const path = usePathname()
    const router = useRouter()
    const { user } = useLayout()

    return (
        <div className="pt-16">
            <header className="border-b h-16 flex items-center w-full fixed top-0 bg-white">
                <div className="mx-auto container w-full px-4 flex items-center justify-between">
                    <div className="flex gap-8 items-center">
                        <Link href={'/'}>
                            <Image src={'/logo.svg'} alt="" width={160} height={40} />
                        </Link>
                        <Link href={''} className="text-sm font-medium text-gray-700 hover:text-primary">Encontrar Médicos</Link>
                        <Link href={''} className="text-sm font-medium text-gray-700 hover:text-primary">Especialidades</Link>
                        <Link href={''} className="text-sm font-medium text-gray-700 hover:text-primary">Como Funciona</Link>
                        <Link href={''} className="text-sm font-medium text-gray-700 hover:text-primary">Para Médicos</Link>
                    </div>
                    {user ?
                        <div className="flex gap-2">
                            <Button variant="ghost" size="lg"><Search />Buscar</Button>
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
                                            Account
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <CreditCard />
                                            Billing
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Bell />
                                            Notifications
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={async () => {
                                        await deleteCookies('agendamed.user')
                                        router.refresh()
                                    }}>
                                        <LogOut />
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        :
                        <div className="flex gap-2">
                            <Button variant="ghost" size="lg"><Search />Buscar</Button>
                            <Link href={`/entrar?redirect=${path}`}>
                                <Button variant="outline" size="lg"><User /> Entrar</Button>
                            </Link>
                            <Link href={'/cadastrar'}>
                                <Button size="lg">Cadastrar</Button>
                            </Link>
                        </div>}
                </div>
            </header>
        </div>
    )
}