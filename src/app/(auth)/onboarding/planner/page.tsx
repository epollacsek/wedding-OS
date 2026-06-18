import Link from 'next/link'

export default function PlannerOnboardingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-8 py-6">
        <Link href="/" className="text-[28px] font-bold leading-none tracking-tight text-[#1B1B1B]">
          aroos.
        </Link>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border border-[#1B1B1B]/08 bg-white/80 p-10 text-center shadow-sm backdrop-blur-sm">
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-aroos-chrome/40">
              <span className="text-2xl">📬</span>
            </div>
          </div>
          <h1 className="text-[22px] font-bold text-[#1B1B1B]">Your profile is ready</h1>
          <p className="mt-3 text-sm leading-relaxed text-[#1B1B1B]/55">
            Ask the event organizer to invite you to their event. Once they send an invite to your email, you'll get full access to your shared workspace.
          </p>
          <div className="mt-8 rounded-xl bg-[#F7F5F2] px-4 py-3 text-sm text-[#1B1B1B]/50">
            Waiting for an invite from an organizer
          </div>
        </div>
      </main>
    </div>
  )
}
