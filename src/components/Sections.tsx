'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

function TableArt() {
  const balls = Array.from({ length: 15 })
  return (
    <div style={{ position: 'relative', background: 'var(--bg-soft)', borderRadius: 4, padding: 34, minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--line)' }}>
      <div style={{ position: 'relative', width: 220, height: 200 }}>
        <div style={{ position: 'absolute', top: 0, left: -10, right: -10, height: 20, borderRadius: 3, background: 'rgba(255,255,255,.95)', border: '1px solid var(--line)', boxShadow: 'var(--shadow)' }} />
        <div style={{ position: 'absolute', top: 26, left: 10, right: 10, bottom: 26, display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 6, alignContent: 'center' }}>
          {balls.map((_, i) => (
            <span key={i} style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--accent)', boxShadow: 'inset 0 0 0 2px var(--accent-deep)' }} />
          ))}
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 30, width: 8, height: 26, background: '#c9c9c2', borderRadius: 3 }} />
        <div style={{ position: 'absolute', bottom: 0, right: 30, width: 8, height: 26, background: '#c9c9c2', borderRadius: 3 }} />
      </div>
      <span style={{ position: 'absolute', bottom: 16, left: 16, fontSize: 11, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>♥ 100% перероблені матеріали</span>
    </div>
  )
}

export function Hero() {
  const [s, setS] = useState<any>({ hero_title: 'Кавові столики, що стають акцентом інтер’єру', hero_subtitle: 'Ручна робота, м’яка об’ємна текстура та скляна стільниця.' })
  useEffect(() => {
    supabase.from('tct_site_settings').select('*').then(({ data }: any) => {
      if (data) { const o: any = {}; data.forEach((r: any) => { o[r.key] = r.value }); setS((p: any) => ({ ...p, ...o })) }
    })
  }, [])
  return (
    <section id="top" style={{ position: 'relative' }}>
      {/* Full-width editorial hero */}
      <div style={{ position: 'relative', minHeight: 'clamp(460px,70vh,720px)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(180deg,var(--bg-soft) 0%,#efefe9 100%)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: .4 }}>
          <div style={{ transform: 'scale(1.6)' }}><TableArt /></div>
        </div>
        <div style={{ position: 'relative', zIndex: 2, background: 'rgba(255,255,255,.86)', backdropFilter: 'blur(4px)', border: '1px solid var(--line)', padding: 'clamp(32px,5vw,56px)', maxWidth: 620, width: 'calc(100% - 40px)', textAlign: 'center' }}>
          <span className="eyebrow">Екодизайн · Ручна робота</span>
          <h1 style={{ fontSize: 'clamp(30px,4.5vw,52px)', fontWeight: 400, letterSpacing: '-.005em', lineHeight: 1.12, margin: '16px 0 18px' }}>{s.hero_title}</h1>
          <p className="lead" style={{ marginBottom: 28, marginLeft: 'auto', marginRight: 'auto', maxWidth: 460 }}>{s.hero_subtitle}</p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="#catalog" className="btn btn-primary">Переглянути вироби</a>
            <a href="#contacts" className="btn btn-ghost">Зв’язатись</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Services() {
  const items = [
    ['Безкоштовна доставка', 'По всій Україні при замовленні від 1200 грн.'],
    ['Обмін та повернення', '14 днів на обмін або повернення виробу.'],
    ['Індивідуальне замовлення', 'Виготовимо столик під ваш інтер’єр.'],
  ]
  return (
    <section style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', background: 'var(--bg)' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 0 }}>
        {items.map((it, i) => (
          <div key={i} style={{ textAlign: 'center', padding: '38px 24px', borderLeft: i === 0 ? 'none' : '1px solid var(--line)' }}>
            <h4 style={{ fontSize: 13, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 10 }}>{it[0]}</h4>
            <p className="muted" style={{ fontSize: 14 }}>{it[1]}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function About() {
  const items = [
    ['Друге життя м’ячів', 'Кожен столик — це десятки відпрацьованих тенісних м’ячів, що знайшли нове застосування.'],
    ['Скляна стільниця', 'Загартоване скло робить поверхню міцною, легкою в догляді та візуально повітряною.'],
    ['Ручна робота', 'Ми збираємо кожен виріб вручну — з увагою до деталей і геометрії.'],
  ]
  return (
    <section id="about" className="section" style={{ background: 'var(--bg-soft)' }}>
      <div className="container">
        <span className="eyebrow">Чому обирають нас</span>
        <h2 className="h2">Мінімалізм і турбота про планету</h2>
        <div className="grid cols-3" style={{ marginTop: 28 }}>
          {items.map((it, i) => (
            <div key={i} className="card" style={{ padding: 28 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--accent)', marginBottom: 16 }} />
              <h3 style={{ fontSize: 18, fontWeight: 500, marginBottom: 8 }}>{it[0]}</h3>
              <p className="muted" style={{ fontSize: 15 }}>{it[1]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Reviews() {
  const items = [
    ['Оксана', 'Столик став акцентом вітальні. Виглядає навіть краще, ніж на фото!'],
    ['Андрій', 'Якісна збірка, скло приємне на дотик. І сама ідея переробки — супер.'],
    ['Марія', 'Замовляла в подарунок — усі в захваті. Доставили швидко.'],
  ]
  return (
    <section id="reviews" className="section">
      <div className="container">
        <span className="eyebrow">Відгуки</span>
        <h2 className="h2">Що кажуть покупці</h2>
        <div className="grid cols-3" style={{ marginTop: 28 }}>
          {items.map((it, i) => (
            <div key={i} className="card" style={{ padding: 28 }}>
              <p style={{ fontSize: 17, marginBottom: 16, fontFamily: 'var(--font-serif), Georgia, serif', fontStyle: 'italic', lineHeight: 1.5 }}>“{it[1]}”</p>
              <span style={{ fontWeight: 600, fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--accent-deep)' }}>{it[0]}</span>
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
