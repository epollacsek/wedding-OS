export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[linear-gradient(var(--aroos-bg-from)_0%,var(--aroos-bg-to)_100%)] bg-fixed">
      {children}
    </div>
  )
}
