'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import type { Product, CartItem } from '@/lib/types'
import { priceWithDiscount } from '@/lib/types'

const STORAGE_KEY = 'tct_cart'

type CartCtx = {
  items: CartItem[]
  isOpen: boolean
  open: () => void
  close: () => void
  add: (product: Product, size?: string, color?: string) => void
  remove: (id: string, size?: string, color?: string) => void
  setQty: (id: string, qty: number, size?: string, color?: string) => void
  clear: () => void
  count: number
  total: number
}

const Ctx = createContext<CartCtx | null>(null)

function sameLine(a: CartItem, id: string, size?: string, color?: string) {
  return a.product.id === id && (a.size || '') === (size || '') && (a.color || '') === (color || '')
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {}
  }, [])

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)) } catch {}
  }, [items])

  const add = (product: Product, size?: string, color?: string) => {
    setItems(prev => {
      const i = prev.findIndex(x => sameLine(x, product.id, size, color))
      if (i >= 0) { const c = [...prev]; c[i] = { ...c[i], qty: c[i].qty + 1 }; return c }
      return [...prev, { product, qty: 1, size, color }]
    })
    setIsOpen(true)
  }
  const remove = (id: string, size?: string, color?: string) =>
    setItems(prev => prev.filter(x => !sameLine(x, id, size, color)))
  const setQty = (id: string, qty: number, size?: string, color?: string) =>
    setItems(prev => prev.map(x => sameLine(x, id, size, color) ? { ...x, qty: Math.max(1, qty) } : x))
  const clear = () => setItems([])

  const count = items.reduce((s, x) => s + x.qty, 0)
  const total = items.reduce((s, x) => s + priceWithDiscount(x.product) * x.qty, 0)

  return (
    <Ctx.Provider value={{ items, isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false), add, remove, setQty, clear, count, total }}>
      {children}
    </Ctx.Provider>
  )
}

export function useCart() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useCart must be used within CartProvider')
  return c
}
