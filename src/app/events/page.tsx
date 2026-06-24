import Link from 'next/link'
import { Plus } from 'lucide-react'

type MockEvent = {
  id: string
  name: string
  type: 'Wedding' | 'Corporate' | 'Birthday' | 'Other'
  date: string | null
  guestCount: number
  initials: string
  color: string
}

// Mock data — replaced by real DB query once events migration is live
const MOCK_EVENTS: MockEvent[] = [
  {
    id: 'evt_1',
    name: "Eduardo & Ana's Wedding",
    type: 'Wedding',
    date: '2027-06-12',
    guestCount: 180,
    initials: 'EA',
    color: 'bg-[#CBBDEA]',
  },
  {
    id: 'evt_2',
    name: 'Aroos Company Retreat',
    type: 'Corporate',
    date: '2026-09-20',
    guestCount: 40,
    initials: 'AR',
    color: 'bg-[#A9C2C8]',
  },
]

const TYPE_BADGE: Record<MockEvent['type'], string> = {
  Wedding:   'bg-[#EEE9FF] text-[#5938B7]',
  Corporate: 'bg-[#E6F0F5] text-[#0E4A83]',
  Birthday:  'bg-[#FFF3E6] text-[#B85C00]',
  Other:     'bg-[#F0F0F0] text-[#555]',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

function daysUntil(iso: string) {
  const diff = Math.ceil((new Date(iso).getTime() - Date.now()) / 86_400_000)
  if (diff < 0) return null
  if (diff === 0) return 'Today'
  return `${diff} days away`
}

export default function EventsPage() {
  // Auto-skip: if exactly 1 event, go straight in (add redirect logic here once real DB is wired)
  // For now we always show the picker since MOCK_EVENTS has 2 entries

  return (
    <main className="min-h-screen bg-[linear-gradient(var(--aroos-bg-from)_0%,var(--aroos-bg-to)_100%)]">
      <header className="flex items-center justify-between px-8 py-6">
        <span className="text-[28px] font-bold leading-none tracking-tight text-[#1B1B1B]">
          aroos.
        </span>
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-aroos-avatar flex items-center justify-center text-sm font-semibold text-[#1B1B1B]">
            EP
          </div>
          <span className="text-[15px] font-medium text-[#1B1B1B]">Eduardo Pollacsek</span>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-6 pt-12 pb-24">
        <h1 className="text-[38px] font-bold leading-tight tracking-tight text-[#1B1B1B]">
          Your events
        </h1>
        <p className="mt-1 text-[17px] text-[#1B1B1B]/50">
          Pick an event to continue, or create a new one.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_EVENTS.map(event => (
            <Link
              key={event.id}
              href="/home"
              className="group flex flex-col rounded-2xl border border-[#1B1B1B]/08 bg-white/70 p-6 shadow-sm backdrop-blur-sm transition-all hover:border-aroos-accent/40 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className={`size-12 rounded-xl ${event.color} flex items-center justify-center text-base font-bold text-[#1B1B1B] shrink-0`}>
                  {event.initials}
                </div>
                <span className={`mt-0.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${TYPE_BADGE[event.type]}`}>
                  {event.type}
                </span>
              </div>

              <div className="mt-4 flex-1">
                <h2 className="text-[18px] font-semibold leading-snug text-[#1B1B1B] group-hover:text-aroos-accent transition-colors">
                  {event.name}
                </h2>
                {event.date && (
                  <p className="mt-1 text-sm text-[#1B1B1B]/50">
                    {formatDate(event.date)}
                    {daysUntil(event.date) && (
                      <span className="ml-2 text-aroos-accent font-medium">{daysUntil(event.date)}</span>
                    )}
                  </p>
                )}
              </div>

              <div className="mt-5 flex items-center gap-1.5 border-t border-[#1B1B1B]/06 pt-4">
                <div className="flex -space-x-1">
                  {Array.from({ length: Math.min(3, Math.ceil(event.guestCount / 60)) }).map((_, i) => (
                    <div key={i} className="size-5 rounded-full bg-aroos-chrome border-2 border-white" />
                  ))}
                </div>
                <span className="text-sm text-[#1B1B1B]/50">
                  {event.guestCount} guests
                </span>
              </div>
            </Link>
          ))}

          <Link
            href="/onboarding/organizer"
            className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[#1B1B1B]/15 bg-transparent p-6 text-[#1B1B1B]/40 transition-all hover:border-aroos-accent/40 hover:text-aroos-accent hover:bg-white/40 min-h-[180px]"
          >
            <div className="size-10 rounded-full border-2 border-current flex items-center justify-center">
              <Plus className="size-5" />
            </div>
            <span className="text-[15px] font-medium">New event</span>
          </Link>
        </div>
      </section>
    </main>
  )
}
