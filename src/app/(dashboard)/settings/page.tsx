import Link from 'next/link'

export default function SettingsPage() {
  return (
    <div className="px-8 pt-6 pb-16 max-w-[780px]">
      <nav className="flex items-center gap-2 text-sm font-normal text-[#1B1B1B]/55" aria-label="Breadcrumb">
        <Link href="/home" className="transition-colors hover:text-[#1B1B1B]">Home</Link>
        <span aria-hidden="true">/</span>
        <span className="text-[#1B1B1B]/70" aria-current="page">Event Settings</span>
      </nav>
      <h1 className="mt-4 text-[43px] font-bold leading-10 text-[#1B1B1B]">Event Settings</h1>
      <p className="mt-3 text-[17px] text-[#1B1B1B]/50">Configure everything about this event before you start planning.</p>

      {/* ── Event Basics ── */}
      <section className="mt-10">
        <h2 className="text-[22px] font-semibold text-[#1B1B1B]">Event basics</h2>
        <p className="mt-1 text-[15px] text-[#1B1B1B]/50">The core details that define this event.</p>

        <div className="mt-6 flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-5">
            <Field label="Event name" hint="e.g. Eduardo & Ana's Wedding">
              <input type="text" placeholder="Eduardo & Ana's Wedding" className={INPUT} />
            </Field>
            <Field label="Event type">
              <select className={INPUT}>
                <option value="">Select type</option>
                <option>Wedding</option>
                <option>Corporate</option>
                <option>Birthday</option>
                <option>Other</option>
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <Field label="Ceremony date">
              <input type="date" className={INPUT} />
            </Field>
            <Field label="Reception date" hint="Leave empty if same day as ceremony">
              <input type="date" className={INPUT} />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <Field label="Ceremony venue">
              <input type="text" placeholder="Church of the Holy Cross, Lisbon" className={INPUT} />
            </Field>
            <Field label="Reception venue" hint="Leave empty if same as ceremony">
              <input type="text" placeholder="Palácio de Queluz, Sintra" className={INPUT} />
            </Field>
          </div>

          <Field label="Expected guest count" hint="Your best estimate — you can adjust later">
            <input type="number" min={0} placeholder="180" className={`${INPUT} max-w-[180px]`} />
          </Field>
        </div>
      </section>

      <Divider />

      {/* ── Identity ── */}
      <section>
        <h2 className="text-[22px] font-semibold text-[#1B1B1B]">Identity</h2>
        <p className="mt-1 text-[15px] text-[#1B1B1B]/50">How this event looks across the platform and on your wedding website.</p>

        <div className="mt-6 flex flex-col gap-5">
          <Field label="Cover colour" hint="Used on the event card and website header">
            <div className="flex items-center gap-3">
              {['#CBBDEA', '#A9C2C8', '#FFD6A5', '#B5EAD7', '#FF9AA2', '#2F2B25'].map(color => (
                <button
                  key={color}
                  type="button"
                  aria-label={color}
                  className="size-9 rounded-full border-2 border-white shadow-md transition-transform hover:scale-110"
                  style={{ backgroundColor: color }}
                />
              ))}
              <input type="color" className="size-9 cursor-pointer rounded-full border border-[#1B1B1B]/15 bg-transparent p-0.5" title="Custom colour" />
            </div>
          </Field>

          <div className="grid grid-cols-2 gap-5">
            <Field label="Host 1 name" hint="Displayed on the wedding website">
              <input type="text" placeholder="Eduardo" className={INPUT} />
            </Field>
            <Field label="Host 2 name" hint="Leave empty for solo events">
              <input type="text" placeholder="Ana" className={INPUT} />
            </Field>
          </div>

          <Field label="Tagline" hint="Short line shown on your wedding website">
            <input type="text" placeholder="Together at last." className={INPUT} />
          </Field>
        </div>
      </section>

      <Divider />

      {/* ── Your Team ── */}
      <section>
        <h2 className="text-[22px] font-semibold text-[#1B1B1B]">Your team</h2>
        <p className="mt-1 text-[15px] text-[#1B1B1B]/50">People who help you manage this event.</p>

        <div className="mt-6 flex flex-col gap-4">
          {[
            { role: 'Co-host', placeholder: 'ana@example.com', hint: 'Full admin access' },
            { role: 'Wedding planner', placeholder: 'planner@agency.com', hint: 'Can edit everything except billing' },
            { role: 'MOH / Best Man', placeholder: 'moh@example.com', hint: 'Can manage guests and communications' },
          ].map(({ role, placeholder, hint }) => (
            <div key={role} className="flex items-center gap-4">
              <div className="w-[180px] shrink-0">
                <p className="text-[15px] font-medium text-[#1B1B1B]">{role}</p>
                <p className="text-[13px] text-[#1B1B1B]/50">{hint}</p>
              </div>
              <input type="email" placeholder={placeholder} className={`${INPUT} flex-1`} />
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── Budget ── */}
      <section>
        <h2 className="text-[22px] font-semibold text-[#1B1B1B]">Budget</h2>
        <p className="mt-1 text-[15px] text-[#1B1B1B]/50">Sets the baseline for the Finance module.</p>

        <div className="mt-6 grid grid-cols-2 gap-5">
          <Field label="Total budget">
            <div className="flex items-center gap-2">
              <select className={`${INPUT} w-[90px] shrink-0`}>
                <option>EUR</option>
                <option>USD</option>
                <option>GBP</option>
                <option>BRL</option>
              </select>
              <input type="number" min={0} placeholder="50 000" className={`${INPUT} flex-1`} />
            </div>
          </Field>
        </div>
      </section>

      <Divider />

      {/* ── Communications ── */}
      <section>
        <h2 className="text-[22px] font-semibold text-[#1B1B1B]">Communications</h2>
        <p className="mt-1 text-[15px] text-[#1B1B1B]/50">How and when you communicate with guests.</p>

        <div className="mt-6 flex flex-col gap-5">
          <Field label="RSVP deadline">
            <input type="date" className={`${INPUT} max-w-[220px]`} />
          </Field>

          <Field label="Default language for guest comms">
            <select className={`${INPUT} max-w-[260px]`}>
              <option>English</option>
              <option>Portuguese</option>
              <option>Spanish</option>
              <option>French</option>
              <option>Italian</option>
            </select>
          </Field>

          <div className="flex flex-col gap-3">
            <p className="text-[15px] font-medium text-[#1B1B1B]">Notification channels</p>
            {[
              { label: 'Email', sub: 'Send RSVP confirmations and reminders by email' },
              { label: 'WhatsApp', sub: 'Send updates and reminders via WhatsApp' },
            ].map(({ label, sub }) => (
              <label key={label} className="flex cursor-pointer items-center justify-between rounded-xl border border-[#1B1B1B]/10 bg-white px-5 py-4">
                <div>
                  <p className="text-[15px] font-medium text-[#1B1B1B]">{label}</p>
                  <p className="text-[13px] text-[#1B1B1B]/50">{sub}</p>
                </div>
                <input type="checkbox" defaultChecked className="size-5 cursor-pointer accent-aroos-accent" />
              </label>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── Save ── */}
      <div className="flex justify-end">
        <button type="button" className="h-11 rounded-full bg-aroos-accent px-8 text-[15px] font-semibold text-white transition-opacity hover:opacity-90">
          Save changes
        </button>
      </div>

      <Divider />

      {/* ── Danger Zone ── */}
      <section>
        <h2 className="text-[22px] font-semibold text-red-600">Danger zone</h2>
        <p className="mt-1 text-[15px] text-[#1B1B1B]/50">These actions are irreversible. Please be certain.</p>

        <div className="mt-6 flex flex-col gap-3">
          {[
            { label: 'Archive event', sub: 'Hide this event from your list. You can restore it later.' },
            { label: 'Transfer ownership', sub: 'Hand over full control to another team member.' },
            { label: 'Delete event', sub: 'Permanently delete this event and all its data.', destructive: true },
          ].map(({ label, sub, destructive }) => (
            <div key={label} className="flex items-center justify-between rounded-xl border border-[#1B1B1B]/10 bg-white px-5 py-4">
              <div>
                <p className={`text-[15px] font-medium ${destructive ? 'text-red-600' : 'text-[#1B1B1B]'}`}>{label}</p>
                <p className="text-[13px] text-[#1B1B1B]/50">{sub}</p>
              </div>
              <button type="button" className={`h-9 rounded-full border px-5 text-[13px] font-semibold transition-colors ${destructive ? 'border-red-200 text-red-600 hover:bg-red-50' : 'border-[#1B1B1B]/15 text-[#1B1B1B] hover:bg-[#1B1B1B]/[0.05]'}`}>
                {label}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

const INPUT = 'h-11 w-full rounded-lg border border-[#1B1B1B]/15 bg-white px-4 text-[15px] text-[#1B1B1B] outline-none placeholder:text-[#1B1B1B]/35 focus:border-aroos-accent focus:ring-2 focus:ring-aroos-accent/15'

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[15px] font-medium text-[#1B1B1B]">{label}</label>
      {hint && <p className="text-[13px] text-[#1B1B1B]/50">{hint}</p>}
      {children}
    </div>
  )
}

function Divider() {
  return <div className="my-10 border-t border-[#1B1B1B]/08" />
}
