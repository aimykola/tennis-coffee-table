'use client'

import Link from 'next/link'
import { useLang } from '@/components/LanguageContext'
import Header from '@/components/Header'
import { Footer } from '@/components/Sections'
import CartDrawer from '@/components/cart/CartDrawer'
import FavoritesDrawer from '@/components/favorites/FavoritesDrawer'
import FloatingContact from '@/components/FloatingContact'

export default function ReturnsPage() {
  const { t, lang } = useLang()

  const uk = [
    { h: 'Право на повернення', p: 'Ви можете повернути товар належної якості протягом 14 днів з моменту отримання, якщо він не був у використанні, зберіг товарний вигляд, споживчі властивості та оригінальне пакування.' },
    { h: 'Як оформити повернення', p: 'Напишіть нам через контакти на сайті, вкажіть номер замовлення та причину повернення. Ми узгодимо зручний спосіб пересилання та повернемо кошти.' },
    { h: 'Обмін', p: 'Якщо вам не підійшов колір або розмір, ми допоможемо підібрати інший варіант. Обмін здійснюється після отримання та перевірки повернутого виробу.' },
    { h: 'Товар з дефектом', p: 'Якщо виріб пошкоджено під час доставки або виявлено виробничий дефект — надішліть нам фото. Ми замінимо товар або повернемо повну вартість, включно з доставкою.' },
    { h: 'Вироби на замовлення', p: 'Індивідуальні вироби, виготовлені за вашими параметрами, повертаються лише у разі виробничого дефекту.' },
  ]
  const en = [
    { h: 'Right to return', p: 'You may return a product of proper quality within 14 days of receipt, provided it has not been used and retains its presentation, consumer properties and original packaging.' },
    { h: 'How to request a return', p: 'Contact us via the details on the site, provide your order number and the reason for return. We will arrange a convenient shipping method and refund your payment.' },
    { h: 'Exchange', p: 'If the color or size did not suit you, we will help you choose another option. Exchange is carried out after we receive and inspect the returned item.' },
    { h: 'Defective item', p: 'If an item was damaged during delivery or has a manufacturing defect, send us a photo. We will replace the item or refund the full amount, including shipping.' },
    { h: 'Made-to-order items', p: 'Custom pieces made to your specifications can only be returned in case of a manufacturing defect.' },
  ]
  const blocks = lang === 'uk' ? uk : en

  return (
    <>
      <Header />
      <main className="container" style={{ padding: '48px 28px 72px', minHeight: '60vh', maxWidth: 820 }}>
        <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: 14, display: 'inline-block', marginBottom: 28 }}>{t('back_to_catalog')}</Link>
        <h1 style={{ fontSize: 34, marginBottom: 32, lineHeight: 1.2 }}>{t('page_returns_title')}</h1>
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
