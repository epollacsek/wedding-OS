'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Settings, LogOut, User } from 'lucide-react'
import { signOut } from '@/features/auth/actions'

type Props = {
  fullName: string
  email: string
  role: string
  initials: string
}

export function UserMenuButton({ fullName, email, role, initials }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="h-[52px] min-w-[260px] flex items-center gap-3 rounded-full bg-aroos-chrome py-1 pl-1 pr-4 text-[#1B1B1B] transition-colors hover:bg-aroos-chrome-hover"
      >
        <div className="size-11 rounded-full bg-aroos-avatar flex items-center justify-center text-base font-medium text-[#1B1B1B] select-none shrink-0">
          {initials}
        </div>
        <div className="min-w-0 flex-1 text-left leading-tight px-1">
          <p className="truncate text-xl font-medium leading-tight text-[#1B1B1B]">{fullName}</p>
        </div>
        <ChevronDown className={`size-5 shrink-0 text-[#1B1B1B]/60 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 z-50 w-[390px] rounded-2xl border border-[#1B1B1B]/08 bg-white shadow-[0_12px_40px_rgba(27,27,27,0.16)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">

          {/* Header */}
          <div className="px-6 py-5 border-b border-[#1B1B1B]/06">
            <p className="text-[20px] font-semibold text-[#1B1B1B]">{fullName}</p>
            <p className="text-[17px] text-[#1B1B1B]/50 mt-0.5">{email}</p>
            <span className="mt-2 inline-block rounded-full bg-aroos-accent/10 px-3 py-1 text-[15px] font-medium text-aroos-accent">
              {role}
            </span>
          </div>

          {/* Menu items */}
          <div className="p-2">
            <a href="/profile"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-[18px] text-[#1B1B1B] hover:bg-[#1B1B1B]/[0.05] transition-colors"
              onClick={() => setOpen(false)}
            >
              <Settings className="size-5 text-[#1B1B1B]/50 shrink-0" />
              Profile settings
            </a>
            <a href="/events"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-[18px] text-[#1B1B1B] hover:bg-[#1B1B1B]/[0.05] transition-colors"
              onClick={() => setOpen(false)}
            >
              <User className="size-5 text-[#1B1B1B]/50 shrink-0" />
              Switch event
            </a>
          </div>

          {/* Sign out */}
          <div className="p-2 border-t border-[#1B1B1B]/06">
            <form action={signOut}>
              <button type="submit"
                className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-[18px] text-red-500 hover:bg-red-50 transition-colors text-left"
              >
                <LogOut className="size-5 shrink-0" />
                Sign out
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
