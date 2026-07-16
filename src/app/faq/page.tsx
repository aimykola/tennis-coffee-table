'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLang } from '@/components/LanguageContext'
import Header from '@/components/Header'
import { Footer } from '@/components/Sections'
import CartDrawer from '@/components/cart/CartDrawer'
import FavoritesDrawer from '@/components/favorites/FavoritesDrawer'
import FloatingContact from '@/components/FloatingContact'

export default function FaqPage() {
  const { t, lang } = useLang()
  const [open, setOpen] = useState<number | null>(0)

  const uk = [
    { q: 'З чого виготовлені ваші вироби?', a: 'Основа виробів створена зі справжніх тенісних мʼячів, які отримують друге життя. Зверху — загартована скляна стільниця. Це поєднання екологічності та вишуканого дизайну.' },
    { q: 'Чи міцні такі столики?', a: 'Так. Конструкція розрахована на щоденне використання: стійка основа та загартоване скло витримують звичайне навантаження вітальні чи офісу.' },
    { q: 'Скільки часу займає виготовлення на замовлення?', a: 'Стандартні позиції зазвичай є в наявності. Індивідуальні вироби виготовляються від 5 до 14 днів залежно від складності та кольору.' },
    { q: 'Чи можу я обрати колір?', a: 'Так, доступні різні кольори мʼячів. Оберіть варіант на сторінці товару або напишіть нам для індивідуального підбору.' },
    { q: 'Як доглядати за виробом?', a: 'Протирайте скло мʼякою вологою тканиною. Уникайте абразивних засобів. Основу достатньо періодично очищати від пилу.' },
    { q: 'Скільки коштує доставка?', a: 'Доставка безкоштовна по всій Україні. Детальніше — на сторінці «Доставка й оплата».' },
  ]
  const en = [
    { q: 'What are your pieces made of?', a: 'The base is made from real tennis balls given a second life. On top is a tempered glass surface. It combines sustainability with refined design.' },
    { q: 'Are the tables sturdy?', a: 'Yes. The construction is built for daily use: a stable base and tempered glass withstand the normal load of a living room or office.' },
    { q: 'How long does a custom order take?', a: 'Standard items are usually in stock. Custom pieces are made within 5 to 14 days depending on complexity and color.' },
    { q: 'Can I choose the color?', a: 'Yes, various ball colors are available. Pick an option on the product page or message us for a custom selection.' },
    { q: 'How do I care for the piece?', a: 'Wipe the glass with a soft damp cloth. Avoid abrasive cleaners. The base only needs occasional dusting.' },
    { q: 'How much is shipping?', a: 'Shipping is free across Ukraine. See the "Delivery & Payment" page for details.' },
  ]
  const items = lang === 'uk' ? uk : en

  return (
    <>
      <Header />
      <main className="container" style={{ padding: '48px 28px 72px', minHeight: '60vh', maxWidth: 820 }}>
        <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: 14, display: 'inline-block', marginBottom: 28 }}>{t('back_to_catalog')}</Link>
        <h1 style={{ fontSize: 34, marginBottom: 32, lineHeight: 1.2 }}>{t('page_faq_title')}</h1>
        <div>
          {items.map((it, i) => (
            <div key={i} style={{ borderTop: '1px solid var(--line)', padding: '4px 0' }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: '18px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, fontSize: 17, color: 'inherit' }}
              >
                <span>{it.q}</span>
                <span style={{ fontSize: 22, lineHeight: 1, transform: open === i ? 'rotate(45deg)' : 'none', transition: 'transform .2s' }}>+</span>
              </button>
              {open === i && (
                <p className="muted" style={{ fontSize: 15, lineHeight: 1.8, padding: '0 0 18px' }}>{it.a}</p>
              )}
            </div>
          ))}
          <div style={{ borderTop: '1px solid var(--line)' }} />
        </div>
      </main>
      <Footer />
      <CartDrawer />
      <FavoritesDrawer />
      <FloatingContact />
    </>
  )
}
