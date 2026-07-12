'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useCart } from '@/components/cart/CartContext'
import { useFavorites } from '@/components/favorites/FavoritesContext'
import { useLang } from '@/components/LanguageContext'

export default function Header() {
  const { open, count } = useCart()
  const { open: openFavorites, count: favCount } = useFavorites()
  const { t } = useLang()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    const onResize = () => setIsDesktop(window.innerWidth > 720)
    onScroll()
    onResize()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])
  const hideLogo = scrolled && isDesktop
  const closeMenu = () => setMenuOpen(false)
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 40, background: 'rgba(255,255,255,.94)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--line)' }}>
      {/* Announcement bar */}
      <div style={{ background: 'var(--bg-soft)', borderBottom: scrolled ? 'none' : '1px solid var(--line)', textAlign: 'center', fontSize: 12, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', overflow: 'hidden', transition: 'max-height .35s ease, padding .35s ease, opacity .3s ease', maxHeight: scrolled ? 0 : 30, paddingTop: scrolled ? 0 : 4, paddingBottom: scrolled ? 0 : 4, opacity: scrolled ? 0 : 1 }}>
        {t('topbar')}
      </div>
      {/* Centered logo row */}
      <div className="container" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', transition: 'max-height .35s ease, opacity .3s ease', maxHeight: hideLogo ? 0 : 96, opacity: hideLogo ? 0 : 1 }}>
        <Link href="#top" style={{ display: 'flex', alignItems: 'center' }} aria-label="Ballcraft">
          <img src="/logo.png" alt="Ballcraft" style={{ height: 180, width: 'auto', display: 'block', transform: 'translateY(11px)' }} />
        </Link>
        <button className="burger" onClick={() => setMenuOpen(!menuOpen)} aria-label={t('aria_menu')} aria-expanded={menuOpen} style={{ position: 'absolute', right: 0, background: 'none', border: 'none', padding: 8, cursor: 'pointer', color: 'var(--ink)' }}>
          <span style={{ display: 'block', width: 22, height: 1.5, background: 'currentColor' }} />
          <span style={{ display: 'block', width: 22, height: 1.5, background: 'currentColor', marginTop: 5 }} />
          <span style={{ display: 'block', width: 22, height: 1.5, background: 'currentColor', marginTop: 5 }} />
        </button>
      </div>
      {/* Centered nav + icons row below logo */}
      <nav className="nav-links" style={{ justifyContent: 'center', alignItems: 'center', gap: 28, transition: 'padding .35s ease', padding: scrolled ? '12px 0' : '4px 0 14px' }}>
        <Link href="#catalog" className="nav-link">{t('nav_catalog')}</Link>
        <Link href="#about" className="nav-link">{t('nav_about')}</Link>
        <Link href="#reviews" className="nav-link">{t('nav_reviews')}</Link>
        <Link href="#contacts" className="nav-link">{t('nav_contacts')}</Link>
        <span style={{ display: 'inline-block', width: 1, height: 16, background: 'var(--line)', margin: '0 4px' }} />
        <Link href="/account" className="nav-link" aria-label={t('aria_account')} style={{ display: 'flex', alignItems: 'center' }}>
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        </Link>
        <button onClick={openFavorites} aria-label={t('aria_favorites')} style={{ display: 'flex', alignItems: 'center', position: 'relative', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit' }}>
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
          {favCount > 0 && (<span style={{ position: 'absolute', top: -6, right: -8, minWidth: 16, height: 16, padding: '0 4px', borderRadius: 8, background: 'var(--ink)', color: '#fff', fontSize: 10, fontWeight: 600, lineHeight: '16px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{favCount}</span>)}
          
        </button>
        <button aria-label={t('aria_cart')} onClick={open} style={{ display: 'flex', alignItems: 'center', position: 'relative', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit' }}>
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
          
                  {count > 0 && (<span style={{ position: 'absolute', top: -6, right: -8, minWidth: 16, height: 16, padding: '0 4px', borderRadius: 8, background: 'var(--ink)', color: '#fff', fontSize: 10, fontWeight: 600, lineHeight: '16px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{count}</span>)}
        </button>
      </nav>
      {menuOpen && (
        <div className="mobile-menu" style={{ borderTop: '1px solid var(--line)', background: 'var(--bg)' }}>
          <div className="container" style={{ display: 'flex', flexDirection: 'column', padding: '8px 20px 16px' }}>
            <Link href="#catalog" className="nav-link" onClick={closeMenu} style={{ padding: '12px 0', fontSize: 15, borderBottom: '1px solid var(--line)' }}>{t('nav_catalog')}</Link>
            <Link href="#about" className="nav-link" onClick={closeMenu} style={{ padding: '12px 0', fontSize: 15, borderBottom: '1px solid var(--line)' }}>{t('nav_about')}</Link>
            <Link href="#reviews" className="nav-link" onClick={closeMenu} style={{ padding: '12px 0', fontSize: 15, borderBottom: '1px solid var(--line)' }}>{t('nav_reviews')}</Link>
            <Link href="#contacts" className="nav-link" onClick={closeMenu} style={{ padding: '12px 0', fontSize: 15 }}>{t('nav_contacts')}</Link>
          </div>
        </div>
      )}
    </header>
  )
}
