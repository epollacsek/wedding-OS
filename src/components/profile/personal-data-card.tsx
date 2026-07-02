'use client'

import { useState, useTransition } from 'react'
import { Pencil, Check, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
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

function ViewRow({ label, value, pending }: { label: string; value?: string | null; pending?: boolean }) {
  return (
    <div className="flex items-center py-4 border-b border-[#1B1B1B]/06 last:border-0">
      <span className="text-[18px] text-[#1B1B1B]/50 w-56 shrink-0">{label}</span>
      {value ? (
        <span className="text-[18px] font-semibold text-[#1B1B1B]">{value}</span>
      ) : (
        <span className={`text-[18px] ${pending ? 'text-red-500 font-medium' : 'text-[#1B1B1B]/30'}`}>
          {pending ? 'Pending' : 'Not specified'}
        </span>
      )}
    </div>
  )
}

function EditRow({
  label, value, onChange, type = 'text', readOnly,
}: {
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

function formatDate(iso: string) {
  return new Date(iso + 'T12:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

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
    whatsapp,
  })

  function field(key: keyof typeof form) {
    return (v: string) => setForm(f => ({ ...f, [key]: v }))
  }

  function handleCancel() {
    setForm({ firstName, lastName: lastName ?? '', preferredName: preferredName ?? '', birthDate: birthDate ?? '', nationality: nationality ?? '', whatsapp })
    setError(null)
    setEditing(false)
  }

  function handleSave() {
    setError(null)
    startTransition(async () => {
      const result = await updatePersonalData(form)
      if (result.error) {
        setError(result.error)
      } else {
        setEditing(false)
        router.refresh()
      }
    })
  }

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
            <EditRow label="First name"        value={form.firstName}     onChange={field('firstName')} />
            <EditRow label="Last name"         value={form.lastName}      onChange={field('lastName')} />
            <EditRow label="Preferred name"    value={form.preferredName} onChange={field('preferredName')} />
            <EditRow label="Date of birth"     value={form.birthDate}     onChange={field('birthDate')} type="date" />
            <EditRow label="Nationality"       value={form.nationality}   onChange={field('nationality')} />
            <EditRow label="Phone / WhatsApp"  value={form.whatsapp}      onChange={field('whatsapp')} />
            <EditRow label="Email"             value={email}              readOnly />
          </>
        ) : (
          <>
            <ViewRow label="First name"       value={firstName} />
            <ViewRow label="Last name"        value={lastName} />
            <ViewRow label="Preferred name"   value={preferredName} pending={!preferredName} />
            <ViewRow label="Date of birth"    value={birthDate ? formatDate(birthDate) : null} pending={!birthDate} />
            <ViewRow label="Nationality"      value={nationality} pending={!nationality} />
            <ViewRow label="Phone / WhatsApp" value={whatsapp} />
            <ViewRow label="Email"            value={email} />
          </>
        )}
      </div>
    </div>
  )
}
