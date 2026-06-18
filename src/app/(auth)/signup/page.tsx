import Link from 'next/link'

interface PersonaCard {
  title: string
  description: string
  href: string
  enabled: boolean
}

const PERSONAS: PersonaCard[] = [
  {
    title: "I'm organizing an event",
    description: "Plan every detail of your event in one place — guests, vendors, budget, and more.",
    href: '/signup/organizer',
    enabled: true,
  },
  {
    title: "I'm an event planner",
    description: "Manage multiple events and collaborate with clients from a single dashboard.",
    href: '/signup/planner',
    enabled: false,
  },
  {
    title: "I'm a vendor",
    description: "Showcase your services and manage bookings across all your events.",
    href: '/signup/vendor',
    enabled: false,
  },
]

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between px-8 py-6">
        <Link href="/" className="text-[28px] font-bold leading-none tracking-tight text-[#1B1B1B]">
          aroos.
        </Link>
        <Link href="/login" className="text-sm text-[#1B1B1B]/60 transition-colors hover:text-[#1B1B1B]">
          Already have an account? <span className="font-medium text-[#1B1B1B]">Sign in</span>
        </Link>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <h1 className="text-center text-[32px] font-bold leading-tight text-[#1B1B1B]">
          How do you plan to use Aroos?
        </h1>
        <p className="mt-2 text-center text-sm text-[#1B1B1B]/55">
          Select one of the options below
        </p>

        <div className="mt-10 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          {PERSONAS.map((persona) => {
            const card = (
              <div
                key={persona.title}
                className={[
                  'flex flex-col items-center rounded-2xl border px-6 py-10 text-center transition-all',
                  persona.enabled
                    ? 'border-[#1B1B1B]/10 bg-white/80 shadow-sm hover:shadow-md hover:border-aroos-accent cursor-pointer'
                    : 'border-[#1B1B1B]/06 bg-white/40 opacity-50 cursor-not-allowed select-none',
                ].join(' ')}
              >
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-aroos-chrome/40">
                  <span className="text-3xl">
                    {persona.title.includes('organizing') ? '🎉' : persona.title.includes('planner') ? '📋' : '🏪'}
                  </span>
                </div>
                <p className="text-[17px] font-semibold text-[#1B1B1B]">{persona.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#1B1B1B]/55">{persona.description}</p>
                {!persona.enabled && (
                  <span className="mt-4 inline-block rounded-full bg-[#1B1B1B]/08 px-3 py-0.5 text-xs font-medium text-[#1B1B1B]/40">
                    Coming soon
                  </span>
                )}
              </div>
            )

            return persona.enabled ? (
              <Link key={persona.title} href={persona.href} className="block">
                {card}
              </Link>
            ) : (
              <div key={persona.title}>{card}</div>
            )
          })}
        </div>

        <p className="mt-10 text-sm text-[#1B1B1B]/50">
          Looking to get hired for events?{' '}
          <span className="font-medium text-[#1B1B1B]/30 cursor-not-allowed">
            Create your worker profile →
          </span>
        </p>
      </main>
    </div>
  )
}
