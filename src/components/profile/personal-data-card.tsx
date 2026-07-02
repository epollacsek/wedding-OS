'use client'

import { useState, useTransition, useRef } from 'react'
import { Pencil, Check, X, ChevronDown, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Flag from 'react-world-flags'
import { COUNTRIES, applyPhoneFormat, resolveCountry, parsePhone } from '@/lib/countries'
import type { Country } from '@/lib/countries'
import { updatePersonalData } from '@/features/profile/actions'

type Props = {
  firstName: string
  lastName: string | null
  preferredName: string | null
  birthDate: string | null
  nationality: string | null
  whatsapp: string
  email: string
}

// ── Shared flag image ──────────────────────────────────────────────────────────

function FlagImg({ code }: { code: string }) {
  return (
    <Flag
      code={code}
      style={{ width: 22, height: 16, borderRadius: 2, display: 'inline-block', objectFit: 'cover', flexShrink: 0 }}
    />
  )
}

// ── View rows ──────────────────────────────────────────────────────────────────

function ViewRow({ label, value, pending, children }: {
  label: string; value?: string | null; pending?: boolean; children?: React.ReactNode
}) {
  return (
    <div className="flex items-center py-4 border-b border-[#1B1B1B]/06 last:border-0">
      <span className="text-[18px] text-[#1B1B1B]/50 w-56 shrink-0">{label}</span>
      {children ?? (
        value ? (
          <span className="text-[18px] font-semibold text-[#1B1B1B]">{value}</span>
        ) : (
          <span className={`text-[18px] ${pending ? 'text-red-500 font-medium' : 'text-[#1B1B1B]/30'}`}>
            {pending ? 'Pending' : 'Not specified'}
          </span>
        )
      )}
    </div>
  )
}

// ── Edit rows ──────────────────────────────────────────────────────────────────

function EditRow({ label, value, onChange, type = 'text', readOnly }: {
  label: string; value: string; onChange?: (v: string) => void; type?: string; readOnly?: boolean
}) {
  return (
    <div className="flex items-center py-3.5 border-b border-[#1B1B1B]/06 last:border-0">
      <span className="text-[18px] text-[#1B1B1B]/50 w-56 shrink-0">{label}</span>
      {readOnly ? (
        <span className="text-[18px] font-semibold text-[#1B1B1B]/35">{value}</span>
      ) : (
        <input
          type={type}
          value={value}
          onChange={e => onChange?.(e.target.value)}
          className="flex-1 text-[18px] font-medium text-[#1B1B1B] border-b border-[#1B1B1B]/20 bg-transparent outline-none focus:border-aroos-accent pb-0.5 transition-colors"
        />
      )}
    </div>
  )
}

// ── Nationality select (edit mode) ─────────────────────────────────────────────

function NationalityEditRow({ label, value, onChange }: {
  label: string; value: string; onChange: (code: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)

  const selected = resolveCountry(value)
  const filtered = COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.search.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex items-center py-3.5 border-b border-[#1B1B1B]/06 last:border-0 relative">
      <span className="text-[18px] text-[#1B1B1B]/50 w-56 shrink-0">{label}</span>
      <button
        type="button"
        onClick={() => { setOpen(v => !v); setTimeout(() => searchRef.current?.focus(), 50) }}
        className="flex flex-1 items-center gap-2.5 border-b border-[#1B1B1B]/20 pb-0.5 text-left outline-none"
      >
        {selected ? (
          <>
            <FlagImg code={selected.code} />
            <span className="flex-1 text-[18px] font-medium text-[#1B1B1B]">{selected.search}</span>
          </>
        ) : (
          <span className="flex-1 text-[18px] text-[#1B1B1B]/30">Select nationality</span>
        )}
        <ChevronDown className={`size-4 text-[#1B1B1B]/40 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => { setOpen(false); setSearch('') }} />
          <div className="absolute left-56 top-full mt-1 z-50 w-72 overflow-hidden rounded-2xl border border-[#1B1B1B]/08 bg-white shadow-[0_16px_48px_rgba(27,27,27,0.16)]">
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
            <ul className="max-h-[240px] overflow-y-auto py-1.5">
              {filtered.map(c => (
                <li key={c.code}>
                  <button
                    type="button"
                    onClick={() => { onChange(c.code); setOpen(false); setSearch('') }}
                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-[#F7F5F2] ${c.code === selected?.code ? 'bg-aroos-chrome/15' : ''}`}
                  >
                    <FlagImg code={c.code} />
                    <span className={`flex-1 text-[15px] text-[#1B1B1B] ${c.code === selected?.code ? 'font-semibold' : 'font-normal'}`}>
                      {c.search}
                    </span>
                    {c.code === selected?.code && <Check className="size-[14px] text-aroos-accent shrink-0" />}
                  </button>
                </li>
              ))}
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

// ── Phone input (edit mode) ────────────────────────────────────────────────────

function PhoneEditRow({ label, country, localDigits, onCountryChange, onDigitsChange }: {
  label: string
  country: Country
  localDigits: string
  onCountryChange: (c: Country) => void
  onDigitsChange: (d: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)

  const filtered = COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.search.toLowerCase().includes(search.toLowerCase()) ||
    c.dial.includes(search)
  )

  function handleLocal(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/\D/g, '').slice(0, country.digits)
    onDigitsChange(raw)
  }

  return (
    <div className="flex items-center py-3.5 border-b border-[#1B1B1B]/06 last:border-0 relative">
      <span className="text-[18px] text-[#1B1B1B]/50 w-56 shrink-0">{label}</span>
      <div className="flex flex-1 items-center gap-2 border-b border-[#1B1B1B]/20 pb-0.5">
        {/* Country picker trigger */}
        <button
          type="button"
          onClick={() => { setOpen(v => !v); setTimeout(() => searchRef.current?.focus(), 50) }}
          className="flex items-center gap-1.5 shrink-0 outline-none"
        >
          <FlagImg code={country.code} />
          <span className="text-[16px] text-[#1B1B1B]/60">{country.dial}</span>
          <ChevronDown className={`size-3.5 text-[#1B1B1B]/35 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        </button>
        {/* Local number */}
        <input
          type="tel"
          inputMode="numeric"
          placeholder={country.format.replace(/#/g, '0')}
          value={applyPhoneFormat(localDigits, country.format)}
          onChange={handleLocal}
          className="flex-1 text-[18px] font-medium text-[#1B1B1B] bg-transparent outline-none placeholder:text-[#1B1B1B]/25"
        />
      </div>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => { setOpen(false); setSearch('') }} />
          <div className="absolute left-56 top-full mt-1 z-50 w-72 overflow-hidden rounded-2xl border border-[#1B1B1B]/08 bg-white shadow-[0_16px_48px_rgba(27,27,27,0.16)]">
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
            <ul className="max-h-[240px] overflow-y-auto py-1.5">
              {filtered.map(c => (
                <li key={c.code}>
                  <button
                    type="button"
                    onClick={() => { onCountryChange(c); onDigitsChange(''); setOpen(false); setSearch('') }}
                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-[#F7F5F2] ${c.code === country.code ? 'bg-aroos-chrome/15' : ''}`}
                  >
                    <FlagImg code={c.code} />
                    <span className={`flex-1 text-[15px] text-[#1B1B1B] ${c.code === country.code ? 'font-semibold' : 'font-normal'}`}>
                      {c.search}
                    </span>
                    <span className="text-[13px] text-[#1B1B1B]/40">{c.dial}</span>
                  </button>
                </li>
              ))}
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

