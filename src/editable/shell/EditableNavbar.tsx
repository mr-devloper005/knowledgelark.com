'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, X, LogOut, Plus, UserRound } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

const links = [
  { label: 'Listing', href: '/listing' },
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Search', href: '/search' },
]

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const visibleLinks = session ? [...links, { label: 'Create', href: '/create' }] : links

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#30295f] text-white shadow-[0_10px_35px_rgba(20,12,55,.14)]">
      <nav className="mx-auto flex min-h-[70px] max-w-[var(--editable-container)] items-center gap-7 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-3" aria-label={`${SITE_CONFIG.name} home`}>
          <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[#ffc27d]/70 bg-[linear-gradient(145deg,#ffd06a,#ff9445)] p-1.5 shadow-[0_8px_24px_rgba(255,148,69,.24)]">
            <img src="/favicon.png" alt={`${SITE_CONFIG.name} logo`} className="h-full w-full object-contain" />
          </span>
          <span className="editable-display text-xl font-bold tracking-[-.03em]">Knowledge<span className="text-[#ff9c45]">Lark</span></span>
        </Link>
        <div className="hidden items-center gap-1 lg:flex">
          {visibleLinks.map((item) => {
            const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`))
            return <Link key={item.href} href={item.href} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${active ? 'bg-white/12 text-white' : 'text-white/72 hover:bg-white/8 hover:text-white'}`}>{item.label}</Link>
          })}
        </div>
        <form action="/search" className="ml-auto hidden w-full max-w-xs items-center rounded-full border border-white/15 bg-white/8 px-4 md:flex">
          <Search className="h-4 w-4 text-[#ffad61]" />
          <input name="q" type="search" placeholder="Find stories or services" className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/50" />
        </form>
        <div className="flex shrink-0 items-center gap-2">
          {session ? <>
            <Link href="/create" className="hidden items-center gap-2 rounded-lg bg-[#ff9445] px-4 py-2.5 text-sm font-bold text-[#21163c] sm:inline-flex"><Plus className="h-4 w-4" /> Create</Link>
            <span className="hidden items-center gap-2 text-sm font-semibold sm:inline-flex"><UserRound className="h-4 w-4 text-[#ffad61]" />{session.name || session.email}</span>
            <button type="button" onClick={logout} aria-label="Logout" className="rounded-full p-2.5 text-white/75 hover:bg-white/10 hover:text-white"><LogOut className="h-4 w-4" /></button>
          </> : <>
            <Link href="/login" className="hidden px-3 py-2 text-sm font-semibold text-white/80 hover:text-white sm:block">Login</Link>
            <Link href="/signup" className="hidden rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-[#2f285e] sm:block">Sign up</Link>
          </>}
          <button type="button" onClick={() => setOpen(!open)} className="rounded-lg border border-white/15 p-2 lg:hidden" aria-label="Toggle menu">{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
      </nav>
      {open ? <div className="border-t border-white/10 bg-[#292250] px-4 py-4 lg:hidden">
        <form action="/search" className="mb-3 flex items-center rounded-xl bg-white px-3 text-[#241d49]"><Search className="h-4 w-4" /><input name="q" placeholder="Search" className="w-full px-3 py-3 outline-none" /></form>
        {visibleLinks.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="block rounded-lg px-4 py-3 font-semibold text-white/80 hover:bg-white/10">{item.label}</Link>)}
        {!session ? <div className="mt-3 grid grid-cols-2 gap-2"><Link href="/login" className="rounded-lg border border-white/20 p-3 text-center font-semibold">Login</Link><Link href="/signup" className="rounded-lg bg-[#ff9445] p-3 text-center font-bold text-[#21163c]">Sign up</Link></div> : null}
      </div> : null}
    </header>
  )
}
