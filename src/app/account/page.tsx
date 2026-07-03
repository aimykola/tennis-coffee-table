'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'

export default function Account() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      setUser(user)
      const { data: prof } = await supabase.from('tct_profiles').select('*').eq('id', user.id).single()
      setProfile(prof)
      const { data: ord } = await supabase.from('tct_orders').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
      setOrders(ord || [])
      setLoading(false)
    })()
  }, [router])

  const signOut = async () => { await supabase.auth.signOut(); router.push('/') }

  if (loading) return <p style={{ padding: 40 }}>Завантаження...</p>

  return (
    <div style={{ maxWidth: 720, margin: '60px auto', padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800 }}>Кабінет</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          {profile?.is_admin && <Link href="/admin" className="btn btn-primary">Адмін-панель</Link>}
          <button className="btn btn-ghost" onClick={signOut}>Вийти</button>
        </div>
      </div>
      <div className="card" style={{ padding: 20, marginBottom: 20 }}>
        <p><b>{profile?.full_name || '—'}</b></p>
        <p className="muted" style={{ fontSize: 14 }}>{user?.email}</p>
        <p className="muted" style={{ fontSize: 14 }}>{profile?.phone}</p>
        {Number(profile?.discount) > 0 && <p style={{ marginTop: 6, fontWeight: 700, color: 'var(--accent-deep)' }}>Ваша знижка: {profile.discount}%</p>}
      </div>
      <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>Мої замовлення</h2>
      {orders.length === 0 ? <p className="muted">Замовлень поки немає</p> : orders.map(o => (
        <div key={o.id} className="card" style={{ padding: 16, marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span className="muted" style={{ fontSize: 13 }}>{new Date(o.created_at).toLocaleDateString('uk')}</span><b>{o.total} ₴</b></div>
          <div style={{ fontSize: 13, marginTop: 6 }}>{(o.items || []).map((i: any, k: number) => <div key={k}>{i.name} ×{i.qty}</div>)}</div>
          <span className="chip" style={{ marginTop: 8, display: 'inline-block' }}>{o.status}</span>
        </div>
      ))}
      <Link href="/" className="muted" style={{ fontSize: 14, display: 'inline-block', marginTop: 16 }}>← На головну</Link>
    </div>
  )
}
