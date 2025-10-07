"use client"

import * as React from "react"
import {
  ActivityIcon,
  AudioWaveform,
  Building2Icon,
  CalendarIcon,
  ClipboardIcon,
  Command,
  Compass,
  Frame,
  GalleryVerticalEnd,
  HomeIcon,
  Map,
  PieChart,
  SettingsIcon,
  StethoscopeIcon,
  UsersIcon,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import Image from "next/image"

const data = {
  user: {
    name: "Ezequiel Pires",
    email: "ezequiel.pires082000@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: HomeIcon,
      isActive: true,
    },
    {
      title: "Pacientes",
      url: "/pacientes",
      icon: UsersIcon,
    },
    {
      title: "Estabelecimentos",
      url: "/estabelecimentos",
      icon: Building2Icon,
    },
    {
      title: "Profissionais",
      url: "/profissionais",
      icon: StethoscopeIcon,
    },
    {
      title: "Agendamentos",
      url: "/agendamentos",
      icon: CalendarIcon,
    },
    {
      title: "Exames",
      url: "/exames",
      icon: ActivityIcon,
    },
    {
      title: "Receituário",
      url: "/receituario",
      icon: ClipboardIcon,
    },
    {
      title: "Configurações",
      url: "/configuracoes",
      icon: SettingsIcon,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex flex-row items-center overflow-hidden">
        <div className="text-sidebar-primary-foreground flex aspect-square size-8 rounded-lg">
          <img src={'/icon.png'} alt="agenda.max" className="object-contain w-full" />
        </div>

        <Image src={'/logo-text.png'} alt="agenda.max" width={120} height={32} className="mt-1"/>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
