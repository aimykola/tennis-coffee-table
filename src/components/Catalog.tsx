'use client'
import { useEffect, useMemo, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useCart } from '@/components/cart/CartContext'
import { useFavorites } from '@/components/favorites/FavoritesContext'
import { priceWithDiscount, type Product, type Category } from '@/lib/types'

function ProductCard({ p }: { p: Product }) {
  const { add } = useCart()
  const { toggle, isFavorite } = useFavorites()
  const fav = isFavorite(p.id)
  const [idx, setIdx] = useState(0)
  const [size, setSize] = useState<string | undefined>(p.size_options?.[0]?.label)
  const [color, setColor] = useState<string | undefined>(p.color_options?.[0]?.label)
  const imgs = (p.images && p.images.length ? p.images : (p.image ? [p.image] : []))
  const hasDisc = Number(p.discount) > 0
  const finalPrice = priceWithDiscount(p)
  return (
    <div className="card">
      <div style={{ position: 'relative', aspectRatio: '4/3', background: 'var(--bg-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {imgs[idx] ? <img src={imgs[idx]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span className="muted" style={{ fontSize: 13 }}>нема фото</span>}
        {hasDisc && <span className="badge" style={{ left: 10, background: '#ff6b6b', color: '#fff' }}>-{p.discount}%</span>}
        <span className="badge" style={{ right: 10, background: p.in_stock ? 'var(--accent)' : '#e2e4dd', color: '#1c1e18' }}>{p.in_stock ? 'В наявності' : 'Немає'}</span>
        <button
          onClick={() => toggle(p)}
          aria-label={fav ? 'Видалити з вподобаного' : 'Додати в вподобане'}
          style={{ position: 'absolute', bottom: 10, right: 10, width: 34, height: 34, borderRadius: '50%', background: '#fff', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={fav ? '#ff6b6b' : 'none'} stroke={fav ? '#ff6b6b' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"></path></svg>
        </button>
        {imgs.length > 1 && (
          <div style={{ position: 'absolute', bottom: 8, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 6 }}>
            {imgs.map((_, i) => <button key={i} onClick={() => setIdx(i)} style={{ width: 7, height: 7, borderRadius: '50%', border: 'none', background: i === idx ? 'var(--accent-deep)' : '#cfd3c7' }} />)}
          </div>
        )}
      </div>
      <div style={{ padding: 16 }}>
        <h3 style={{ fontSize: 16, fontWeight: 800 }}>{p.name}</h3>
        {p.description && <p className="muted" style={{ fontSize: 13, margin: '4px 0 10px' }}>{p.description}</p>}
        {p.size_options?.length > 0 && (
          <div style={{ marginBottom: 8 }}><label className="fld">Розмір:</label><div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{p.size_options.map(s => <button key={s.label} onClick={() => setSize(s.label)} className={'chip' + (size === s.label ? ' active' : '')}>{s.label}</button>)}</div></div>
        )}
        {p.color_options?.length > 0 && (
          <div style={{ marginBottom: 8 }}><label className="fld">Колір:</label><div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{p.color_options.map(c => <button key={c.label} onClick={() => setColor(c.label)} className={'chip' + (color === c.label ? ' active' : '')}>{c.label}</button>)}</div></div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
          <div>
            {hasDisc && <span className="muted" style={{ textDecoration: 'line-through', fontSize: 13, marginRight: 6 }}>{p.price} ₴</span>}
            <span style={{ fontWeight: 800, fontSize: 18 }}>{finalPrice} ₴</span>
          </div>
          <button className="btn btn-primary" disabled={!p.in_stock} onClick={() => add(p, size, color)} style={{ padding: '9px 15px' }}>В кошик</button>
        </div>
      </div>
    </div>
  )
}

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([])
  const [cats, setCats] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('all')
  const [onlySale, setOnlySale] = useState(false)
  const [availability, setAvailability] = useState('all')
  const [sort, setSort] = useState('default')
  const [query, setQuery] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  useEffect(() => {
    (async () => {
      const [{ data: cs }, { data: ps }] = await Promise.all([
        supabase.from('tct_categories').select('*').order('position'),
        supabase.from('tct_products').select('*').eq('archived', false).order('created_at', { ascending: false }),
      ])
      setCats(cs || [])
      setProducts((ps || []) as Product[])
      setLoading(false)
    })()
  }, [])

  const filtered = useMemo(() => {
    let r = [...products]
    if (category !== 'all') r = r.filter(p => p.category_slug === category)
    if (onlySale) r = r.filter(p => Number(p.discount) > 0)
    if (availability === 'in') r = r.filter(p => p.in_stock)
    if (availability === 'out') r = r.filter(p => !p.in_stock)
    if (query.trim()) { const q = query.toLowerCase(); r = r.filter(p => p.name.toLowerCase().includes(q) || (p.description || '').toLowerCase().includes(q)) }
    const mn = Number(minPrice), mx = Number(maxPrice)
    if (minPrice) r = r.filter(p => priceWithDiscount(p) >= mn)
    if (maxPrice) r = r.filter(p => priceWithDiscount(p) <= mx)
    if (sort === 'cheap') r.sort((a, b) => priceWithDiscount(a) - priceWithDiscount(b))
    if (sort === 'expensive') r.sort((a, b) => priceWithDiscount(b) - priceWithDiscount(a))
    return r
  }, [products, category, onlySale, availability, sort, query, minPrice, maxPrice])

  return (
    <section id="catalog" className="section" style={{ background: 'var(--bg-soft)' }}>
      <div className="container">
        <span className="eyebrow">Каталог</span>
        <h2 className="h2">Наші вироби</h2>
        <p className="lead">Столики та стільці зі скляною стільницею — обирайте під свій інтерʼєр.</p>

        <div className="card" style={{ padding: 16, margin: '22px 0', display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'flex-end' }}>
          <div>
            <label className="fld">Категорія:</label>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <button className={'chip' + (category === 'all' ? ' active' : '')} onClick={() => setCategory('all')}>Усі</button>
              {cats.map(c => <button key={c.slug} className={'chip' + (category === c.slug ? ' active' : '')} onClick={() => setCategory(c.slug)}>{c.name}</button>)}
            </div>
          </div>
          <div><label className="fld">Наявність:</label><select value={availability} onChange={e => setAvailability(e.target.value)} style={{ minWidth: 140 }}><option value="all">Усі</option><option value="in">В наявності</option><option value="out">Немає</option></select></div>
          <div><label className="fld">Сортування:</label><select value={sort} onChange={e => setSort(e.target.value)} style={{ minWidth: 160 }}><option value="default">За замовчуванням</option><option value="cheap">Дешевші спершу</option><option value="expensive">Дорожчі спершу</option></select></div>
          <div style={{ flex: 1, minWidth: 160 }}><label className="fld">Пошук:</label><input className="input" value={query} onChange={e => setQuery(e.target.value)} placeholder="Назва товару..." /></div>
          <div><label className="fld">Ціна, ₴:</label><div style={{ display: 'flex', gap: 6 }}><input className="input" style={{ width: 80 }} value={minPrice} onChange={e => setMinPrice(e.target.value)} placeholder="від" /><input className="input" style={{ width: 80 }} value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="до" /></div></div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600 }}><input type="checkbox" checked={onlySale} onChange={e => setOnlySale(e.target.checked)} />Лише акції</label>
        </div>

        <div className="muted" style={{ fontSize: 13, marginBottom: 14 }}>Знайдено: {filtered.length}</div>

        {loading ? <p className="muted">Завантаження...</p> : filtered.length === 0 ? <p className="muted">Нічого не знайдено</p> : (
          <div className="grid cols-3">{filtered.map(p => <ProductCard key={p.id} p={p} />)}</div>
        )}
      </div>
    </section>
  )
}
