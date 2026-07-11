'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

function toViberLink(v: string) {
  if (v.startsWith('viber:')) return v
  if (v.startsWith('http')) return v
  return 'viber://chat?number=' + encodeURIComponent(v)
}

function toTelegramLink(v: string) {
  if (v.startsWith('http')) return v
  const handle = v.startsWith('@') ? v.slice(1) : v
  return 'https://t.me/' + handle
}

export default function FloatingContact() {
  const [open, setOpen] = useState(false)
  const [s, setS] = useState<any>({})
  useEffect(() => {
    supabase.from('tct_site_settings').select('*').then(({ data }) => {
      if (data) { const m: any = {}; data.forEach((r: any) => m[r.key] = r.value); setS(m) }
    })
  }, [])
  const phone = s.phone
  const viber = s.viber
  const telegram = s.telegram
  return (
    <div style={{ position: 'fixed', right: 20, bottom: 20, zIndex: 30, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      {open && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {phone && (
            <a href={'tel:' + phone} aria-label="Зателефонувати" style={{ width: 46, height: 46, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2b2318" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.98.36 1.94.7 2.86a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.22-1.22a2 2 0 0 1 2.11-.45c.92.34 1.88.57 2.86.7A2 2 0 0 1 22 16.92z"></path></svg>
            </a>
          )}
          {viber && (
            <a href={toViberLink(viber)} target="_blank" rel="noopener noreferrer" aria-label="Viber" style={{ width: 46, height: 46, borderRadius: '50%', background: '#665CAC', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            </a>
          )}
          {telegram && (
            <a href={toTelegramLink(telegram)} target="_blank" rel="noopener noreferrer" aria-label="Telegram" style={{ width: 46, height: 46, borderRadius: '50%', background: '#2AABEE', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </a>
          )}
        </div>
      )}
      <button onClick={() => setOpen(o => !o)} aria-label="Звʼязатись" style={{ width: 54, height: 54, borderRadius: '50%', background: 'var(--accent)', border: 'none', boxShadow: 'var(--shadow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2b2318" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.98.36 1.94.7 2.86a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.22-1.22a2 2 0 0 1 2.11-.45c.92.34 1.88.57 2.86.7A2 2 0 0 1 22 16.92z"></path></svg>
      </button>
    </div>
  )
}