// ── Helpers ────────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso + 'T12:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function defaultCountry(): Country {
  return COUNTRIES.find(c => c.code === 'BR') ?? COUNTRIES[0]
}

// ── Main component ─────────────────────────────────────────────────────────────

export function PersonalDataCard({ firstName, lastName, preferredName, birthDate, nationality, whatsapp, email }: Props) {
  const router = useRouter()
  const [editing, setEditing] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    firstName,
    lastName: lastName ?? '',
    preferredName: preferredName ?? '',
    birthDate: birthDate ?? '',
    nationality: nationality ?? '',
  })

  // Phone state separate from form — parsed on init
  const [phoneCountry, setPhoneCountry] = useState<Country>(() => {
    const parsed = parsePhone(whatsapp)
    return parsed?.country ?? defaultCountry()
  })
  const [phoneDigits, setPhoneDigits] = useState<string>(() => {
    const parsed = parsePhone(whatsapp)
    return parsed?.localDigits ?? ''
  })

  function field(key: keyof typeof form) {
    return (v: string) => setForm(f => ({ ...f, [key]: v }))
  }

  function handleCancel() {
    setForm({ firstName, lastName: lastName ?? '', preferredName: preferredName ?? '', birthDate: birthDate ?? '', nationality: nationality ?? '' })
    const parsed = parsePhone(whatsapp)
    setPhoneCountry(parsed?.country ?? defaultCountry())
    setPhoneDigits(parsed?.localDigits ?? '')
    setError(null)
    setEditing(false)
  }

  function handleSave() {
    setError(null)
    const fullWhatsapp = `${phoneCountry.dial}${phoneDigits}`
    startTransition(async () => {
      const result = await updatePersonalData({ ...form, whatsapp: fullWhatsapp })
      if (result.error) {
        setError(result.error)
      } else {
        setEditing(false)
        router.refresh()
      }
    })
  }

  // Nationality for view mode
  const nationalityCountry = resolveCountry(nationality)
  // Phone for view mode
  const parsedPhone = parsePhone(whatsapp)

  return (
    <div className="rounded-2xl border border-[#1B1B1B]/08 bg-white overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#1B1B1B]/06">
        <h2 className="text-[19px] font-semibold text-[#1B1B1B]">Personal data</h2>
        {editing ? (
          <div className="flex items-center gap-2">
            <button
              onClick={handleCancel}
              className="flex items-center gap-1.5 rounded-lg border border-[#1B1B1B]/12 px-3 py-1.5 text-[16px] font-medium text-[#1B1B1B] hover:bg-[#1B1B1B]/[0.04] transition-colors"
            >
              <X className="size-3.5" /> Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isPending}
              className="flex items-center gap-1.5 rounded-lg bg-aroos-accent px-3 py-1.5 text-[16px] font-medium text-white hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              <Check className="size-3.5" /> {isPending ? 'Saving…' : 'Save'}
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-1.5 rounded-lg border border-[#1B1B1B]/12 px-3 py-1.5 text-[16px] font-medium text-[#1B1B1B] hover:bg-[#1B1B1B]/[0.04] transition-colors"
          >
            <Pencil className="size-3.5" /> Edit
          </button>
        )}
      </div>

      {error && (
        <div className="px-6 py-2 bg-red-50 border-b border-red-100 text-[14px] text-red-600">{error}</div>
      )}

      <div className="px-6">
        {editing ? (
          <>
            <EditRow label="First name"     value={form.firstName}     onChange={field('firstName')} />
            <EditRow label="Last name"      value={form.lastName}      onChange={field('lastName')} />
            <EditRow label="Preferred name" value={form.preferredName} onChange={field('preferredName')} />
            <EditRow label="Date of birth"  value={form.birthDate}     onChange={field('birthDate')} type="date" />
            <NationalityEditRow label="Nationality" value={form.nationality} onChange={field('nationality')} />
            <PhoneEditRow
              label="Phone / WhatsApp"
              country={phoneCountry}
              localDigits={phoneDigits}
              onCountryChange={setPhoneCountry}
              onDigitsChange={setPhoneDigits}
            />
            <EditRow label="Email" value={email} readOnly />
          </>
        ) : (
          <>
            <ViewRow label="First name"     value={firstName} />
            <ViewRow label="Last name"      value={lastName} />
            <ViewRow label="Preferred name" value={preferredName} pending={!preferredName} />
            <ViewRow label="Date of birth"  value={birthDate ? formatDate(birthDate) : null} pending={!birthDate} />

            {/* Nationality — flag + English name */}
            <ViewRow label="Nationality" pending={!nationality}>
              {nationalityCountry ? (
                <span className="flex items-center gap-2.5 text-[18px] font-semibold text-[#1B1B1B]">
                  <FlagImg code={nationalityCountry.code} />
                  {nationalityCountry.search}
                </span>
              ) : nationality ? (
                <span className="text-[18px] font-semibold text-[#1B1B1B]">{nationality}</span>
              ) : null}
            </ViewRow>

            {/* Phone — flag + dial code + formatted number */}
            <ViewRow label="Phone / WhatsApp">
              {parsedPhone ? (
                <span className="flex items-center gap-2.5 text-[18px] font-semibold text-[#1B1B1B]">
                  <FlagImg code={parsedPhone.country.code} />
                  <span className="text-[#1B1B1B]/50 font-normal">{parsedPhone.country.dial}</span>
                  {applyPhoneFormat(parsedPhone.localDigits, parsedPhone.country.format)}
                </span>
              ) : whatsapp ? (
                <span className="text-[18px] font-semibold text-[#1B1B1B]">{whatsapp}</span>
              ) : (
                <span className="text-[18px] text-[#1B1B1B]/30">Not specified</span>
              )}
            </ViewRow>

            <ViewRow label="Email" value={email} />
          </>
        )}
      </div>
    </div>
  )
}
