'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { Check, ChevronDown, Eye, EyeOff, ArrowLeft, Search } from 'lucide-react'
import { signUpOrganizer } from '@/features/auth/actions'
import type { OrganizerSignUpInput } from '@/features/auth/schema'

// ── Phone country data ────────────────────────────────────────────────────────

type Country = {
  code: string
  name: string
  search: string
  dial: string
  digits: number
  format: string   // # = digit slot, other chars are separators
}

// Apply format pattern to raw digits — e.g. '119' + '(##) #####-####' → '(11) 9'
function applyPhoneFormat(digits: string, format: string): string {
  let out = ''
  let di = 0
  for (const ch of format) {
    if (di >= digits.length) break
    if (ch === '#') { out += digits[di++] } else { out += ch }
  }
  return out
}

const COUNTRIES: Country[] = [
  { code: 'BR', name: 'Brasil',        search: 'Brazil',         dial: '+55',  digits: 11, format: '(##) #####-####' },
  { code: 'US', name: 'United States', search: 'United States',  dial: '+1',   digits: 10, format: '(###) ###-####'  },
  { code: 'CA', name: 'Canada',        search: 'Canada',         dial: '+1',   digits: 10, format: '(###) ###-####'  },
  { code: 'GB', name: 'United Kingdom',search: 'United Kingdom', dial: '+44',  digits: 11, format: '##### ######'    },
  { code: 'PT', name: 'Portugal',      search: 'Portugal',       dial: '+351', digits: 9,  format: '### ### ###'     },
  { code: 'ES', name: 'España',        search: 'Spain',          dial: '+34',  digits: 9,  format: '### ### ###'     },
  { code: 'FR', name: 'France',        search: 'France',         dial: '+33',  digits: 10, format: '## ## ## ## ##'  },
  { code: 'DE', name: 'Deutschland',   search: 'Germany',        dial: '+49',  digits: 12, format: '#### ########'   },
  { code: 'IT', name: 'Italia',        search: 'Italy',          dial: '+39',  digits: 10, format: '### ### ####'    },
  { code: 'AR', name: 'Argentina',     search: 'Argentina',      dial: '+54',  digits: 10, format: '## ####-####'    },
  { code: 'MX', name: 'México',        search: 'Mexico',         dial: '+52',  digits: 10, format: '## #### ####'    },
  { code: 'CO', name: 'Colombia',      search: 'Colombia',       dial: '+57',  digits: 10, format: '### ### ####'    },
  { code: 'CL', name: 'Chile',         search: 'Chile',          dial: '+56',  digits: 9,  format: '# #### ####'     },
  { code: 'PE', name: 'Perú',          search: 'Peru',           dial: '+51',  digits: 9,  format: '### ### ###'     },
  { code: 'UY', name: 'Uruguay',       search: 'Uruguay',        dial: '+598', digits: 8,  format: '## ### ###'      },
  { code: 'PY', name: 'Paraguay',      search: 'Paraguay',       dial: '+595', digits: 9,  format: '### ### ###'     },
  { code: 'BO', name: 'Bolivia',       search: 'Bolivia',        dial: '+591', digits: 8,  format: '#### ####'       },
  { code: 'VE', name: 'Venezuela',     search: 'Venezuela',      dial: '+58',  digits: 10, format: '### ### ####'    },
  { code: 'AU', name: 'Australia',     search: 'Australia',      dial: '+61',  digits: 9,  format: '### ### ###'     },
  { code: 'IN', name: 'भारत',          search: 'India',          dial: '+91',  digits: 10, format: '##### #####'     },
  { code: 'JP', name: '日本',          search: 'Japan',          dial: '+81',  digits: 10, format: '##-####-####'    },
  { code: 'AE', name: 'الإمارات',      search: 'UAE',            dial: '+971', digits: 9,  format: '## ### ####'     },
  { code: 'IL', name: 'ישראל',         search: 'Israel',         dial: '+972', digits: 9,  format: '##-###-####'     },
  { code: 'ZA', name: 'South Africa',  search: 'South Africa',   dial: '+27',  digits: 9,  format: '## ### ####'     },
  { code: 'NG', name: 'Nigeria',       search: 'Nigeria',        dial: '+234', digits: 10, format: '### ### ####'    },
  { code: 'NL', name: 'Nederland',     search: 'Netherlands',    dial: '+31',  digits: 9,  format: '# ########'      },
  { code: 'CH', name: 'Schweiz',       search: 'Switzerland',    dial: '+41',  digits: 9,  format: '## ### ## ##'    },
  { code: 'SE', name: 'Sverige',       search: 'Sweden',         dial: '+46',  digits: 9,  format: '## ### ## ##'    },
  { code: 'NO', name: 'Norge',         search: 'Norway',         dial: '+47',  digits: 8,  format: '### ## ###'      },
  { code: 'PL', name: 'Polska',        search: 'Poland',         dial: '+48',  digits: 9,  format: '### ### ###'     },
]

