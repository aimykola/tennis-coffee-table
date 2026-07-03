'use client'
import { useFavorites } from '@/components/favorites/FavoritesContext'
import { useCart } from '@/components/cart/CartContext'
import { priceWithDiscount } from '@/lib/types'

export default function FavoritesDrawer() {
  const { items, isOpen, close, remove } = useFavorites()
  const { add } = useCart()

  return (
    <>
      <div onClick={close} style={{ position: 'fixed', inset: 0, background: 'rgba(20,22,16,.35)', opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none', transition: '.2s', zIndex: 60 }} />
      <aside style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(420px,100%)', background: '#fff', boxShadow: '-10px 0 40px rgba(0,0,0,.1)', transform: isOpen ? 'translateX(0)' : 'translateX(100%)', transition: '.25s', zIndex: 61, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: 18, borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <strong style={{ fontSize: 18 }}>Вподобані</strong>
          <button onClick={close} className="btn btn-ghost" style={{ padding: '6px 12px' }}>✕</button>
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: 18 }} className="hidden-scroll">
          {items.length === 0 ? <p className="muted">Список вподобаного порожній</p> : items.map((p) => (
            <div key={p.id} style={{ display: 'flex', gap: 12, marginBottom: 14, paddingBottom: 14, borderBottom: '1px solid var(--line)' }}>
              <div style={{ width: 60, height: 60, borderRadius: 10, background: 'var(--bg-soft)', flexShrink: 0, overflow: 'hidden' }}>{p.image && <img src={p.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</div>
                <div style={{ fontWeight: 700, fontSize: 14, marginTop: 4 }}>{priceWithDiscount(p)} ₴</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 6 }}>
                  <button onClick={() => add(p)} className="btn btn-primary" style={{ padding: '6px 12px', fontSize: 12 }}>В кошик</button>
                  <button onClick={() => remove(p.id)} className="muted" style={{ fontSize: 12, background: 'none', border: 'none' }}>Видалити</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </>
  )
}
