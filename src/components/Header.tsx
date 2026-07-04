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
    <header style={{ position: 'sticky', top: 0, zIndex: 40, background: 'rgba(255,255,255,.85)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--line)' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 66 }}>
        <Link href="#top" style={{ display: 'flex', alignItems: 'center' }}>
          <svg viewBox="0 0 200 250" role="img" aria-label="Tennis Coffee Table" style={{ height: 54, width: 'auto', display: 'block' }}>
            <defs>
              <linearGradient id="ball" x1="0" y1="0" x2="0.4" y2="1">
                <stop offset="0" stopColor="#eff35a" />
                <stop offset="0.55" stopColor="#d7e024" />
                <stop offset="1" stopColor="#b9c40f" />
              </linearGradient>
              <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#dff0f7" stopOpacity="0.85" />
                <stop offset="1" stopColor="#bcdce8" stopOpacity="0.55" />
              </linearGradient>
            </defs>
            <circle cx="30" cy="78" r="18" fill="url(#ball)" stroke="#111" strokeWidth="3" /><path d="M 14.700000000000001 69.9 Q 30 84.3 45.3 69.9" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" /><circle cx="65" cy="78" r="18" fill="url(#ball)" stroke="#111" strokeWidth="3" /><path d="M 49.7 69.9 Q 65 84.3 80.3 69.9" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" /><circle cx="100" cy="78" r="18" fill="url(#ball)" stroke="#111" strokeWidth="3" /><path d="M 84.7 69.9 Q 100 84.3 115.3 69.9" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" /><circle cx="135" cy="78" r="18" fill="url(#ball)" stroke="#111" strokeWidth="3" /><path d="M 119.7 69.9 Q 135 84.3 150.3 69.9" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" /><circle cx="170" cy="78" r="18" fill="url(#ball)" stroke="#111" strokeWidth="3" /><path d="M 154.7 69.9 Q 170 84.3 185.3 69.9" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" /><circle cx="47" cy="110" r="18" fill="url(#ball)" stroke="#111" strokeWidth="3" /><path d="M 31.700000000000003 101.9 Q 47 116.3 62.3 101.9" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" /><circle cx="82" cy="110" r="18" fill="url(#ball)" stroke="#111" strokeWidth="3" /><path d="M 66.7 101.9 Q 82 116.3 97.3 101.9" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" /><circle cx="117" cy="110" r="18" fill="url(#ball)" stroke="#111" strokeWidth="3" /><path d="M 101.7 101.9 Q 117 116.3 132.3 101.9" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" /><circle cx="152" cy="110" r="18" fill="url(#ball)" stroke="#111" strokeWidth="3" /><path d="M 136.7 101.9 Q 152 116.3 167.3 101.9" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" /><circle cx="30" cy="142" r="18" fill="url(#ball)" stroke="#111" strokeWidth="3" /><path d="M 14.700000000000001 133.9 Q 30 148.3 45.3 133.9" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" /><circle cx="65" cy="142" r="18" fill="url(#ball)" stroke="#111" strokeWidth="3" /><path d="M 49.7 133.9 Q 65 148.3 80.3 133.9" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" /><circle cx="100" cy="142" r="18" fill="url(#ball)" stroke="#111" strokeWidth="3" /><path d="M 84.7 133.9 Q 100 148.3 115.3 133.9" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" /><circle cx="135" cy="142" r="18" fill="url(#ball)" stroke="#111" strokeWidth="3" /><path d="M 119.7 133.9 Q 135 148.3 150.3 133.9" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" /><circle cx="170" cy="142" r="18" fill="url(#ball)" stroke="#111" strokeWidth="3" /><path d="M 154.7 133.9 Q 170 148.3 185.3 133.9" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            <ellipse cx="100" cy="52" rx="90" ry="19" fill="url(#glass)" stroke="#111" strokeWidth="4" />
            <path d="M 30 48 q 30 12 140 0" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
            <text x="100" y="207" fontFamily="Montserrat, Arial, sans-serif" fontSize="44" fontWeight="800" textAnchor="middle" fill="#141414" letterSpacing="1">TENNIS</text>
            <text x="100" y="236" fontFamily="Montserrat, Arial, sans-serif" fontSize="20" fontWeight="600" textAnchor="middle" fill="#141414" letterSpacing="3">COFFEE TABLE</text>
          </svg>
        </Link>
        <nav className="nav-links" style={{ alignItems: 'center', gap: 22, fontSize: 14, fontWeight: 600 }}>
          <Link href="#catalog" className="nav-link">Каталог</Link>
          <Link href="#reviews" className="nav-link">Відгуки</Link>
          <Link href="#contacts" className="nav-link">Контакти</Link>
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <Link href="/account" className="nav-link" aria-label="Кабінет" style={{ display: 'flex', alignItems: 'center' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></Link>
          <button onClick={openFavorites} aria-label="Вподобані" style={{ display: 'flex', alignItems: 'center', position: 'relative', background: 'none', border: 'none', padding: 0, color: 'inherit' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"></path></svg>
            {favCount > 0 && <span style={{ position: 'absolute', top: -8, right: -10, background: 'var(--accent-deep)', color: '#fff', borderRadius: '50%', fontSize: 10, width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{favCount}</span>}
          </button>
          <button className="btn btn-primary" onClick={open} style={{ padding: '9px 16px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>{count > 0 && <span>{count}</span>}
          </button>
          <button className="burger" onClick={() => setMenuOpen(o => !o)} aria-label="Меню" aria-expanded={menuOpen} style={{ background: 'none', border: 'none', padding: 6, cursor: 'pointer', color: 'var(--ink)' }}>
            <span style={{ display: 'block', width: 22, height: 2, background: 'currentColor', borderRadius: 2 }}></span>
            <span style={{ display: 'block', width: 22, height: 2, background: 'currentColor', borderRadius: 2, marginTop: 5 }}></span>
            <span style={{ display: 'block', width: 22, height: 2, background: 'currentColor', borderRadius: 2, marginTop: 5 }}></span>
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="mobile-menu" style={{ borderTop: '1px solid var(--line)', background: '#fff' }}>
          <div className="container" style={{ display: 'flex', flexDirection: 'column', padding: '8px 20px 16px' }}>
            <Link href="#catalog" className="nav-link" onClick={closeMenu} style={{ padding: '12px 0', fontSize: 16, fontWeight: 600, borderBottom: '1px solid var(--line)' }}>Каталог</Link>
            <Link href="#reviews" className="nav-link" onClick={closeMenu} style={{ padding: '12px 0', fontSize: 16, fontWeight: 600, borderBottom: '1px solid var(--line)' }}>Відгуки</Link>
            <Link href="#contacts" className="nav-link" onClick={closeMenu} style={{ padding: '12px 0', fontSize: 16, fontWeight: 600 }}>Контакти</Link>
          </div>
        </div>
      )}
    </header>
  )
}
