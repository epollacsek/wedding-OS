import { Pencil } from 'lucide-react'
import { createServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { UserMenuButton } from '@/components/user-menu'
import { BackButton } from '@/components/back-button'

function profileInitials(name: string) {
  return name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase()
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function Row({ label, value, pending }: { label: string; value?: string | null; pending?: boolean }) {
  return (
    <div className="flex items-center py-4 border-b border-[#1B1B1B]/06 last:border-0">
      <span className="text-[14px] text-[#1B1B1B]/50 w-56 shrink-0">{label}</span>
      {value ? (
        <span className="text-[14px] font-semibold text-[#1B1B1B]">{value}</span>
      ) : (
        <span className={`text-[14px] ${pending ? 'text-amber-500 font-medium' : 'text-[#1B1B1B]/30'}`}>
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
    host: 'Host', organizer: 'Organizer',
    planner: 'Wedding Planner', vendor: 'Vendor', worker: 'Worker',
  }
  const role = roleLabel[profile.persona_type] ?? profile.persona_type
  const hasPending = !profile.birth_date || !profile.nationality || !profile.cpf

  return (
    <div className="min-h-screen flex flex-col bg-[linear-gradient(var(--aroos-bg-from)_0%,var(--aroos-bg-to)_100%)]">

      <header className="flex h-[84px] shrink-0 items-center justify-between px-6">
        <span className="text-[28px] font-bold leading-none tracking-tight text-[#1B1B1B]">aroos.</span>
        <UserMenuButton
          fullName={profile.full_name}
          email={user.email ?? ''}
          role={role}
          initials={profileInitials(profile.full_name)}
          subtitle="Profile settings"
        />
      </header>

      <div className="flex-1 bg-white rounded-tl-[24px] shadow-[-6px_0_24px_-6px_rgba(27,27,27,0.1)] overflow-auto">
        {/* Page header */}
        <div className="px-8 pt-6 pb-0 border-b border-[#1B1B1B]/06">
          <BackButton />
          <h1 className="mt-4 text-[43px] font-bold leading-10 text-[#1B1B1B]">Profile settings</h1>
          <div className="flex gap-8 mt-6">
            <button className="pb-4 text-[15px] font-semibold text-[#1B1B1B] border-b-2 border-[#1B1B1B]">Personal</button>
            <button className="pb-4 text-[15px] text-[#1B1B1B]/40 hover:text-[#1B1B1B] transition-colors">Account access</button>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-[1fr_400px] min-h-[calc(100vh-84px-130px)]">

          {/* Left */}
          <div className="px-8 py-8 border-r border-[#1B1B1B]/06 flex flex-col gap-6">

            {hasPending && (
              <div className="rounded-xl bg-amber-50 border border-amber-200 px-5 py-4">
                <p className="text-[14px] font-semibold text-amber-700">Profile incomplete</p>
                <p className="text-[13px] text-amber-600 mt-0.5">Some fields are still pending. Complete your profile to get the most out of Aroos.</p>
              </div>
            )}

            {/* Personal data card */}
            <div className="rounded-2xl border border-[#1B1B1B]/08 bg-white overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#1B1B1B]/06">
                <h2 className="text-[15px] font-semibold text-[#1B1B1B]">Personal data</h2>
                <button className="flex items-center gap-1.5 rounded-lg border border-[#1B1B1B]/12 px-3 py-1.5 text-[13px] font-medium text-[#1B1B1B] hover:bg-[#1B1B1B]/[0.04] transition-colors">
                  <Pencil className="size-3" /> Edit
                </button>
              </div>
              <div className="px-6">
                <Row label="First name" value={firstName} />
                <Row label="Last name" value={lastName} />
                <Row label="Preferred name" pending />
                <Row label="Date of birth" value={profile.birth_date ? formatDate(profile.birth_date) : null} pending={!profile.birth_date} />
                <Row label="Nationality" value={profile.nationality} pending={!profile.nationality} />
                <Row label="Phone / WhatsApp" value={profile.whatsapp} />
                <Row label="Email" value={user.email} />
                <Row label="CPF / Tax ID" value={profile.cpf} pending={!profile.cpf} />
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="px-8 py-8 flex flex-col gap-6">

            {/* Profile photo card */}
            <div className="rounded-2xl border border-[#1B1B1B]/08 bg-white p-6">
              <h2 className="text-[15px] font-semibold text-[#1B1B1B]">Profile photo</h2>
              <p className="text-[13px] text-[#1B1B1B]/45 mt-1 mb-6">Your photo is visible to guests and collaborators on your events.</p>
              <div className="flex flex-col items-center">
                <div className="size-[96px] rounded-full bg-aroos-avatar flex items-center justify-center text-[28px] font-bold text-[#1B1B1B]">
                  {profileInitials(profile.full_name)}
                </div>
                <button className="mt-4 rounded-lg border border-[#1B1B1B]/15 bg-white px-5 py-2 text-[13px] font-medium text-[#1B1B1B] hover:bg-[#1B1B1B]/[0.04] transition-colors">
                  Add a photo
                </button>
              </div>
            </div>

            {/* Account card */}
            <div className="rounded-2xl border border-[#1B1B1B]/08 bg-white overflow-hidden">
              <div className="px-6 py-4 border-b border-[#1B1B1B]/06">
                <h2 className="text-[15px] font-semibold text-[#1B1B1B]">Your Aroos account</h2>
              </div>
              <div className="px-6">
                <Row label="Account type" value={role} />
                <Row label="Member since" value={formatDate(profile.created_at)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
