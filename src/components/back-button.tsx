'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function BackButton() {
  const router = useRouter()
  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 text-[14px] font-medium text-[#1B1B1B]/50 hover:text-[#1B1B1B] transition-colors"
    >
      <ArrowLeft className="size-4" />
      Back
    </button>
  )
}
