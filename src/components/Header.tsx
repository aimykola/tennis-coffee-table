'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/components/cart/CartContext'
import { useFavorites } from '@/components/favorites/FavoritesContext'

export default function Header() {
  const { count, open } = useCart()
  const { count: favCount, open: openFavorites } = useFavorites()
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 40, background: 'rgba(255,255,255,.94)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--line)' }}>
      {/* Announcement bar */}
      <div style={{ background: 'var(--bg-soft)', borderBottom: '1px solid var(--line)', textAlign: 'center', fontSize: 12, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', padding: '9px 0' }}>
        Безкоштовна доставка · Ручна робота на замовлення
      </div>

      {/* Centered logo row */}
      <div className="container" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', height: 92 }}>
        <Link href="#top" style={{ display: 'flex', alignItems: 'center' }} aria-label="Ballcraft">
          <img src="/logo.png" alt="Ballcraft" style={{ height: 72, width: 'auto', display: 'block', mixBlendMode: 'multiply' }} />
        </Link>

        {/* Right-side icons, absolutely positioned */}
        <div style={{ position: 'absolute', right: 0, display: 'flex', alignItems: 'center', gap: 18 }}>
          <Link href="/account" className="nav-link" aria-label="Кабінет" style={{ display: 'flex', alignItems: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </Link>
          <button onClick={openFavorites} aria-label="Вподобані" style={{ display: 'flex', alignItems: 'center', position: 'relative', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
            {favCount > 0 && <span style={{ position: 'absolute', top: -6, right: -8, background: 'var(--ink)', color: '#fff', borderRadius: '50%', fontSize: 10, width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>{favCount}</span>}
          </button>
          <button aria-label="Кошик" onClick={open} style={{ display: 'flex', alignItems: 'center', position: 'relative', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            {count > 0 && <span style={{ position: 'absolute', top: -6, right: -8, background: 'var(--ink)', color: '#fff', borderRadius: '50%', fontSize: 10, width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>{count}</span>}
          </button>
          <button className="burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Меню" aria-expanded={menuOpen} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--ink)' }}>
            <span style={{ display: 'block', width: 22, height: 1.5, background: 'currentColor' }} />
            <span style={{ display: 'block', width: 22, height: 1.5, background: 'currentColor', marginTop: 5 }} />
            <span style={{ display: 'block', width: 22, height: 1.5, background: 'currentColor', marginTop: 5 }} />
          </button>
        </div>
      </div>

      {/* Centered nav row below logo */}
      <nav className="nav-links" style={{ justifyContent: 'center', alignItems: 'center', gap: 40, paddingBottom: 16 }}>
        <Link href="#catalog" className="nav-link">Каталог</Link>
        <Link href="#about" className="nav-link">Про нас</Link>
        <Link href="#reviews" className="nav-link">Відгуки</Link>
        <Link href="#contacts" className="nav-link">Контакти</Link>
      </nav>

      {menuOpen && (
        <div className="mobile-menu" style={{ borderTop: '1px solid var(--line)', background: 'var(--bg)' }}>
          <div className="container" style={{ display: 'flex', flexDirection: 'column', padding: '8px 20px 16px' }}>
            <Link href="#catalog" className="nav-link" onClick={closeMenu} style={{ padding: '12px 0', fontSize: 16, borderBottom: '1px solid var(--line)' }}>Каталог</Link>
            <Link href="#about" className="nav-link" onClick={closeMenu} style={{ padding: '12px 0', fontSize: 16, borderBottom: '1px solid var(--line)' }}>Про нас</Link>
            <Link href="#reviews" className="nav-link" onClick={closeMenu} style={{ padding: '12px 0', fontSize: 16, borderBottom: '1px solid var(--line)' }}>Відгуки</Link>
            <Link href="#contacts" className="nav-link" onClick={closeMenu} style={{ padding: '12px 0', fontSize: 16 }}>Контакти</Link>
          </div>
        </div>
      )}
    </header>
  )
}
