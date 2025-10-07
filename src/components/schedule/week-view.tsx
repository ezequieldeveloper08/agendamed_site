"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface Event {
  id: string
  title: string
  start: Date
  end: Date
  color: string
}

interface WeekViewProps {
  currentDate: Date
  onCreateEvent: (date: Date) => void
  onEditEvent: (event: Event) => void
  intervalMinutes?: number // intervalo dinâmico, default 60
}

const sampleEvents: Event[] = [
  {
    id: "1",
    title: "Team Meeting",
    start: new Date(2025, 9, 15, 10, 0),
    end: new Date(2025, 9, 15, 11, 0),
    color: "bg-blue-500",
  },
  {
    id: "2",
    title: "Product Launch",
    start: new Date(2025, 9, 20, 14, 0),
    end: new Date(2025, 9, 20, 16, 0),
    color: "bg-purple-500",
  },
]

export default function WeekView({
  currentDate,
  onCreateEvent,
  onEditEvent,
  intervalMinutes = 60,
}: WeekViewProps) {
  const [events] = useState<Event[]>(sampleEvents)

  const getWeekDays = (date: Date) => {
    const startOfWeek = new Date(date)
    startOfWeek.setDate(date.getDate() - date.getDay())
    const days: Date[] = []
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      days.push(day)
    }
    return days
  }

  const weekDays = getWeekDays(currentDate)

  // Gerar slots de horário dinamicamente
  const timeSlots = []
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += intervalMinutes) {
      timeSlots.push({ hour, minute })
    }
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  return (
    <div className="h-full flex flex-col bg-white dark:bg-[#18181B]">
      {/* Cabeçalho dos dias */}
      <div className="grid grid-cols-[80px_repeat(7,1fr)] border-b border-gray-200 dark:border-[#27272A] sticky top-0 bg-white dark:bg-[#18181B] z-10">
        <div className="border-r border-gray-200 dark:border-[#27272A]"></div>
        {weekDays.map((day, index) => (
          <div
            key={index}
            className="py-3 text-center border-r border-gray-200 dark:border-[#27272A] last:border-r-0"
          >
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {day.toLocaleDateString("pt-BR", { weekday: "short" })}
            </div>
            <div
              className={cn(
                "text-lg font-semibold mt-1",
                isToday(day)
                  ? "bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto"
                  : "text-gray-900 dark:text-gray-100",
              )}
            >
              {day.getDate()}
            </div>
          </div>
        ))}
      </div>

      {/* Grid de horários */}
      <div className="flex-1 overflow-auto scroll-hidden">
        {timeSlots.map(({ hour, minute }, index) => (
          <div
            key={index}
            className="grid grid-cols-[80px_repeat(7,1fr)] border-b border-gray-200 dark:border-[#27272A]"
          >
            {/* Horário */}
            <div className="border-r border-gray-200 dark:border-[#27272A] p-2 text-xs text-gray-500 dark:text-gray-400 text-right">
              {`${hour.toString().padStart(2, "0")}:${minute
                .toString()
                .padStart(2, "0")}`}
            </div>

            {/* Dias */}
            {weekDays.map((day, dayIndex) => {
              const slotEvents = events.filter((event) => {
                const eventDate = new Date(event.start)
                return (
                  eventDate.getDate() === day.getDate() &&
                  eventDate.getMonth() === day.getMonth() &&
                  eventDate.getFullYear() === day.getFullYear() &&
                  eventDate.getHours() === hour &&
                  eventDate.getMinutes() === minute
                )
              })

              return (
                <div
                  key={dayIndex}
                  className="border-r border-gray-200 dark:border-[#27272A] last:border-r-0 p-1 min-h-[40px] cursor-pointer hover:bg-gray-50 dark:hover:bg-[#1F1F23] transition-colors"
                  onClick={() => {
                    const eventDate = new Date(day)
                    eventDate.setHours(hour, minute, 0, 0)
                    onCreateEvent(eventDate)
                  }}
                >
                  {slotEvents.map((event) => (
                    <div
                      key={event.id}
                      className={cn(
                        "text-xs px-2 py-1 rounded text-white mb-1 cursor-pointer hover:opacity-80",
                        event.color,
                      )}
                      onClick={(e) => {
                        e.stopPropagation()
                        onEditEvent(event)
                      }}
                    >
                      <div className="font-medium">{event.title}</div>
                      <div className="text-[10px] opacity-90">
                        {event.start.toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
