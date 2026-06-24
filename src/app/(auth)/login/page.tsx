'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { signIn } from '@/features/auth/actions'

type ShowcaseCard = {
  title: string
  subtitle: string
  label?: string
  className: string
  body: 'browser' | 'poster' | 'report' | 'timeline' | 'phone' | 'minimal'
  size: 'sm' | 'md' | 'lg'
}

const sizeClass = {
  sm: 'min-h-[140px] xl:min-h-[160px]',
  md: 'min-h-[210px] xl:min-h-[240px]',
  lg: 'min-h-[300px] xl:min-h-[340px]',
}

// Placeholder showcase cards. Replace this data/art direction once final event templates are generated.
const columns: ShowcaseCard[][] = [
  [
    { title: 'Browse Objects on VC', subtitle: 'SHOP NOW', label: 'Gallery launch', className: 'bg-[#2F2B25] text-white', body: 'browser', size: 'lg' },
    { title: 'SALO-SALO', subtitle: 'Ika 15 ng Nobyembre', label: 'Pista ng Pagkaing Pinoy', className: 'bg-[#FFCBAA] text-[#22160E]', body: 'poster', size: 'sm' },
    { title: 'SOURCE LOCALMENT', subtitle: 'Field dinner invitation', className: 'bg-[#9DAF86] text-white', body: 'poster', size: 'md' },
    { title: 'YUNA KASUMI', subtitle: '1990', className: 'bg-[#FFE4C8] text-[#1B1B1B]', body: 'poster', size: 'lg' },
  ],
  [
    { title: 'Thank you!', subtitle: 'Post-event note', className: 'bg-white text-[#1B1B1B]', body: 'minimal', size: 'sm' },
    { title: 'INUSIDE', subtitle: 'October 2024', className: 'bg-[#111322] text-white', body: 'poster', size: 'lg' },
    { title: 'build', subtitle: 'Summit keynote', className: 'bg-[#FF5B36] text-[#FFE66D]', body: 'poster', size: 'sm' },
    { title: 'THE LAST VISITOR', subtitle: 'Experience opening night', className: 'bg-[#09151F] text-[#F6D15B]', body: 'poster', size: 'md' },
  ],
  [
    { title: 'Kustenruhe', subtitle: 'Wellness retreat board', className: 'bg-[#A9C2C8] text-white', body: 'minimal', size: 'md' },
    { title: 'COMPANY REVIEW', subtitle: 'Quarterly deck', className: 'bg-[#EEE9FF] text-white', body: 'minimal', size: 'sm' },
    { title: 'CONCEPT PROPOSAL', subtitle: 'Brand system preview', className: 'bg-[#7C67D9] text-white', body: 'minimal', size: 'lg' },
    { title: 'how to plan your next content', subtitle: 'A starter guide', className: 'bg-[#4A4946] text-white', body: 'browser', size: 'sm' },
    { title: 'creative strategy', subtitle: '2024', className: 'bg-[#3B2E9E] text-white', body: 'minimal', size: 'md' },
  ],
  [
    { title: 'MANAGEMENT REPORT FINANCIAL RISK', subtitle: 'Market volatility analysis', className: 'bg-white text-[#1B1B1B]', body: 'report', size: 'sm' },
    { title: 'marketing report', subtitle: 'Campaign performance', className: 'bg-[#0E4A83] text-white', body: 'minimal', size: 'lg' },
    { title: 'new podcast alert', subtitle: '10 PM PST - OCTOBER 31 2024', className: 'bg-[#1F2D27] text-white', body: 'phone', size: 'sm' },
    { title: 'MATCHA', subtitle: 'Workshop tasting card', className: 'bg-[#A7BE74] text-white', body: 'poster', size: 'md' },
  ],
  [
    { title: 'The New App Product Launch', subtitle: 'Release event', className: 'bg-[#1E1369] text-white', body: 'phone', size: 'lg' },
    { title: 'new perspective', subtitle: 'Design meetup', className: 'bg-[#4DAEBD] text-white', body: 'minimal', size: 'sm' },
    { title: 'The Business Timeline', subtitle: '2012 - 2018', className: 'bg-white text-[#1B1B1B]', body: 'timeline', size: 'md' },
    { title: 'software engineer', subtitle: 'Hiring card', className: 'bg-[#845FE7] text-white', body: 'browser', size: 'lg' },
  ],
]

