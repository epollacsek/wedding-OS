'use client'

import type { SVGProps } from 'react'
import { useEffect, useRef, useState } from 'react'
import { Bell, ChevronDown, HelpCircle, Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const ICON_BTN =
  'size-[46px] flex items-center justify-center rounded-full bg-aroos-chrome text-[#1B1B1B] hover:bg-aroos-chrome-hover transition-colors'

export function TopNav({ collapsed = false }: { collapsed?: boolean }) {
  const [searchOpen, setSearchOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!searchOpen) return

    searchInputRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSearchOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [searchOpen])

  return (
    <header className="relative h-[84px] shrink-0 flex items-center gap-4 px-6 z-50">
      {searchOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[80] cursor-default bg-[#1B1B1B]/45 animate-in fade-in duration-500"
            aria-label="Close search"
            onClick={() => setSearchOpen(false)}
          />
          <div
            className={cn(
              'fixed right-0 top-4 z-[90]',
              collapsed ? 'left-[78px]' : 'left-[300px]'
            )}
          >
            <div className="absolute left-1/2 flex h-11 w-[min(560px,calc(100%_-_48px))] -translate-x-1/2 items-center gap-3 rounded-full bg-white px-4 shadow-[0_10px_32px_rgba(27,27,27,0.18)] origin-center animate-in fade-in zoom-in-50 duration-500 xl:h-[52px] xl:w-[min(846px,calc(90%_-_48px))] xl:px-5">
              <Search className="size-[22px] shrink-0 text-[#1B1B1B]/70" />
              <input
                ref={searchInputRef}
                className="min-w-0 flex-1 bg-transparent text-base font-normal text-[#1B1B1B] outline-none placeholder:text-[#1B1B1B]/65 xl:text-[19px]"
                placeholder="Search guests, vendors, pages or ask Aroos AI"
                type="search"
              />
              <button
                type="button"
                className="size-9 shrink-0 rounded-full text-[#1B1B1B]/70 transition-colors hover:bg-[#1B1B1B]/[0.08] hover:text-[#1B1B1B]"
                aria-label="Close search"
                onClick={() => setSearchOpen(false)}
              >
                <X className="m-auto size-[22px]" />
              </button>
            </div>
          </div>
        </>
      )}

      <a
        href="/home"
        className={cn(
          'flex items-center shrink-0 transition-[width] duration-200',
          collapsed ? 'w-[78px] justify-center' : 'w-[300px]'
        )}
      >
        <span className="text-[#1B1B1B] font-bold text-[28px] tracking-tight leading-none">
          {collapsed ? 'a.' : 'aroos.'}
        </span>
      </a>

      <div
        className={cn(
          'pointer-events-none absolute right-0 top-1/2 z-10 flex -translate-y-1/2 justify-start pl-4 min-[1500px]:justify-center min-[1500px]:pl-0',
          collapsed ? 'left-[78px]' : 'left-[300px]'
        )}
      >
        <button
          type="button"
          className="pointer-events-auto h-12 w-[min(430px,calc(100%_-_260px))] min-w-44 flex items-center gap-4 rounded-full bg-aroos-chrome px-5 text-left text-[#1B1B1B] transition-colors hover:bg-aroos-chrome-hover min-[1500px]:w-[min(713px,calc(90%_-_48px))]"
          aria-expanded={searchOpen}
          onClick={() => setSearchOpen(true)}
          onPointerDown={() => setSearchOpen(true)}
        >
          <Search className="size-[22px] shrink-0 text-[#1B1B1B]/70" />
          <span className="min-w-0 flex-1 truncate text-[19px] font-normal text-[#1B1B1B]/75">
            Search guests, vendors, pages or ask Aroos AI
          </span>
        </button>
      </div>

      <div className="relative z-20 ml-auto flex items-center gap-2 shrink-0">
        <button className={ICON_BTN} aria-label="Aroos AI">
          <AiSparkleIcon className="size-[25px]" />
        </button>
        <button className={ICON_BTN} aria-label="Settings">
          <SettingsIcon className="size-[23px]" />
        </button>
        <button className={ICON_BTN} aria-label="Help">
          <HelpCircle className="size-[23px]" />
        </button>
        <button className={ICON_BTN} aria-label="Notifications">
          <Bell className="size-[23px]" />
        </button>

        <button className="h-[52px] min-w-[350px] flex items-center gap-3 rounded-full bg-aroos-chrome py-1 pl-1 pr-4 text-[#1B1B1B] transition-colors hover:bg-aroos-chrome-hover">
          <div className="size-11 rounded-full bg-aroos-avatar flex items-center justify-center text-base font-medium text-[#1B1B1B] select-none shrink-0">
            EP
          </div>
          <div className="min-w-0 flex-1 text-left leading-tight px-1 hidden md:block">
            <p className="truncate text-xl font-medium leading-tight text-[#1B1B1B]">Eduardo Pollacsek</p>
            <p className="truncate text-[15px] font-normal leading-tight text-[#1B1B1B]/60">Aroos | Couple</p>
          </div>
          <ChevronDown className="size-6 shrink-0 text-[#1B1B1B]/70" />
        </button>
      </div>
    </header>
  )
}

function SettingsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 256 288" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M216,130.16q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.6,107.6,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.29,107.29,0,0,0-26.25-10.86,8,8,0,0,0-7.06,1.48L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.6,107.6,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06ZM128,168a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z" />
    </svg>
  )
}

function AiSparkleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M93.8,63.8c1.2-3.9,6.7-3.9,7.9,0l8.8,28.4a74.5,74.5,0,0,0,49.3,49.3l28.4,8.8c3.9,1.2,3.9,6.7,0,7.9L159.8,167a74.5,74.5,0,0,0-49.3,49.3l-8.8,28.4c-1.2,3.9-6.7,3.9-7.9,0L85,216.3A74.5,74.5,0,0,0,35.7,167L7.3,158.2c-3.9-1.2-3.9-6.7,0-7.9l28.4-8.8A74.5,74.5,0,0,0,85,92.2Z" />
      <path d="M174.6,10.3c1-3.1,5.4-3.1,6.4,0l5.2,16.8A44.1,44.1,0,0,0,215.4,56.3l16.8,5.2c3.1,1,3.1,5.4,0,6.4l-16.8,5.2a44.1,44.1,0,0,0-29.2,29.2L181,119.1c-1,3.1-5.4,3.1-6.4,0l-5.2-16.8a44.1,44.1,0,0,0-29.2-29.2l-16.8-5.2c-3.1-1-3.1-5.4,0-6.4l16.8-5.2a44.1,44.1,0,0,0,29.2-29.2Z" />
      <path d="M174.6,165.3c1-3.1,5.4-3.1,6.4,0l5.2,16.8a44.1,44.1,0,0,0,29.2,29.2l16.8,5.2c3.1,1,3.1,5.4,0,6.4l-16.8,5.2a44.1,44.1,0,0,0-29.2,29.2L181,274.1c-1,3.1-5.4,3.1-6.4,0l-5.2-16.8a44.1,44.1,0,0,0-29.2-29.2l-16.8-5.2c-3.1-1-3.1-5.4,0-6.4l16.8-5.2a44.1,44.1,0,0,0,29.2-29.2Z" />
    </svg>
  )
}
