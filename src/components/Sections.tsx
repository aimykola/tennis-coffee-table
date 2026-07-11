'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

function TableArt() {
  const balls = Array.from({ length: 15 })
  return (
    <div style={{ position: 'relative', background: 'var(--bg-soft)', borderRadius: 4, padding: 34, minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--line)' }}>
      <div style={{ position: 'relative', width: 220, height: 200 }}>
        <div style={{ position: 'absolute', top: 0, left: -10, right: -10, height: 20, borderRadius: 3, background: 'rgba(255,253,248,.95)', border: '1px solid var(--line)', boxShadow: 'var(--shadow)' }} />
        <div style={{ position: 'absolute', top: 26, left: 10, right: 10, bottom: 26, display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 6, alignContent: 'center' }}>
          {balls.map((_, i) => (
            <span key={i} style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--accent)', boxShadow: 'inset 0 0 0 2px var(--accent-deep)' }} />
          ))}
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 30, width: 8, height: 26, background: '#8a6b47', borderRadius: 3 }} />
        <div style={{ position: 'absolute', bottom: 0, right: 30, width: 8, height: 26, background: '#8a6b47', borderRadius: 3 }} />
      </div>
      <span style={{ position: 'absolute', bottom: 16, left: 16, fontSize: 11, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>♻ 100% перероблені матеріали</span>
    </div>
  )
}

export function Hero() {
  const [s, setS] = useState<any>({ hero_title: 'Кавові столики зі старих тенісних мʼячів та скла', hero_subtitle: '' })
  useEffect(() => {
    supabase.from('tct_site_settings').select('*').then(({ data }) => {
      if (data) { const m: any = {}; data.forEach((r: any) => m[r.key] = r.value); setS((p: any) => ({ ...p, ...m })) }
    })
  }, [])
  return (
    <section id="top" className="section" style={{ paddingTop: 64 }}>
      <div className="container grid cols-2" style={{ alignItems: 'center' }}>
        <div>
          <span className="eyebrow">Екодизайн · Ручна робота</span>
          <h1 style={{ fontSize: 'clamp(34px,5vw,58px)', fontWeight: 400, letterSpacing: '-.005em', lineHeight: 1.1, margin: '16px 0 18px' }}>{s.hero_title}</h1>
          <p className="lead" style={{ marginBottom: 28 }}>{s.hero_subtitle}</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="#catalog" className="btn btn-primary">Переглянути вироби</a>
            <a href="#contacts" className="btn btn-ghost">Звʼязатись</a>
          </div>
        </div>
        <TableArt />
      </div>
    </section>
  )
}

export function About() {
  const items = [
    { t: 'Друге життя мʼячів', d: 'Кожен столик — це десятки відпрацьованих тенісних мʼячів, що знайшли нове застосування.' },
    { t: 'Скляна стільниця', d: 'Загартоване скло робить поверхню міцною, легкою в догляді та візуально повітряною.' },
    { t: 'Ручна робота', d: 'Ми збираємо кожен виріб вручну — з увагою до деталей і геометрії.' },
  ]
  return (
    <section id="about" className="section" style={{ background: 'var(--bg-soft)' }}>
      <div className="container">
        <span className="eyebrow">Чому обирають нас</span>
        <h2 className="h2">Мінімалізм і турбота про планету</h2>
        <div className="grid cols-3" style={{ marginTop: 32 }}>
          {items.map((x, i) => (
            <div key={i} className="card" style={{ padding: 28 }}>
              <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--accent)', marginBottom: 16 }} />
              <h3 style={{ fontSize: 20, fontWeight: 500, marginBottom: 8 }}>{x.t}</h3>
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
    { n: 'Андрій', t: 'Якісна збірка, скло приємне на дотик. І сама ідея переробки — супер.' },
    { n: 'Марія', t: 'Замовляла в подарунок — усі в захваті. Доставили швидко.' },
  ]
  return (
    <section id="reviews" className="section">
      <div className="container">
        <span className="eyebrow">Відгуки</span>
        <h2 className="h2">Що кажуть покупці</h2>
        <div className="grid cols-3" style={{ marginTop: 32 }}>
          {rv.map((r, i) => (
            <div key={i} className="card" style={{ padding: 28 }}>
              <p style={{ fontSize: 16, marginBottom: 14, fontFamily: 'var(--font-serif), Georgia, serif', fontStyle: 'italic', lineHeight: 1.5 }}>“{r.t}”</p>
              <span style={{ fontWeight: 600, fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--accent-deep)' }}>{r.n}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--line)', padding: '44px 0', background: 'var(--bg-soft)' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 13 }}>
        <span className="muted" style={{ letterSpacing: '.04em' }}>© {new Date().getFullYear()} · <span style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.18em', color: 'var(--accent-deep)' }}>Ballcraft</span></span>
      </div>
    </footer>
  )
}
