"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, MapPin, Users, Tag, Trash2 } from "lucide-react"

interface EventDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedDate: Date | null
  event?: any
}

export default function EventDialog({ open, onOpenChange, selectedDate, event }: EventDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endDate, setEndDate] = useState("")
  const [endTime, setEndTime] = useState("")
  const [location, setLocation] = useState("")
  const [color, setColor] = useState("blue")
  const [guests, setGuests] = useState("")

  useEffect(() => {
    if (event) {
      setTitle(event.title || "")
      setDescription(event.description || "")
      const start = new Date(event.start)
      const end = new Date(event.end)
      setStartDate(start.toISOString().split("T")[0])
      setStartTime(start.toTimeString().slice(0, 5))
      setEndDate(end.toISOString().split("T")[0])
      setEndTime(end.toTimeString().slice(0, 5))
      setLocation(event.location || "")
      setColor(event.color?.replace("bg-", "").replace("-500", "") || "blue")
    } else if (selectedDate) {
      const date = selectedDate.toISOString().split("T")[0]
      const time = selectedDate.toTimeString().slice(0, 5)
      setStartDate(date)
      setStartTime(time)
      setEndDate(date)
      const endHour = selectedDate.getHours() + 1
      setEndTime(`${endHour.toString().padStart(2, "0")}:00`)
    }
  }, [event, selectedDate])

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving event:", {
      title,
      description,
      startDate,
      startTime,
      endDate,
      endTime,
      location,
      color,
      guests,
    })
    onOpenChange(false)
    resetForm()
  }

  const handleDelete = () => {
    // Handle delete logic here
    console.log("Deleting event:", event?.id)
    onOpenChange(false)
    resetForm()
  }

  const resetForm = () => {
    setTitle("")
    setDescription("")
    setStartDate("")
    setStartTime("")
    setEndDate("")
    setEndTime("")
    setLocation("")
    setColor("blue")
    setGuests("")
  }

  const colorOptions = [
    { value: "blue", label: "Blue", class: "bg-blue-500" },
    { value: "purple", label: "Purple", class: "bg-purple-500" },
    { value: "green", label: "Green", class: "bg-green-500" },
    { value: "orange", label: "Orange", class: "bg-orange-500" },
    { value: "red", label: "Red", class: "bg-red-500" },
    { value: "pink", label: "Pink", class: "bg-pink-500" },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{event ? "Edit Event" : "Create Event"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Event Title *</Label>
            <Input id="title" placeholder="Add title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date">
                <Calendar className="h-4 w-4 inline mr-2" />
                Start Date *
              </Label>
              <Input id="start-date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="start-time">
                <Clock className="h-4 w-4 inline mr-2" />
                Start Time *
              </Label>
              <Input id="start-time" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="end-date">End Date *</Label>
              <Input id="end-date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-time">End Time *</Label>
              <Input id="end-time" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Add description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">
              <MapPin className="h-4 w-4 inline mr-2" />
              Location
            </Label>
            <Input
              id="location"
              placeholder="Add location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* Guests */}
          <div className="space-y-2">
            <Label htmlFor="guests">
              <Users className="h-4 w-4 inline mr-2" />
              Guests
            </Label>
            <Input
              id="guests"
              placeholder="Add guests (comma separated emails)"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />
          </div>

          {/* Color */}
          <div className="space-y-2">
            <Label htmlFor="color">
              <Tag className="h-4 w-4 inline mr-2" />
              Color
            </Label>
            <Select value={color} onValueChange={setColor}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {colorOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded ${option.class}`} />
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <div>
            {event && (
              <Button variant="destructive" onClick={handleDelete}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!title || !startDate || !startTime || !endDate || !endTime}>
              {event ? "Save Changes" : "Create Event"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
