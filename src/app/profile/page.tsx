import Link from 'next/link'
import { ArrowLeft, Pencil } from 'lucide-react'
import { createServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

function initials(name: string) {
  return name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase()
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

type FieldProps = {
  label: string
  value?: string | null
  pending?: boolean
}

function Field({ label, value, pending }: FieldProps) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-[#1B1B1B]/06 last:border-0">
      <span className="text-[15px] text-[#1B1B1B]/50">{label}</span>
      {value ? (
        <span className="text-[15px] font-medium text-[#1B1B1B]">{value}</span>
      ) : (
        <span className={`text-[15px] ${pending ? 'text-amber-500 font-medium' : 'text-[#1B1B1B]/30'}`}>
          {pending ? 'Pending' : 'Not specified'}
        </span>
      )}
    </div>
  )
}

export default async function ProfilePage() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, persona_type, full_name, whatsapp, cpf, birth_date, nationality, created_at')
    .eq('id', user.id)
    .single()

  if (!profile) redirect('/login')

  const nameParts = profile.full_name.trim().split(' ')
  const firstName = nameParts[0]
  const lastName = nameParts.slice(1).join(' ') || null

  const roleLabel: Record<string, string> = {
    host: 'Host',
    organizer: 'Organizer',
    planner: 'Wedding Planner',
    vendor: 'Vendor',
    worker: 'Worker',
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(var(--aroos-bg-from)_0%,var(--aroos-bg-to)_100%)]">
      <div className="max-w-[900px] mx-auto px-8 py-10">

        {/* Back */}
        <Link href="/events" className="inline-flex items-center gap-2 text-[14px] text-[#1B1B1B]/50 hover:text-[#1B1B1B] transition-colors mb-8">
          <ArrowLeft className="size-4" />
          Back to events
        </Link>

        <h1 className="text-[36px] font-bold text-[#1B1B1B] mb-8">Profile settings</h1>

        <div className="grid grid-cols-[1fr_340px] gap-6">

          {/* Left — Personal data */}
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl bg-white border border-[#1B1B1B]/08 px-6 py-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-[18px] font-semibold text-[#1B1B1B]">Personal data</h2>
                <button className="flex items-center gap-1.5 rounded-lg border border-[#1B1B1B]/15 px-3 py-1.5 text-[13px] font-medium text-[#1B1B1B] hover:bg-[#1B1B1B]/[0.05] transition-colors">
                  <Pencil className="size-3.5" /> Edit
                </button>
              </div>

              <Field label="First name" value={firstName} />
              <Field label="Last name" value={lastName} />
              <Field label="Preferred name" pending />
              <Field label="Date of birth" value={profile.birth_date ? formatDate(profile.birth_date) : null} pending={!profile.birth_date} />
              <Field label="Nationality" value={profile.nationality} pending={!profile.nationality} />
              <Field label="WhatsApp" value={profile.whatsapp} />
              <Field label="Email" value={user.email} />
              <Field label="CPF / Tax ID" value={profile.cpf} pending={!profile.cpf} />
            </div>

            {/* Pending notice */}
            {(!profile.birth_date || !profile.nationality || !profile.cpf) && (
              <div className="rounded-2xl bg-amber-50 border border-amber-200 px-6 py-4">
                <p className="text-[14px] font-semibold text-amber-700 mb-1">Profile incomplete</p>
                <p className="text-[13px] text-amber-600">
                  A few fields are still pending. Complete your profile to unlock all features and ensure your event runs smoothly.
                </p>
              </div>
            )}
          </div>

          {/* Right — Avatar + account */}
          <div className="flex flex-col gap-6">

            {/* Profile photo */}
            <div className="rounded-2xl bg-white border border-[#1B1B1B]/08 px-6 py-5 shadow-sm text-center">
              <h2 className="text-[18px] font-semibold text-[#1B1B1B] text-left mb-4">Profile photo</h2>
              <div className="size-24 rounded-full bg-aroos-avatar flex items-center justify-center text-[28px] font-bold text-[#1B1B1B] mx-auto">
                {initials(profile.full_name)}
              </div>
              <button className="mt-4 rounded-lg border border-[#1B1B1B]/15 px-4 py-2 text-[13px] font-medium text-[#1B1B1B] hover:bg-[#1B1B1B]/[0.05] transition-colors">
                Add a photo
              </button>
            </div>

            {/* Account info */}
            <div className="rounded-2xl bg-white border border-[#1B1B1B]/08 px-6 py-5 shadow-sm">
              <h2 className="text-[18px] font-semibold text-[#1B1B1B] mb-2">Your Aroos account</h2>
              <Field label="Account type" value={roleLabel[profile.persona_type] ?? profile.persona_type} />
              <Field label="Member since" value={formatDate(profile.created_at)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
