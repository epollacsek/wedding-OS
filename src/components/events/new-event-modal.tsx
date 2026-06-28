'use client'

import { useState, useEffect } from 'react'
import { ChevronRight, ChevronLeft, Check, Heart, Briefcase, Gift, Users } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'

const STEPS = [
  { label: 'What are we planning?', sub: 'Pick a category to get started' },
  { label: 'Meet Mary', sub: 'Your AI event organiser — she\'ll guide you through the setup' },
  { label: 'Your team', sub: 'People who help you manage it' },
  { label: 'Budget & comms', sub: 'Finance baseline and guest communication' },
]

const EVENT_TYPES = [
  {
    value: 'Wedding',
    icon: Heart,
    label: 'Wedding',
    sub: 'Ceremony, reception and everything in between',
    accent: '#CBBDEA',
    iconColor: '#7C67C8',
  },
  {
    value: 'Corporate',
    icon: Briefcase,
    label: 'Corporate',
    sub: 'Conferences, retreats and company events',
    accent: '#A9C2C8',
    iconColor: '#0E4A83',
  },
  {
    value: 'Birthday',
    icon: Gift,
    label: 'Birthday',
    sub: 'Milestone celebrations and surprise parties',
    accent: '#FFD6A5',
    iconColor: '#C47A2A',
  },
  {
    value: 'Social',
    icon: Users,
    label: 'Social',
    sub: 'Dinners, gatherings and private occasions',
    accent: '#B5EAD7',
    iconColor: '#1A7A55',
  },
]

const INPUT = 'h-12 w-full rounded-lg border border-[#1B1B1B]/15 bg-[#FAFAFA] px-4 text-[17px] text-[#1B1B1B] outline-none placeholder:text-[#1B1B1B]/30 focus:border-aroos-accent focus:bg-white focus:ring-2 focus:ring-aroos-accent/15 transition-colors'
const COVER_COLOURS = ['#CBBDEA', '#A9C2C8', '#FFD6A5', '#B5EAD7', '#FF9AA2', '#2F2B25']

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <p className="text-[16px] font-semibold text-[#1B1B1B]">{label}</p>
        {hint && <p className="text-[14px] text-[#1B1B1B]/45 mt-0.5">{hint}</p>}
      </div>
      {children}
    </div>
  )
}

function StepBasics() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-4 gap-4 p-2 -m-2">
        {EVENT_TYPES.map(({ value, icon: Icon, label, sub, accent, iconColor }) => {
          const active = selected === value
          return (
            <button
              key={value}
              type="button"
              onClick={() => setSelected(value)}
              style={active ? { backgroundColor: accent, borderColor: iconColor } : {}}
              className={`relative flex flex-col items-start gap-4 rounded-2xl p-5 text-left transition-all duration-200 ${
                active
                  ? 'border-2 shadow-[0_8px_32px_rgba(27,27,27,0.14)]'
                  : 'border border-[#1B1B1B]/08 bg-white hover:border-[#1B1B1B]/15 hover:shadow-[0_2px_12px_rgba(27,27,27,0.06)]'
              }`}
            >
              {active && (
                <div className="absolute top-3 right-3 size-5 rounded-full flex items-center justify-center" style={{ backgroundColor: iconColor }}>
                  <Check className="size-3 text-white" />
                </div>
              )}
              <div
                className="size-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: active ? 'rgba(255,255,255,0.4)' : accent }}
              >
                <Icon className="size-5" style={{ color: iconColor }} />
              </div>
              <div>
                <p className="text-[17px] font-semibold text-[#1B1B1B]">{label}</p>
                <p className="mt-1 text-[14px] leading-snug" style={{ color: active ? iconColor : 'rgba(27,27,27,0.45)' }}>{sub}</p>
              </div>
            </button>
          )
        })}
      </div>

      {selected && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Field label="How should we call your event?">
            <input
              type="text"
              autoFocus
              placeholder={selected === 'Wedding' ? "Eduardo & Ana's Wedding" : selected === 'Corporate' ? 'Aroos Company Retreat' : selected === 'Birthday' ? "Ana's 30th" : 'Summer Dinner Party'}
              className={INPUT}
            />
          </Field>
        </div>
      )}
    </div>
  )
}

