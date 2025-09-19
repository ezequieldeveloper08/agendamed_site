"use client"

import * as React from "react"
import {
  ActivityIcon,
  AudioWaveform,
  CalendarIcon,
  ClipboardIcon,
  Command,
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
} from "@/components/ui/sidebar"

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
      title: "Médicos",
      url: "/medicos",
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
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
