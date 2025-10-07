"use client"

import { useState } from "react"
import { Calendar, ChevronLeft, ChevronRight, Plus, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MonthView from "./month-view"
import WeekView from "./week-view"
import DayView from "./day-view"
import EventDialog from "./event-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select"

export default function ScheduleContent() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<"month" | "week" | "day">("month")
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [intervalMinutes, setIntervalMinutes] = useState<number>(30) // Intervalo padrão 30 min

  const navigatePrevious = () => {
    const newDate = new Date(currentDate)
    if (view === "month") newDate.setMonth(newDate.getMonth() - 1)
    else if (view === "week") newDate.setDate(newDate.getDate() - 7)
    else newDate.setDate(newDate.getDate() - 1)
    setCurrentDate(newDate)
  }

  const navigateNext = () => {
    const newDate = new Date(currentDate)
    if (view === "month") newDate.setMonth(newDate.getMonth() + 1)
    else if (view === "week") newDate.setDate(newDate.getDate() + 7)
    else newDate.setDate(newDate.getDate() + 1)
    setCurrentDate(newDate)
  }

  const navigateToday = () => setCurrentDate(new Date())

  const handleCreateEvent = (date?: Date) => {
    setSelectedDate(date || null)
    setSelectedEvent(null)
    setIsEventDialogOpen(true)
  }

  const handleEditEvent = (event: any) => {
    setSelectedEvent(event)
    setIsEventDialogOpen(true)
  }

  const getDateRangeText = () => {
    if (view === "month") {
      return currentDate.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })
    } else if (view === "week") {
      const startOfWeek = new Date(currentDate)
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())
      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(startOfWeek.getDate() + 6)
      return `${startOfWeek.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })} - ${endOfWeek.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}`
    } else {
      return currentDate.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-[#0F0F12]">
      {/* Header */}
      <div className="bg-white dark:bg-[#18181B] border-b border-gray-200 dark:border-[#27272A] px-6 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={navigateToday}>
              Hoje
            </Button>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={navigatePrevious}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={navigateNext}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white min-w-[200px]">{getDateRangeText()}</h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Buscar eventos" className="pl-9 w-64" />
            </div>
            <Button variant="outline" size="icon" className="h-12 w-12">
              <Filter className="h-4 w-4" />
            </Button>

            {/* Interval selector */}
            {view === "week" && (
              <Select
                value={intervalMinutes.toString()}
                onValueChange={(e) => setIntervalMinutes(Number(e))}>
                  <SelectTrigger className="w-[120px] h-12">
                    {intervalMinutes} min
                  </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"15"}>15 min</SelectItem>
                  <SelectItem value={"30"}>30 min</SelectItem>
                  <SelectItem value={"60"}>1 hora</SelectItem>
                </SelectContent>
              </Select>
            )}

            {/* View tabs */}
            <Tabs value={view} onValueChange={(v) => setView(v as any)}>
              <TabsList className="h-12">
                <TabsTrigger className="h-full" value="day">Dia</TabsTrigger>
                <TabsTrigger className="h-full" value="week">Semana</TabsTrigger>
                <TabsTrigger className="h-full" value="month">Mês</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Calendar View */}
      <div className="flex-1 overflow-auto">
        {view === "month" && (
          <div className="h-full overflow-y-scroll [scrollbar-gutter:stable]">
            <MonthView currentDate={currentDate} onCreateEvent={handleCreateEvent} onEditEvent={handleEditEvent} />
          </div>
        )}
        {view === "week" && (
          <WeekView
            currentDate={currentDate}
            onCreateEvent={handleCreateEvent}
            onEditEvent={handleEditEvent}
            intervalMinutes={intervalMinutes} // passa intervalo para a WeekView
          />
        )}
        {view === "day" && (
          <DayView
            currentDate={currentDate}
            onCreateEvent={handleCreateEvent}
            onEditEvent={handleEditEvent}
          />
        )}
      </div>

      {/* Event Dialog */}
      <EventDialog
        open={isEventDialogOpen}
        onOpenChange={setIsEventDialogOpen}
        selectedDate={selectedDate}
        event={selectedEvent}
      />
    </div>
  )
}
