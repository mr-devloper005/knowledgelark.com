import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: pagesContent.auth.login.metadataDescription })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="relative overflow-hidden bg-[linear-gradient(135deg,#332c67,#24113e_68%,#180324)] text-white">
        <div className="editable-glow pointer-events-none absolute -right-28 -top-36 h-96 w-96 rounded-full bg-[#ff9445]/20 blur-3xl" />
        <section className="relative mx-auto grid min-h-[calc(100vh-8rem)] max-w-[var(--editable-container)] items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8">
          <div className="max-w-2xl">
            <span className="mb-6 block h-1 w-14 rounded-full bg-[#ff9445]" />
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ffad61]">{pagesContent.auth.login.badge}</p>
            <h1 className="mt-4 max-w-xl text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">{pagesContent.auth.login.title}</h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-white/65">{pagesContent.auth.login.description}</p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white p-7 text-[#211d3f] shadow-[0_24px_70px_rgba(10,2,30,.35)] sm:p-9">
            <h2 className="text-2xl font-bold tracking-[-0.01em]">{pagesContent.auth.login.formTitle}</h2>
            <EditableLocalLoginForm />
            <p className="mt-6 text-sm text-[var(--slot4-muted-text)]">New here? <Link href="/signup" className="font-semibold text-[var(--slot4-accent)] underline-offset-4 hover:underline">{pagesContent.auth.login.createCta}</Link></p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
