'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import { priceWithDiscount, type Product } from '@/lib/types'
import { useCart } from '@/components/cart/CartContext'
import { useFavorites } from '@/components/favorites/FavoritesContext'
import { useLang } from '@/components/LanguageContext'
import Header from '@/components/Header'
import { Footer } from '@/components/Sections'
import CartDrawer from '@/components/cart/CartDrawer'
import FavoritesDrawer from '@/components/favorites/FavoritesDrawer'
import FloatingContact from '@/components/FloatingContact'

function colorHex(label: string) {
  const key = (label || '').trim().toLowerCase()
  const map: Record<string, string> = {
    'білий': '#ffffff', 'white': '#ffffff',
    'чорний': '#1c1e18', 'black': '#1c1e18',
    'рожевий': '#f4b6c8', 'розовий': '#f4b6c8', 'pink': '#f4b6c8',
    'червоний': '#e2574c', 'red': '#e2574c',
    'синій': '#4a7bd0', 'blue': '#4a7bd0',
    'блакитний': '#8ecae6', 'light blue': '#8ecae6',
    'зелений': '#5aa469', 'green': '#5aa469',
    'класичний': '#c8e04f', 'classic': '#c8e04f', 'салатовий': '#c8e04f', 'лаймовий': '#c8e04f', 'lime': '#c8e04f',
    'жовтий': '#f2d24e', 'yellow': '#f2d24e',
    'сірий': '#b8bcb4', 'gray': '#b8bcb4', 'grey': '#b8bcb4',
    'бежевий': '#d9c9a8', 'beige': '#d9c9a8',
    'коричневий': '#8a6d4b', 'brown': '#8a6d4b',
    'фіолетовий': '#8a6dc4', 'purple': '#8a6dc4',
    'помаранчевий': '#e8964a', 'orange': '#e8964a',
  }
  return map[key] || '#d7dacc'
}
function colorText(hex: string) {
  const c = hex.replace('#', '')
  const r = parseInt(c.slice(0, 2), 16), g = parseInt(c.slice(2, 4), 16), b = parseInt(c.slice(4, 6), 16)
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return lum > 0.6 ? '#1c1e18' : '#ffffff'
}