function FlagImg({ code }: { code: string }) {
  return (
    <span
      className={`fi fi-${code.toLowerCase()} shrink-0 rounded-[2px]`}
      style={{ width: 22, height: 16, display: 'inline-block', backgroundSize: 'cover' }}
    />
  )
}

// ── Phone input component ─────────────────────────────────────────────────────

function PhoneInput({
  value,
  onChange,
  className,
}: {
  value: string
  onChange: (full: string) => void
  className?: string
}) {
  const [country, setCountry] = useState<Country>(COUNTRIES[0])
  const [digits, setDigits] = useState('')
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)

  const filtered = COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.search.toLowerCase().includes(search.toLowerCase()) ||
    c.dial.includes(search)
  )

  function selectCountry(c: Country) {
    setCountry(c)
    setDigits('')
    setOpen(false)
    setSearch('')
    onChange('')
  }

  function handleLocal(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/\D/g, '').slice(0, country.digits)
    setDigits(raw)
    onChange(`${country.dial}${raw}`)
  }

  return (
    <div className={`relative flex h-[52px] rounded-md border border-[#B9C0C9] bg-white focus-within:border-aroos-accent focus-within:ring-2 focus-within:ring-aroos-accent/20 ${className ?? ''}`}>
      {/* Country trigger */}
      <button
        type="button"
        onClick={() => { setOpen(v => !v); setTimeout(() => searchRef.current?.focus(), 50) }}
        className="flex h-full shrink-0 items-center gap-2 border-r border-[#B9C0C9] px-4 text-[#1B1B1B] transition-colors hover:bg-[#F7F5F2] rounded-l-md"
      >
        <FlagImg code={country.code} />
        <span className="text-[17px] font-normal text-[#1B1B1B]/60">{country.dial}</span>
        <ChevronDown className={`size-[15px] text-[#1B1B1B]/35 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* Local number input */}
      <input
        type="tel"
        inputMode="numeric"
        placeholder={country.format.replace(/#/g, '0')}
        value={applyPhoneFormat(digits, country.format)}
        onChange={handleLocal}
        className="h-full flex-1 bg-transparent px-4 text-[22px] text-[#1B1B1B] placeholder:text-[#B9C0C9] outline-none"
      />

      {/* Dropdown */}
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => { setOpen(false); setSearch('') }} />
          <div className="absolute left-0 top-[calc(100%+8px)] z-50 w-80 overflow-hidden rounded-2xl border border-[#1B1B1B]/08 bg-white shadow-[0_16px_48px_rgba(27,27,27,0.16)]">
            {/* Search */}
            <div className="flex items-center gap-2.5 border-b border-[#1B1B1B]/06 px-4 py-3">
              <Search className="size-[15px] shrink-0 text-[#1B1B1B]/35" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search country…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-[15px] text-[#1B1B1B] outline-none placeholder:text-[#1B1B1B]/30"
              />
            </div>

            {/* List */}
            <ul className="max-h-[240px] overflow-y-auto py-1.5">
              {filtered.map(c => {
                const selected = c.code === country.code
                return (
                  <li key={c.code}>
                    <button
                      type="button"
                      onClick={() => selectCountry(c)}
                      className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-[#F7F5F2] ${selected ? 'bg-aroos-chrome/15' : ''}`}
                    >
                      <FlagImg code={c.code} />
                      <span className={`flex-1 text-[16px] text-[#1B1B1B] ${selected ? 'font-semibold' : 'font-normal'}`}>
                        {c.name}
                      </span>
                      <span className="text-[14px] text-[#1B1B1B]/40">{c.dial}</span>
                      {selected && <Check className="size-[14px] text-aroos-accent shrink-0" />}
                    </button>
                  </li>
                )
              })}
              {filtered.length === 0 && (
                <li className="px-4 py-4 text-[14px] text-[#1B1B1B]/35">No countries found.</li>
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  )
}

