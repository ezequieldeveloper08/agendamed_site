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

interface DayViewProps {
  currentDate: Date
  onCreateEvent: (date: Date) => void
  onEditEvent: (event: Event) => void
}

const sampleEvents: Event[] = [
  {
    id: "1",
    title: "Team Meeting",
    start: new Date(2025, 9, 4, 10, 0),
    end: new Date(2025, 9, 4, 11, 0),
    color: "bg-blue-500",
  },
  {
    id: "2",
    title: "Lunch Break",
    start: new Date(2025, 9, 4, 12, 0),
    end: new Date(2025, 9, 4, 13, 0),
    color: "bg-green-500",
  },
  {
    id: "3",
    title: "Client Call",
    start: new Date(2025, 9, 4, 14, 30),
    end: new Date(2025, 9, 4, 15, 30),
    color: "bg-purple-500",
  },
]

export default function DayView({ currentDate, onCreateEvent, onEditEvent }: DayViewProps) {
  const [events] = useState<Event[]>(sampleEvents)

  const hours = Array.from({ length: 24 }, (_, i) => i)

  const getEventsForHour = (hour: number) => {
    return events.filter((event) => {
      const eventDate = new Date(event.start)
      return (
        eventDate.getDate() === currentDate.getDate() &&
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear() &&
        eventDate.getHours() === hour
      )
    })
  }

  return (
    <div className="h-full flex flex-col bg-white dark:bg-[#18181B]">
      {/* Day header */}
      <div className="border-b border-gray-200 dark:border-[#27272A] py-4 px-6 sticky top-0 bg-white dark:bg-[#18181B] z-10">
        <div className="text-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {currentDate.toLocaleDateString("en-US", { weekday: "long" })}
          </div>
          <div className="text-3xl font-semibold text-gray-900 dark:text-white mt-1">{currentDate.getDate()}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </div>
        </div>
      </div>

      {/* Time grid */}
      <div className="flex-1 overflow-auto">
        <div className="">
          {hours.map((hour) => {
            const hourEvents = getEventsForHour(hour)
            return (
              <div key={hour} className="grid grid-cols-[100px_1fr] border-b border-gray-200 dark:border-[#27272A]">
                <div className="border-r border-gray-200 dark:border-[#27272A] p-3 text-sm text-gray-500 dark:text-gray-400 text-right">
                  {hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`}
                </div>
                <div
                  className="p-2 min-h-[80px] cursor-pointer hover:bg-gray-50 dark:hover:bg-[#1F1F23] transition-colors"
                  onClick={() => {
                    const eventDate = new Date(currentDate)
                    eventDate.setHours(hour, 0, 0, 0)
                    onCreateEvent(eventDate)
                  }}
                >
                  {hourEvents.map((event) => (
                    <div
                      key={event.id}
                      className={cn(
                        "px-3 py-2 rounded-lg text-white mb-2 cursor-pointer hover:opacity-80",
                        event.color,
                      )}
                      onClick={(e) => {
                        e.stopPropagation()
                        onEditEvent(event)
                      }}
                    >
                      <div className="font-medium text-sm">{event.title}</div>
                      <div className="text-xs opacity-90 mt-1">
                        {event.start.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })} -{" "}
                        {event.end.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
