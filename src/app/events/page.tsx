import { Users, Calendar, ChevronDown } from 'lucide-react'
import { getProfile } from '@/features/auth/queries'
import { createServerClient } from '@/lib/supabase/server'
import { selectEvent } from '@/features/events/actions'
import { NewEventButton } from '@/components/events/new-event-button'

type Event = {
  id: string
  name: string
  type: string
  ceremony_date: string | null
  created_at: string
}

const TYPE_GRADIENTS: Record<string, { gradient: string; accent: string; label: string }> = {
  wedding:   { gradient: 'linear-gradient(135deg, #CBBDEA 0%, #9B87D9 50%, #7C67C8 100%)', accent: '#5938B7', label: 'Wedding' },
  corporate: { gradient: 'linear-gradient(135deg, #A9C2C8 0%, #7BA8B2 50%, #4A8A97 100%)', accent: '#0E4A83', label: 'Corporate event' },
  birthday:  { gradient: 'linear-gradient(135deg, #FFD6A5 0%, #FFC07A 50%, #F5A03E 100%)', accent: '#C47A2A', label: 'Birthday' },
  social:    { gradient: 'linear-gradient(135deg, #B5EAD7 0%, #7ED9B5 50%, #4AC49A 100%)', accent: '#1A7A55', label: 'Social' },
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

function eventInitials(name: string) {
  const match = name.match(/^(\S+)\s*&\s*(\S+)/)
  if (match) return `${match[1][0]}&${match[2][0]}`
  return name.split(' ').filter(w => w.length > 1).slice(0, 2).map(w => w[0]).join('')
}

function gridClass(count: number) {
  if (count === 1) return 'grid-cols-1'
  if (count === 2) return 'grid-cols-2'
  if (count === 3) return 'grid-cols-3'
  return 'grid-cols-4'
}

function initials(name: string) {
  return name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase()
}

export default async function EventsPage() {
  const supabase = await createServerClient()
  const [profile, { data: events }] = await Promise.all([
    getProfile(),
    supabase.from('events').select('id, name, type, ceremony_date, created_at').order('created_at', { ascending: false }),
  ])

  const list: Event[] = events ?? []
  const total = list.length
  const role = profile?.persona_type
    ? profile.persona_type.charAt(0).toUpperCase() + profile.persona_type.slice(1)
    : 'Host'

  return (
    <main className="flex min-h-screen flex-col bg-[linear-gradient(var(--aroos-bg-from)_0%,var(--aroos-bg-to)_100%)]">
      <header className="flex h-[84px] shrink-0 items-center justify-between px-6">
        <span className="text-[28px] font-bold leading-none tracking-tight text-[#1B1B1B]">
          aroos.
        </span>
        <button className="h-[52px] min-w-[350px] flex items-center gap-3 rounded-full bg-aroos-chrome py-1 pl-1 pr-4 text-[#1B1B1B] transition-colors hover:bg-aroos-chrome-hover">
          <div className="size-11 rounded-full bg-aroos-avatar flex items-center justify-center text-base font-medium text-[#1B1B1B] select-none shrink-0">
            {profile ? initials(profile.full_name) : 'EP'}
          </div>
          <div className="min-w-0 flex-1 text-left leading-tight px-1">
            <p className="truncate text-xl font-medium leading-tight text-[#1B1B1B]">{profile?.full_name ?? 'Eduardo Pollacsek'}</p>
          </div>
          <ChevronDown className="size-6 shrink-0 text-[#1B1B1B]/70" />
        </button>
      </header>

      <section className="flex flex-1 flex-col px-8 pt-4 pb-10">
        <h1 className="text-[38px] font-bold leading-tight tracking-tight text-[#1B1B1B]">Your events</h1>
        <p className="mt-1 text-[17px] text-[#1B1B1B]/50">
          {total === 0 ? 'No events yet. Create your first one below.' : 'Pick an event to continue, or create a new one.'}
        </p>

        {total > 0 && (
          <div className={`mt-10 grid gap-5 ${gridClass(total)}`}>
            {list.map(event => {
              const style = TYPE_GRADIENTS[event.type] ?? TYPE_GRADIENTS.social
              const days = event.ceremony_date ? daysUntil(event.ceremony_date) : null

              return (
                <form key={event.id} action={selectEvent.bind(null, event.name, role)}
                  className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_2px_16px_rgba(27,27,27,0.08)] transition-all duration-300 hover:shadow-[0_8px_32px_rgba(27,27,27,0.16)] hover:-translate-y-1 cursor-pointer h-[62vh]">
                  <button type="submit" className="flex flex-col flex-1 w-full text-left min-h-0">
                    <div className="relative w-full flex-1" style={{ background: style.gradient }}>
                      <div className="absolute left-4 top-4">
                        <span className="rounded-full bg-white/20 px-3 py-1 text-[13px] font-medium text-white backdrop-blur-sm">
                          {style.label}
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[40%]">
                        <div className="size-[100px] rounded-full border-4 border-white bg-white shadow-md flex items-center justify-center font-bold text-[#1B1B1B]">
                          <span className="text-[26px] tracking-tight">{eventInitials(event.name)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col px-6 pb-6 pt-12 text-center shrink-0">
                      <h2 className="text-[20px] font-semibold leading-snug text-[#1B1B1B] transition-colors group-hover:text-aroos-accent">
                        {event.name}
                      </h2>
                      {event.ceremony_date ? (
                        <p className="mt-1.5 text-[14px] text-[#1B1B1B]/50">{formatDate(event.ceremony_date)}</p>
                      ) : (
                        <p className="mt-1.5 text-[14px] text-[#1B1B1B]/35 italic">No date set yet</p>
                      )}
                      <div className="mt-5 flex items-center justify-center gap-4 border-t border-[#1B1B1B]/06 pt-4 text-[14px] text-[#1B1B1B]/50">
                        {days ? (
                          <span className="rounded-full px-3 py-1 text-[13px] font-semibold text-white"
                            style={{ backgroundColor: style.accent }}>
                            {days}
                          </span>
                        ) : event.ceremony_date ? (
                          <span className="flex items-center gap-1.5">
                            <Calendar className="size-4" />
                            {new Date(event.ceremony_date).getFullYear()}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </button>
                </form>
              )
            })}
          </div>
        )}

        <NewEventButton userName={profile?.full_name?.split(' ')[0] ?? 'there'} />
      </section>
    </main>
  )
}
