import { DashboardShell } from '@/components/layout/dashboard-shell'
import { getProfile } from '@/features/auth/queries'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const profile = await getProfile()
  return <DashboardShell profile={profile}>{children}</DashboardShell>
}
