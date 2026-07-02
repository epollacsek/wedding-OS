'use client'

import { useState, useTransition } from 'react'
import { Pencil, Check, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { updateCommunicationPrefs } from '@/features/profile/actions'

const LANGUAGES = ['English', 'Portuguese', 'Spanish', 'French', 'Italian', 'German']

type Props = {
  preferredLanguage: string
}

export function CommunicationCard({ preferredLanguage }: Props) {
  const router = useRouter()
  const [editing, setEditing] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [language, setLanguage] = useState(preferredLanguage)

  function handleCancel() {
    setLanguage(preferredLanguage)
    setError(null)
    setEditing(false)
  }

  function handleSave() {
    setError(null)
    startTransition(async () => {
      const result = await updateCommunicationPrefs({ preferredLanguage: language })
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
        <h2 className="text-[19px] font-semibold text-[#1B1B1B]">Communication preferences</h2>
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
        <div className="flex items-center py-4">
          <span className="text-[18px] text-[#1B1B1B]/50 w-56 shrink-0">Preferred language</span>
          {editing ? (
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className="flex-1 text-[18px] font-medium text-[#1B1B1B] border-b border-[#1B1B1B]/20 bg-transparent outline-none focus:border-aroos-accent pb-0.5 appearance-none cursor-pointer transition-colors"
            >
              {LANGUAGES.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          ) : (
            <span className="text-[18px] font-semibold text-[#1B1B1B]">{preferredLanguage}</span>
          )}
        </div>
      </div>
    </div>
  )
}
