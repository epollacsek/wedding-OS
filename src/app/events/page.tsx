import Link from 'next/link'
import { Plus, Users, Calendar } from 'lucide-react'

type MockEvent = {
  id: string
  name: string
  type: 'Wedding' | 'Corporate' | 'Birthday' | 'Other'
  date: string | null
  guestCount: number
  coverGradient: string
  accentColor: string
}

// Mock data — replaced by real DB query once events migration is live
const MOCK_EVENTS: MockEvent[] = [
  {
    id: 'evt_1',
    name: "Eduardo & Ana's Wedding",
    type: 'Wedding',
    date: '2027-06-12',
    guestCount: 180,
    coverGradient: 'linear-gradient(135deg, #CBBDEA 0%, #9B87D9 50%, #7C67C8 100%)',
    accentColor: '#5938B7',
  },
  {
    id: 'evt_2',
    name: 'Aroos Company Retreat',
    type: 'Corporate',
    date: '2026-09-20',
    guestCount: 40,
    coverGradient: 'linear-gradient(135deg, #A9C2C8 0%, #7BA8B2 50%, #4A8A97 100%)',
    accentColor: '#0E4A83',
  },
]

const TYPE_LABEL: Record<MockEvent['type'], string> = {
  Wedding: 'Wedding',
  Corporate: 'Corporate event',
  Birthday: 'Birthday',
  Other: 'Event',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

function daysUntil(iso: string) {
  const diff = Math.ceil((new Date(iso).getTime() - Date.now()) / 86_400_000)
  if (diff < 0) return null
  if (diff === 0) return 'Today'
  if (diff === 1) return 'Tomorrow'
  return `${diff} days away`
}

// Grid columns based on event count — fills the screen naturally
function gridClass(count: number) {
  if (count === 1) return 'grid-cols-1 max-w-lg'
  if (count === 2) return 'grid-cols-2'
  if (count === 3) return 'grid-cols-3'
  return 'grid-cols-2'  // 4+ wraps into 2-col rows
}

export default function EventsPage() {
  const total = MOCK_EVENTS.length

  return (
    <main className="flex min-h-screen flex-col bg-[linear-gradient(var(--aroos-bg-from)_0%,var(--aroos-bg-to)_100%)]">
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

      <section className="flex flex-1 flex-col px-8 pt-4 pb-10">
        <h1 className="text-[38px] font-bold leading-tight tracking-tight text-[#1B1B1B]">
          Your events
        </h1>
        <p className="mt-1 text-[17px] text-[#1B1B1B]/50">
          Pick an event to continue, or create a new one.
        </p>

        {/* Event cards — evenly split across full width, grow to fill space */}
        <div className={`mt-[5vh] grid gap-5 ${gridClass(total)}`}>
          {MOCK_EVENTS.map(event => {
            const days = event.date ? daysUntil(event.date) : null
            return (
              <Link
                key={event.id}
                href="/home"
                className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_2px_16px_rgba(27,27,27,0.08)] transition-all duration-300 hover:shadow-[0_8px_32px_rgba(27,27,27,0.16)] hover:-translate-y-1"
              >
                {/* Cover */}
                <div
                  className="relative w-full h-[52vh]"
                  style={{ background: event.coverGradient }}
                >
                  <div className="absolute left-4 top-4">
                    <span className="rounded-full bg-white/20 px-3 py-1 text-[13px] font-medium text-white backdrop-blur-sm">
                      {TYPE_LABEL[event.type]}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[40%]">
                    <div className="size-[100px] rounded-full border-4 border-white bg-white shadow-md flex items-center justify-center text-[26px] font-bold text-[#1B1B1B]">
                      {event.name.split(' ').slice(0, 2).map(w => w[0]).join('')}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col px-6 pb-6 pt-12 text-center">
                  <h2 className="text-[20px] font-semibold leading-snug text-[#1B1B1B] transition-colors group-hover:text-aroos-accent">
                    {event.name}
                  </h2>
                  {event.date && (
                    <p className="mt-1.5 text-[14px] text-[#1B1B1B]/50">
                      {formatDate(event.date)}
                    </p>
                  )}
                  {days && (
                    <span
                      className="mx-auto mt-3 rounded-full px-3 py-1 text-[13px] font-semibold text-white"
                      style={{ backgroundColor: event.accentColor }}
                    >
                      {days}
                    </span>
                  )}
                  <div className="mt-5 flex items-center justify-center gap-4 border-t border-[#1B1B1B]/06 pt-4 text-[14px] text-[#1B1B1B]/50">
                    <span className="flex items-center gap-1.5">
                      <Users className="size-4" />
                      {event.guestCount} guests
                    </span>
                    {event.date && (
                      <span className="flex items-center gap-1.5">
                        <Calendar className="size-4" />
                        {new Date(event.date).getFullYear()}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Add new — full width bar at the bottom */}
        <Link
          href="/onboarding/organizer"
          className="group mt-5 flex w-full items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-[#1B1B1B]/15 bg-white/40 py-5 transition-all duration-300 hover:border-aroos-accent/50 hover:bg-white/70"
        >
          <div className="size-8 rounded-full border-2 border-[#1B1B1B]/25 flex items-center justify-center transition-colors group-hover:border-aroos-accent group-hover:text-aroos-accent text-[#1B1B1B]/30">
            <Plus className="size-4" />
          </div>
          <span className="text-[16px] font-semibold text-[#1B1B1B]/40 transition-colors group-hover:text-aroos-accent">
            New event
          </span>
        </Link>
      </section>
    </main>
  )
}
