'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

function TableArt() {
  const balls = Array.from({ length: 15 })
  return (
    <div style={{ position: 'relative', background: 'var(--court-deep)', borderRadius: 'var(--radius-lg)', padding: 34, minHeight: 320, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <div className="court-lines" style={{ position: 'absolute', inset: 0, opacity: .5 }} />
      <div style={{ position: 'absolute', top: 20, left: 20, right: 20, height: 1, background: 'rgba(215,240,82,.35)' }} />
      <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20, height: 1, background: 'rgba(215,240,82,.35)' }} />
      <div style={{ position: 'relative', width: 220, height: 200 }}>
        <div style={{ position: 'absolute', top: 0, left: -10, right: -10, height: 18, borderRadius: 8, background: 'rgba(255,255,255,.14)', border: '1px solid rgba(255,255,255,.22)' }} />
        <div style={{ position: 'absolute', top: 24, left: 10, right: 10, bottom: 26, display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 6, alignContent: 'center' }}>
          {balls.map((_, i) => (
            <span key={i} style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--accent)', boxShadow: 'inset 0 0 0 2px var(--accent-deep)' }} />
          ))}
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 30, width: 8, height: 26, background: 'rgba(255,255,255,.3)', borderRadius: 4 }} />
        <div style={{ position: 'absolute', bottom: 0, right: 30, width: 8, height: 26, background: 'rgba(255,255,255,.3)', borderRadius: 4 }} />
      </div>
      <span style={{ position: 'absolute', bottom: 16, left: 18, fontSize: 11, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--accent)' }}>Handmade design</span>
    </div>
  )
}

export function Hero() {
  const [s, setS] = useState<any>({ hero_title: 'Кавові столики, що стають акцентом інтер\'єру', hero_subtitle: '' })
  useEffect(() => {
    supabase.from('tct_site_settings').select('*').then(({ data }) => {
      if (data) { const m: any = {}; data.forEach((r: any) => m[r.key] = r.value); setS((p: any) => ({ ...p, ...m })) }
    })
  }, [])
  return (
    <section id="top" style={{ background: 'var(--ink-bg)', color: '#fff', paddingTop: 72, paddingBottom: 88 }}>
      <div className="container grid cols-2" style={{ alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: 11, letterSpacing: '.26em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 700 }}>Дизайнерські меблі · Ручна робота</span>
          <h1 style={{ fontSize: 'clamp(34px,5vw,60px)', fontWeight: 600, letterSpacing: '-.02em', lineHeight: 1.04, margin: '16px 0 18px', color: '#fff' }}>{s.hero_title}</h1>
          <p style={{ color: 'var(--muted-light)', maxWidth: 520, marginBottom: 28, fontSize: 16 }}>{s.hero_subtitle}</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="#catalog" className="btn btn-primary">Переглянути вироби</a>
            <a href="#contacts" className="btn" style={{ borderColor: 'rgba(255,255,255,.4)', color: '#fff' }}>Звʼязатись</a>
          </div>
        </div>
        <TableArt />
      </div>
    </section>
  )
}

export function About() {
  const items = [
    { t: 'Виразна фактура', d: 'Об\'ємна кулькова основа надає кожному столику впізнаваний скульптурний характер.' },
    { t: 'Скляна стільниця', d: 'Загартоване скло робить поверхню міцною, легкою в догляді та візуально повітряною.' },
    { t: 'Ручна робота', d: 'Ми збираємо кожен виріб вручну — з увагою до деталей і геометрії.' },
  ]
  return (
    <section id="about" className="section" style={{ background: 'var(--bg-soft)' }}>
      <div className="container">
        <span className="eyebrow">Чому обирають нас</span>
        <h2 className="h2">Дизайн, що працює на інтерʼєр</h2>
        <div className="grid cols-3" style={{ marginTop: 28 }}>
          {items.map((x, i) => (
            <div key={i} className="card" style={{ padding: 26 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--court)', marginBottom: 16 }} />
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{x.t}</h3>
              <p className="muted" style={{ fontSize: 14 }}>{x.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Reviews() {
  const rv = [
    { n: 'Оксана', t: 'Столик став акцентом вітальні. Виглядає навіть краще, ніж на фото!' },
    { n: 'Андрій', t: 'Якісна збірка, скло приємне на дотик. Дуже стильна річ.' },
    { n: 'Марія', t: 'Замовляла в подарунок — усі в захваті. Доставили швидко.' },
  ]
  return (
    <section id="reviews" className="section">
      <div className="container">
        <span className="eyebrow">Відгуки</span>
        <h2 className="h2">Що кажуть покупці</h2>
        <div className="grid cols-3" style={{ marginTop: 28 }}>
          {rv.map((r, i) => (
            <div key={i} className="card" style={{ padding: 26 }}>
              <div style={{ color: 'var(--court)', fontWeight: 700, marginBottom: 10 }}>★★★★★</div>
              <p style={{ fontSize: 15, marginBottom: 12 }}>“{r.t}”</p>
              <span style={{ fontWeight: 600, fontSize: 14 }}>{r.n}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer style={{ background: 'var(--ink-bg)', color: '#fff', padding: '40px 0' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 14 }}>
        <span style={{ color: 'var(--muted-light)' }}>© {new Date().getFullYear()} · <span style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.04em', color: '#fff' }}>Tennis</span><span style={{ fontWeight: 400, textTransform: 'uppercase', letterSpacing: '.04em', color: 'var(--accent)' }}> Coffee Table</span></span>
      </div>
    </footer>
  )
}
