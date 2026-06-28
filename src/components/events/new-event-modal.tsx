'use client'

import { useState } from 'react'
import { X, ChevronRight, ChevronLeft } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'

const STEPS = ['Basics', 'Identity', 'Team', 'Budget & Comms']

const INPUT = 'h-11 w-full rounded-lg border border-[#1B1B1B]/15 bg-white px-4 text-[15px] text-[#1B1B1B] outline-none placeholder:text-[#1B1B1B]/35 focus:border-aroos-accent focus:ring-2 focus:ring-aroos-accent/15'
const COVER_COLOURS = ['#CBBDEA', '#A9C2C8', '#FFD6A5', '#B5EAD7', '#FF9AA2', '#2F2B25']

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[15px] font-medium text-[#1B1B1B]">{label}</label>
      {hint && <p className="text-[13px] text-[#1B1B1B]/50">{hint}</p>}
      {children}
    </div>
  )
}

function StepBasics() {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Event name">
          <input type="text" placeholder="Eduardo & Ana's Wedding" className={INPUT} />
        </Field>
        <Field label="Event type">
          <select className={INPUT}>
            <option value="">Select type</option>
            <option>Wedding</option>
            <option>Corporate</option>
            <option>Birthday</option>
            <option>Other</option>
          </select>
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Ceremony date">
          <input type="date" className={INPUT} />
        </Field>
        <Field label="Reception date" hint="Leave empty if same day">
          <input type="date" className={INPUT} />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Ceremony venue">
          <input type="text" placeholder="Church of the Holy Cross" className={INPUT} />
        </Field>
        <Field label="Reception venue" hint="Leave empty if same">
          <input type="text" placeholder="Palácio de Queluz" className={INPUT} />
        </Field>
      </div>
      <Field label="Expected guest count">
        <input type="number" min={0} placeholder="180" className={`${INPUT} max-w-[160px]`} />
      </Field>
    </div>
  )
}

function StepIdentity() {
  const [selected, setSelected] = useState(COVER_COLOURS[0])
  return (
    <div className="flex flex-col gap-5">
      <Field label="Cover colour" hint="Used on the event card and your wedding website header">
        <div className="flex items-center gap-3">
          {COVER_COLOURS.map(c => (
            <button
              key={c}
              type="button"
              onClick={() => setSelected(c)}
              className="size-9 rounded-full border-2 transition-transform hover:scale-110"
              style={{ backgroundColor: c, borderColor: selected === c ? '#1B1B1B' : 'white', boxShadow: '0 2px 6px rgba(0,0,0,0.12)' }}
            />
          ))}
          <input type="color" className="size-9 cursor-pointer rounded-full border border-[#1B1B1B]/15 bg-transparent p-0.5" title="Custom colour" />
        </div>
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Host 1 name">
          <input type="text" placeholder="Eduardo" className={INPUT} />
        </Field>
        <Field label="Host 2 name" hint="Leave empty for solo events">
          <input type="text" placeholder="Ana" className={INPUT} />
        </Field>
      </div>
      <Field label="Tagline" hint="Short line shown on your wedding website">
        <input type="text" placeholder="Together at last." className={INPUT} />
      </Field>
    </div>
  )
}

function StepTeam() {
  return (
    <div className="flex flex-col gap-4">
      {[
        { role: 'Co-host', hint: 'Full admin access', placeholder: 'ana@example.com' },
        { role: 'Wedding planner', hint: 'Can edit everything except billing', placeholder: 'planner@agency.com' },
        { role: 'MOH / Best Man', hint: 'Can manage guests and communications', placeholder: 'moh@example.com' },
      ].map(({ role, hint, placeholder }) => (
        <div key={role} className="flex items-start gap-4">
          <div className="w-[160px] shrink-0 pt-1">
            <p className="text-[15px] font-medium text-[#1B1B1B]">{role}</p>
            <p className="text-[13px] text-[#1B1B1B]/50">{hint}</p>
          </div>
          <input type="email" placeholder={placeholder} className={`${INPUT} flex-1`} />
        </div>
      ))}
      <p className="mt-2 text-[13px] text-[#1B1B1B]/40">You can add more team members later in Settings.</p>
    </div>
  )
}

