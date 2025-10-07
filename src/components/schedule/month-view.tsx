"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface Event {
  id: string
  title: string
  start: Date
  end: Date
  color: string
  allDay?: boolean
}

interface MonthViewProps {
  currentDate: Date
  onCreateEvent: (date: Date) => void
  onEditEvent: (event: Event) => void
}

// Sample events data
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
  {
    id: "3",
    title: "Client Presentation",
    start: new Date(2025, 9, 8, 9, 0),
    end: new Date(2025, 9, 8, 10, 30),
    color: "bg-green-500",
  },
  {
    id: "4",
    title: "Design Review",
    start: new Date(2025, 9, 12, 15, 0),
    end: new Date(2025, 9, 12, 16, 0),
    color: "bg-orange-500",
  },
]

export default function MonthView({ currentDate, onCreateEvent, onEditEvent }: MonthViewProps) {
  const [events] = useState<Event[]>(sampleEvents)

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days: (Date | null)[] = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }

    return days
  }

  const getEventsForDay = (date: Date | null) => {
    if (!date) return []
    return events.filter((event) => {
      const eventDate = new Date(event.start)
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      )
    })
  }

  const isToday = (date: Date | null) => {
    if (!date) return false
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const days = getDaysInMonth(currentDate)
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="h-full flex flex-col bg-white dark:bg-[#18181B]">
      {/* Week day headers */}
      <div className="grid grid-cols-7 border-b border-gray-200 dark:border-[#27272A]">
        {weekDays.map((day) => (
          <div
            key={day}
            className="py-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-[#27272A] last:border-r-0"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="flex-1 grid grid-cols-7 auto-rows-fr">
        {days.map((day, index) => {
          const dayEvents = getEventsForDay(day)
          const today = isToday(day)

          return (
            <div
              key={index}
              className={cn(
                "border-r border-b border-gray-200 dark:border-[#27272A] last:border-r-0 p-2 min-h-[120px] cursor-pointer hover:bg-gray-50 dark:hover:bg-[#1F1F23] transition-colors",
                !day && "bg-gray-50 dark:bg-[#0F0F12]",
              )}
              onClick={() => day && onCreateEvent(day)}
            >
              {day && (
                <>
                  <div className="flex justify-between items-start mb-1">
                    <span
                      className={cn(
                        "text-sm font-medium",
                        today
                          ? "bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center"
                          : "text-gray-900 dark:text-gray-100",
                      )}
                    >
                      {day.getDate()}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 3).map((event) => (
                      <div
                        key={event.id}
                        className={cn(
                          "text-xs px-2 py-1 rounded text-white truncate cursor-pointer hover:opacity-80",
                          event.color,
                        )}
                        onClick={(e) => {
                          e.stopPropagation()
                          onEditEvent(event)
                        }}
                      >
                        {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 px-2">+{dayEvents.length - 3} more</div>
                    )}
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