const MARY_AVATAR = (
  <div className="size-10 rounded-full bg-gradient-to-br from-[#CBBDEA] to-[#7C67C8] flex items-center justify-center shrink-0 shadow-sm">
    <span className="text-white text-[13px] font-bold">M</span>
  </div>
)

function MaryBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-end gap-3 animate-in fade-in slide-in-from-bottom-3 duration-500">
      {MARY_AVATAR}
      <div className="rounded-2xl rounded-bl-sm bg-white border border-[#1B1B1B]/08 px-5 py-4 max-w-[70%] shadow-sm">
        <p className="text-[17px] text-[#1B1B1B] leading-relaxed">{children}</p>
      </div>
    </div>
  )
}

function UserReply({ label }: { label: string }) {
  return (
    <div className="flex justify-end animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="rounded-2xl rounded-br-sm bg-[#1B1B1B] px-5 py-4 max-w-[70%] shadow-sm">
        <p className="text-[17px] text-white font-medium">{label}</p>
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-3 animate-in fade-in duration-300">
      {MARY_AVATAR}
      <div className="rounded-2xl rounded-bl-sm bg-white border border-[#1B1B1B]/08 px-5 py-4 shadow-sm">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map(i => (
            <div key={i} className="size-2.5 rounded-full bg-[#CBBDEA]"
              style={{ animation: `maryBounce 1.2s ease-in-out ${i * 0.18}s infinite` }} />
          ))}
        </div>
      </div>
    </div>
  )
}

function YesNo({ onYes, onNo, yesLabel = 'Yes', noLabel = 'Not yet' }: {
  onYes: () => void; onNo: () => void; yesLabel?: string; noLabel?: string
}) {
  return (
    <div className="flex justify-end gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300 pl-12">
      <button type="button" onClick={onNo}
        className="h-11 rounded-full border border-[#1B1B1B]/15 bg-white px-6 text-[16px] font-medium text-[#1B1B1B] hover:bg-[#1B1B1B]/[0.04] transition-all">
        {noLabel}
      </button>
      <button type="button" onClick={onYes}
        className="h-11 rounded-full bg-[#1B1B1B] px-6 text-[16px] font-semibold text-white hover:bg-[#333] transition-colors">
        {yesLabel}
      </button>
    </div>
  )
}

type Phase = 'intro' | 'intro2' | 'intro3_typing' | 'q1' | 'q1_replied' | 'q1_typing' | 'q2' | 'q2_date' | 'q2_replied' | 'q2_typing' | 'q3' | 'q3_venue' | 'q3_replied' | 'q3_typing' | 'q4'

