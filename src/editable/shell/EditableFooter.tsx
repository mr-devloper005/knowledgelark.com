'use client'

import Link from 'next/link'
import { ArrowUpRight, LogOut, MapPin } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

const footerLinks = [{ label: 'Listing', href: '/listing' }, { label: 'Home', href: '/' }, { label: 'About', href: '/about' }, { label: 'Search', href: '/search' }]

export function EditableFooter() {
  const { session, logout } = useEditableLocalAuthSession()
  return <footer className="bg-[#17152e] text-white">
    <div className="h-1 bg-[linear-gradient(90deg,#ff9445,#ffc166,#ff9445)]" />
    <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.35fr_.8fr_.8fr]">
      <div><Link href="/" className="inline-flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-[#ffc27d]/70 bg-[linear-gradient(145deg,#ffd06a,#ff9445)] p-1.5 shadow-[0_8px_24px_rgba(255,148,69,.18)]"><img src="/favicon.png" alt={`${SITE_CONFIG.name} logo`} className="h-full w-full object-contain" /></span><span className="editable-display text-2xl font-bold">Knowledge<span className="text-[#ff9c45]">Lark</span></span></Link><p className="mt-5 max-w-md text-sm leading-7 text-white/60">Useful articles and local business listings, brought together in one clear place for easier research, comparison, and discovery.</p><p className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.18em] text-[#ffad61]"><MapPin className="h-4 w-4" /> Explore what matters nearby</p></div>
      <div><h3 className="text-xs font-bold uppercase tracking-[.2em] text-[#ffad61]">Navigate</h3><div className="mt-5 grid gap-3">{footerLinks.map(item => <Link key={item.href} href={item.href} className="inline-flex items-center gap-2 text-sm text-white/65 hover:text-white">{item.label}<ArrowUpRight className="h-3.5 w-3.5" /></Link>)}</div></div>
      <div><h3 className="text-xs font-bold uppercase tracking-[.2em] text-[#ffad61]">Account</h3><div className="mt-5 grid gap-3">{session ? <><Link href="/create" className="text-sm text-white/65 hover:text-white">Create</Link><span className="text-sm font-semibold text-white">{session.name || session.email}</span><button onClick={logout} className="inline-flex items-center gap-2 text-left text-sm text-white/65 hover:text-white"><LogOut className="h-4 w-4" />Logout</button></> : <><Link href="/login" className="text-sm text-white/65 hover:text-white">Login</Link><Link href="/signup" className="text-sm text-white/65 hover:text-white">Sign up</Link></>}</div></div>
    </div>
    <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-white/45">© {new Date().getFullYear()} {SITE_CONFIG.name}. Helpful knowledge, thoughtfully organized.</div>
  </footer>
}
