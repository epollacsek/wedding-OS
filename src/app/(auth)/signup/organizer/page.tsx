'use client'

import Link from 'next/link'
import { useState } from 'react'
import { signUpOrganizer } from '@/features/auth/actions'
import type { OrganizerSignUpInput } from '@/features/auth/schema'

function formatCpf(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`
}

export default function OrganizerSignupPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [cpf, setCpf] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const form = e.currentTarget
    const data: OrganizerSignUpInput = {
      full_name: (form.elements.namedItem('full_name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      whatsapp: (form.elements.namedItem('whatsapp') as HTMLInputElement).value,
      cpf: cpf,
      password: (form.elements.namedItem('password') as HTMLInputElement).value,
    }

    const result = await signUpOrganizer(data)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

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
        <div className="w-full max-w-md rounded-2xl border border-[#1B1B1B]/08 bg-white/80 p-8 shadow-sm backdrop-blur-sm">
          <Link href="/signup" className="mb-6 inline-flex items-center gap-1.5 text-sm text-[#1B1B1B]/50 transition-colors hover:text-[#1B1B1B]">
            ← Back
          </Link>
          <h1 className="text-[22px] font-bold text-[#1B1B1B]">Create your account</h1>
          <p className="mt-1 text-sm text-[#1B1B1B]/50">You're setting up as an event organizer.</p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="full_name" className="text-sm font-medium text-[#1B1B1B]">Full name</label>
              <input
                id="full_name"
                name="full_name"
                type="text"
                required
                autoComplete="name"
                placeholder="Eduardo Pollacsek"
                className="h-11 w-full rounded-lg border border-[#1B1B1B]/12 bg-white px-3.5 text-sm text-[#1B1B1B] outline-none placeholder:text-[#1B1B1B]/35 focus:border-aroos-accent focus:ring-1 focus:ring-aroos-accent"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-medium text-[#1B1B1B]">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="h-11 w-full rounded-lg border border-[#1B1B1B]/12 bg-white px-3.5 text-sm text-[#1B1B1B] outline-none placeholder:text-[#1B1B1B]/35 focus:border-aroos-accent focus:ring-1 focus:ring-aroos-accent"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="whatsapp" className="text-sm font-medium text-[#1B1B1B]">WhatsApp</label>
              <input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                required
                autoComplete="tel"
                placeholder="+55 11 91234-5678"
                className="h-11 w-full rounded-lg border border-[#1B1B1B]/12 bg-white px-3.5 text-sm text-[#1B1B1B] outline-none placeholder:text-[#1B1B1B]/35 focus:border-aroos-accent focus:ring-1 focus:ring-aroos-accent"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="cpf" className="text-sm font-medium text-[#1B1B1B]">CPF</label>
              <input
                id="cpf"
                name="cpf"
                type="text"
                required
                inputMode="numeric"
                placeholder="000.000.000-00"
                value={cpf}
                onChange={(e) => setCpf(formatCpf(e.target.value))}
                className="h-11 w-full rounded-lg border border-[#1B1B1B]/12 bg-white px-3.5 text-sm text-[#1B1B1B] outline-none placeholder:text-[#1B1B1B]/35 focus:border-aroos-accent focus:ring-1 focus:ring-aroos-accent"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm font-medium text-[#1B1B1B]">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="new-password"
                placeholder="At least 8 characters"
                className="h-11 w-full rounded-lg border border-[#1B1B1B]/12 bg-white px-3.5 text-sm text-[#1B1B1B] outline-none placeholder:text-[#1B1B1B]/35 focus:border-aroos-accent focus:ring-1 focus:ring-aroos-accent"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-1 h-11 w-full rounded-lg bg-aroos-accent text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-[#1B1B1B]/40">
            By creating an account you agree to our{' '}
            <span className="underline cursor-pointer">Terms of Service</span> and{' '}
            <span className="underline cursor-pointer">Privacy Policy</span>.
          </p>
        </div>
      </main>
    </div>
  )
}
