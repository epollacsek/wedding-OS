'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronRight, ChevronLeft, Check, Heart, Briefcase, Gift, Users, X } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Calendar } from '@/components/ui/calendar'

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

type Phase =
  | 'intro' | 'intro2' | 'intro_typing' | 'q1'
  | 'q1_yes' | 'q1_no'
  | 'q1_confirmed' | 'q1_typing' | 'q2'
  | 'q2_yes' | 'q2_no'
  | 'q2_confirmed' | 'q2_typing' | 'q3'
  | 'q3_answered'

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

function StepIdentity({ userName }: { userName: string }) {
  const [phase, setPhase] = useState<Phase>('intro')
  const [date, setDate] = useState<{ from?: Date; to?: Date } | undefined>(undefined)
  const [startMinutes, setStartMinutes] = useState(600)
  const [endMinutes, setEndMinutes] = useState(1320)
  const [venue, setVenue] = useState('')
  const [guests, setGuests] = useState('')
  const [timezone] = useState(() => Intl.DateTimeFormat().resolvedOptions().timeZone)
  const [tzOffset] = useState(() => {
    const offset = -new Date().getTimezoneOffset()
    const sign = offset >= 0 ? '+' : '-'
    const h = Math.floor(Math.abs(offset) / 60).toString().padStart(2, '0')
    const m = (Math.abs(offset) % 60).toString().padStart(2, '0')
    return `GMT${sign}${h}:${m}`
  })
  const [tzOverride, setTzOverride] = useState('')
  const [tzConfirmed, setTzConfirmed] = useState(false)
  const [tzOpen, setTzOpen] = useState(false)
  const [tzSearch, setTzSearch] = useState('')
  const displayTz = tzOverride || timezone

  const allTimezones = (() => {
    const zones: string[] = (typeof Intl !== 'undefined' && 'supportedValuesOf' in Intl)
      ? (Intl as unknown as { supportedValuesOf: (k: string) => string[] }).supportedValuesOf('timeZone')
      : ['Africa/Abidjan','Africa/Accra','Africa/Cairo','Africa/Johannesburg','Africa/Lagos','Africa/Nairobi',
         'America/Anchorage','America/Bogota','America/Buenos_Aires','America/Chicago','America/Denver',
         'America/Halifax','America/Lima','America/Los_Angeles','America/Mexico_City','America/New_York',
         'America/Phoenix','America/Santiago','America/Sao_Paulo','America/Toronto','America/Vancouver',
         'Asia/Bangkok','Asia/Dubai','Asia/Hong_Kong','Asia/Jakarta','Asia/Karachi','Asia/Kolkata',
         'Asia/Kuala_Lumpur','Asia/Manila','Asia/Seoul','Asia/Shanghai','Asia/Singapore',
         'Asia/Taipei','Asia/Tehran','Asia/Tokyo','Atlantic/Azores','Australia/Adelaide',
         'Australia/Brisbane','Australia/Melbourne','Australia/Perth','Australia/Sydney',
         'Europe/Amsterdam','Europe/Athens','Europe/Berlin','Europe/Brussels','Europe/Bucharest',
         'Europe/Copenhagen','Europe/Dublin','Europe/Helsinki','Europe/Istanbul','Europe/Kiev',
         'Europe/Lisbon','Europe/London','Europe/Madrid','Europe/Moscow','Europe/Oslo',
         'Europe/Paris','Europe/Prague','Europe/Rome','Europe/Stockholm','Europe/Vienna',
         'Europe/Warsaw','Europe/Zurich','Pacific/Auckland','Pacific/Fiji','Pacific/Honolulu',
         'Pacific/Tahiti','UTC']

    return zones.map(tz => {
      try {
        const offsetMin = -new Date(new Date().toLocaleString('en-US', { timeZone: tz })).getTimezoneOffset?.() ??
          (() => { const d = new Date(); const utc = d.getTime() + d.getTimezoneOffset() * 60000; return Math.round((new Date(new Date(utc).toLocaleString('en-US', { timeZone: tz })).getTime() - utc) / 60000) })()
        const parts = new Intl.DateTimeFormat('en', { timeZone: tz, timeZoneName: 'shortOffset' }).formatToParts(new Date())
        const offset = parts.find(p => p.type === 'timeZoneName')?.value ?? 'GMT+0'
        const city = tz.split('/').pop()!.replace(/_/g, ' ')
        const region = tz.includes('/') ? tz.split('/')[0] : 'Other'
        return { tz, offset, city, region, offsetMin: 0, label: `${offset} — ${city}`, search: `${tz} ${city} ${offset}`.toLowerCase() }
      } catch { return null }
    }).filter(Boolean) as { tz: string; offset: string; city: string; region: string; offsetMin: number; label: string; search: string }[]
  })()

  const firstName = userName === 'there' ? '' : `, ${userName}`

  useEffect(() => {
    if (phase === 'intro') setTimeout(() => setPhase('intro2'), 900)
    if (phase === 'intro2') setTimeout(() => setPhase('intro_typing'), 1400)
    if (phase === 'intro_typing') setTimeout(() => setPhase('q1'), 1000)
  }, [phase])

  function after(ms: number, next: Phase) { setTimeout(() => setPhase(next), ms) }

  function confirmDate() {
    setPhase('q1_confirmed')
    after(700, 'q1_typing')
    after(1600, 'q2')
  }

  function confirmVenue() {
    setPhase('q2_confirmed')
    after(700, 'q2_typing')
    after(1600, 'q3')
  }

  const order: Phase[] = [
    'intro','intro2','intro_typing','q1',
    'q1_yes','q1_no','q1_confirmed','q1_typing','q2',
    'q2_yes','q2_no','q2_confirmed','q2_typing','q3','q3_answered'
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
      {show('intro') && <MaryBubble>Hi{firstName}! 👋 I'm Mary, your personal event organiser.</MaryBubble>}
      {show('intro2') && <MaryBubble>I'll ask you a few quick questions to get your event set up. It'll only take a minute.</MaryBubble>}
      {phase === 'intro_typing' && <TypingIndicator />}

      {/* Q1 — Date */}
      {show('q1') && <MaryBubble>First — do you already have a date set for your event?</MaryBubble>}
      {isPhase('q1') && (
        <YesNo
          onYes={() => setPhase('q1_yes')}
          onNo={() => { setPhase('q1_no'); after(700, 'q1_typing'); after(1600, 'q2') }}
        />
      )}

      {/* Yes path — date + time picker */}
      {show('q1_yes') && !show('q1_confirmed') && (
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
              <div className="relative shrink-0 ml-4">
                <button
                  type="button"
                  onClick={() => { setTzOpen(v => !v); setTzSearch('') }}
                  className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-medium transition-all ${
                    tzConfirmed
                      ? 'border border-[#1B1B1B]/12 bg-white text-[#1B1B1B]/70 hover:border-[#1B1B1B]/25'
                      : 'border-2 border-aroos-accent/60 bg-aroos-accent/[0.06] text-aroos-accent animate-pulse hover:animate-none'
                  }`}
                >
                  🌍
                  <span>{displayTz.split('/').pop()?.replace(/_/g, ' ')} ({tzOffset})</span>
                  {!tzConfirmed && <span className="text-[11px] font-semibold text-aroos-accent">· Confirm</span>}
                </button>

                {tzOpen && (
                  <div className="absolute right-0 top-full mt-2 z-50 w-[320px] rounded-2xl border border-[#1B1B1B]/10 bg-white shadow-[0_12px_40px_rgba(27,27,27,0.16)] overflow-hidden">
                    <div className="p-3 border-b border-[#1B1B1B]/08">
                      <input
                        autoFocus
                        type="text"
                        value={tzSearch}
                        onChange={e => setTzSearch(e.target.value)}
                        placeholder="Search city or timezone…"
                        className="w-full rounded-lg border border-[#1B1B1B]/12 bg-[#FAFAFA] px-3 py-2 text-[14px] outline-none focus:border-aroos-accent focus:ring-2 focus:ring-aroos-accent/15"
                      />
                    </div>
                    <div className="max-h-[240px] overflow-y-auto">
                      {allTimezones
                        .filter(t => !tzSearch || t.search.includes(tzSearch.toLowerCase()))
                        .slice(0, 80)
                        .map(t => (
                          <button
                            key={t.tz}
                            type="button"
                            onClick={() => { setTzOverride(t.tz); setTzConfirmed(true); setTzOpen(false) }}
                            className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-[#F5F3FF] transition-colors ${t.tz === displayTz ? 'bg-aroos-accent/[0.06]' : ''}`}
                          >
                            <span className="text-[14px] text-[#1B1B1B]">{t.city.replace(/_/g, ' ')}</span>
                            <span className="text-[13px] font-mono text-[#1B1B1B]/45 shrink-0 ml-3">{t.offset}</span>
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
      {show('q1_no') && !show('q1_yes') && <UserReply label="Not yet" />}

      {/* After date confirmed */}
      {show('q1_confirmed') && phase !== 'q1_yes' && date?.from && (
        <UserReply label={
          date.to && date.to.getTime() !== date.from.getTime()
            ? `${date.from.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} → ${date.to.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`
            : date.from.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
        } />
      )}
      {isPhase('q1_typing') && <TypingIndicator />}
      {show('q2') && (phase === 'q1_typing' || show('q2')) && !show('q1_yes') && (
        <MaryBubble>
          {date?.from ? 'Got it — noted! Now, do you have a venue in mind?' : 'No worries at all — you can set the date in Settings any time. Do you have a venue in mind?'}
        </MaryBubble>
      )}

      {/* Q2 — Venue */}
      {isPhase('q2') && (
        <YesNo
          onYes={() => setPhase('q2_yes')}
          onNo={() => { setPhase('q2_no'); after(700, 'q2_typing'); after(1600, 'q3') }}
        />
      )}

      {show('q2_yes') && !show('q2_confirmed') && (
        <>
          <UserReply label="Yes, we have a venue!" />
          <MaryBubble>Lovely — what's it called or where is it?</MaryBubble>
          <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <input type="text" value={venue} onChange={e => setVenue(e.target.value)} placeholder="e.g. Palácio de Queluz, Sintra" className={INPUT} />
          </div>
          {venue && <ConfirmButton onClick={confirmVenue} />}
        </>
      )}

      {show('q2_no') && !show('q2_yes') && <UserReply label="Not yet" />}
      {show('q2_confirmed') && venue && !show('q2_yes') && <UserReply label={`The venue is ${venue}`} />}
      {isPhase('q2_typing') && <TypingIndicator />}

      {show('q3') && !show('q2_yes') && (
        <MaryBubble>
          {venue ? 'Perfect, noted! Last one — roughly how many guests are you expecting?' : "That's fine — we'll add the venue later. Last one — roughly how many guests are you expecting?"}
        </MaryBubble>
      )}

      {show('q3') && !show('q2_yes') && (
        <div className="flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <input type="number" min={0} value={guests} onChange={e => setGuests(e.target.value)}
            placeholder="e.g. 180" className={`${INPUT} max-w-[220px]`} />
          {guests && <ConfirmButton onClick={() => setPhase('q3_answered')} />}
        </div>
      )}

      {show('q3_answered') && (
        <>
          <UserReply label={`Around ${guests} guests`} />
          <MaryBubble>All set! You're ready to move on to the next step. 🎉</MaryBubble>
        </>
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
