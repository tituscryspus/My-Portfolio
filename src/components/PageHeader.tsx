import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

type PageHeaderProps = {
  title: string;
  description: string;
};

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden border-b border-white/10 bg-surface">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-primary/20 blur-[100px]" />
        <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-accent/20 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <nav className="mb-6 flex items-center gap-2 text-sm text-muted">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-primary"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-primary">{title}</span>
        </nav>

        <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{description}</p>
      </div>
    </div>
  );
}
