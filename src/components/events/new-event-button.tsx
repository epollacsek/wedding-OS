'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { NewEventModal } from './new-event-modal'

export function NewEventButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group mt-5 flex w-full items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-[#1B1B1B]/15 bg-white/40 py-5 transition-all duration-300 hover:border-aroos-accent/50 hover:bg-white/70"
      >
        <div className="size-8 rounded-full border-2 border-[#1B1B1B]/25 flex items-center justify-center transition-colors group-hover:border-aroos-accent group-hover:text-aroos-accent text-[#1B1B1B]/30">
          <Plus className="size-4" />
        </div>
        <span className="text-[16px] font-semibold text-[#1B1B1B]/40 transition-colors group-hover:text-aroos-accent">
          New event
        </span>
      </button>

      <NewEventModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
