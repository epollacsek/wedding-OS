import { createServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { UserMenuButton } from '@/components/user-menu'
import { BackButton } from '@/components/back-button'
import { PersonalDataCard } from '@/components/profile/personal-data-card'
import { AddressCard } from '@/components/profile/address-card'
import { CommunicationCard } from '@/components/profile/communication-card'

function profileInitials(name: string) {
  return name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase()
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

const ROLE_LABEL: Record<string, string> = {
  host: 'Host', organizer: 'Organizer',
  planner: 'Wedding Planner', vendor: 'Vendor', worker: 'Worker',
}

function Row({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex items-center py-4 border-b border-[#1B1B1B]/06 last:border-0">
      <span className="text-[18px] text-[#1B1B1B]/50 w-56 shrink-0">{label}</span>
      {value ? (
        <span className="text-[18px] font-semibold text-[#1B1B1B]">{value}</span>
      ) : (
        <span className="text-[18px] text-[#1B1B1B]/30">Not specified</span>
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
    .select('id, persona_type, full_name, preferred_name, whatsapp, birth_date, nationality, address, city, postcode, country, preferred_language, created_at')
    .eq('id', user.id)
    .single()

  if (!profile) redirect('/login')

  const nameParts = profile.full_name.trim().split(' ')
  const firstName = nameParts[0]
  const lastName = nameParts.slice(1).join(' ') || null
  const role = ROLE_LABEL[profile.persona_type] ?? profile.persona_type

  const pendingFields = [
    !profile.birth_date  && 'Date of birth',
    !profile.nationality && 'Nationality',
    !profile.address     && 'Street address',
    !profile.city        && 'City',
    !profile.country     && 'Country',
  ].filter(Boolean) as string[]

  const hasPending = pendingFields.length > 0

  return (
    <div className="min-h-screen flex flex-col bg-[linear-gradient(var(--aroos-bg-from)_0%,var(--aroos-bg-to)_100%)]">

      <header className="flex h-[84px] shrink-0 items-center justify-between px-6">
        <span className="text-[28px] font-bold leading-none tracking-tight text-[#1B1B1B]">aroos.</span>
        <UserMenuButton fullName={profile.full_name} email={user.email ?? ''} role={role}
          initials={profileInitials(profile.full_name)} subtitle="Profile settings" />
      </header>

      <div className="flex-1 bg-white rounded-tl-[24px] shadow-[-6px_0_24px_-6px_rgba(27,27,27,0.1)] overflow-auto">
        <div className="px-8 pt-6 pb-0 border-b border-[#1B1B1B]/06">
          <div className="flex items-start justify-between">
            <div>
              <BackButton />
              <h1 className="mt-4 text-[43px] font-bold leading-10 text-[#1B1B1B]">Profile settings</h1>
            </div>
            {hasPending && (
              <div className="mt-4 min-w-[480px] rounded-xl bg-red-50 border border-red-200 px-5 py-4">
                <p className="text-[19px] font-semibold text-red-700">Profile incomplete</p>
                <p className="text-[16px] text-red-600 mt-0.5">
                  Missing: {pendingFields.join(', ')}.
                </p>
              </div>
            )}
          </div>
          <div className="flex gap-8 mt-[42px]">
            <button className="pb-4 text-[19px] font-semibold text-[#1B1B1B] border-b-2 border-[#1B1B1B]">Personal</button>
            <button className="pb-4 text-[19px] text-[#1B1B1B]/40 hover:text-[#1B1B1B] transition-colors">Account access</button>
          </div>
        </div>

        <div className="grid grid-cols-[7fr_3fr] min-h-[calc(100vh-84px-130px)]">

          {/* Left — Personal data */}
          <div className="px-8 py-8 border-r border-[#1B1B1B]/06 flex flex-col gap-6">

            <PersonalDataCard
              firstName={firstName}
              lastName={lastName}
              preferredName={profile.preferred_name ?? null}
              birthDate={profile.birth_date ?? null}
              nationality={profile.nationality ?? null}
              whatsapp={profile.whatsapp}
              email={user.email ?? ''}
            />

            <AddressCard
              address={profile.address ?? null}
              city={profile.city ?? null}
              postcode={profile.postcode ?? null}
              country={profile.country ?? null}
            />

            <CommunicationCard
              preferredLanguage={profile.preferred_language ?? 'English'}
            />
          </div>

          {/* Right — Photo + account */}
          <div className="px-6 py-8 flex flex-col gap-6">

            {/* Profile photo */}
            <div className="rounded-2xl border border-[#1B1B1B]/08 bg-white p-6">
              <h2 className="text-[19px] font-semibold text-[#1B1B1B]">Profile photo</h2>
              <p className="text-[16px] text-[#1B1B1B]/45 mt-1 mb-6">Visible to guests and collaborators.</p>
              <div className="flex flex-col items-center">
                <div className="size-[96px] rounded-full bg-aroos-avatar flex items-center justify-center text-[28px] font-bold text-[#1B1B1B]">
                  {profileInitials(profile.full_name)}
                </div>
                <button className="mt-4 rounded-lg border border-[#1B1B1B]/15 bg-white px-5 py-2 text-[16px] font-medium text-[#1B1B1B] hover:bg-[#1B1B1B]/[0.04] transition-colors">
                  Add a photo
                </button>
              </div>
            </div>

            {/* Account */}
            <div className="rounded-2xl border border-[#1B1B1B]/08 bg-white overflow-hidden">
              <div className="px-6 py-4 border-b border-[#1B1B1B]/06">
                <h2 className="text-[19px] font-semibold text-[#1B1B1B]">Your Aroos account</h2>
              </div>
              <div className="px-6">
                <Row label="Role" value={role} />
                <Row label="Member since" value={formatDate(profile.created_at)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