const columnOffsets = ['-mt-20', 'mt-10', '-mt-8', 'mt-16', '-mt-24']
const columnAnimations = [
  'login-card-track--0',
  'login-card-track--1',
  'login-card-track--2',
  'login-card-track--3',
  'login-card-track--4',
]
const BRAND_NAME = 'aroos'
const BRAND_COPYRIGHT = '© 2026 Aroos, Inc.'
const CARD_SEQUENCE_REPEATS = 6

function ShowcaseCardPreview({ card }: { card: ShowcaseCard }) {
  return (
    <article className={`overflow-hidden rounded-2xl p-4 shadow-[0_18px_40px_rgba(20,38,64,0.18)] xl:p-5 ${sizeClass[card.size]} ${card.className}`}>
      {card.label && <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.08em] opacity-70">{card.label}</p>}
      <div className="flex min-h-40 flex-col justify-between">
        <div>
          <h2 className="text-[19px] font-black leading-[1.05] tracking-tight xl:text-[22px]">{card.title}</h2>
          <p className="mt-2 text-xs opacity-75">{card.subtitle}</p>
        </div>
        <CardBody kind={card.body} />
      </div>
    </article>
  )
}

function CardBody({ kind }: { kind: ShowcaseCard['body'] }) {
  if (kind === 'report') {
    return (
      <div className="mt-5 space-y-2">
        <div className="grid grid-cols-3 gap-2">
          <div className="aspect-square rounded-full border-4 border-[#1B1B1B]/20" />
          <div className="aspect-square rounded-full border-4 border-[#1B1B1B]/20" />
          <div className="aspect-square rounded-full border-4 border-[#1B1B1B]/20" />
        </div>
        <div className="h-2 rounded-full bg-[#1B1B1B]/20" />
        <div className="h-2 w-3/4 rounded-full bg-[#1B1B1B]/20" />
        <div className="h-14 rounded-lg border border-[#1B1B1B]/15" />
      </div>
    )
  }

  if (kind === 'timeline') {
    return (
      <div className="mt-5 grid grid-cols-4 gap-2">
        <div className="h-20 rounded-md bg-[#FFCC66]" />
        <div className="h-14 rounded-md bg-[#F68B59]" />
        <div className="h-24 rounded-md bg-[#A6C7FF]" />
        <div className="h-16 rounded-md bg-[#76D0B8]" />
      </div>
    )
  }

  if (kind === 'phone') {
    return (
      <div className="mx-auto mt-5 h-24 w-14 rounded-xl border border-white/30 bg-black/25 p-1.5">
        <div className="h-full rounded-lg bg-white/20" />
      </div>
    )
  }

  if (kind === 'browser') {
    return (
      <div className="mt-5 rounded-lg bg-white/20 p-2">
        <div className="mb-2 flex gap-1">
          <span className="size-1.5 rounded-full bg-red-300" />
          <span className="size-1.5 rounded-full bg-yellow-300" />
          <span className="size-1.5 rounded-full bg-green-300" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="h-14 rounded bg-white/35" />
          <div className="h-14 rounded bg-white/35" />
          <div className="h-14 rounded bg-white/35" />
          <div className="h-14 rounded bg-white/35" />
        </div>
      </div>
    )
  }

  if (kind === 'poster') {
    return (
      <div className="mt-5 h-28 rounded-xl bg-[radial-gradient(circle_at_35%_20%,rgba(255,255,255,0.55),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.28),rgba(0,0,0,0.18))]" />
    )
  }

  return (
    <div className="mt-5 space-y-2">
      <div className="h-3 rounded-full bg-current opacity-15" />
      <div className="h-3 w-2/3 rounded-full bg-current opacity-15" />
      <div className="h-20 rounded-xl bg-current opacity-10" />
    </div>
  )
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const form = e.currentTarget
    const result = await signIn({
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      password: (form.elements.namedItem('password') as HTMLInputElement).value,
    })

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(var(--aroos-bg-from)_0%,var(--aroos-bg-to)_100%)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_58%_10%,rgba(255,255,255,0.46),transparent_30%),linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0)_42%,rgba(255,255,255,0.42)_62%,rgba(255,255,255,0)_82%)]" />

      <section className="pointer-events-none absolute bottom-[-120vh] right-[-56vw] top-[-56vh] z-0 hidden w-[138vw] rotate-[-12deg] [mask-image:linear-gradient(90deg,transparent_0%,transparent_40%,rgba(0,0,0,0.28)_52%,black_64%,black_100%)] lg:block xl:right-[-34vw] xl:w-[124vw] xl:[mask-image:linear-gradient(90deg,transparent_0%,transparent_27%,rgba(0,0,0,0.35)_36%,black_47%,black_100%)]">
        <div className="flex min-h-full justify-end gap-5 xl:gap-6">
          {[...columns, ...columns.slice(0, 3)].map((column, index) => (
            <div
              key={index}
              className={`h-full w-[230px] shrink-0 overflow-hidden xl:w-[280px] ${columnOffsets[index % columnOffsets.length]}`}
            >
              <div className={`login-card-track flex flex-col will-change-transform ${columnAnimations[index % columnAnimations.length]}`}>
                {[0, 1].map((group) => (
                  <div key={group} className="flex flex-col gap-6 pb-6">
                    {Array.from({ length: CARD_SEQUENCE_REPEATS }).flatMap(() => column).map((card, cardIndex) => (
                      <ShowcaseCardPreview key={`${group}-${card.title}-${cardIndex}`} card={card} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 flex min-h-screen w-full flex-col px-10 py-9 text-[#1B1B1B] sm:px-16 lg:w-[44%] lg:px-24">
        <div className="relative mx-auto w-full max-w-[520px] flex-1 pt-[18vh] lg:-translate-x-[10%] lg:translate-y-[2vh]">
          <h1 className="translate-y-[4vh] text-[56px] font-normal leading-none tracking-[-0.03em] text-[#1B1B1B]">Sign in</h1>

          <div className="absolute left-0 right-0 top-[54%] -translate-y-1/2">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-[#1B1B1B]">
              <div className="flex flex-col gap-3">
                <label htmlFor="email" className="text-[22px] font-normal">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="h-[52px] rounded-md border border-[#B9C0C9] bg-white px-5 text-[22px] leading-none text-[#1B1B1B] placeholder:text-[#B9C0C9] outline-none focus:border-aroos-accent focus:ring-2 focus:ring-aroos-accent/20"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="password" className="text-[22px] font-normal">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="h-[52px] w-full rounded-md border border-[#B9C0C9] bg-white px-5 pr-12 text-[22px] leading-none text-[#1B1B1B] placeholder:text-[#B9C0C9] outline-none focus:border-aroos-accent focus:ring-2 focus:ring-aroos-accent/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#06275B]"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                  </button>
                </div>
              </div>

              <Link href="/forgot-password" className="text-[21px] font-medium text-[#1B1B1B] underline-offset-4 hover:underline">
                Forgot password?
              </Link>

              {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-base text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 h-[52px] rounded-full border border-[#C9D7EA] bg-white text-[20px] font-semibold text-[#1B1B1B] transition-colors hover:bg-[#F4F8FF] disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            <p className="mt-8 text-center text-[18px] text-[#1B1B1B]">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="font-medium text-[#1B1B1B] underline-offset-4 hover:underline">
                Sign up
              </Link>
            </p>

            <div className="mt-16 text-center">
              <p className="text-[28px] font-black tracking-[-0.06em] text-[#1B1B1B]">{BRAND_NAME}</p>
              <p className="mt-8 text-[15px] text-[#8E8E8E]">{BRAND_COPYRIGHT}</p>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