function StepBudgetComms() {
  return (
    <div className="flex flex-col gap-5">
      <Field label="Total budget">
        <div className="flex items-center gap-2">
          <select className={`${INPUT} w-[90px] shrink-0`}>
            <option>EUR</option>
            <option>USD</option>
            <option>GBP</option>
            <option>BRL</option>
          </select>
          <input type="number" min={0} placeholder="50 000" className={`${INPUT} flex-1`} />
        </div>
      </Field>
      <Field label="RSVP deadline">
        <input type="date" className={`${INPUT} max-w-[220px]`} />
      </Field>
      <Field label="Default language for guest comms">
        <select className={`${INPUT} max-w-[260px]`}>
          <option>English</option>
          <option>Portuguese</option>
          <option>Spanish</option>
          <option>French</option>
          <option>Italian</option>
        </select>
      </Field>
      <div className="flex flex-col gap-3">
        <p className="text-[15px] font-medium text-[#1B1B1B]">Notification channels</p>
        {[
          { label: 'Email', sub: 'Send RSVP confirmations and reminders by email' },
          { label: 'WhatsApp', sub: 'Send updates and reminders via WhatsApp' },
        ].map(({ label, sub }) => (
          <label key={label} className="flex cursor-pointer items-center justify-between rounded-xl border border-[#1B1B1B]/10 bg-[#FAFAFA] px-4 py-3">
            <div>
              <p className="text-[15px] font-medium text-[#1B1B1B]">{label}</p>
              <p className="text-[13px] text-[#1B1B1B]/50">{sub}</p>
            </div>
            <input type="checkbox" defaultChecked className="size-5 cursor-pointer accent-aroos-accent" />
          </label>
        ))}
      </div>
    </div>
  )
}

const STEP_CONTENT = [StepBasics, StepIdentity, StepTeam, StepBudgetComms]

export function NewEventModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0)
  const isLast = step === STEPS.length - 1
  const StepComponent = STEP_CONTENT[step]

  function handleClose() {
    setStep(0)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={v => { if (!v) handleClose() }}>
      <DialogContent className="max-w-[640px] gap-0 p-0 overflow-hidden rounded-2xl">
        <DialogTitle className="sr-only">Create new event</DialogTitle>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1B1B1B]/08 px-7 py-5">
          <div>
            <p className="text-[13px] font-medium text-[#1B1B1B]/50">Step {step + 1} of {STEPS.length}</p>
            <h2 className="text-[22px] font-semibold text-[#1B1B1B]">{STEPS[step]}</h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="size-9 flex items-center justify-center rounded-full hover:bg-[#1B1B1B]/[0.06] transition-colors text-[#1B1B1B]/50"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-[#1B1B1B]/08">
          <div
            className="h-full bg-aroos-accent transition-all duration-300"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        {/* Step indicators */}
        <div className="flex items-center gap-2 px-7 pt-5">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`flex size-6 items-center justify-center rounded-full text-[12px] font-semibold transition-colors ${i < step ? 'bg-aroos-accent text-white' : i === step ? 'bg-[#1B1B1B] text-white' : 'bg-[#1B1B1B]/10 text-[#1B1B1B]/40'}`}>
                {i < step ? '✓' : i + 1}
              </div>
              <span className={`text-[13px] transition-colors ${i === step ? 'font-medium text-[#1B1B1B]' : 'text-[#1B1B1B]/40'}`}>{s}</span>
              {i < STEPS.length - 1 && <ChevronRight className="size-3.5 text-[#1B1B1B]/25 mx-1" />}
            </div>
          ))}
        </div>

        {/* Body */}
        <div className="px-7 py-6 max-h-[60vh] overflow-y-auto">
          <StepComponent />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-[#1B1B1B]/08 px-7 py-5">
          <button
            type="button"
            onClick={() => step === 0 ? handleClose() : setStep(s => s - 1)}
            className="flex items-center gap-1.5 h-10 rounded-full border border-[#1B1B1B]/15 px-5 text-[14px] font-medium text-[#1B1B1B] transition-colors hover:bg-[#1B1B1B]/[0.05]"
          >
            <ChevronLeft className="size-4" />
            {step === 0 ? 'Cancel' : 'Back'}
          </button>

          <button
            type="button"
            onClick={() => isLast ? handleClose() : setStep(s => s + 1)}
            className="flex items-center gap-1.5 h-10 rounded-full bg-aroos-accent px-6 text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
          >
            {isLast ? 'Create event' : 'Next'}
            {!isLast && <ChevronRight className="size-4" />}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
