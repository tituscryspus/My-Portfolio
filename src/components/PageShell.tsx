export default function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen pt-28 sm:pt-32">{children}</div>;
}
