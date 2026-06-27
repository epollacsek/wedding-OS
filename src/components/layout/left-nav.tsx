'use client'

import type { SVGProps } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import {
  ChevronDown,
} from 'lucide-react'

type NavChild = { label: string; href: string }

type NavItem = {
  label: string
  href: string
  icon: React.ElementType
  children?: NavChild[]
}

const NAV: NavItem[] = [
  { label: 'Home', href: '/home', icon: HomeIcon },
  {
    label: 'Attendance',
    href: '/attendance',
    icon: AttendanceIcon,
    children: [
      { label: 'Guest Directory', href: '/attendance/guests' },
      { label: 'Communications', href: '/attendance/comms' },
      { label: 'Accommodation', href: '/attendance/accommodation' },
      { label: 'Transportation', href: '/attendance/transportation' },
    ],
  },
  { label: 'Vendors', href: '/vendors', icon: MarketIcon },
  { label: 'Finance', href: '/finance', icon: FinanceIcon },
  { label: 'Website', href: '/website', icon: WebsiteIcon },
  { label: 'Apps', href: '/more', icon: AppsIcon },
]

function HomeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M224,120v96a8,8,0,0,1-8,8H160a8,8,0,0,1-8-8V164a4,4,0,0,0-4-4H108a4,4,0,0,0-4,4v52a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V120a16,16,0,0,1,4.69-11.31l80-80a16,16,0,0,1,22.62,0l80,80A16,16,0,0,1,224,120Z" />
    </svg>
  )
}

function AttendanceIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M64.12,147.8a4,4,0,0,1-4,4.2H16a8,8,0,0,1-7.8-6.17,8.35,8.35,0,0,1,1.62-6.93A67.79,67.79,0,0,1,37,117.51a40,40,0,1,1,66.46-35.8,3.94,3.94,0,0,1-2.27,4.18A64.08,64.08,0,0,0,64,144C64,145.28,64,146.54,64.12,147.8Zm182-8.91A67.76,67.76,0,0,0,219,117.51a40,40,0,1,0-66.46-35.8,3.94,3.94,0,0,0,2.27,4.18A64.08,64.08,0,0,1,192,144c0,1.28,0,2.54-.12,3.8a4,4,0,0,0,4,4.2H240a8,8,0,0,0,7.8-6.17A8.33,8.33,0,0,0,246.17,138.89Zm-89,43.18a48,48,0,1,0-58.37,0A72.13,72.13,0,0,0,65.07,212,8,8,0,0,0,72,224H184a8,8,0,0,0,6.93-12A72.15,72.15,0,0,0,157.19,182.07Z" />
    </svg>
  )
}

function MarketIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M231.69,93.81,217.35,43.6A16.07,16.07,0,0,0,202,32H54A16.07,16.07,0,0,0,38.65,43.6L24.31,93.81A7.94,7.94,0,0,0,24,96v16a40,40,0,0,0,16,32v72a8,8,0,0,0,8,8H208a8,8,0,0,0,8-8V144a40,40,0,0,0,16-32V96A7.94,7.94,0,0,0,231.69,93.81ZM88,112a24,24,0,0,1-35.12,21.26,7.88,7.88,0,0,0-1.82-1.06A24,24,0,0,1,40,112v-8H88Zm64,0a24,24,0,0,1-48,0v-8h48Zm64,0a24,24,0,0,1-11.07,20.2,8.08,8.08,0,0,0-1.8,1.05A24,24,0,0,1,168,112v-8h48Z" />
    </svg>
  )
}

function FinanceIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M120,161.94v65.34a4,4,0,0,1-4.46,4,104.28,104.28,0,0,1-84-64.5,4,4,0,0,1,2.69-5.34L97.32,144.5a4,4,0,0,1,4.35,1.66,32.25,32.25,0,0,0,15.59,12A4,4,0,0,1,120,161.94ZM128.06,24A8,8,0,0,0,120,32V88a7.94,7.94,0,0,0,7.87,8,32,32,0,0,1,10.86,62.15,4,4,0,0,0-2.73,3.79v65.34a4,4,0,0,0,4.45,4A104,104,0,0,0,128.06,24Zm-32,101.49a32,32,0,0,1,4.15-13.42l0-.07a8,8,0,0,0-.57-8.87A8.36,8.36,0,0,0,97.18,101L48.85,73.06A8,8,0,0,0,37.92,76,104.12,104.12,0,0,0,25,142.68,4,4,0,0,0,30,146L93.22,129A3.94,3.94,0,0,0,96.1,125.49Z" />
    </svg>
  )
}

function WebsiteIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M208,40H48A24,24,0,0,0,24,64V176a24,24,0,0,0,24,24h72v16H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16H136V200h72a24,24,0,0,0,24-24V64A24,24,0,0,0,208,40Zm0,144H48a8,8,0,0,1-8-8V160H216v16A8,8,0,0,1,208,184Z" />
    </svg>
  )
}

function AppsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M120,56v48a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40h48A16,16,0,0,1,120,56Zm80-16H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm-96,96H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm96,0H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Z" />
    </svg>
  )
}

function SidebarToggleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM64,152H48a8,8,0,0,1,0-16H64a8,8,0,0,1,0,16Zm0-32H48a8,8,0,0,1,0-16H64a8,8,0,0,1,0,16Zm0-32H48a8,8,0,0,1,0-16H64a8,8,0,0,1,0,16ZM216,200H88V56H216V200Z" />
    </svg>
  )
}

export function LeftNav({
  collapsed,
  onToggle,
}: {
  collapsed: boolean
  onToggle: () => void
}) {
  const pathname = usePathname()

  const [openModules, setOpenModules] = useState<Set<string>>(() => {
    const open = new Set<string>()
    for (const item of NAV) {
      if (item.children?.length && pathname.startsWith(item.href)) open.add(item.href)
    }
    return open
  })

  const toggleModule = (href: string) => {
    setOpenModules(prev => {
      const next = new Set(prev)
      if (next.has(href)) {
        next.delete(href)
      } else {
        next.add(href)
      }
      return next
    })
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')
  const isExactActive = (href: string) => pathname === href

  /* ── COLLAPSED: icon-only, transparent (gradient shows through) ── */
  if (collapsed) {
    return (
      <aside className="relative h-[calc(100vh-84px)] w-[92px] shrink-0 flex flex-col">
        <nav className="flex-1 py-5 pb-24 flex flex-col items-center gap-2">
          {NAV.map(item => {
            const Icon = item.icon
            const active = isActive(item.href)
            const href = item.children?.[0]?.href ?? item.href
            return (
              <div key={item.href} className="group relative">
                <Link
                  href={href}
                  className={cn(
                    'size-11 flex items-center justify-center rounded-lg transition-colors',
                    active ? 'bg-aroos-content' : 'hover:bg-[#1B1B1B]/[0.05]'
                  )}
                >
                  <Icon className="size-[26px] text-[#1B1B1B]" />
                </Link>

                <div className="pointer-events-none absolute left-20 top-0 z-50 min-w-48 rounded-2xl border border-[#1B1B1B]/10 bg-white px-3 py-3 opacity-0 shadow-[0_8px_24px_rgba(27,27,27,0.16)] transition-opacity duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
                  <p className="px-1.5 pb-1 text-xs font-semibold text-[#1B1B1B]/70">
                    {item.label}
                  </p>
                  <div className="flex flex-col gap-1">
                    {(item.children ?? [{ label: item.label, href: item.href }]).map(flyoutItem => (
                      <Link
                        key={flyoutItem.href}
                        href={flyoutItem.href}
                        className={cn(
                          'flex h-9 items-center rounded-lg px-1.5 text-sm text-[#1B1B1B] transition-colors hover:bg-[#1B1B1B]/[0.05]',
                          isActive(flyoutItem.href) && 'font-medium'
                        )}
                      >
                        {flyoutItem.label}
                      </Link>
                    ))}
                  </div>
                </div>

              </div>
            )
          })}
        </nav>
        <div className="absolute bottom-20 left-0 flex w-full justify-center">
          <Link
            href="/settings"
            className={cn(
              'size-11 flex items-center justify-center rounded-lg transition-colors',
              isActive('/settings') ? 'bg-aroos-content' : 'hover:bg-[#1B1B1B]/[0.05]'
            )}
            aria-label="Settings"
          >
            <SettingsIcon className="size-[26px] text-[#1B1B1B]" />
          </Link>
        </div>
        <div className="absolute bottom-8 left-0 flex w-full justify-center">
          <button
            onClick={onToggle}
            className="size-10 flex items-center justify-center rounded-lg hover:bg-[#1B1B1B]/[0.05] transition-colors"
            aria-label="Expand sidebar"
          >
            <SidebarToggleIcon className="size-7 text-[#1B1B1B]/60 rotate-180" />
          </button>
        </div>
      </aside>
    )
  }

  /* ── EXPANDED: transparent (gradient shows through) ── */
  return (
    <aside className="relative h-[calc(100vh-84px)] w-[340px] shrink-0 flex flex-col">
      <nav className="flex-1 px-4 py-5 pb-24 flex flex-col gap-2">
        {NAV.map(item => {
          const Icon = item.icon
          const hasChildren = (item.children?.length ?? 0) > 0
          const active = hasChildren ? isExactActive(item.href) : isActive(item.href)
          const isOpen = openModules.has(item.href)

          return (
            <div key={item.href}>
              {hasChildren ? (
                <div
                  className={cn(
                    'flex items-center gap-3 h-11 px-[17px] rounded-lg text-[17px] transition-colors cursor-pointer select-none',
                    active ? 'bg-aroos-content font-medium text-[#1B1B1B]' : 'font-normal text-[#1B1B1B] hover:bg-[#1B1B1B]/[0.05]'
                  )}
                  onClick={() => toggleModule(item.href)}
                >
                  <Icon className="size-[26px] shrink-0" />
                  <span className="flex-1 leading-none">{item.label}</span>
                  <ChevronDown
                    className={cn('size-[18px] shrink-0 opacity-50 transition-transform', isOpen && 'rotate-180')}
                  />
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 h-11 px-[17px] rounded-lg text-[17px] transition-colors',
                    active ? 'bg-aroos-content font-medium text-[#1B1B1B]' : 'font-normal text-[#1B1B1B] hover:bg-[#1B1B1B]/[0.05]'
                  )}
                >
                  <Icon className="size-[26px] shrink-0" />
                  <span className="flex-1 leading-none">{item.label}</span>
                </Link>
              )}

              {hasChildren && isOpen && (
                <div className="pl-10 mt-1 flex flex-col gap-1">
                  {item.children!.map(child => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={cn(
                        'flex items-center h-11 px-3 rounded-lg text-[17px] transition-colors',
                        isActive(child.href)
                          ? 'bg-aroos-content font-medium text-[#1B1B1B]'
                          : 'font-normal text-[#1B1B1B] hover:bg-[#1B1B1B]/[0.05]'
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

      <div className="absolute bottom-20 left-[26px] right-[26px]">
        <Link
          href="/settings"
          className={cn(
            'flex items-center gap-3 h-11 px-[17px] rounded-lg text-[17px] transition-colors',
            isActive('/settings') ? 'bg-aroos-content font-medium text-[#1B1B1B]' : 'font-normal text-[#1B1B1B] hover:bg-[#1B1B1B]/[0.05]'
          )}
        >
          <SettingsIcon className="size-[26px] shrink-0" />
          <span className="flex-1 leading-none">Settings</span>
        </Link>
      </div>
      <div className="absolute bottom-8 left-[26px]">
        <button
          onClick={onToggle}
          className="size-10 flex items-center justify-center rounded-lg hover:bg-[#1B1B1B]/[0.05] transition-colors"
          aria-label="Collapse sidebar"
        >
          <SidebarToggleIcon className="size-7 text-[#1B1B1B]/40" />
        </button>
      </div>
    </aside>
  )
}

function SettingsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M216,130.16q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.6,107.6,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.29,107.29,0,0,0-26.25-10.86,8,8,0,0,0-7.06,1.48L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.6,107.6,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06ZM128,168a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z" />
    </svg>
  )
}