function StepIdentity({ userName }: { userName: string }) {
  const [phase, setPhase] = useState<Phase>('intro')
  const [dateReply, setDateReply] = useState('')
  const [venueReply, setVenueReply] = useState('')

  const firstName = userName === 'there' ? '' : `, ${userName}`

  useEffect(() => {
    if (phase === 'intro') setTimeout(() => setPhase('intro2'), 900)
    if (phase === 'intro2') setTimeout(() => setPhase('intro3_typing'), 1400)
    if (phase === 'intro3_typing') setTimeout(() => setPhase('q1'), 1000)
  }, [phase])

  function after(ms: number, next: Phase) { setTimeout(() => setPhase(next), ms) }

  function handleDate(answer: 'yes' | 'no') {
    setDateReply(answer === 'yes' ? 'Yes, we have a date!' : 'Not yet')
    setPhase('q1_replied')
    after(800, 'q1_typing')
    after(1700, answer === 'yes' ? 'q2_date' : 'q2')
  }

  function handleVenue(answer: 'yes' | 'no') {
    setVenueReply(answer === 'yes' ? 'Yes, we have a venue!' : 'Not yet')
    setPhase('q2_replied')
    after(800, 'q2_typing')
    after(1700, answer === 'yes' ? 'q3_venue' : 'q3')
  }

  const order: Phase[] = ['intro','intro2','intro3_typing','q1','q1_replied','q1_typing','q2','q2_date','q2_replied','q2_typing','q3','q3_venue','q3_replied','q3_typing','q4']
  const show = (p: Phase) => order.indexOf(phase) >= order.indexOf(p)

  return (
    <div className="flex flex-col gap-5 py-2 px-2 rounded-2xl" style={{ background: 'linear-gradient(180deg, #FAF9FF 0%, #F5F3FF 100%)' }}>
      <style>{`@keyframes maryBounce { 0%,100%{transform:translateY(0);opacity:.5} 50%{transform:translateY(-6px);opacity:1} }`}</style>

      {/* Intro */}
      {show('intro') && <MaryBubble>Hi{firstName}! 👋 I'm Mary, your personal event organiser.</MaryBubble>}
      {show('intro2') && <MaryBubble>I'll ask you a few quick questions so we can get your event set up properly. It'll only take a minute.</MaryBubble>}
      {phase === 'intro3_typing' && <TypingIndicator />}

      {/* Q1 — Date */}
      {show('q1') && <MaryBubble>First — do you already have a date set for your event?</MaryBubble>}
      {phase === 'q1' && <YesNo onYes={() => handleDate('yes')} onNo={() => handleDate('no')} />}

      {dateReply && <UserReply label={dateReply} />}
      {phase === 'q1_typing' && <TypingIndicator />}

      {show('q2_date') && <MaryBubble>Wonderful! When is the big day?</MaryBubble>}
      {show('q2') && dateReply === 'Not yet' && <MaryBubble>No worries at all — you can add the date any time in Settings.</MaryBubble>}

      {show('q2_date') && (
        <div className="flex gap-4 ml-13 animate-in fade-in slide-in-from-bottom-2 duration-400">
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-[14px] font-semibold text-[#1B1B1B]/55">Ceremony date</label>
            <input type="date" className={INPUT} />
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-[14px] font-semibold text-[#1B1B1B]/55">Reception date <span className="font-normal text-[#1B1B1B]/30">(if different)</span></label>
            <input type="date" className={INPUT} />
          </div>
        </div>
      )}

      {/* Q2 — Venue */}
      {show('q2') && <MaryBubble>Now — do you have a venue in mind?</MaryBubble>}
      {(phase === 'q2' || phase === 'q2_date') && <YesNo onYes={() => handleVenue('yes')} onNo={() => handleVenue('no')} />}

      {venueReply && <UserReply label={venueReply} />}
      {phase === 'q2_typing' && <TypingIndicator />}

      {show('q3_venue') && <MaryBubble>Perfect — where is it?</MaryBubble>}
      {show('q3') && venueReply === 'Not yet' && <MaryBubble>That's completely fine — we'll leave a spot in Settings for when you're ready.</MaryBubble>}

      {show('q3_venue') && (
        <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-400">
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-[14px] font-semibold text-[#1B1B1B]/55">Ceremony venue</label>
            <input type="text" placeholder="Church of the Holy Cross, Lisbon" className={INPUT} />
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-[14px] font-semibold text-[#1B1B1B]/55">Reception venue <span className="font-normal text-[#1B1B1B]/30">(if different)</span></label>
            <input type="text" placeholder="Palácio de Queluz" className={INPUT} />
          </div>
        </div>
      )}

      {/* Q3 — Guest count */}
      {show('q3') && <MaryBubble>Last one, I promise — roughly how many guests are you expecting?</MaryBubble>}
      {show('q3') && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-400">
          <input type="number" min={0} placeholder="e.g. 180" className={`${INPUT} max-w-[220px]`} />
        </div>
      )}
    </div>
  )
}

function StepTeam() {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-[14px] text-[#1B1B1B]/50">Invite people to help manage this event. They'll receive an email to join.</p>
      {[
        { role: 'Co-host', hint: 'Full admin access', placeholder: 'email@example.com' },
        { role: 'Wedding planner', hint: 'Can edit everything except billing', placeholder: 'planner@agency.com' },
        { role: 'MOH / Best Man', hint: 'Can manage guests and communications', placeholder: 'moh@example.com' },
      ].map(({ role, hint, placeholder }) => (
        <div key={role} className="flex flex-col gap-2">
          <div>
            <p className="text-[14px] font-semibold text-[#1B1B1B]">{role}</p>
            <p className="text-[13px] text-[#1B1B1B]/45">{hint}</p>
          </div>
          <input type="email" placeholder={placeholder} className={INPUT} />
        </div>
      ))}
      <p className="text-[13px] text-[#1B1B1B]/35 pt-1">You can add more team members later in Settings.</p>
    </div>
  )
}

function StepBudgetComms() {
  return (
    <div className="flex flex-col gap-6">
      <Field label="Total budget">
        <div className="flex items-center gap-2">
          <select className={`${INPUT} w-[90px] shrink-0`}>
            <option>EUR</option>
            <option>USD</option>
            <option>GBP</option>
            <option>BRL</option>
          </select>
          <input type="number" min={0} placeholder="50 000" className={INPUT} />
        </div>
      </Field>
      <Field label="RSVP deadline">
        <input type="date" className={`${INPUT} max-w-[220px]`} />
      </Field>
      <Field label="Default language for guest communications">
        <select className={`${INPUT} max-w-[280px]`}>
          <option>English</option>
          <option>Portuguese</option>
          <option>Spanish</option>
          <option>French</option>
          <option>Italian</option>
        </select>
      </Field>
      <Field label="Notification channels">
        <div className="flex flex-col gap-2 mt-1">
          {[
            { label: 'Email', sub: 'RSVP confirmations and reminders by email' },
            { label: 'WhatsApp', sub: 'Updates and reminders via WhatsApp' },
          ].map(({ label, sub }) => (
            <label key={label} className="flex cursor-pointer items-center justify-between rounded-xl border border-[#1B1B1B]/10 bg-[#FAFAFA] px-4 py-3 hover:bg-white transition-colors">
              <div>
                <p className="text-[14px] font-medium text-[#1B1B1B]">{label}</p>
                <p className="text-[13px] text-[#1B1B1B]/45">{sub}</p>
              </div>
              <input type="checkbox" defaultChecked className="size-5 cursor-pointer accent-aroos-accent" />
            </label>
          ))}
        </div>
      </Field>
    </div>
  )
}

export function NewEventModal({ open, onClose, userName = 'there' }: { open: boolean; onClose: () => void; userName?: string }) {
  const [step, setStep] = useState(0)
  const isLast = step === STEPS.length - 1
  const STEP_CONTENT = [StepBasics, () => <StepIdentity userName={userName} />, StepTeam, StepBudgetComms]
  const StepComponent = STEP_CONTENT[step]

  function handleClose() {
    setStep(0)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={v => { if (!v) handleClose() }}>
      <DialogContent className="w-[90vw] sm:max-w-[1200px] p-0 gap-0 rounded-2xl overflow-hidden flex flex-col">
        <DialogTitle className="sr-only">Create new event</DialogTitle>

        {/* Header */}
        <div className="flex items-start justify-between px-8 pt-7 pb-5">
          <div>
            <p className="text-[14px] font-medium text-[#1B1B1B]/40 mb-1">Step {step + 1} of {STEPS.length}</p>
            <h2 className="text-[30px] font-bold leading-tight text-[#1B1B1B]">{STEPS[step].label}</h2>
            <p className="text-[16px] text-[#1B1B1B]/50 mt-1">{STEPS[step].sub}</p>
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex items-center gap-2 px-8 pb-6">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i < step ? 'bg-aroos-accent w-6' :
                i === step ? 'bg-aroos-accent w-10' :
                'bg-[#1B1B1B]/12 w-6'
              }`}
            />
          ))}
        </div>

        {/* Body */}
        <div className="px-8 pb-6 max-h-[55vh] overflow-y-auto">
          <StepComponent />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-[#1B1B1B]/08 px-8 py-5">
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
