'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useLang } from '@/components/LanguageContext'

function TableArt() {
  const { t } = useLang()
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
      <span style={{ position: 'absolute', bottom: 16, left: 16, fontSize: 11, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>{t('badge_recycled')}</span>
    </div>
  )
}

export function Hero() {
  const { t } = useLang()
  const [s, setS] = useState<any>({ hero_title: 'Кавові столики, що стають акцентом інтер’єру', hero_subtitle: 'Ручна робота, м’яка об’ємна текстура та скляна стільниця.' })
  useEffect(() => {
    supabase.from('tct_site_settings').select('*').then(({ data }: any) => {
      if (data) { const o: any = {}; data.forEach((r: any) => { o[r.key] = r.value }); setS((p: any) => ({ ...p, ...o })) }
    })
  }, [])
  return (
    <section id="top" style={{ position: 'relative' }}>
      {/* Full-width editorial hero */}
      <div style={{ position: 'relative', minHeight: 'clamp(320px,48vh,480px)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(180deg,var(--bg-soft) 0%,#efefe9 100%)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: .4 }}>
          <div style={{ transform: 'scale(1.6)' }}><TableArt /></div>
        </div>
        <div style={{ position: 'relative', zIndex: 2, background: 'rgba(255,255,255,.86)', backdropFilter: 'blur(4px)', border: '1px solid var(--line)', padding: 'clamp(20px,3vw,36px) clamp(32px,5vw,56px)', maxWidth: '100%', width: 'calc(100% - 8px)', textAlign: 'center' }}>
          <span className="eyebrow">{t('hero_eyebrow')}</span>
          <h1 style={{ fontSize: 'clamp(30px,4.5vw,52px)', fontWeight: 400, letterSpacing: '-.005em', lineHeight: 1.12, margin: '16px 0 18px' }}>{s.hero_title}</h1>
          <p className="lead" style={{ marginBottom: 28, marginLeft: 'auto', marginRight: 'auto', maxWidth: 460 }}>{s.hero_subtitle}</p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="#catalog" className="btn btn-primary">{t('hero_cta_products')}</a>
            <a href="#contacts" className="btn btn-ghost">{t('hero_cta_contact')}</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Services() {
  const { t } = useLang()
  const items = [
    [t('svc1_t'), t('svc1_d')],
    [t('svc2_t'), t('svc2_d')],
    [t('svc3_t'), t('svc3_d')],
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
  const { t } = useLang()
  const items = [
    [t('about1_t'), t('about1_d')],
    [t('about2_t'), t('about2_d')],
    [t('about3_t'), t('about3_d')],
  ]
  return (
    <section id="about" className="section" style={{ background: 'var(--bg-soft)' }}>
      <div className="container">
        <span className="eyebrow">{t('about_title')}</span>
        <h2 className="h2">{t('about_eyebrow')}</h2>
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
  const { t } = useLang()
  const items = [
    ['Оксана', t('rev1')],
    ['Андрій', t('rev2')],
    ['Марія', t('rev3')],
  ]
  return (
    <section id="reviews" className="section">
      <div className="container">
        <span className="eyebrow">{t('reviews_title')}</span>
        <h2 className="h2">{t('reviews_eyebrow')}</h2>
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
  const { lang, setLang } = useLang()
  return (
    <footer style={{ borderTop: '1px solid var(--line)', padding: '44px 0', background: 'var(--bg-soft)' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, fontSize: 13 }}>
        <span className="muted" style={{ letterSpacing: '.04em' }}>© {new Date().getFullYear()}</span>
        <img src="/logo.png" alt="Ballcraft" style={{ height: 40, width: 'auto', display: 'block' }} />
      </div>
      <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, marginTop: 18, fontSize: 13 }}>
        <button onClick={() => setLang('uk')} aria-pressed={lang === 'uk'} style={{ background: 'none', border: 'none', padding: '4px 6px', cursor: 'pointer', color: lang === 'uk' ? 'var(--ink)' : 'var(--muted)', fontWeight: lang === 'uk' ? 600 : 400, borderBottom: lang === 'uk' ? '1px solid var(--ink)' : '1px solid transparent', letterSpacing: '.02em' }}>Українська</button>
        <span className="muted" style={{ opacity: .5 }}>/</span>
        <button onClick={() => setLang('en')} aria-pressed={lang === 'en'} style={{ background: 'none', border: 'none', padding: '4px 6px', cursor: 'pointer', color: lang === 'en' ? 'var(--ink)' : 'var(--muted)', fontWeight: lang === 'en' ? 600 : 400, borderBottom: lang === 'en' ? '1px solid var(--ink)' : '1px solid transparent', letterSpacing: '.02em' }}>English</button>
      </div>
    </footer>
  )
}
