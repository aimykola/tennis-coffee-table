'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export function Hero() {
  const [s, setS] = useState<any>({ hero_title: 'Кавові столики, що стають акцентом інтерʼєру', hero_subtitle: '' })
  const [bg, setBg] = useState<string>('')
  useEffect(() => {
    supabase.from('tct_site_settings').select('*').then(({ data }) => {
      if (data) { const m: any = {}; data.forEach((r: any) => m[r.key] = r.value); setS((p: any) => ({ ...p, ...m })) }
    })
    supabase.from('tct_products').select('images,image').eq('archived', false).order('created_at', { ascending: false }).limit(1).then(({ data }) => {
      const row: any = data && data[0]
      if (row) { const img = (row.images && row.images[0]) || row.image; if (img) setBg(img) }
    })
  }, [])
  return (
    <section id="top" className="hero-full" style={{ background: bg ? undefined : 'linear-gradient(135deg, #1c1e18 0%, #3a4030 100%)' }}>
      {bg && <img className="hero-img" src={bg} alt="" />}
      <div className="container">
        <span style={{ fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 700 }}>Дизайнерські меблі · Ручна робота</span>
        <h1 style={{ fontSize: 'clamp(36px,6vw,68px)', fontWeight: 600, lineHeight: 1.05, margin: '14px 0 16px', maxWidth: 720 }}>{s.hero_title}</h1>
        <p style={{ color: 'rgba(255,255,255,.85)', maxWidth: 520, marginBottom: 26, fontSize: 16 }}>{s.hero_subtitle}</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href="#catalog" className="btn btn-primary">Переглянути вироби</a>
          <a href="#contacts" className="btn" style={{ background: 'transparent', borderColor: 'rgba(255,255,255,.5)', color: '#fff' }}>Звʼязатись</a>
        </div>
      </div>
    </section>
  )
}

export function FeatureStrip() {
  const items = ['Ручна робота', 'Загартоване скло', 'Доставка по Україні', 'Індивідуальні розміри']
  return (
    <div className="feature-strip">
      <div className="container">
        {items.map((t, i) => (
          <span key={i} className="fitem"><span className="fdot" />{t}</span>
        ))}
      </div>
    </div>
  )
}

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--line)', padding: '36px 0', background: 'var(--bg-soft)' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 14 }}>
        <span className="muted">© {new Date().getFullYear()} · <span style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.03em' }}>Tennis</span><span style={{ fontWeight: 400, textTransform: 'uppercase', letterSpacing: '.03em' }}> Coffee Table</span></span>
      </div>
    </footer>
  )
}
