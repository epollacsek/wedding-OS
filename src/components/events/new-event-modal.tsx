'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronRight, ChevronLeft, Check, Heart, Briefcase, Gift, Users, X } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Calendar } from '@/components/ui/calendar'
import { getAllTimezones, searchTimezones, type TzEntry } from '@/lib/timezones'

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  )
}

function OutlookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="2" y="4" width="13" height="16" rx="1.5" fill="#0364B8" />
      <path fill="#0A2767" d="M2 7.5h13v9H2z" />
      <path fill="#28A8EA" d="M22 6.5v11c0 .55-.45 1-1 1h-6.5v-13H21c.55 0 1 .45 1 1z" />
      <circle cx="8.5" cy="12" r="3.2" fill="#fff" />
      <circle cx="8.5" cy="12" r="2.1" fill="#0364B8" />
    </svg>
  )
}

const STEPS = [
  { label: 'What are we planning?', sub: 'Pick a category to get started' },
  { label: 'Meet Mary', sub: 'Your AI event organizer - she\'ll guide you through the setup' },
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

type Phase =
  | 'intro' | 'intro2' | 'intro_typing' | 'q1'
  | 'q1_yes' | 'q1_no'
  | 'q1_confirmed' | 'q1_typing' | 'q2'
  | 'q2_connecting' | 'q2_connected' | 'q2_skipped' | 'done'

function ConfirmButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex justify-end animate-in fade-in duration-300">
      <button type="button" onClick={onClick}
        className="h-11 rounded-full bg-[#1B1B1B] px-7 text-[16px] font-semibold text-white hover:bg-[#333] transition-colors">
        Confirm →
      </button>
    </div>
  )
}

type StepIdentityProps = {
  userName: string
  selectedTz: TzEntry
  setSelectedTz: (t: TzEntry) => void
  tzConfirmed: boolean
  setTzConfirmed: (v: boolean) => void
  tzOpen: boolean
  setTzOpen: (v: boolean) => void
  tzSearch: string
  setTzSearch: (v: string) => void
  onCalendarOpen: () => void
  pillRef: React.RefObject<HTMLButtonElement>
}

