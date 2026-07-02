'use client'

import { useState, useTransition } from 'react'
import { Pencil, Check, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { updateAddress } from '@/features/profile/actions'

type Props = {
  address: string | null
  city: string | null
  postcode: string | null
  country: string | null
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

function EditRow({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center py-3.5 border-b border-[#1B1B1B]/06 last:border-0">
      <span className="text-[18px] text-[#1B1B1B]/50 w-56 shrink-0">{label}</span>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="flex-1 text-[18px] font-medium text-[#1B1B1B] border-b border-[#1B1B1B]/20 bg-transparent outline-none focus:border-aroos-accent pb-0.5 transition-colors"
      />
    </div>
  )
}

export function AddressCard({ address, city, postcode, country }: Props) {
  const router = useRouter()
  const [editing, setEditing] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    address: address ?? '',
    city: city ?? '',
    postcode: postcode ?? '',
    country: country ?? '',
  })

  function field(key: keyof typeof form) {
    return (v: string) => setForm(f => ({ ...f, [key]: v }))
  }

  function handleCancel() {
    setForm({ address: address ?? '', city: city ?? '', postcode: postcode ?? '', country: country ?? '' })
    setError(null)
    setEditing(false)
  }

  function handleSave() {
    setError(null)
    startTransition(async () => {
      const result = await updateAddress(form)
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
        <h2 className="text-[19px] font-semibold text-[#1B1B1B]">Address</h2>
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
            <EditRow label="Street address" value={form.address}  onChange={field('address')} />
            <EditRow label="City"           value={form.city}     onChange={field('city')} />
            <EditRow label="Postcode"       value={form.postcode} onChange={field('postcode')} />
            <EditRow label="Country"        value={form.country}  onChange={field('country')} />
          </>
        ) : (
          <>
            <ViewRow label="Street address" value={address}  pending={!address} />
            <ViewRow label="City"           value={city}     pending={!city} />
            <ViewRow label="Postcode"       value={postcode} />
            <ViewRow label="Country"        value={country}  pending={!country} />
          </>
        )}
      </div>
    </div>
  )
}
