'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useCart } from '@/components/cart/CartContext'
import { useFavorites } from '@/components/favorites/FavoritesContext'

export default function Header() {
  const { open } = useCart()
  const { open: openFavorites } = useFavorites()
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
        Безкоштовна доставка · Ручна робота на замовлення
      </div>
      {/* Centered logo row */}
      <div className="container" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', transition: 'max-height .35s ease, opacity .3s ease', maxHeight: hideLogo ? 0 : 96, opacity: hideLogo ? 0 : 1 }}>
        <Link href="#top" style={{ display: 'flex', alignItems: 'center' }} aria-label="Ballcraft">
          <img src="/logo.png" alt="Ballcraft" style={{ height: 180, width: 'auto', display: 'block', transform: 'translateY(11px)' }} />
        </Link>
        <button className="burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Меню" aria-expanded={menuOpen} style={{ position: 'absolute', right: 0, background: 'none', border: 'none', padding: 8, cursor: 'pointer', color: 'var(--ink)' }}>
          <span style={{ display: 'block', width: 22, height: 1.5, background: 'currentColor' }} />
          <span style={{ display: 'block', width: 22, height: 1.5, background: 'currentColor', marginTop: 5 }} />
          <span style={{ display: 'block', width: 22, height: 1.5, background: 'currentColor', marginTop: 5 }} />
        </button>
      </div>
      {/* Centered nav + icons row below logo */}
      <nav className="nav-links" style={{ justifyContent: 'center', alignItems: 'center', gap: 28, transition: 'padding .35s ease', padding: scrolled ? '12px 0' : '4px 0 14px' }}>
        <Link href="#catalog" className="nav-link">Каталог</Link>
        <Link href="#about" className="nav-link">Про нас</Link>
        <Link href="#reviews" className="nav-link">Відгуки</Link>
        <Link href="#contacts" className="nav-link">Контакти</Link>
        <span style={{ display: 'inline-block', width: 1, height: 16, background: 'var(--line)', margin: '0 4px' }} />
        <Link href="/account" className="nav-link" aria-label="Кабінет" style={{ display: 'flex', alignItems: 'center' }}>
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-3.5 3.6-5.5 8-5.5s8 2 8 5.5"/></svg>
        </Link>
        <button onClick={openFavorites} aria-label="Вподобані" style={{ display: 'flex', alignItems: 'center', position: 'relative', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit' }}>
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12a1 1 0 0 1 1 1v17l-7-5-7 5V4a1 1 0 0 1 1-1z"/></svg>
          
        </button>
        <button aria-label="Кошик" onClick={open} style={{ display: 'flex', alignItems: 'center', position: 'relative', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit' }}>
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8h14l-1 12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1L5 8z"/><path d="M12 3l3 3M12 3L9 6M12 3v9"/></svg>
          
        </button>
      </nav>
      {menuOpen && (
        <div className="mobile-menu" style={{ borderTop: '1px solid var(--line)', background: 'var(--bg)' }}>
          <div className="container" style={{ display: 'flex', flexDirection: 'column', padding: '8px 20px 16px' }}>
            <Link href="#catalog" className="nav-link" onClick={closeMenu} style={{ padding: '12px 0', fontSize: 15, borderBottom: '1px solid var(--line)' }}>Каталог</Link>
            <Link href="#about" className="nav-link" onClick={closeMenu} style={{ padding: '12px 0', fontSize: 15, borderBottom: '1px solid var(--line)' }}>Про нас</Link>
            <Link href="#reviews" className="nav-link" onClick={closeMenu} style={{ padding: '12px 0', fontSize: 15, borderBottom: '1px solid var(--line)' }}>Відгуки</Link>
            <Link href="#contacts" className="nav-link" onClick={closeMenu} style={{ padding: '12px 0', fontSize: 15 }}>Контакти</Link>
          </div>
        </div>
      )}
    </header>
  )
}
