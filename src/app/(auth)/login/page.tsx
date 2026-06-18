'use client'

import Link from 'next/link'
import { useState } from 'react'
import { signIn } from '@/features/auth/actions'

export default function LoginPage() {
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
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between px-8 py-6">
        <Link href="/" className="text-[28px] font-bold leading-none tracking-tight text-[#1B1B1B]">
          aroos.
        </Link>
        <Link href="/signup" className="text-sm text-[#1B1B1B]/60 transition-colors hover:text-[#1B1B1B]">
          Don't have an account? <span className="font-medium text-[#1B1B1B]">Sign up</span>
        </Link>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border border-[#1B1B1B]/08 bg-white/80 p-8 shadow-sm backdrop-blur-sm">
          <h1 className="text-[22px] font-bold text-[#1B1B1B]">Welcome back</h1>
          <p className="mt-1 text-sm text-[#1B1B1B]/50">Your event, beautifully managed.</p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
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
              <label htmlFor="password" className="text-sm font-medium text-[#1B1B1B]">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="Your password"
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
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-[#1B1B1B]/50">
            Don't have an account?{' '}
            <Link href="/signup" className="font-medium text-aroos-accent hover:opacity-80">
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
