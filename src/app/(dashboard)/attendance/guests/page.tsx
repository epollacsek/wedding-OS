import Link from 'next/link'

export default function GuestsPage() {
  return (
    <div className="px-8 pt-6 pb-8">
      <nav className="flex items-center gap-2 text-sm font-normal text-[#1B1B1B]/55" aria-label="Breadcrumb">
        <Link href="/attendance" className="transition-colors hover:text-[#1B1B1B]">
          Attendance
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-[#1B1B1B]/70" aria-current="page">
          Guest Directory
        </span>
      </nav>
      <h1 className="mt-4 text-[43px] font-bold leading-10 text-[#1B1B1B]">Guest Directory</h1>
    </div>
  )
}
