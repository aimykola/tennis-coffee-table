'use client'

import Link from 'next/link'
import { useLang } from '@/components/LanguageContext'
import Header from '@/components/Header'
import { Footer } from '@/components/Sections'
import CartDrawer from '@/components/cart/CartDrawer'
import FavoritesDrawer from '@/components/favorites/FavoritesDrawer'
import FloatingContact from '@/components/FloatingContact'

export default function DeliveryPage() {
  const { t, lang } = useLang()

  const uk = [
    { h: 'Доставка', p: 'Ми надсилаємо вироби по всій Україні службою «Нова Пошта» — на відділення або кур\'єром за адресою. Стандартний термін доставки — 2–5 робочих днів після підтвердження замовлення.' },
    { h: 'Безкоштовна доставка', p: 'Доставка безкоштовна для всіх замовлень. Вартість пересилання ми беремо на себе.' },
    { h: 'Оплата', p: 'Оплатити замовлення можна переказом на картку, через реквізити або накладеним платежем при отриманні. Менеджер зв\'яжеться з вами для підтвердження зручного способу.' },
    { h: 'Вироби на замовлення', p: 'Індивідуальні вироби виготовляються під замовлення. Термін виготовлення узгоджується окремо та зазвичай складає від 5 до 14 днів.' },
    { h: 'Пакування', p: 'Кожен виріб ретельно пакується для безпечного транспортування, адже скляна стільниця та ручна робота потребують дбайливого поводження.' },
  ]
  const en = [
    { h: 'Shipping', p: 'We ship across Ukraine via Nova Poshta — to a branch or by courier to your address. Standard delivery takes 2–5 business days after order confirmation.' },
    { h: 'Free delivery', p: 'Delivery is free for all orders. We cover the shipping cost.' },
    { h: 'Payment', p: 'You can pay by card transfer, by invoice, or cash on delivery. Our manager will contact you to confirm the most convenient option.' },
    { h: 'Made to order', p: 'Custom pieces are made to order. Production time is agreed separately and usually takes 5 to 14 days.' },
    { h: 'Packaging', p: 'Each item is carefully packed for safe transport, as the glass top and handcrafted base require gentle handling.' },
  ]
  const blocks = lang === 'uk' ? uk : en

  return (
    <>
      <Header />
      <main className="container" style={{ padding: '48px 0 72px', minHeight: '60vh', maxWidth: 820 }}>
        <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: 14, display: 'inline-block', marginBottom: 28 }}>{t('back_to_catalog')}</Link>
        <h1 style={{ fontSize: 34, marginBottom: 32, lineHeight: 1.2 }}>{t('page_delivery_title')}</h1>
        {blocks.map((b, i) => (
          <section key={i} style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 18, marginBottom: 8 }}>{b.h}</h2>
            <p className="muted" style={{ fontSize: 15, lineHeight: 1.8 }}>{b.p}</p>
          </section>
        ))}
      </main>
      <Footer />
      <CartDrawer />
      <FavoritesDrawer />
      <FloatingContact />
    </>
  )
}
