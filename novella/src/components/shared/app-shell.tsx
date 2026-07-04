import type { ReactNode } from 'react';
import { BrandLogo } from './brand-logo';
import { PageFooter } from './page-footer';

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="nv-grid-bg relative flex min-h-screen flex-col">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-gradient-to-b from-blue-950/20 via-transparent to-transparent" />

      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#0a0f1a]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-4xl items-center px-4 sm:h-16 sm:px-6">
          <BrandLogo />
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
        {children}
      </main>

      <PageFooter />
    </div>
  );
}
