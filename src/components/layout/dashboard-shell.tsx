'use client'

import { useState } from 'react'
import { TopNav } from './top-nav'
import { LeftNav } from './left-nav'
import type { Profile } from '@/types/database'

export function DashboardShell({ children, profile }: { children: React.ReactNode; profile: Profile | null }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-[linear-gradient(var(--aroos-bg-from)_0%,var(--aroos-bg-to)_100%)] bg-fixed">
      <TopNav collapsed={collapsed} profile={profile} />
      <div className="flex flex-1">
        <LeftNav collapsed={collapsed} onToggle={() => setCollapsed(v => !v)} />
        <main className="flex-1 bg-aroos-content rounded-tl-[24px] [box-shadow:rgba(27,27,27,0.1)_-6px_0px_24px_-6px] overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
