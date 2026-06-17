'use client'

import { Bell, ChevronDown, HelpCircle, Search, Settings } from 'lucide-react'

export function TopNav() {
  return (
    <header className="h-14 bg-white border-b border-black/[0.06] flex items-center px-4 gap-4 shrink-0 z-10">
      {/* Logo */}
      <div className="w-[200px] shrink-0">
        <span className="text-[#1B1B1B] font-semibold text-xl tracking-tight">aroos.</span>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="flex items-center gap-2 bg-black/[0.04] hover:bg-black/[0.06] transition-colors rounded-lg px-3 h-9 cursor-pointer">
          <Search className="size-4 text-[#1B1B1B]/40 shrink-0" />
          <span className="text-sm text-[#1B1B1B]/40 flex-1">Search guests, vendors, tasks...</span>
          <kbd className="text-xs text-[#1B1B1B]/30 bg-black/[0.06] rounded px-1.5 py-0.5 font-mono">⌘K</kbd>
        </div>
      </div>

      {/* Right icons */}
      <div className="flex items-center gap-1 ml-auto">
        <button className="size-9 flex items-center justify-center rounded-lg hover:bg-black/[0.05] transition-colors text-[#1B1B1B]/60">
          <HelpCircle className="size-5" />
        </button>
        <button className="size-9 flex items-center justify-center rounded-lg hover:bg-black/[0.05] transition-colors text-[#1B1B1B]/60">
          <Settings className="size-5" />
        </button>
        <button className="size-9 flex items-center justify-center rounded-lg hover:bg-black/[0.05] transition-colors text-[#1B1B1B]/60">
          <Bell className="size-5" />
        </button>

        {/* Avatar */}
        <button className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg hover:bg-black/[0.05] transition-colors ml-1">
          <div className="size-8 rounded-full bg-[#5938B7]/10 flex items-center justify-center text-[#5938B7] text-sm font-medium select-none">
            EP
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-medium text-[#1B1B1B] leading-tight">Eduardo P.</p>
            <p className="text-[11px] text-[#1B1B1B]/50 leading-tight">Admin</p>
          </div>
          <ChevronDown className="size-3.5 text-[#1B1B1B]/40" />
        </button>
      </div>
    </header>
  )
}