export default function ProductPage() {
  const params = useParams()
  const id = Array.isArray(params.id) ? params.id[0] : (params.id as string)
  const { t, td } = useLang()
  const { add, open } = useCart()
  const { toggle, isFavorite } = useFavorites()
  const [p, setP] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [idx, setIdx] = useState(0)
  const [size, setSize] = useState<string | undefined>(undefined)
  const [color, setColor] = useState<string | undefined>(undefined)
  const [added, setAdded] = useState(false)
  const [lightbox, setLightbox] = useState(false)

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('tct_products').select('*').eq('id', id).single()
      if (data) {
        setP(data as Product)
        setSize((data as Product).size_options?.[0]?.label)
        setColor((data as Product).color_options?.[0]?.label)
      }
      setLoading(false)
    })()
  }, [id])

  const imgs = p ? (p.images && p.images.length ? p.images : (p.image ? [p.image] : [])) : []

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(false)
      else if (e.key === 'ArrowLeft') setIdx((i) => (i - 1 + imgs.length) % imgs.length)
      else if (e.key === 'ArrowRight') setIdx((i) => (i + 1) % imgs.length)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [lightbox, imgs.length])
  const hasDisc = p ? Number(p.discount) > 0 : false
  const finalPrice = p ? priceWithDiscount(p) : 0
  const fav = p ? isFavorite(p.id) : false

  const doAdd = () => {
    if (!p) return
    add(p, size, color)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <>
      <Header />
      <main className="container" style={{ padding: '32px 28px 60px', minHeight: '60vh' }}>
        <Link href="/#catalog" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: 14, display: 'inline-block', marginBottom: 24 }}>{t('back_to_catalog')}</Link>
        {loading ? (
          <p className="muted">{t('loading')}</p>
        ) : !p ? (
          <div style={{ padding: '40px 0' }}>
            <h1 style={{ fontSize: 24 }}>{t('product_not_found')}</h1>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 44, alignItems: 'start' }}>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Product',
                name: p.name,
                description: p.description || undefined,
                image: imgs,
                offers: {
                  '@type': 'Offer',
                  price: finalPrice,
                  priceCurrency: 'UAH',
                  availability: p.in_stock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
                },
              }) }}
            />
            <div>
              <div style={{ position: 'relative', aspectRatio: '1 / 1', background: 'var(--bg-soft)', borderRadius: 6, overflow: 'hidden', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {imgs[idx] ? <img src={imgs[idx]} alt={td(p.name)} onClick={() => setLightbox(true)} style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'zoom-in' }} /> : <span className="muted">{t('no_photo')}</span>}
                {hasDisc && <span className="badge" style={{ left: 10, background: '#ff6b6b', color: '#fff' }}>-{p.discount}%</span>}
              </div>
              {imgs.length > 1 && (
                <div style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
                  {imgs.map((im, i) => (
                    <button key={i} onClick={() => setIdx(i)} style={{ width: 64, height: 64, borderRadius: 4, overflow: 'hidden', border: i === idx ? '2px solid var(--ink)' : '1px solid var(--line)', padding: 0, cursor: 'pointer', background: 'none' }}>
                      <img src={im} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div>
              <span className="badge" style={{ position: 'static', display: 'inline-block', marginBottom: 12, background: p.in_stock ? '#c8e04f' : '#e2e4dd', color: '#1c1e18' }}>{p.in_stock ? t('f_instock') : t('f_outstock')}</span>
              <h1 style={{ fontSize: 30, fontWeight: 800, lineHeight: 1.15, marginBottom: 14 }}>{td(p.name)}</h1>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 22 }}>
                <span style={{ fontSize: 26, fontWeight: 800 }}>{finalPrice} ₴</span>
                {hasDisc && <span className="muted" style={{ textDecoration: 'line-through', fontSize: 17 }}>{p.price} ₴</span>}
              </div>
              {p.size_options?.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <label className="fld">{t('lbl_size')}</label>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {p.size_options.map((s) => (<button key={s.label} onClick={() => setSize(s.label)} className={'chip' + (size === s.label ? ' active' : '')}>{td(s.label)}</button>))}
                  </div>
                </div>
              )}
              {p.color_options?.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <label className="fld">{t('lbl_color')}</label>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {p.color_options.map((c) => (<button key={c.label} onClick={() => setColor(c.label)} className="chip" style={{ background: colorHex(c.label), color: colorText(colorHex(c.label)), borderColor: color === c.label ? 'var(--ink)' : colorHex(c.label), fontWeight: color === c.label ? 800 : 600 }}>{td(c.label)}</button>))}
                  </div>
                </div>
              )}
              <div style={{ display: 'flex', gap: 12, marginTop: 26, flexWrap: 'wrap' }}>
                <button className="btn btn-primary" disabled={!p.in_stock} onClick={doAdd} style={{ padding: '13px 28px', fontSize: 15 }}>{added ? t('added_to_cart') : t('add_to_cart')}</button>
                <button className="btn" disabled={!p.in_stock} onClick={() => { doAdd(); open() }} style={{ padding: '13px 28px', fontSize: 15 }}>{t('buy_now')}</button>
                <button onClick={() => toggle(p)} aria-label={fav ? t('fav_remove') : t('fav_add')} style={{ width: 48, height: 48, borderRadius: '50%', background: '#fff', border: '1px solid var(--line)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: fav ? '#e2574c' : 'var(--muted)', fontSize: 20 }}>{fav ? '♥' : '♡'}</span>
                </button>
              </div>
              {p.description && (
                <div style={{ marginTop: 34, borderTop: '1px solid var(--line)', paddingTop: 22 }}>
                  <h2 style={{ fontSize: 15, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 12 }}>{t('pd_details')}</h2>
                  <p className="muted" style={{ fontSize: 15, lineHeight: 1.8, whiteSpace: 'pre-line' }}>{td(p.description)}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      {lightbox && p && imgs[idx] && (
        <div
          onClick={() => setLightbox(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(20,21,17,.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox(false) }}
            aria-label="Close"
            style={{ position: 'absolute', top: 20, right: 24, width: 44, height: 44, borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,.12)', color: '#fff', fontSize: 22, lineHeight: 1, cursor: 'pointer' }}
          >
            ✕
          </button>
          {imgs.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setIdx((idx - 1 + imgs.length) % imgs.length) }}
              aria-label="Prev"
              style={{ position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)', width: 48, height: 48, borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,.12)', color: '#fff', fontSize: 24, cursor: 'pointer' }}
            >
              ‹
            </button>
          )}
          <img
            src={imgs[idx]}
            alt={td(p.name)}
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '92vw', maxHeight: '88vh', objectFit: 'contain', borderRadius: 4 }}
          />
          {imgs.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setIdx((idx + 1) % imgs.length) }}
              aria-label="Next"
              style={{ position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)', width: 48, height: 48, borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,.12)', color: '#fff', fontSize: 24, cursor: 'pointer' }}
            >
              ›
            </button>
          )}
        </div>
      )}
      <Footer />
      <CartDrawer />
      <FavoritesDrawer />
      <FloatingContact />
    </>
  )
}
