'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import {
  Bed,
  Bus,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Globe,
  Home,
  MessageSquare,
  MoreHorizontal,
  Store,
  Users,
} from 'lucide-react'

type NavChild = { label: string; href: string }

type NavItem = {
  label: string
  href: string
  icon: React.ElementType
  children?: NavChild[]
}

const NAV: NavItem[] = [
  { label: 'Home', href: '/home', icon: Home },
  {
    label: 'Attendance',
    href: '/attendance',
    icon: Users,
    children: [
      { label: 'Guests', href: '/attendance/guests' },
      { label: 'Communications', href: '/attendance/comms' },
      { label: 'Accommodation', href: '/attendance/accommodation' },
      { label: 'Transportation', href: '/attendance/transportation' },
    ],
  },
  { label: 'Vendors', href: '/vendors', icon: Store, children: [] },
  { label: 'Finance', href: '/finance', icon: CreditCard, children: [] },
  { label: 'Website', href: '/website', icon: Globe, children: [] },
  { label: 'More', href: '/more', icon: MoreHorizontal },
]

export function LeftNav() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  // Which modules are open — default open the active one
  const [openModules, setOpenModules] = useState<Set<string>>(() => {
    const open = new Set<string>()
    for (const item of NAV) {
      if (item.children?.length && pathname.startsWith(item.href)) {
        open.add(item.href)
      }
    }
    return open
  })

  const toggleModule = (href: string) => {
    setOpenModules(prev => {
      const next = new Set(prev)
      if (next.has(href)) next.delete(href)
      else next.add(href)
      return next
    })
  }

  const isModuleActive = (item: NavItem) =>
    pathname === item.href || pathname.startsWith(item.href + '/')

  const isChildActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <aside
      className={cn(
        'flex flex-col bg-[#F7F5F2] shrink-0 h-full transition-all duration-200',
        collapsed ? 'w-[60px]' : 'w-[220px]'
      )}
    >
      <nav className="flex-1 py-3 overflow-y-auto">
        {NAV.map(item => {
          const Icon = item.icon
          const hasChildren = item.children && item.children.length > 0
          const moduleActive = isModuleActive(item)
          const isOpen = openModules.has(item.href)

          return (
            <div key={item.href}>
              {/* Module row */}
              <div
                className={cn(
                  'flex items-center gap-2.5 mx-2 px-3 py-[7px] rounded-lg cursor-pointer select-none',
                  'text-[#1B1B1B] text-sm transition-colors',
                  moduleActive && !hasChildren
                    ? 'bg-white font-medium shadow-sm'
                    : moduleActive
                    ? 'bg-[#5938B7]/[0.08]'
                    : 'hover:bg-black/[0.05]'
                )}
                onClick={() => {
                  if (hasChildren) toggleModule(item.href)
                }}
              >
                <Icon
                  className={cn(
                    'size-4 shrink-0',
                    moduleActive ? 'text-[#5938B7]' : 'text-[#1B1B1B]/60'
                  )}
                />
                {!collapsed && (
                  <>
                    <span className={cn('flex-1 leading-tight', moduleActive && 'font-medium')}>
                      {item.label}
                    </span>
                    {hasChildren && (
                      <ChevronDown
                        className={cn(
                          'size-3.5 text-[#1B1B1B]/40 transition-transform',
                          isOpen && 'rotate-180'
                        )}
                      />
                    )}
                  </>
                )}
              </div>

              {/* Sub-items */}
              {!collapsed && hasChildren && isOpen && (
                <div className="mt-0.5 mb-1">
                  {item.children!.map(child => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={cn(
                        'flex items-center mx-2 pl-9 pr-3 py-[6px] rounded-lg text-sm transition-colors',
                        isChildActive(child.href)
                          ? 'bg-white font-medium text-[#1B1B1B] shadow-sm'
                          : 'text-[#1B1B1B]/70 hover:bg-black/[0.05] hover:text-[#1B1B1B]'
                      )}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="p-3 border-t border-black/[0.06]">
        <button
          onClick={() => setCollapsed(c => !c)}
          className="flex items-center justify-center size-8 rounded-lg hover:bg-black/[0.07] text-[#1B1B1B]/40 transition-colors"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
        </button>
      </div>
    </aside>
  )
}
