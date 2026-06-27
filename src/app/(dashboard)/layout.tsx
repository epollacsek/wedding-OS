import { cookies } from 'next/headers'
import { DashboardShell } from '@/components/layout/dashboard-shell'
import { getProfile } from '@/features/auth/queries'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [profile, jar] = await Promise.all([getProfile(), cookies()])
  const raw = jar.get('active_event')?.value
  const activeEvent = raw ? (JSON.parse(raw) as { name: string; role: string }) : null
  return <DashboardShell profile={profile} activeEvent={activeEvent}>{children}</DashboardShell>
}