// ── Showcase cards (identical to login) ──────────────────────────────────────

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
const columnAnimations = ['login-card-track--0', 'login-card-track--1', 'login-card-track--2', 'login-card-track--3', 'login-card-track--4']
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
  if (kind === 'report') return (
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
  if (kind === 'timeline') return (
    <div className="mt-5 grid grid-cols-4 gap-2">
      <div className="h-20 rounded-md bg-[#FFCC66]" />
      <div className="h-14 rounded-md bg-[#F68B59]" />
      <div className="h-24 rounded-md bg-[#A6C7FF]" />
      <div className="h-16 rounded-md bg-[#76D0B8]" />
    </div>
  )
  if (kind === 'phone') return (
    <div className="mx-auto mt-5 h-24 w-14 rounded-xl border border-white/30 bg-black/25 p-1.5">
      <div className="h-full rounded-lg bg-white/20" />
    </div>
  )
  if (kind === 'browser') return (
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
  if (kind === 'poster') return (
    <div className="mt-5 h-28 rounded-xl bg-[radial-gradient(circle_at_35%_20%,rgba(255,255,255,0.55),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.28),rgba(0,0,0,0.18))]" />
  )
  return (
    <div className="mt-5 space-y-2">
      <div className="h-3 rounded-full bg-current opacity-15" />
      <div className="h-3 w-2/3 rounded-full bg-current opacity-15" />
      <div className="h-20 rounded-xl bg-current opacity-10" />
    </div>
  )
}

// ── CPF formatter ─────────────────────────────────────────────────────────────

function formatCpf(value: string): string {
  const d = value.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 3) return d
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`
}

// ── Shared input style ────────────────────────────────────────────────────────

const INPUT = 'h-[52px] rounded-md border border-[#B9C0C9] bg-white px-5 text-[22px] text-[#1B1B1B] placeholder:text-[#B9C0C9] outline-none focus:border-aroos-accent focus:ring-2 focus:ring-aroos-accent/20'
const NEXT_BTN = 'mt-2 h-[52px] w-full rounded-full border border-[#C9D7EA] bg-white text-[20px] font-semibold text-[#1B1B1B] transition-colors hover:bg-[#F4F8FF] disabled:opacity-50'

// ── Step progress dots ────────────────────────────────────────────────────────

function StepDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all duration-300 ${
            i < current
              ? 'h-2 w-2 bg-aroos-accent'
              : i === current
              ? 'h-2 w-6 bg-aroos-accent'
              : 'h-2 w-2 bg-[#1B1B1B]/15'
          }`}
        />
      ))}
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

const ERR = 'text-[18px] text-red-500'

