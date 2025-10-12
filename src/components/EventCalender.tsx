"use client"

import { cn } from "@/lib/utils"
import { format } from "date-fns"

interface EventCalendarProps {
  nextMeeting?: Date
  className?: string
}

export default function EventCalendar({ nextMeeting = new Date(2025, 9, 31), className, }: EventCalendarProps) {
  const month = format(nextMeeting, "MMM").toUpperCase()
  const day = format(nextMeeting, "dd")

  return (
    <div className={cn("flex flex-col items-center", className)}>
      {/* Calendar Tile */}
      <div
        className={cn(
          "rounded-2xl w-40 h-44 flex flex-col justify-between overflow-hidden shadow-lg relative transition-colors",
          "bg-black text-white dark:bg-white dark:text-black"
        )}
      >
        {/* Month */}
        <div className="text-center text-md font-bold pt-3 tracking-widest z-10">
          {month}
        </div>

        {/* “Cut” Divider */}
        <div className="h-[7px] my-1 bg-transparent relative">
          <div
            className={cn(
              "absolute inset-0 rounded-full transition-colors",
              "bg-white dark:bg-black"
            )}
          />
        </div>

        {/* Day */}
        <div className="flex-1 flex items-center justify-center">
          <span className="text-7xl font-extrabold leading-none">{day}</span>
        </div>
      </div>

      {/* Label */}
      <p className="mt-3 text-sm text-muted-foreground font-medium">Next Meeting</p>
    </div>
  )
}
