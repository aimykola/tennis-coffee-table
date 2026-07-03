'use client'
import Link from 'next/link'
import { useCart } from '@/components/cart/CartContext'

export default function Header() {
  const { count, open } = useCart()
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 40, background: 'rgba(255,255,255,.85)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--line)' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 66 }}>
        <Link href="#top" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/logo.png" alt="Tennis Coffee Table" style={{ height: 58, width: 58, objectFit: 'contain', display: 'block' }} />
        </Link>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 22, fontSize: 14, fontWeight: 600 }}>
          <Link href="#catalog" className="nav-link">Каталог</Link>
          <Link href="#reviews" className="nav-link">Відгуки</Link>
          <Link href="#contacts" className="nav-link">Контакти</Link>
<Link href="/account" className="nav-link" aria-label="Кабінет" style={{ display: 'flex', alignItems: 'center' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></Link>
          <button className="btn btn-primary" onClick={open} style={{ padding: '9px 16px' }}>
            Кошик{count > 0 ? ` · ${count}` : ''}
          </button>
        </nav>
      </div>
    </header>
  )
}