export default function OrganizerSignupPage() {
  const [step, setStep] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [confirm, setConfirm] = useState('')
  const [cpf, setCpf] = useState('')
  const [stepError, setStepError] = useState<string | null>(null)
  const [serverError, setServerError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const [fields, setFields] = useState({
    full_name: '',
    email: '',
    whatsapp: '',
    password: '',
  })

  function set(key: keyof typeof fields) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setStepError(null)
      setFields(prev => ({ ...prev, [key]: e.target.value }))
    }
  }

  function advance(validate: () => string | null, nextStep: number) {
    return (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const err = validate()
      if (err) { setStepError(err); return }
      setStepError(null)
      setStep(nextStep)
    }
  }

  async function handleFinalSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!fields.password || fields.password.length < 8) {
      setStepError('Password must be at least 8 characters.')
      return
    }
    if (fields.password !== confirm) {
      setStepError('Passwords do not match.')
      return
    }
    setStepError(null)
    setServerError(null)
    setLoading(true)

    const data: OrganizerSignUpInput = { ...fields, cpf }
    const result = await signUpOrganizer(data)
    if (result?.error) {
      setServerError(result.error)
      setLoading(false)
    }
  }

  const STEPS = [
    {
      heading: 'Your identity',
      sub: 'We need this to verify who you are.',
      content: (
        <form
          noValidate
          onSubmit={advance(() => {
            if (!fields.full_name.trim()) return 'Please enter your full name.'
            if (cpf.replace(/\D/g, '').length < 11) return 'Please enter a valid CPF.'
            return null
          }, 1)}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-3">
            <label htmlFor="full_name" className="text-[22px] font-normal">Full name</label>
            <input
              id="full_name"
              name="full_name"
              type="text"
              autoComplete="name"
              placeholder="Your full name"
              value={fields.full_name}
              onChange={set('full_name')}
              className={INPUT}
            />
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="cpf" className="text-[22px] font-normal">CPF</label>
            <input
              id="cpf"
              name="cpf"
              type="text"
              inputMode="numeric"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={e => { setStepError(null); setCpf(formatCpf(e.target.value)) }}
              className={INPUT}
            />
          </div>

          {stepError && <p className={ERR}>{stepError}</p>}
          <button type="submit" className={NEXT_BTN}>Continue</button>
        </form>
      ),
    },
    {
      heading: 'How to reach you',
      sub: 'Your email and WhatsApp for notifications and updates.',
      content: (
        <form
          noValidate
          onSubmit={advance(() => {
            if (!fields.email.trim() || !fields.email.includes('@')) return 'Please enter a valid email.'
            if (!fields.whatsapp || fields.whatsapp.replace(/\D/g, '').length < 7) return 'Please enter your WhatsApp number.'
            return null
          }, 2)}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-3">
            <label htmlFor="email" className="text-[22px] font-normal">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={fields.email}
              onChange={set('email')}
              className={INPUT}
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-[22px] font-normal">WhatsApp</label>
            <PhoneInput
              value={fields.whatsapp}
              onChange={v => { setStepError(null); setFields(prev => ({ ...prev, whatsapp: v })) }}
            />
          </div>

          {stepError && <p className={ERR}>{stepError}</p>}
          <button type="submit" className={NEXT_BTN}>Continue</button>
        </form>
      ),
    },
    {
      heading: 'Secure your account',
      sub: 'Choose a strong password to protect your account.',
      content: (
        <form noValidate onSubmit={handleFinalSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <label htmlFor="password" className="text-[22px] font-normal">Password</label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="At least 8 characters"
                value={fields.password}
                onChange={set('password')}
                className={`${INPUT} w-full pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#06275B]"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="confirm" className="text-[22px] font-normal">Confirm password</label>
            <div className="relative">
              <input
                id="confirm"
                type={showConfirm ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Repeat your password"
                value={confirm}
                onChange={e => { setStepError(null); setConfirm(e.target.value) }}
                className={`${INPUT} w-full pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(v => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#06275B]"
                aria-label={showConfirm ? 'Hide password' : 'Show password'}
              >
                {showConfirm ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </div>
          </div>

          {(stepError || serverError) && (
            <p className={ERR}>{stepError ?? serverError}</p>
          )}

          <button type="submit" disabled={loading} className={NEXT_BTN}>
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>
      ),
    },
  ]

  const current = STEPS[step]

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(var(--aroos-bg-from)_0%,var(--aroos-bg-to)_100%)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_58%_10%,rgba(255,255,255,0.46),transparent_30%),linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0)_42%,rgba(255,255,255,0.42)_62%,rgba(255,255,255,0)_82%)]" />

      {/* Animated cards */}
      <section className="pointer-events-none absolute bottom-[-120vh] right-[-56vw] top-[-56vh] z-0 hidden w-[138vw] rotate-[-12deg] [mask-image:linear-gradient(90deg,transparent_0%,transparent_40%,rgba(0,0,0,0.28)_52%,black_64%,black_100%)] lg:block xl:right-[-34vw] xl:w-[124vw] xl:[mask-image:linear-gradient(90deg,transparent_0%,transparent_27%,rgba(0,0,0,0.35)_36%,black_47%,black_100%)]">
        <div className="flex min-h-full justify-end gap-5 xl:gap-6">
          {[...columns, ...columns.slice(0, 3)].map((column, index) => (
            <div key={index} className={`h-full w-[230px] shrink-0 overflow-hidden xl:w-[280px] ${columnOffsets[index % columnOffsets.length]}`}>
              <div className={`login-card-track flex flex-col will-change-transform ${columnAnimations[index % columnAnimations.length]}`}>
                {[0, 1].map(group => (
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

      {/* Left panel */}
      <section className="relative z-10 flex min-h-screen w-full flex-col px-10 py-9 text-[#1B1B1B] sm:px-16 lg:w-[44%] lg:px-24">
        <div className="mx-auto w-full max-w-[520px] flex-1 flex flex-col justify-center gap-8 py-16">

          {/* Back + progress */}
          <div className="flex items-center justify-between">
            {step > 0 ? (
              <button
                onClick={() => setStep(s => s - 1)}
                className="flex items-center gap-1.5 text-[17px] text-[#1B1B1B]/50 transition-colors hover:text-[#1B1B1B]"
              >
                <ArrowLeft className="size-4" /> Back
              </button>
            ) : (
              <Link
                href="/signup"
                className="flex items-center gap-1.5 text-[17px] text-[#1B1B1B]/50 transition-colors hover:text-[#1B1B1B]"
              >
                <ArrowLeft className="size-4" /> Back
              </Link>
            )}
            <StepDots current={step} total={STEPS.length} />
          </div>

          {/* Heading */}
          <div>
            <h1 className="text-[56px] font-normal leading-none tracking-[-0.03em] text-[#1B1B1B]">
              {current.heading}
            </h1>
            <p className="mt-3 text-[18px] text-[#1B1B1B]/50">{current.sub}</p>
          </div>

          {/* Step content */}
          {current.content}

          {/* Footer */}
          <p className="text-center text-[18px] text-[#1B1B1B]">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-[#1B1B1B] underline-offset-4 hover:underline">
              Sign in
            </Link>
          </p>

          <div className="text-center">
            <p className="text-[28px] font-black tracking-[-0.06em] text-[#1B1B1B]">aroos.</p>
            <p className="mt-2 text-[15px] text-[#8E8E8E]">© 2026 Aroos, Inc.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