function StepIdentity({ userName, selectedTz, setSelectedTz, tzConfirmed, setTzConfirmed, tzOpen, setTzOpen, tzSearch, setTzSearch, onCalendarOpen, pillRef }: StepIdentityProps) {
  const [phase, setPhase] = useState<Phase>('intro')
  const [date, setDate] = useState<{ from?: Date; to?: Date } | undefined>(undefined)
  const [startMinutes, setStartMinutes] = useState(600)
  const [endMinutes, setEndMinutes] = useState(1320)
  const [calendarProvider, setCalendarProvider] = useState<'google' | 'outlook' | null>(null)

  const firstName = userName === 'there' ? '' : `, ${userName}`

  useEffect(() => {
    if (phase === 'intro') setTimeout(() => setPhase('intro2'), 900)
    if (phase === 'intro2') setTimeout(() => setPhase('intro_typing'), 1400)
    if (phase === 'intro_typing') setTimeout(() => setPhase('q1'), 1000)
    if (phase === 'q1_yes') onCalendarOpen()
  }, [phase])

  function after(ms: number, next: Phase) { setTimeout(() => setPhase(next), ms) }

  function confirmDate() {
    setPhase('q1_confirmed')
    after(700, 'q1_typing')
    after(1600, 'q2')
  }

  // TODO: swap this simulated connect for real OAuth once Google/Microsoft
  // apps are registered (see GoogleCalendarConnect / OutlookConnect below).
  function connectCalendar(provider: 'google' | 'outlook') {
    setCalendarProvider(provider)
    setPhase('q2_connecting')
    after(1300, 'q2_connected')
    after(2300, 'done')
  }

  function skipCalendar() {
    setPhase('q2_skipped')
    after(900, 'done')
  }

  const order: Phase[] = [
    'intro','intro2','intro_typing','q1',
    'q1_yes','q1_no','q1_confirmed','q1_typing','q2',
    'q2_connecting','q2_connected','q2_skipped','done'
  ]
  const show = (p: Phase) => order.indexOf(phase) >= order.indexOf(p)
  const isPhase = (...ps: Phase[]) => ps.includes(phase)

  const bottomRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [phase, date])

  return (
    <div className="flex flex-col gap-5 p-4 rounded-2xl" style={{ background: 'linear-gradient(180deg, #FAF9FF 0%, #F5F3FF 100%)' }}>
      <style>{`@keyframes maryBounce { 0%,100%{transform:translateY(0);opacity:.5} 50%{transform:translateY(-6px);opacity:1} }`}</style>

      {/* Intro */}
      {show('intro') && <MaryBubble>Hi{firstName}! 👋 I'm Mary, your personal event organizer.</MaryBubble>}
      {show('intro2') && <MaryBubble>I'll ask you a few quick questions to get your event set up. It'll only take a minute.</MaryBubble>}
      {phase === 'intro_typing' && <TypingIndicator />}

      {/* Q1 — Date */}
      {show('q1') && <MaryBubble>First, do you already have a date set for your event?</MaryBubble>}
      {isPhase('q1') && (
        <YesNo
          onYes={() => setPhase('q1_yes')}
          onNo={() => { setPhase('q1_no'); after(700, 'q1_typing'); after(1600, 'q2') }}
        />
      )}

      {/* Yes path — date + time picker */}
      {phase === 'q1_yes' && (
        <>
          <UserReply label="Yes, we have a date!" />
          <MaryBubble>Wonderful! Pick the date and time below.</MaryBubble>
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 rounded-2xl bg-white border border-[#1B1B1B]/08 shadow-sm overflow-hidden">

            {/* Summary bar */}
            <div className="flex items-center justify-between border-b border-[#1B1B1B]/08 bg-[#FAFAFA] px-5 py-3">
              {date?.from ? (
                <div className="flex items-center gap-3">
                  <span className="text-[15px] font-semibold text-[#1B1B1B]">
                    {date.from.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    {date.to && date.to.getTime() !== date.from.getTime() && (
                      <> - {date.to.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</>
                    )}
                  </span>
                  <span className="text-[#1B1B1B]/30">·</span>
                  <span className="text-[15px] text-[#1B1B1B]/60">
                    {(() => {
                      const fmt = (m: number) => { const h = Math.floor(m/60); const min = m%60; const ap = h>=12?'PM':'AM'; return `${h%12||12}:${min.toString().padStart(2,'0')} ${ap}` }
                      return `${fmt(startMinutes)} - ${fmt(endMinutes)}`
                    })()}
                  </span>
                  <button type="button" onClick={() => setDate(undefined)} className="ml-2 size-5 rounded-full bg-[#1B1B1B]/10 flex items-center justify-center hover:bg-[#1B1B1B]/20 transition-colors">
                    <X className="size-3 text-[#1B1B1B]/60" />
                  </button>
                </div>
              ) : (
                <span className="text-[15px] text-[#1B1B1B]/35">Select a date range on the calendar</span>
              )}

              {/* Timezone */}
              <div className="relative shrink-0 ml-3">

                {/* Pill */}
                <button
                  ref={pillRef}
                  type="button"
                  onClick={() => { setTzOpen(v => !v); setTzSearch('') }}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-medium transition-all ${
                    tzConfirmed
                      ? 'bg-[#F0FDF4] text-green-700 border border-green-200'
                      : 'bg-[#1B1B1B]/06 text-[#1B1B1B]/60 border border-[#1B1B1B]/10 hover:border-[#1B1B1B]/20'
                  }`}
                >
                  {tzConfirmed
                    ? <><Check className="size-3 text-green-600" /> {selectedTz.offset} · {selectedTz.aliases[0] ?? selectedTz.city}</>
                    : <>{selectedTz.offset} · {selectedTz.aliases[0] ?? selectedTz.city}</>
                  }
                </button>

                {/* Search dropdown */}
                {tzOpen && (
                  <div className="absolute right-0 top-full mt-2 z-50 w-[380px] rounded-2xl border border-[#1B1B1B]/10 bg-white shadow-[0_16px_48px_rgba(27,27,27,0.18)] overflow-hidden">
                    <div className="p-3 border-b border-[#1B1B1B]/08">
                      <input
                        autoFocus
                        type="text"
                        value={tzSearch}
                        onChange={e => setTzSearch(e.target.value)}
                        placeholder="Search by city, e.g. Rio de Janeiro, London, Dubai"
                        className="w-full rounded-lg border border-[#1B1B1B]/12 bg-[#FAFAFA] px-3 py-2 text-[14px] outline-none focus:border-aroos-accent focus:ring-2 focus:ring-aroos-accent/15"
                      />
                    </div>
                    <div className="max-h-[260px] overflow-y-auto">
                      {searchTimezones(tzSearch).map(t => (
                        <button
                          key={t.tz}
                          type="button"
                          onClick={() => { setSelectedTz(t); setTzConfirmed(true); setTzOpen(false); setTzSearch('') }}
                          className={`w-full flex items-start justify-between gap-3 px-4 py-3 text-left hover:bg-[#F5F3FF] transition-colors border-b border-[#1B1B1B]/05 last:border-0 ${t.tz === selectedTz.tz ? 'bg-aroos-accent/[0.05]' : ''}`}
                        >
                          <div className="min-w-0">
                            <p className="text-[14px] font-medium text-[#1B1B1B] leading-tight">{t.city}</p>
                            <p className="text-[12px] text-[#1B1B1B]/40 mt-0.5 truncate">{t.aliases.slice(0, 5).join(', ') || t.region}</p>
                          </div>
                          <span className="text-[12px] font-mono font-semibold text-[#1B1B1B]/50 shrink-0 mt-0.5">{t.offset}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex">
            {/* Calendar — takes most of the space */}
            <div className="flex-[7] min-w-0">
              <Calendar
                mode="range"
                selected={date}
                onSelect={setDate}
                disabled={{ before: new Date() }}
                numberOfMonths={2}
                showOutsideDays={false}
                className="p-5 w-full"
              />
            </div>

            {/* Time picker — right panel */}
            <div className="flex-[3] shrink-0 border-l border-[#1B1B1B]/08 p-6 flex flex-col gap-8 justify-center">
              {[
                { label: 'Starts at', value: startMinutes, onChange: setStartMinutes },
                { label: 'Ends at', value: endMinutes, onChange: (v: number) => setEndMinutes(Math.max(v, startMinutes + 30)) },
              ].map(({ label, value, onChange }) => {
                const h = Math.floor(value / 60)
                const m = value % 60
                const ampm = h >= 12 ? 'PM' : 'AM'
                const h12 = h % 12 === 0 ? 12 : h % 12
                const formatted = `${h12}:${m.toString().padStart(2, '0')} ${ampm}`
                return (
                  <div key={label} className="flex flex-col gap-3">
                    <p className="text-[13px] font-semibold text-[#1B1B1B]/50 uppercase tracking-wide">{label}</p>
                    <p className="text-[28px] font-bold text-[#1B1B1B] leading-none">{formatted}</p>
                    <input
                      type="range"
                      min={0}
                      max={1425}
                      step={15}
                      value={value}
                      onChange={e => onChange(Number(e.target.value))}
                      className="w-full accent-aroos-accent cursor-pointer"
                    />
                  </div>
                )
              })}
            </div>
            </div>{/* end flex row */}
          </div>{/* end outer container */}
          {date?.from && <ConfirmButton onClick={confirmDate} />}
        </>
      )}

      {/* No path */}
      {show('q1_no') && <UserReply label="Not yet" />}

      {/* After date confirmed */}
      {show('q1_confirmed') && phase !== 'q1_yes' && date?.from && (
        <UserReply label={
          date.to && date.to.getTime() !== date.from.getTime()
            ? `Dates confirmed for ${date.from.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })} - ${date.to.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`
            : `Dates confirmed for ${date.from.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`
        } />
      )}
      {isPhase('q1_typing') && <TypingIndicator />}

      {/* Q2 — Calendar sync */}
      {show('q2') && (
        <MaryBubble>
          One more thing - want to connect your calendar so deliverables and due dates sync automatically?
        </MaryBubble>
      )}

      {isPhase('q2') && (
        <div className="flex justify-end gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300 pl-12">
          <button type="button" onClick={skipCalendar}
            className="h-11 rounded-full border border-[#1B1B1B]/15 bg-white px-6 text-[16px] font-medium text-[#1B1B1B] hover:bg-[#1B1B1B]/[0.04] transition-all">
            Skip for now
          </button>
          <button type="button" onClick={() => connectCalendar('outlook')}
            className="h-11 flex items-center gap-2 rounded-full border border-[#1B1B1B]/15 bg-white px-5 text-[16px] font-medium text-[#1B1B1B] hover:bg-[#1B1B1B]/[0.04] transition-all">
            <OutlookIcon className="size-5" /> Outlook
          </button>
          <button type="button" onClick={() => connectCalendar('google')}
            className="h-11 flex items-center gap-2 rounded-full bg-[#1B1B1B] px-5 text-[16px] font-semibold text-white hover:bg-[#333] transition-colors">
            <GoogleIcon className="size-5" /> Google Calendar
          </button>
        </div>
      )}

      {isPhase('q2_skipped') && <UserReply label="Skip for now" />}

      {(isPhase('q2_connecting') || show('q2_connected')) && (
        <UserReply label={`Connect ${calendarProvider === 'google' ? 'Google Calendar' : 'Outlook'}`} />
      )}
      {isPhase('q2_connecting') && <TypingIndicator />}
      {show('q2_connected') && !isPhase('q2_connecting') && (
        <MaryBubble>
          {calendarProvider === 'google' ? 'Google Calendar' : 'Outlook'} connected! Deliverables and due dates will sync automatically. ✅
        </MaryBubble>
      )}

      {show('done') && (
        <MaryBubble>
          Let's move to the next part of setting things up.
        </MaryBubble>
      )}

      <div ref={bottomRef} />
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

  // Timezone state lives here so popup can escape overflow:hidden
  const allTz = getAllTimezones()
  const detectedEntry = allTz.find(t => t.tz === Intl.DateTimeFormat().resolvedOptions().timeZone)
    ?? allTz.find(t => t.offsetMinutes === -new Date().getTimezoneOffset())
    ?? allTz[0]
  const [selectedTz, setSelectedTz] = useState<TzEntry>(detectedEntry)
  const [tzConfirmed, setTzConfirmed] = useState(false)
  const [tzPopupVisible, setTzPopupVisible] = useState(false)
  const [tzOpen, setTzOpen] = useState(false)
  const [tzSearch, setTzSearch] = useState('')
  const [pillPos, setPillPos] = useState<{ top: number; right: number } | null>(null)
  const pillRef = useRef<HTMLButtonElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const measureAndShow = () => {
    setTimeout(() => {
      setTzPopupVisible(true)
      // Re-measure after state update so pill is in DOM
      setTimeout(() => {
        if (pillRef.current && modalRef.current) {
          const pill = pillRef.current.getBoundingClientRect()
          const modal = modalRef.current.getBoundingClientRect()
          setPillPos({
            top: pill.bottom - modal.top + 10,
            right: modal.right - pill.right
          })
        }
      }, 50)
    }, 800)
  }

  const tzProps = {
    selectedTz, setSelectedTz, tzConfirmed, setTzConfirmed,
    tzOpen, setTzOpen, tzSearch, setTzSearch, pillRef,
    onCalendarOpen: measureAndShow
  }

  function handleClose() {
    setStep(0)
    setTzPopupVisible(false)
    setTzConfirmed(false)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={v => { if (!v) handleClose() }}>
      <DialogContent ref={modalRef} className="w-[90vw] sm:max-w-[1200px] p-0 gap-0 rounded-2xl overflow-hidden flex flex-col">
        <DialogTitle className="sr-only">Create new event</DialogTitle>

        {/* Timezone callout — anchored just below the pill */}
        {tzPopupVisible && !tzConfirmed && step === 1 && pillPos && (
          <div className="absolute z-[100] w-[260px] animate-in fade-in slide-in-from-top-2 duration-300"
            style={{ top: pillPos.top, right: pillPos.right }}>
            {/* Arrow pointing UP toward the pill */}
            <div className="absolute top-[-6px] right-6 size-3 bg-[#1B1B1B] rotate-45 rounded-sm" />
            <div className="rounded-2xl bg-[#1B1B1B] px-4 py-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.28)]">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="text-[13px] font-semibold text-white leading-snug">
                  We think you're in <span className="text-[#CBBDEA]">{selectedTz.aliases[0] ?? selectedTz.city}</span> ({selectedTz.offset})
                </p>
                <button type="button" onClick={() => setTzPopupVisible(false)} className="text-white/30 hover:text-white/60 shrink-0 mt-0.5">
                  <X className="size-3.5" />
                </button>
              </div>
              <p className="text-[12px] text-white/45 mb-3">Confirm or change below.</p>
              <div className="flex gap-2">
                <button type="button" onClick={() => { setTzConfirmed(true); setTzPopupVisible(false) }}
                  className="flex-1 h-7 rounded-lg bg-white text-[12px] font-semibold text-[#1B1B1B] hover:bg-white/90 transition-colors">
                  Confirm
                </button>
                <button type="button" onClick={() => { setTzPopupVisible(false); setTzOpen(true); setTzSearch('') }}
                  className="flex-1 h-7 rounded-lg bg-white/10 text-[12px] font-medium text-white hover:bg-white/20 transition-colors">
                  Change
                </button>
              </div>
            </div>
          </div>
        )}

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
          {step === 0 && <StepBasics />}
          {step === 1 && <StepIdentity userName={userName} {...tzProps} />}
          {step === 2 && <StepBudgetComms />}
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
